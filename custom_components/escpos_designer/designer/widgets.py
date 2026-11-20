"""Non-text building blocks: dividers, QR codes, barcodes, pictures and frames.

Every function returns a grayscale (``"L"``) image with a white background
and only pure black ink, so the final conversion to 1 bit loses nothing.
"""

from __future__ import annotations

import base64
import binascii
import math
from functools import cache
from io import BytesIO
from typing import Any

from PIL import Image, ImageDraw, ImageOps

from .codes import BarcodeError, encode_barcode, normalize_ean13
from .text_layout import render_text_block

MAX_IMAGE_PIXELS = 4_000_000
QUIET_ZONE_MODULES = 10


class WidgetError(ValueError):
    """An element could not be drawn; the message is meant for the user."""


# --- dividers ---------------------------------------------------------------


def draw_divider(width: int, style: str, thickness: int, width_pct: int) -> Image.Image:
    """Draw a decorative line ``width_pct`` percent of ``width`` wide, centered."""
    line_width = max(1, width * width_pct // 100)
    height = max(thickness * 3, 12) if style != "double" else thickness * 3 + 2
    if style in ("stars", "hearts"):
        height = max(height, 28)
    line = Image.new("L", (line_width, height), 255)
    draw = ImageDraw.Draw(line)
    middle = height // 2
    if style == "solid":
        draw.rectangle(
            (0, middle - thickness // 2, line_width, middle - thickness // 2 + thickness - 1),
            fill=0,
        )
    elif style in ("dashed", "dotted"):
        dash = thickness * (4 if style == "dashed" else 1)
        gap = thickness * (3 if style == "dashed" else 2)
        for x in range(0, line_width, dash + gap):
            draw.rectangle(
                (x, middle - thickness // 2, x + dash - 1, middle - thickness // 2 + thickness - 1),
                fill=0,
            )
    elif style == "double":
        top = middle - thickness - 1
        draw.rectangle((0, top, line_width, top + thickness - 1), fill=0)
        draw.rectangle((0, top + thickness + 2, line_width, top + 2 * thickness + 1), fill=0)
    elif style in ("wave", "zigzag"):
        _draw_wave(draw, line_width, middle, thickness, sharp=style == "zigzag")
    else:  # stars, hearts
        _draw_symbol_row(line, "✦" if style == "stars" else "♥")
    canvas = Image.new("L", (width, height), 255)
    canvas.paste(line, ((width - line_width) // 2, 0))
    return canvas


def _draw_wave(
    draw: ImageDraw.ImageDraw, width: int, middle: int, thickness: int, *, sharp: bool
) -> None:
    amplitude = max(3, thickness * 2)
    period = amplitude * 4
    points = []
    for x in range(0, width + 1):
        phase = (x % period) / period
        offset = (abs(phase * 4 - 2) - 1) if sharp else math.sin(phase * 2 * math.pi)
        points.append((x, middle - offset * amplitude))
    draw.line(points, fill=0, width=thickness)


def _draw_symbol_row(line: Image.Image, symbol: str) -> None:
    from .fonts import load_font  # noqa: PLC0415

    font = load_font("sans", max(14, line.height - 6))
    glyph_width = max(1, math.ceil(font.getlength(symbol + " ")))
    draw = ImageDraw.Draw(line)
    draw.fontmode = "1"
    count = max(1, line.width // glyph_width)
    start = (line.width - count * glyph_width) // 2
    for index in range(count):
        draw.text(
            (start + index * glyph_width, line.height // 2), symbol, font=font, fill=0, anchor="lm"
        )


# --- QR codes ---------------------------------------------------------------


def draw_qr(data: str, width: int, size_pct: int, level: str) -> Image.Image:
    """Draw a QR code that fills about ``size_pct`` percent of ``width``."""
    if not data:
        raise WidgetError("The QR code has no data.")
    try:
        import qrcode  # noqa: PLC0415
        from qrcode import constants  # noqa: PLC0415
    except ImportError as err:  # pragma: no cover - installed through the manifest
        raise WidgetError("The 'qrcode' library is not installed.") from err

    qr = qrcode.QRCode(
        error_correction=getattr(constants, f"ERROR_CORRECT_{level}"), border=0, box_size=1
    )
    try:
        qr.add_data(data)
        qr.make(fit=True)
    except (qrcode.exceptions.DataOverflowError, ValueError) as err:  # too much data for version 40
        raise WidgetError("The QR code data is too long.") from err
    matrix = qr.get_matrix()
    modules = len(matrix)
    quiet = 2
    scale = max(1, (width * size_pct // 100) // (modules + 2 * quiet))
    side = (modules + 2 * quiet) * scale
    if side > width:
        raise WidgetError("The QR code is too big for the paper width; shorten the data.")
    image = Image.new("L", (side, side), 255)
    draw = ImageDraw.Draw(image)
    for row, cells in enumerate(matrix):
        for column, cell in enumerate(cells):
            if cell:
                x, y = (column + quiet) * scale, (row + quiet) * scale
                draw.rectangle((x, y, x + scale - 1, y + scale - 1), fill=0)
    return image


# --- barcodes ---------------------------------------------------------------


def draw_barcode(
    kind: str, data: str, width: int, height: int, module_width: int, *, show_text: bool
) -> Image.Image:
    """Draw a barcode with quiet zones, shrinking the module width to fit ``width``."""
    try:
        modules = encode_barcode(kind, data)
    except BarcodeError as err:
        raise WidgetError(str(err)) from err
    total_modules = len(modules) + 2 * QUIET_ZONE_MODULES
    scale = min(module_width, width // total_modules)
    if scale < 1:
        raise WidgetError("The barcode is too long for the paper width.")

    bars = Image.new("L", (total_modules * scale, height), 255)
    draw = ImageDraw.Draw(bars)
    for position, module in enumerate(modules, start=QUIET_ZONE_MODULES):
        if module:
            draw.rectangle((position * scale, 0, (position + 1) * scale - 1, height), fill=0)
    if not show_text:
        return bars

    label = normalize_ean13(data) if kind == "ean13" else data
    caption = render_text_block([_caption_run(label)], bars.width, align="center", line_spacing=1.0)
    combined = Image.new("L", (bars.width, bars.height + caption.height + 2), 255)
    combined.paste(bars, (0, 0))
    combined.paste(caption, (0, bars.height + 2))
    return combined


def _caption_run(text: str) -> dict[str, Any]:
    return {
        "text": text,
        "font": "mono",
        "size": 18,
        "bold": False,
        "italic": False,
        "underline": False,
        "strike": False,
        "invert": False,
    }


# --- pictures ---------------------------------------------------------------


def load_picture(
    data_uri: str, width: int, width_pct: int, dither: str, threshold: int
) -> Image.Image:
    """Decode a ``data:image/...`` URI, scale it to ``width_pct`` of ``width`` and make it 1-bit."""
    if not data_uri.startswith("data:image/") or "," not in data_uri:
        raise WidgetError("The picture is missing or not an embedded image.")
    try:
        raw = base64.b64decode(data_uri.split(",", 1)[1], validate=False)
        with Image.open(BytesIO(raw)) as source:
            if source.width * source.height > MAX_IMAGE_PIXELS:
                raise WidgetError("The picture is too large.")
            picture = _flatten(source)
    except (binascii.Error, OSError, Image.DecompressionBombError) as err:
        raise WidgetError("The picture could not be read.") from err

    target = max(1, width * width_pct // 100)
    ratio = target / picture.width
    picture = picture.resize(
        (target, max(1, round(picture.height * ratio))), Image.Resampling.LANCZOS
    )
    picture = ImageOps.autocontrast(picture)
    if dither == "threshold":
        return picture.point(lambda value: 255 if value >= threshold else 0).convert("L")
    return picture.convert("1", dither=Image.Dither.FLOYDSTEINBERG).convert("L")


def _flatten(image: Image.Image) -> Image.Image:
    """Grayscale copy of ``image`` with transparency painted white."""
    rgba = image.convert("RGBA")
    background = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
    background.alpha_composite(rgba)
    return background.convert("L")


# --- frames -----------------------------------------------------------------


MOTIF_FRAMES = ("hearts", "stars")


def frame_extent(style: str, thickness: int) -> int:
    """How far the frame reaches into the page: its line width, or the size of its motifs."""
    return motif_size(thickness) if style in MOTIF_FRAMES else thickness


def motif_size(thickness: int) -> int:
    return thickness * 2 + 8


def draw_frame(canvas: Image.Image, style: str, thickness: int) -> None:
    """Draw a decorative border along the edge of ``canvas`` (in place)."""
    if style == "none":
        return
    draw = ImageDraw.Draw(canvas)
    width, height = canvas.size
    inset = thickness // 2
    box = (inset, inset, width - 1 - inset, height - 1 - inset)
    radius = min(28, width // 6, height // 3)
    if style == "line":
        draw.rectangle(box, outline=0, width=thickness)
    elif style == "double":
        draw.rectangle(box, outline=0, width=thickness)
        gap = thickness * 2 + 2
        draw.rectangle(
            (box[0] + gap, box[1] + gap, box[2] - gap, box[3] - gap),
            outline=0,
            width=max(1, thickness // 2),
        )
    elif style == "rounded":
        draw.rounded_rectangle(box, radius=radius, outline=0, width=thickness)
    elif style in ("dashed", "dotted"):
        _draw_dashed_box(draw, box, thickness, dotted=style == "dotted")
    elif style == "brackets":
        _draw_brackets(draw, box, thickness)
    elif style == "ticket":
        draw.rounded_rectangle(box, radius=radius, outline=0, width=thickness)
        _punch_notches(draw, canvas.size, radius // 2 + 2)
    elif style in MOTIF_FRAMES:
        _draw_motif_border(canvas, style, motif_size(thickness))


@cache
def _motif_mask(motif: str, size: int) -> Image.Image:
    """An anti-aliased-then-hard heart or star as a paste mask (255 = ink)."""
    scale = 6
    big = size * scale
    points: list[tuple[float, float]] = []
    if motif == "hearts":
        for step in range(72):
            t = step * math.tau / 72
            x = 16 * math.sin(t) ** 3
            y = -(13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t))
            points.append((big / 2 + x * big / 34, big / 2.1 + y * big / 34))
    else:
        for step in range(10):
            radius = big / 2 if step % 2 == 0 else big / 4.4
            angle = -math.pi / 2 + step * math.pi / 5
            points.append((big / 2 + radius * math.cos(angle), big / 2 + radius * math.sin(angle)))
    mask = Image.new("L", (big, big), 0)
    ImageDraw.Draw(mask).polygon(points, fill=255)
    return mask.resize((size, size), Image.Resampling.LANCZOS).point(
        lambda v: 255 if v > 127 else 0
    )


def _draw_motif_border(canvas: Image.Image, motif: str, size: int) -> None:
    """Line the canvas edge with a closed chain of hearts or stars."""
    width, height = canvas.size
    mask = _motif_mask(motif, size)
    step = size + max(2, size // 6)

    def positions(length: int) -> list[int]:
        count = max(2, (length - size) // step + 1)
        return [round(index * (length - size) / (count - 1)) for index in range(count)]

    for x in positions(width):
        for y in (0, height - size):
            canvas.paste(0, (x, y), mask)
    for y in positions(height):
        for x in (0, width - size):
            canvas.paste(0, (x, y), mask)


def _draw_dashed_box(
    draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], thickness: int, *, dotted: bool
) -> None:
    dash = thickness if dotted else thickness * 4
    gap = thickness * 2 if dotted else thickness * 3
    left, top, right, bottom = box
    for x in range(left, right + 1, dash + gap):
        for y in (top, bottom - thickness + 1):
            draw.rectangle((x, y, min(x + dash - 1, right), y + thickness - 1), fill=0)
    for y in range(top, bottom + 1, dash + gap):
        for x in (left, right - thickness + 1):
            draw.rectangle((x, y, x + thickness - 1, min(y + dash - 1, bottom)), fill=0)


def _draw_brackets(
    draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], thickness: int
) -> None:
    left, top, right, bottom = box
    arm = max(18, (right - left) // 8)
    for x, y, dx, dy in (
        (left, top, 1, 1),
        (right, top, -1, 1),
        (left, bottom, 1, -1),
        (right, bottom, -1, -1),
    ):
        draw.line((x, y, x + dx * arm, y), fill=0, width=thickness)
        draw.line((x, y, x, y + dy * arm), fill=0, width=thickness)


def _punch_notches(draw: ImageDraw.ImageDraw, size: tuple[int, int], radius: int) -> None:
    """Cut half-circle notches in the middle of both sides, like a ticket stub."""
    width, height = size
    for x in (0, width - 1):
        draw.ellipse(
            (x - radius, height // 2 - radius, x + radius, height // 2 + radius),
            fill=255,
            outline=0,
            width=2,
        )
