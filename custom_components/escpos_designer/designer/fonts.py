"""The fonts the designer offers and a small cache around Pillow's loader."""

from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from PIL.ImageFont import FreeTypeFont

FONT_DIR = Path(__file__).resolve().parent.parent / "fonts"
EMOJI_FONT_FILE = "NotoEmoji-Regular.ttf"
DEFAULT_FONT = "sans"
MONO_FONT = "mono"


@dataclass(frozen=True, slots=True)
class FontFamily:
    """One selectable font."""

    id: str
    label: str
    file: str
    style: str  # short hint for the picker: "clean", "script", ...


FONT_FAMILIES: tuple[FontFamily, ...] = (
    FontFamily("sans", "DejaVu Sans", "DejaVuSans.ttf", "clean"),
    FontFamily("mono", "DejaVu Sans Mono", "DejaVuSansMono.ttf", "receipt"),
    FontFamily("serif", "DejaVu Serif", "DejaVuSerif.ttf", "classic"),
    FontFamily("typewriter", "Courier Prime", "CourierPrime-Regular.ttf", "typewriter"),
    FontFamily("vintage", "Special Elite", "SpecialElite-Regular.ttf", "vintage"),
    FontFamily("elegant", "Playfair Display", "PlayfairDisplay-SemiBold.ttf", "elegant"),
    FontFamily("display", "Bebas Neue", "BebasNeue-Regular.ttf", "headline"),
    FontFamily("handwriting", "Caveat", "Caveat-SemiBold.ttf", "handwriting"),
    FontFamily("script", "Pacifico", "Pacifico-Regular.ttf", "script"),
)
FONT_IDS: tuple[str, ...] = tuple(family.id for family in FONT_FAMILIES)
_FILES = {family.id: family.file for family in FONT_FAMILIES}


@lru_cache(maxsize=96)
def load_font(font_id: str, size: int) -> FreeTypeFont:
    """Return the font ``font_id`` at ``size`` pixels (cached)."""
    from PIL import ImageFont  # noqa: PLC0415

    return ImageFont.truetype(str(FONT_DIR / _FILES.get(font_id, _FILES[DEFAULT_FONT])), size)


@lru_cache(maxsize=48)
def load_emoji_font(size: int) -> FreeTypeFont:
    """Return the monochrome emoji font at ``size`` pixels (cached)."""
    from PIL import ImageFont  # noqa: PLC0415

    return ImageFont.truetype(str(FONT_DIR / EMOJI_FONT_FILE), size)


def font_catalog() -> list[dict[str, str]]:
    """The fonts as plain dicts for the frontend's font picker."""
    return [{"id": f.id, "label": f.label, "style": f.style} for f in FONT_FAMILIES]
