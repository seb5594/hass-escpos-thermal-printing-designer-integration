"""Weekday and month names, so dates print in the user's language without locale tricks."""

from __future__ import annotations

import re
from datetime import datetime

_NAMES: dict[str, tuple[tuple[str, ...], tuple[str, ...]]] = {
    "en": (
        ("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"),
        ("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
    ),
    "de": (
        ("Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"),
        ("Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"),
    ),
    "fr": (
        ("lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"),
        ("janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"),
    ),
    "es": (
        ("lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"),
        ("enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"),
    ),
    "it": (
        ("lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato", "domenica"),
        ("gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"),
    ),
    "nl": (
        ("maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"),
        ("januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"),
    ),
}  # fmt: skip
_NAME_TOKENS = re.compile(r"%([aAbB])")


def format_datetime(moment: datetime, pattern: str, language: str) -> str:
    """``strftime`` with ``%a %A %b %B`` in ``language`` (falls back to English)."""
    weekdays, months = _NAMES.get(language.split("-", maxsplit=1)[0].lower(), _NAMES["en"])

    def name(match: re.Match[str]) -> str:
        token = match.group(1)
        full = weekdays[moment.weekday()] if token in "aA" else months[moment.month - 1]
        return full if token in "AB" else full[:3]

    try:
        return moment.strftime(_NAME_TOKENS.sub(lambda m: name(m).replace("%", "%%"), pattern))
    except ValueError:
        return pattern
