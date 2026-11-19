"""Document validation and the Markdown/HTML script compiler."""

import pytest

pytest.importorskip("pytest_homeassistant_custom_component")

from custom_components.escpos_designer.designer.markup import (
    compile_markdown,
    parse_inline,
)
from custom_components.escpos_designer.designer.schema import (
    DocumentError,
    normalize_document,
)

BASE = {
    "font": "sans",
    "size": 24,
    "bold": False,
    "italic": False,
    "underline": False,
    "strike": False,
    "invert": False,
}


def _flags(run):
    return {key for key in ("bold", "italic", "underline", "strike", "invert") if run[key]}


class TestSchema:
    def test_empty_document_gets_every_default(self):
        doc = normalize_document({})
        assert doc["paper"] == {"width": 384, "height": None}
        assert doc["frame"]["style"] == "none"
        assert doc["options"]["cut"] == "partial"
        assert doc["elements"] == []

    def test_elements_get_their_defaults(self):
        doc = normalize_document({"elements": [{"type": "qr", "data": "x"}]})
        qr = doc["elements"][0]
        assert qr["size_pct"] == 60 and qr["level"] == "M" and qr["align"] == "left"
        assert qr["hidden"] is False

    def test_unknown_keys_are_dropped(self):
        doc = normalize_document({"elements": [{"type": "spacer", "ui_state": "open"}], "x": 1})
        assert "ui_state" not in doc["elements"][0] and "x" not in doc

    def test_list_items_accept_plain_strings(self):
        doc = normalize_document(
            {
                "elements": [
                    {"type": "list", "source": {"items": ["Milk", {"text": "Eggs", "done": 1}]}}
                ]
            }
        )
        assert doc["elements"][0]["source"]["items"][0] == {
            "text": "Milk",
            "done": False,
            "note": "",
        }
        assert doc["elements"][0]["source"]["items"][1]["done"] is True

    @pytest.mark.parametrize(
        "raw",
        [
            "not a dict",
            {"paper": {"width": 10}},
            {"elements": [{"type": "nonsense"}]},
            {"elements": [{"type": "text", "runs": [{"text": "a", "font": "comic-sans"}]}]},
            {"elements": [{"type": "text", "runs": [{"text": "a", "size": 9999}]}]},
            {"options": {"rotate": 45}},
            {"elements": ["text"]},
        ],
    )
    def test_invalid_documents_are_rejected(self, raw):
        with pytest.raises(DocumentError):
            normalize_document(raw)

    def test_error_message_names_the_place(self):
        with pytest.raises(DocumentError, match=r"elements.0"):
            normalize_document({"elements": [{"type": "nonsense"}]})

    def test_too_many_elements(self):
        with pytest.raises(DocumentError):
            normalize_document({"elements": [{"type": "spacer"}] * 201})


class TestInline:
    def test_plain_text_is_one_run(self):
        runs = parse_inline("hello", BASE)
        assert [(r["text"], _flags(r)) for r in runs] == [("hello", set())]

    def test_markers_toggle_styles(self):
        runs = parse_inline("a **b** *c* ~~d~~ ++e++ ==f==", BASE)
        by_text = {r["text"].strip(): _flags(r) for r in runs if r["text"].strip()}
        assert by_text == {
            "a": set(),
            "b": {"bold"},
            "c": {"italic"},
            "d": {"strike"},
            "e": {"underline"},
            "f": {"invert"},
        }

    def test_nesting_combines_styles(self):
        runs = parse_inline("**bold *both***", BASE)
        assert [(r["text"], _flags(r)) for r in runs] == [
            ("bold ", {"bold"}),
            ("both", {"bold", "italic"}),
        ]

    def test_snake_case_is_not_emphasis(self):
        assert len(parse_inline("my_variable_name", BASE)) == 1

    def test_escape_keeps_the_marker(self):
        assert parse_inline(r"2 \* 3", BASE)[0]["text"] == "2 * 3"

    def test_code_uses_the_mono_font(self):
        runs = parse_inline("run `ls -l` now", BASE)
        assert [(r["text"], r["font"]) for r in runs] == [
            ("run ", "sans"),
            ("ls -l", "mono"),
            (" now", "sans"),
        ]

    def test_html_tags(self):
        runs = parse_inline("<b>x</b><i>y</i><u>z</u><s>w</s><mark>v</mark>", BASE)
        assert [_flags(r) for r in runs] == [
            {"bold"},
            {"italic"},
            {"underline"},
            {"strike"},
            {"invert"},
        ]

    def test_size_and_font_tags_restore_after_closing(self):
        runs = parse_inline("<size=40>big</size> normal <font=script>fancy</font>", BASE)
        assert [(r["text"], r["size"], r["font"]) for r in runs] == [
            ("big", 40, "sans"),
            (" normal ", 24, "sans"),
            ("fancy", 24, "script"),
        ]

    def test_big_and_small(self):
        runs = parse_inline("<big>a</big><small>b</small>", BASE)
        assert [r["size"] for r in runs] == [34, 17]

    def test_unknown_font_tag_is_ignored(self):
        assert parse_inline("<font=comic>x</font>", BASE)[0]["font"] == "sans"

    def test_empty_text_still_yields_a_run(self):
        assert parse_inline("", BASE)[0]["text"] == ""


class TestMarkdown:
    def test_headings_scale_and_bold(self):
        elements = compile_markdown("# One\n## Two\n### Three\nplain", BASE)
        sizes = [e["runs"][0]["size"] for e in elements]
        assert sizes == [46, 35, 29, 24]
        assert [e["runs"][0]["bold"] for e in elements] == [True, True, True, False]

    def test_lists(self):
        elements = compile_markdown("- [ ] open\n- [x] done\n- bullet\n3. third", BASE)
        assert [e["bullet"] for e in elements] == ["☐", "☑", "•", "3."]

    def test_dividers(self):
        elements = compile_markdown("---\n===\n***\n...\n~~~", BASE)
        assert [e["style"] for e in elements] == ["solid", "double", "stars", "dotted", "wave"]

    def test_alignment_blocks_and_single_line_tags(self):
        elements = compile_markdown("<center>\nmiddle\n</center>\nleft\n<right>end</right>", BASE)
        assert [e["align"] for e in elements] == ["center", "left", "right"]

    def test_directives(self):
        elements = compile_markdown("[[qr:https://a.b]]\n[[barcode:ean13:123]]\n[[space:30]]", BASE)
        assert elements[0] == {"type": "qr", "data": "https://a.b", "align": "left"}
        assert elements[1]["kind"] == "ean13" and elements[1]["data"] == "123"
        assert elements[2] == {"type": "spacer", "height": 30}

    def test_blank_line_is_a_small_spacer(self):
        elements = compile_markdown("a\n\nb", BASE)
        assert [e["type"] for e in elements] == ["text", "spacer", "text"]

    def test_quote_gets_a_bar_and_italic(self):
        element = compile_markdown("> wise words", BASE)[0]
        assert element["bullet"] == "▎" and element["runs"][0]["italic"] is True
