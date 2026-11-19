"""Rich text: word wrapping and drawing of runs that each have their own style.

``render_text_block`` is the only entry point the renderer needs. Everything
else breaks the runs into fragments (a stretch of text in one style, or one
emoji cluster), wraps them into lines and draws the lines with Pillow.

The glyphs are drawn without anti-aliasing: a thermal printer has no gray,
and hinted 1-bit text stays crisp where a thresholded gray rendering frays.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, replace
from typing import TYPE_CHECKING, Any

from PIL import Image, ImageChops, ImageDraw

from .emoji import render_form, split_runs
from .fonts import DEFAULT_FONT, glyph_is_drawn, has_glyph, load_emoji_font, load_font

if TYPE_CHECKING:
    from PIL.ImageFont import FreeTypeFont

ITALIC_SLANT = 0.22


@dataclass(frozen=True, slots=True)
class Style:
    """The look of one run."""

    font: str
    size: int
    bold: bool = False
    italic: bool = False
    underline: bool = False
    strike: bool = False
    invert: bool = False

    @classmethod
    def from_run(cls, run: dict[str, Any]) -> Style:
        return cls(
            font=run["font"],
            size=run["size"],
            bold=run["bold"],
            italic=run["italic"],
            underline=run["underline"],
            strike=run["strike"],
            invert=run["invert"],
        )

    @property
    def stroke(self) -> int:
        """Extra pixels around each glyph that make it look bold."""
        return max(1, round(self.size / 22)) if self.bold else 0


@dataclass(frozen=True, slots=True)
class Fragment:
    """Text in one style that is measured and drawn as a unit."""

    text: str
    style: Style
    emoji: bool = False

    @property
    def font(self) -> FreeTypeFont:
        if self.emoji:
            return load_emoji_font(self.style.size)
        return load_font(self.style.font, self.style.size)

    @property
    def width(self) -> int:
        return math.ceil(self.font.getlength(self.text)) + self.style.stroke


@dataclass(slots=True)
class Line:
    """One wrapped line: its fragments and the space it occupies."""

    fragments: list[Fragment]
    width: int
    ascent: int
    descent: int

    @property
    def height(self) -> int:
        return self.ascent + self.descent


@dataclass(slots=True)
class _Word:
    fragments: list[Fragment]

    @property
    def width(self) -> int:
        return sum(fragment.width for fragment in self.fragments)


def _metrics(fragments: list[Fragment], fallback: Style) -> tuple[int, int]:
    if not fragments:
        ascent, descent = load_font(fallback.font, fallback.size).getmetrics()
        return ascent, descent
    ascents, descents = zip(*(fragment.font.getmetrics() for fragment in fragments), strict=True)
    return max(ascents), max(descents)


def _tokenize(runs: list[dict[str, Any]]) -> list[_Word | Fragment | None]:
    """Split runs into words, spaces (a ``Fragment``) and hard breaks (``None``)."""
    tokens: list[_Word | Fragment | None] = []
    word: list[Fragment] = []

    def end_word() -> None:
        if word:
            tokens.append(_Word(list(word)))
            word.clear()

    for run in runs:
        style = Style.from_run(run)
        for piece in split_runs(run["text"]):
            if piece.emoji:
                word.extend(
                    Fragment(glyph, style, emoji=True) for glyph in _emoji_glyphs(piece.text)
                )
                continue
            buffer: list[str] = []
            for char in piece.text:
                if char in " \t\n":
                    word.extend(_glyph_fragments("".join(buffer), style))
                    buffer.clear()
                    end_word()
                    tokens.append(None if char == "\n" else Fragment(" ", style))
                else:
                    buffer.append(char)
            word.extend(_glyph_fragments("".join(buffer), style))
    end_word()
    return tokens


def _glyph_fragments(text: str, style: Style) -> list[Fragment]:
    """Fragments for ``text``; characters the font lacks are drawn with a fallback font."""
    fragments: list[Fragment] = []
    for char in text:
        fallback = _fallback_for(char, style)
        if (
            fragments
            and fragments[-1].style == fallback.style
            and fragments[-1].emoji == fallback.emoji
        ):
            fragments[-1] = replace(fragments[-1], text=fragments[-1].text + char)
        else:
            fragments.append(replace(fallback, text=char))
    return fragments


def _fallback_for(char: str, style: Style) -> Fragment:
    """An (empty) fragment in the first font that can draw ``char``."""
    if has_glyph(style.font, char):
        return Fragment("", style)
    if style.font != DEFAULT_FONT and has_glyph(DEFAULT_FONT, char):
        return Fragment("", replace(style, font=DEFAULT_FONT))
    return Fragment("", style, emoji=True) if _emoji_font_has(char) else Fragment("", style)


def _emoji_font_has(char: str) -> bool:
    return glyph_is_drawn(load_emoji_font(32), char)


def _emoji_glyphs(cluster_run: str) -> list[str]:
    """Split a run of emoji clusters into the glyph groups the font can draw."""
    glyphs = render_form(cluster_run)
    return [glyphs] if glyphs else []


def layout_lines(runs: list[dict[str, Any]], max_width: int) -> list[Line]:
    """Wrap ``runs`` into lines no wider than ``max_width`` (words never split unless too long)."""
    fallback = Style.from_run(runs[0]) if runs else Style("sans", 24)
    lines: list[Line] = []
    current: list[Fragment] = []
    width = 0
    pending: Fragment | None = None

    def finish() -> None:
        nonlocal current, width, pending
        ascent, descent = _metrics(current, fallback)
        lines.append(Line(current, width, ascent, descent))
        current, width, pending = [], 0, None

    for token in _tokenize(runs):
        if token is None:
            finish()
        elif isinstance(token, Fragment):  # a space
            if current:
                pending = token
        else:
            word = token
            for piece in _fit_word(word, max_width):
                gap = pending.width if pending and current else 0
                if current and width + gap + piece.width > max_width:
                    finish()
                    gap = 0
                if gap and pending:
                    current.append(pending)
                    width += gap
                current.extend(piece.fragments)
                width += piece.width
                pending = None
    if current or not lines:
        finish()
    return lines


def _fit_word(word: _Word, max_width: int) -> list[_Word]:
    """Return ``word`` as is, or cut into pieces if it is wider than a line."""
    if word.width <= max_width:
        return [word]
    pieces: list[_Word] = []
    current: list[Fragment] = []
    used = 0
    for fragment in word.fragments:
        for char in _characters(fragment):
            if current and used + char.width > max_width:
                pieces.append(_Word(current))
                current, used = [], 0
            current.append(char)
            used += char.width
    if current:
        pieces.append(_Word(current))
    return pieces


def _characters(fragment: Fragment) -> list[Fragment]:
    if fragment.emoji:
        return [fragment]
    return [Fragment(char, fragment.style) for char in fragment.text]


def text_height(lines: list[Line], line_spacing: float) -> int:
    """Total height of ``lines`` including the extra line spacing."""
    return sum(_line_height(line, line_spacing) for line in lines)


def _line_height(line: Line, line_spacing: float) -> int:
    return max(1, round(line.height * line_spacing))


def render_text_block(
    runs: list[dict[str, Any]],
    width: int,
    *,
    align: str = "left",
    line_spacing: float = 1.15,
    bullet: str = "",
) -> Image.Image:
    """Draw ``runs`` as a ``width`` pixels wide grayscale block (white background)."""
    runs = [run for run in runs if run["text"]] or runs
    bullet_width = 0
    bullet_fragment: Fragment | None = None
    if bullet and runs:
        plain = {**runs[0], "italic": False, "underline": False, "strike": False, "invert": False}
        bullet_fragment = Fragment(f"{bullet} ", Style.from_run(plain))
        bullet_width = min(bullet_fragment.width, width // 2)

    lines = layout_lines(runs, max(1, width - bullet_width))
    height = max(1, text_height(lines, line_spacing))
    block = Image.new("L", (width, height), 255)
    y = 0
    for index, line in enumerate(lines):
        line_height = _line_height(line, line_spacing)
        baseline = y + (line_height - line.height) // 2 + line.ascent
        if index == 0 and bullet_fragment:
            _draw_fragment(block, bullet_fragment, 0, baseline, y, line_height)
        x = bullet_width + _line_offset(line.width, width - bullet_width, align)
        for fragment in line.fragments:
            _draw_fragment(block, fragment, x, baseline, y, line_height)
            x += fragment.width
        y += line_height
    return block


def _line_offset(line_width: int, available: int, align: str) -> int:
    if align == "center":
        return max(0, (available - line_width) // 2)
    if align == "right":
        return max(0, available - line_width)
    return 0


def _draw_fragment(
    block: Image.Image, fragment: Fragment, x: int, baseline: int, top: int, line_height: int
) -> None:
    """Draw one fragment onto ``block`` with its baseline at ``baseline``."""
    style = fragment.style
    width = fragment.width
    pad = math.ceil(style.size * ITALIC_SLANT) if style.italic else 0
    layer = Image.new("L", (width + pad, line_height + 2), 255)
    draw = ImageDraw.Draw(layer)
    draw.fontmode = "1"
    local_baseline = baseline - top
    if style.invert:
        draw.rectangle((0, 0, width + pad, line_height + 1), fill=0)
    draw.text(
        (0, local_baseline),
        fragment.text,
        font=fragment.font,
        fill=255 if style.invert else 0,
        anchor="ls",
        stroke_width=style.stroke,
        stroke_fill=255 if style.invert else 0,
    )
    if style.italic:
        layer = layer.transform(
            layer.size,
            Image.Transform.AFFINE,
            (1, ITALIC_SLANT, -ITALIC_SLANT * local_baseline, 0, 1, 0),
            resample=Image.Resampling.NEAREST,
            fillcolor=255,
        )
    _decorate(ImageDraw.Draw(layer), style, width, local_baseline)
    region = (x, top, x + layer.width, top + layer.height)
    clipped = block.crop(region)
    block.paste(ImageChops.darker(clipped, layer), region[:2])


def _decorate(draw: ImageDraw.ImageDraw, style: Style, width: int, baseline: int) -> None:
    """Draw underline and strike-through for a fragment."""
    thickness = max(1, round(style.size / 14))
    color = 255 if style.invert else 0
    if style.underline:
        y = baseline + max(2, round(style.size * 0.12))
        draw.rectangle((0, y, width - 1, y + thickness - 1), fill=color)
    if style.strike:
        y = baseline - round(style.size * 0.3)
        draw.rectangle((0, y, width - 1, y + thickness - 1), fill=color)
