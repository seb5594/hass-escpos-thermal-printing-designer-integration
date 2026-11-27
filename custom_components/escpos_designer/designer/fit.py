"""Fit a finished design to what a printer can print.

A label printer prints a fixed number of dots across its printhead and along
each label; a roll printer only has a width. The design is rendered in its own
size first and then scaled down (never up) onto that canvas, so the layout stays
exactly as designed.
"""

from __future__ import annotations

from PIL import Image

MAX_FIT_SIZE = 4096


def fit_to_canvas(image: Image.Image, width: int, height: int | None) -> Image.Image:
    """Scale ``image`` down to fit ``width`` x ``height`` and centre it on a white canvas.

    With a ``height`` the canvas has a fixed size (a label): a design lying on its side
    is turned by 90 degrees first so it uses the label's long side. Without a ``height``
    (a roll) only the width is limited and the length follows the design.
    """
    picture = image.convert("L")
    if height is not None and (picture.width >= picture.height) != (width >= height):
        picture = picture.rotate(-90, expand=True, fillcolor=255)
    limit = min(width / picture.width, 1.0)
    if height is not None:
        limit = min(limit, height / picture.height)
    if limit < 1.0:
        size = (max(1, round(picture.width * limit)), max(1, round(picture.height * limit)))
        picture = picture.resize(size, Image.Resampling.LANCZOS)
    canvas_width = width if height is not None else picture.width
    canvas = Image.new("L", (canvas_width, height or picture.height), 255)
    canvas.paste(
        picture, ((canvas.width - picture.width) // 2, (canvas.height - picture.height) // 2)
    )
    return canvas.convert("1", dither=Image.Dither.NONE)
