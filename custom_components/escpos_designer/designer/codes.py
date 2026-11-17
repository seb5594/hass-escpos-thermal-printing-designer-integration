"""Barcode encoders: Code 128, Code 39 and EAN-13.

Each encoder returns the bars as a list of modules (``1`` = bar, ``0`` =
space) including quiet-zone-free start/stop patterns. They validate their
input and raise :class:`BarcodeError` with a message fit for the user.
"""

from __future__ import annotations


class BarcodeError(ValueError):
    """The data cannot be encoded in the chosen barcode type."""


# --- Code 128 ---------------------------------------------------------------

# fmt: off
_CODE128_WIDTHS = (
    "212222", "222122", "222221", "121223", "121322", "131222", "122213", "122312",
    "132212", "221213", "221312", "231212", "112232", "122132", "122231", "113222",
    "123122", "123221", "223211", "221132", "221231", "213212", "223112", "312131",
    "311222", "321122", "321221", "312212", "322112", "322211", "212123", "212321",
    "232121", "111323", "131123", "131321", "112313", "132113", "132311", "211313",
    "231113", "231311", "112133", "112331", "132131", "113123", "113321", "133121",
    "313121", "211331", "231131", "213113", "213311", "213131", "311123", "311321",
    "331121", "312113", "312311", "332111", "314111", "221411", "431111", "111224",
    "111422", "121124", "121421", "141122", "141221", "112214", "112412", "122114",
    "122411", "142112", "142211", "241211", "221114", "413111", "241112", "134111",
    "111242", "121142", "121241", "114212", "124112", "124211", "411212", "421112",
    "421211", "212141", "214121", "412121", "111143", "111341", "131141", "114113",
    "114311", "411113", "411311", "113141", "114131", "311141", "411131", "211412",
    "211214", "211232", "2331112",
)
# fmt: on
_STOP = 106
_START = {"B": 104, "C": 105}
_SWITCH_TO = {"B": 100, "C": 99}


def _runs_to_modules(widths: str) -> list[int]:
    modules: list[int] = []
    bar = 1
    for width in widths:
        modules.extend([bar] * int(width))
        bar ^= 1
    return modules


def encode_code128(data: str) -> list[int]:
    """Encode ``data`` (printable ASCII) using subsets B and C (digit pairs)."""
    if not data:
        raise BarcodeError("The barcode data is empty.")
    if any(not 32 <= ord(char) <= 126 for char in data):
        raise BarcodeError("Code 128 supports printable ASCII characters only.")

    codes: list[int] = []
    subset = ""
    index = 0
    while index < len(data):
        pair_digits = _digit_run(data, index) // 2 * 2
        if pair_digits >= 4 or (index == 0 and pair_digits == len(data)):
            subset = _enter_subset(codes, subset, "C")
            codes.extend(int(data[pos : pos + 2]) for pos in range(index, index + pair_digits, 2))
            index += pair_digits
        else:
            subset = _enter_subset(codes, subset, "B")
            codes.append(ord(data[index]) - 32)
            index += 1

    checksum = (codes[0] + sum(value * pos for pos, value in enumerate(codes[1:], start=1))) % 103
    modules: list[int] = []
    for value in (*codes, checksum, _STOP):
        modules.extend(_runs_to_modules(_CODE128_WIDTHS[value]))
    return modules


def _enter_subset(codes: list[int], current: str, wanted: str) -> str:
    """Append the start or switch code needed to continue in subset ``wanted``."""
    if current != wanted:
        codes.append(_START[wanted] if not codes else _SWITCH_TO[wanted])
    return wanted


def _digit_run(data: str, start: int) -> int:
    end = start
    while end < len(data) and data[end].isdigit():
        end += 1
    return end - start


# --- Code 39 ----------------------------------------------------------------

_CODE39 = {
    "0": "nnnwwnwnn", "1": "wnnwnnnnw", "2": "nnwwnnnnw", "3": "wnwwnnnnn",
    "4": "nnnwwnnnw", "5": "wnnwwnnnn", "6": "nnwwwnnnn", "7": "nnnwnnwnw",
    "8": "wnnwnnwnn", "9": "nnwwnnwnn", "A": "wnnnnwnnw", "B": "nnwnnwnnw",
    "C": "wnwnnwnnn", "D": "nnnnwwnnw", "E": "wnnnwwnnn", "F": "nnwnwwnnn",
    "G": "nnnnnwwnw", "H": "wnnnnwwnn", "I": "nnwnnwwnn", "J": "nnnnwwwnn",
    "K": "wnnnnnnww", "L": "nnwnnnnww", "M": "wnwnnnnwn", "N": "nnnnwnnww",
    "O": "wnnnwnnwn", "P": "nnwnwnnwn", "Q": "nnnnnnwww", "R": "wnnnnnwwn",
    "S": "nnwnnnwwn", "T": "nnnnwnwwn", "U": "wwnnnnnnw", "V": "nwwnnnnnw",
    "W": "wwwnnnnnn", "X": "nwnnwnnnw", "Y": "wwnnwnnnn", "Z": "nwwnwnnnn",
    "-": "nwnnnnwnw", ".": "wwnnnnwnn", " ": "nwwnnnwnn", "*": "nwnnwnwnn",
    "$": "nwnwnwnnn", "/": "nwnwnnnwn", "+": "nwnnnwnwn", "%": "nnnwnwnwn",
}  # fmt: skip


def encode_code39(data: str) -> list[int]:
    """Encode ``data`` (digits, capital letters and ``-. $/+%``) as Code 39."""
    text = data.upper()
    if not text:
        raise BarcodeError("The barcode data is empty.")
    if "*" in text or any(char not in _CODE39 for char in text):
        raise BarcodeError("Code 39 supports digits, capital letters and - . space $ / + % only.")
    modules: list[int] = []
    for position, char in enumerate(f"*{text}*"):
        if position:
            modules.append(0)  # narrow gap between characters
        bar = 1
        for width in _CODE39[char]:
            modules.extend([bar] * (3 if width == "w" else 1))
            bar ^= 1
    return modules


# --- EAN-13 -----------------------------------------------------------------

_EAN_L = ("0001101", "0011001", "0010011", "0111101", "0100011",
          "0110001", "0101111", "0111011", "0110111", "0001011")  # fmt: skip
_EAN_G = ("0100111", "0110011", "0011011", "0100001", "0011101",
          "0111001", "0000101", "0010001", "0001001", "0010111")  # fmt: skip
_EAN_R = ("1110010", "1100110", "1101100", "1000010", "1011100",
          "1001110", "1010000", "1000100", "1001000", "1110100")  # fmt: skip
_EAN_PARITY = ("LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG",
               "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL")  # fmt: skip


def ean13_check_digit(first_twelve: str) -> int:
    """Return the EAN-13 check digit for the first twelve digits."""
    total = sum(int(d) * (3 if i % 2 else 1) for i, d in enumerate(first_twelve))
    return (10 - total % 10) % 10


def normalize_ean13(data: str) -> str:
    """Return the 13 digits for ``data`` (12 digits get their check digit appended)."""
    if not data.isdigit() or len(data) not in (12, 13):
        raise BarcodeError("EAN-13 needs 12 or 13 digits.")
    expected = ean13_check_digit(data[:12])
    if len(data) == 13 and int(data[12]) != expected:
        raise BarcodeError(f"The EAN-13 check digit is wrong; it should be {expected}.")
    return data[:12] + str(expected)


def encode_ean13(data: str) -> list[int]:
    """Encode 12 or 13 digits as EAN-13."""
    digits = normalize_ean13(data)
    parity = _EAN_PARITY[int(digits[0])]
    pattern = "101"
    for position, digit in enumerate(digits[1:7]):
        pattern += (_EAN_L if parity[position] == "L" else _EAN_G)[int(digit)]
    pattern += "01010"
    pattern += "".join(_EAN_R[int(digit)] for digit in digits[7:])
    pattern += "101"
    return [int(module) for module in pattern]


ENCODERS = {"code128": encode_code128, "code39": encode_code39, "ean13": encode_ean13}


def encode_barcode(kind: str, data: str) -> list[int]:
    """Encode ``data`` as barcode ``kind`` (see :data:`ENCODERS`)."""
    try:
        encoder = ENCODERS[kind]
    except KeyError as err:
        raise BarcodeError(f"Unknown barcode type {kind!r}.") from err
    return encoder(data)
