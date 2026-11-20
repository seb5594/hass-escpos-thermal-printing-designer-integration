"""Compose the resolved elements into the final 1-bit image."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from PIL import Image, ImageChops, ImageOps

from .text_layout import render_text_block
from .widgets import (
    WidgetError,
    draw_barcode,
    draw_divider,
    draw_frame,
    draw_qr,
    frame_extent,
    load_picture,
)

MAX_CANVAS_HEIGHT = 8000
FRAME_EDGE_INSET = 2


@dataclass(slots=True)
class RenderResult:
    """The finished image plus anything the user should know about."""

    image: Image.Image  # mode "1": exactly what the printer will print
    warnings: list[dict[str, Any]] = field(default_factory=list)


@dataclass(frozen=True, slots=True)
class _Block:
    image: Image.Image
    margin_top: int
    margin_bottom: int

    @property
    def height(self) -> int:
        return self.margin_top + self.image.height + self.margin_bottom


def render_document(doc: dict[str, Any], elements: list[dict[str, Any]]) -> RenderResult:
    """Draw ``elements`` onto a canvas shaped by the document's paper, frame and options."""
    paper, frame, options = doc["paper"], doc["frame"], doc["options"]
    width: int = paper["width"]
    frame_pad = (
        frame_extent(frame["style"], frame["thickness"]) + frame["padding"]
        if frame["style"] != "none"
        else 0
    )
    inset = options["margin"] + frame_pad
    content_width = max(8, width - 2 * inset)

    warnings: list[dict[str, Any]] = []
    blocks = [
        _render_block(element, index, content_width, warnings)
        for index, element in enumerate(elements)
    ]
    content_height = sum(block.height for block in blocks)

    fixed_height: int | None = paper["height"]
    height = fixed_height or min(MAX_CANVAS_HEIGHT, max(1, content_height + 2 * inset))
    if content_height + 2 * inset > height:
        if fixed_height:
            warnings.append({"element": None, "message": "content_overflow"})
        elif content_height + 2 * inset > MAX_CANVAS_HEIGHT:
            warnings.append({"element": None, "message": "design_too_tall"})

    canvas = Image.new("L", (width, height), 255)
    y = inset + max(0, (height - 2 * inset - content_height) // 2) if fixed_height else inset
    for block in blocks:
        canvas.paste(block.image, (inset, y + block.margin_top))
        y += block.height
    _draw_document_frame(canvas, frame)
    return RenderResult(_finish(canvas, options), warnings)


def _draw_document_frame(canvas: Image.Image, frame: dict[str, Any]) -> None:
    """Draw the document frame close to the canvas edge (ink wins over what is below)."""
    if frame["style"] == "none":
        return
    box = (
        FRAME_EDGE_INSET,
        FRAME_EDGE_INSET,
        canvas.width - FRAME_EDGE_INSET,
        canvas.height - FRAME_EDGE_INSET,
    )
    frame_layer = Image.new("L", (box[2] - box[0], box[3] - box[1]), 255)
    draw_frame(frame_layer, frame["style"], frame["thickness"])
    canvas.paste(ImageChops.darker(canvas.crop(box), frame_layer), box[:2])


def _finish(canvas: Image.Image, options: dict[str, Any]) -> Image.Image:
    if options["invert"]:
        canvas = ImageOps.invert(canvas)
    if options["mirror"]:
        canvas = ImageOps.mirror(canvas)
    if options["rotate"]:
        canvas = canvas.rotate(-options["rotate"], expand=True, fillcolor=255)
    return canvas.convert("1", dither=Image.Dither.NONE)


# --- elements -> blocks -------------------------------------------------------


def _render_block(
    element: dict[str, Any], index: int, content_width: int, warnings: list[dict[str, Any]]
) -> _Block:
    try:
        image = _draw_element(element, content_width)
    except WidgetError as err:
        warnings.append({"element": element.get("id") or index, "message": str(err)})
        image = _error_block(str(err), content_width)
    return _Block(image, element["margin_top"], element["margin_bottom"])


def _draw_element(element: dict[str, Any], width: int) -> Image.Image:
    kind = element["type"]
    if kind == "text":
        return render_text_block(
            element["runs"],
            width,
            align=element["align"],
            line_spacing=element["line_spacing"],
            bullet=element["bullet"],
        )
    if kind == "divider":
        return draw_divider(width, element["style"], element["thickness"], element["width_pct"])
    if kind == "spacer":
        return Image.new("L", (width, element["height"]), 255)
    if kind == "qr":
        return _draw_qr_block(element, width)
    if kind == "barcode":
        picture = draw_barcode(
            element["kind"],
            element["data"],
            width,
            element["height"],
            element["module_width"],
            show_text=element["show_text"],
        )
        return _place(picture, width, element["align"])
    if kind == "image":
        picture = load_picture(
            element["data"], width, element["width_pct"], element["dither"], element["threshold"]
        )
        return _place(picture, width, element["align"])
    raise WidgetError(f"Unknown element type {kind!r}.")


def _draw_qr_block(element: dict[str, Any], width: int) -> Image.Image:
    qr = draw_qr(element["data"], width, element["size_pct"], element["level"])
    if not element["caption"]:
        return _place(qr, width, element["align"])
    caption_run = {
        "text": element["caption"],
        "font": element["caption_font"],
        "size": element["caption_size"],
        "bold": False,
        "italic": False,
        "underline": False,
        "strike": False,
        "invert": False,
    }
    caption = render_text_block([caption_run], width, align=element["align"], line_spacing=1.1)
    block = Image.new("L", (width, qr.height + 4 + caption.height), 255)
    block.paste(_place(qr, width, element["align"]), (0, 0))
    block.paste(caption, (0, qr.height + 4))
    return block


def _place(picture: Image.Image, width: int, align: str) -> Image.Image:
    """Put ``picture`` into a ``width`` pixels wide block at the requested alignment."""
    if picture.width >= width:
        return picture
    block = Image.new("L", (width, picture.height), 255)
    x = {"left": 0, "center": (width - picture.width) // 2, "right": width - picture.width}[align]
    block.paste(picture, (x, 0))
    return block


def _error_block(message: str, width: int) -> Image.Image:
    run = {
        "text": f"⚠ {message}",
        "font": "sans",
        "size": 16,
        "bold": False,
        "italic": False,
        "underline": False,
        "strike": False,
        "invert": False,
    }
    return render_text_block([run], width, line_spacing=1.1)
