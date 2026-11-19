"""Layout, widgets, barcodes, resolving and the full render pipeline."""

from datetime import datetime

import pytest

pytest.importorskip("pytest_homeassistant_custom_component")

from PIL import Image

from custom_components.escpos_designer.designer import (
    normalize_document,
    render_design,
)
from custom_components.escpos_designer.designer.calendar_names import (
    format_datetime,
)
from custom_components.escpos_designer.designer.codes import (
    BarcodeError,
    ean13_check_digit,
    encode_barcode,
    encode_code39,
    encode_code128,
    encode_ean13,
    normalize_ean13,
)
from custom_components.escpos_designer.designer.text_layout import (
    layout_lines,
    render_text_block,
)

NOW = datetime(2026, 11, 17, 9, 30)  # a Tuesday


def run(text, **style):
    return {
        "text": text,
        "font": "sans",
        "size": 24,
        "bold": False,
        "italic": False,
        "underline": False,
        "strike": False,
        "invert": False,
        **style,
    }


def design(*elements, **sections):
    return normalize_document({"elements": list(elements), **sections})


def render(*elements, **kwargs):
    sections = kwargs.pop("sections", {})
    return render_design(design(*elements, **sections), now=NOW, **kwargs)


def ink(image):
    """Number of black pixels."""
    return sum(image.convert("L").histogram()[:128])


def bounding_box(image):
    return Image.eval(image.convert("L"), lambda value: 255 - value).getbbox()


class TestCodes:
    def test_code128_known_vector(self):
        # Reference output of the python-barcode library for "Hello".
        expected = "110100100001100010100010110010000110010100001100101000010001111010110010100001100011101011"
        assert "".join(map(str, encode_code128("Hello"))) == expected

    def test_code128_uses_subset_c_for_digit_runs(self):
        # start C + 3 pairs + checksum = 5 symbols; plus the 13-module stop.
        assert len(encode_code128("123456")) == 5 * 11 + 13

    def test_code128_rejects_non_ascii(self):
        with pytest.raises(BarcodeError):
            encode_code128("Grüße")

    def test_code39(self):
        modules = encode_code39("ab-1")
        assert modules[:15] == [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1]  # start character "*"
        assert len(modules) == 6 * 15 + 5  # six characters of 15 modules plus five gaps
        with pytest.raises(BarcodeError):
            encode_code39("a*b")
        with pytest.raises(BarcodeError):
            encode_code39("ä")

    def test_ean13_check_digit_and_length(self):
        assert ean13_check_digit("590123412345") == 7
        assert normalize_ean13("590123412345") == "5901234123457"
        assert len(encode_ean13("5901234123457")) == 95

    def test_ean13_rejects_bad_check_digit_and_length(self):
        with pytest.raises(BarcodeError, match="should be 7"):
            encode_ean13("5901234123458")
        with pytest.raises(BarcodeError):
            encode_ean13("123")

    def test_empty_and_unknown(self):
        with pytest.raises(BarcodeError):
            encode_code128("")
        with pytest.raises(BarcodeError):
            encode_barcode("qr", "x")


class TestCalendarNames:
    def test_german(self):
        assert format_datetime(NOW, "%A, %d. %B %Y", "de") == "Dienstag, 17. November 2026"
        assert format_datetime(NOW, "%a %b", "de-DE") == "Die Nov"

    def test_english_is_the_fallback(self):
        assert format_datetime(NOW, "%A %B", "xx") == "Tuesday November"

    def test_other_directives_pass_through(self):
        assert format_datetime(NOW, "%H:%M | %d.%m.%y", "en") == "09:30 | 17.11.26"

    def test_literal_percent_survives(self):
        assert format_datetime(NOW, "100%% %A", "en") == "100% Tuesday"


class TestTextLayout:
    def test_long_text_wraps_inside_the_width(self):
        lines = layout_lines([run("one two three four five six seven eight nine ten")], 150)
        assert len(lines) > 2
        assert all(line.width <= 150 for line in lines)

    def test_newline_makes_an_empty_line(self):
        assert len(layout_lines([run("a\n\nb")], 200)) == 3

    def test_overlong_word_is_split(self):
        lines = layout_lines([run("x" * 80)], 120)
        assert len(lines) > 1 and all(line.width <= 120 for line in lines)

    def test_styles_can_change_inside_a_word(self):
        lines = layout_lines([run("un"), run("believable", bold=True)], 380)
        assert len(lines) == 1
        assert [f.style.bold for f in lines[0].fragments] == [False, True]

    def test_emoji_is_its_own_fragment_without_breaking_the_word(self):
        lines = layout_lines([run("hi😀there")], 380)
        assert len(lines) == 1
        assert [f.emoji for f in lines[0].fragments] == [False, True, False]

    def test_missing_glyphs_come_from_a_fallback_font(self):
        lines = layout_lines([run("a♥b", font="handwriting")], 380)
        assert [(f.text, f.style.font) for f in lines[0].fragments] == [
            ("a", "handwriting"),
            ("♥", "sans"),
            ("b", "handwriting"),
        ]

    def test_glyph_check_knows_what_fonts_cover(self):
        from custom_components.escpos_designer.designer.fonts import has_glyph  # noqa: PLC0415

        assert has_glyph("handwriting", "ä") and has_glyph("sans", "♥")
        assert not has_glyph("handwriting", "♥") and not has_glyph("display", "☐")

    def test_leading_and_trailing_spaces_are_dropped(self):
        lines = layout_lines([run("  hello  ")], 200)
        assert [f.text for f in lines[0].fragments] == ["hello"]

    def test_text_block_has_ink_and_the_requested_width(self):
        block = render_text_block([run("Hello")], 200)
        assert block.size[0] == 200 and ink(block) > 50

    def test_alignment_moves_the_ink(self):
        boxes = {
            align: bounding_box(render_text_block([run("Hi")], 300, align=align))
            for align in ("left", "center", "right")
        }
        assert boxes["left"][0] < boxes["center"][0] < boxes["right"][0]
        assert boxes["right"][2] > 280

    def test_each_style_changes_the_picture(self):
        plain = ink(render_text_block([run("Style")], 200))
        for style in ("bold", "underline", "strike", "invert"):
            assert ink(render_text_block([run("Style", **{style: True})], 200)) != plain, style
        italic = render_text_block([run("Style", italic=True)], 200)
        assert italic.tobytes() != render_text_block([run("Style")], 200).tobytes()

    def test_invert_paints_a_black_box(self):
        block = render_text_block([run("Hi", invert=True)], 100)
        assert block.getpixel((1, block.height // 2)) == 0

    def test_bigger_size_is_taller(self):
        small = render_text_block([run("A", size=20)], 200)
        large = render_text_block([run("A", size=60)], 200)
        assert large.height > small.height * 2

    def test_bullet_indents_wrapped_lines(self):
        text = "a fairly long task description that has to wrap onto several lines"
        plain = render_text_block([run(text)], 200)
        bulleted = render_text_block([run(text)], 200, bullet="☐")
        assert bulleted.height > plain.height  # narrower text area wraps more
        assert bounding_box(bulleted)[0] <= 3  # the bullet sits at the left edge

    def test_every_bundled_font_renders(self):
        from custom_components.escpos_designer.designer.fonts import FONT_IDS  # noqa: PLC0415

        for font in FONT_IDS:
            assert ink(render_text_block([run("Gruß Äö 123", font=font)], 300)) > 0, font

    def test_emoji_draw_ink(self):
        assert ink(render_text_block([run("😀")], 100)) > 20


class TestWidgets:
    def test_divider_styles_all_draw(self):
        for style in ("solid", "dashed", "dotted", "double", "wave", "zigzag", "stars", "hearts"):
            result = render({"type": "divider", "style": style})
            assert ink(result.image) > 0, style

    def test_qr_code_is_square_and_scannable_size(self):
        result = render({"type": "qr", "data": "https://example.com", "align": "left"})
        box = bounding_box(result.image)
        assert abs((box[2] - box[0]) - (box[3] - box[1])) <= 1

    def test_qr_without_data_warns_and_shows_the_problem(self):
        result = render({"type": "qr", "data": ""})
        assert result.warnings and "no data" in result.warnings[0]["message"]
        assert ink(result.image) > 0

    def test_qr_too_long_for_the_paper(self):
        result = render({"type": "qr", "data": "x" * 2500, "size_pct": 100})
        assert result.warnings

    def test_qr_caption_adds_height(self):
        plain = render({"type": "qr", "data": "abc"})
        captioned = render({"type": "qr", "data": "abc", "caption": "Scan me"})
        assert captioned.image.height > plain.image.height

    def test_barcode_draws_and_reports_bad_data(self):
        ok = render({"type": "barcode", "kind": "code128", "data": "ABC-123"})
        assert not ok.warnings and ink(ok.image) > 200
        bad = render({"type": "barcode", "kind": "ean13", "data": "12"})
        assert bad.warnings

    def test_barcode_too_long_for_the_paper(self):
        assert render({"type": "barcode", "data": "A" * 80}).warnings

    def test_barcode_text_is_optional(self):
        with_text = render({"type": "barcode", "data": "123456"})
        without = render({"type": "barcode", "data": "123456", "show_text": False})
        assert with_text.image.height > without.image.height

    def test_picture(self):
        import base64  # noqa: PLC0415
        from io import BytesIO  # noqa: PLC0415

        source = Image.new("RGB", (40, 40), "white")
        for x in range(40):
            for y in range(20):
                source.putpixel((x, y), (30, 30, 30))
        buffer = BytesIO()
        source.save(buffer, format="PNG")
        uri = "data:image/png;base64," + base64.b64encode(buffer.getvalue()).decode()
        for dither in ("threshold", "floyd-steinberg"):
            result = render({"type": "image", "data": uri, "width_pct": 50, "dither": dither})
            assert not result.warnings and ink(result.image) > 1000

    @pytest.mark.parametrize("data", ["", "data:image/png;base64,@@@", "https://x/y.png"])
    def test_bad_picture_warns(self, data):
        assert render({"type": "image", "data": data}).warnings


class TestPipeline:
    def test_width_and_mode(self):
        result = render({"type": "text", "runs": [run("Hi")]})
        assert result.image.mode == "1" and result.image.width == 384

    def test_paper_width_is_respected(self):
        result = render({"type": "text", "runs": [run("Hi")]}, sections={"paper": {"width": 576}})
        assert result.image.width == 576

    def test_fixed_height_label(self):
        result = render(
            {"type": "text", "runs": [run("Hi")], "align": "center"},
            sections={"paper": {"width": 240, "height": 112}},
        )
        assert result.image.size == (240, 112)
        box = bounding_box(result.image)
        # Centered vertically.
        assert abs(box[1] - (112 - box[3])) <= 3

    def test_fixed_height_overflow_warns(self):
        result = render(
            {"type": "spacer", "height": 300}, sections={"paper": {"width": 240, "height": 100}}
        )
        assert result.warnings == [{"element": None, "message": "content_overflow"}]

    def test_margins_add_height(self):
        plain = render({"type": "spacer", "height": 10}).image.height
        spaced = render({"type": "spacer", "height": 10, "margin_top": 7, "margin_bottom": 5})
        assert spaced.image.height == plain + 12

    def test_hidden_elements_are_skipped(self):
        visible = render({"type": "spacer", "height": 50})
        hidden = render({"type": "spacer", "height": 50, "hidden": True})
        assert hidden.image.height < visible.image.height

    def test_every_frame_style_draws_at_the_edge(self):
        for style in ("line", "double", "rounded", "dashed", "dotted", "brackets", "ticket"):
            result = render({"type": "spacer", "height": 60}, sections={"frame": {"style": style}})
            assert ink(result.image) > 0, style
            assert bounding_box(result.image)[0] <= 3, style

    def test_frame_pushes_content_inwards(self):
        plain = render({"type": "text", "runs": [run("Hi")]})
        framed = render(
            {"type": "text", "runs": [run("Hi")]}, sections={"frame": {"style": "line"}}
        )
        assert framed.image.height > plain.image.height

    def test_options_invert_mirror_rotate(self):
        base = render({"type": "text", "runs": [run("Hi")]}).image
        inverted = render(
            {"type": "text", "runs": [run("Hi")]}, sections={"options": {"invert": True}}
        )
        assert inverted.image.getpixel((0, 0)) == 0 and base.getpixel((0, 0)) == 255
        rotated = render(
            {"type": "text", "runs": [run("Hi")]}, sections={"options": {"rotate": 90}}
        )
        assert rotated.image.size == (base.height, base.width)
        mirrored = render(
            {"type": "text", "runs": [run("Hi")]}, sections={"options": {"mirror": True}}
        )
        assert bounding_box(mirrored.image)[0] > bounding_box(base)[0]

    def test_output_is_pure_black_and_white(self):
        result = render({"type": "text", "runs": [run("Gradient test 123", size=40)]})
        histogram = result.image.convert("L").histogram()
        assert sum(histogram[1:255]) == 0


class TestResolving:
    def test_templates_are_rendered_in_every_text_field(self):
        seen = []

        def fake(text):
            seen.append(text)
            return text.replace("{{ x }}", "42")

        result = render(
            {"type": "text", "runs": [run("{{ x }}")]},
            {"type": "markdown", "source": "- {{ x }}"},
            {"type": "qr", "data": "{{ x }}", "caption": "{{ x }}"},
            {"type": "barcode", "data": "{{ x }}"},
            render_template=fake,
        )
        assert not result.warnings
        assert len(seen) == 5
        assert all("{{" in text for text in seen)

    def test_plain_text_never_reaches_the_template_engine(self):
        def boom(_):
            raise AssertionError("no template expected")

        render({"type": "text", "runs": [run("plain")]}, render_template=boom)

    def test_datetime_uses_the_language_and_offset(self):
        from custom_components.escpos_designer.designer.resolve import (  # noqa: PLC0415
            resolve_elements,
        )

        doc = design(
            {"type": "datetime", "format": "%A %d.%m.", "prefix": "Haltbar bis: ", "offset_days": 7}
        )
        elements = resolve_elements(
            doc, now=NOW, language="de", render_template=lambda t: t, todo_items={}
        )
        assert elements[0]["runs"][0]["text"] == "Haltbar bis: Dienstag 24.11."

    def test_static_list_marks_done_items(self):
        from custom_components.escpos_designer.designer.resolve import (  # noqa: PLC0415
            resolve_elements,
        )

        doc = design(
            {
                "type": "list",
                "source": {"items": ["Milk", {"text": "Eggs", "done": True, "note": "6 pcs"}]},
                "style": "checkbox",
            }
        )
        elements = resolve_elements(
            doc, now=NOW, language="en", render_template=lambda t: t, todo_items={}
        )
        assert [e["bullet"] for e in elements] == ["☐", "☑", " " * 3]
        assert elements[1]["runs"][0]["strike"] is True
        assert elements[2]["runs"][0]["text"] == "6 pcs"

    def test_todo_list_uses_the_fetched_items_and_hides_completed(self):
        items = {"todo.shop": [{"text": "A", "done": False}, {"text": "B", "done": True}]}
        element = {"type": "list", "source": {"kind": "todo", "entity_id": "todo.shop"}}
        open_only = render(element, todo_items=items)
        with_done = render(
            {**element, "source": {**element["source"], "include_completed": True}},
            todo_items=items,
        )
        assert with_done.image.height > open_only.image.height

    def test_numbered_and_empty_list(self):
        from custom_components.escpos_designer.designer.resolve import (  # noqa: PLC0415
            resolve_elements,
        )

        doc = design(
            {"type": "list", "source": {"items": ["x", "y"]}, "style": "numbered"},
            {"type": "list", "empty_text": "Nothing to do"},
            {"type": "list"},
        )
        elements = resolve_elements(
            doc, now=NOW, language="en", render_template=lambda t: t, todo_items={}
        )
        assert [e.get("bullet") for e in elements[:2]] == ["1.", "2."]
        assert elements[2]["runs"][0]["text"] == "Nothing to do"
        assert len(elements) == 3  # the third list is empty and silent

    def test_markdown_keeps_its_margins_and_alignment(self):
        from custom_components.escpos_designer.designer.resolve import (  # noqa: PLC0415
            resolve_elements,
        )

        doc = design(
            {
                "type": "markdown",
                "source": "a\nb",
                "align": "center",
                "margin_top": 9,
                "margin_bottom": 4,
            }
        )
        elements = resolve_elements(
            doc, now=NOW, language="en", render_template=lambda t: t, todo_items={}
        )
        assert [e["align"] for e in elements] == ["center", "center"]
        assert (elements[0]["margin_top"], elements[-1]["margin_bottom"]) == (9, 4)

    def test_sticker_is_a_big_emoji(self):
        result = render({"type": "sticker", "emoji": "🎉", "size": 120})
        assert result.image.height > 100 and ink(result.image) > 500
