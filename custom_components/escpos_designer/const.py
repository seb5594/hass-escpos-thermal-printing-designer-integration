"""Constants for the ESC/POS Thermal Printer Designer."""

from typing import Final

DOMAIN = "escpos_designer"
NAME: Final = "ESC/POS Thermal Printer Designer"

# The integration this one prints through.
PRINTER_DOMAIN: Final = "escpos_printer"

# Where the user can get the printer integration (HACS "my" redirect opens the
# repository page inside the user's own Home Assistant).
PRINTER_REPOSITORY_OWNER: Final = "cognitivegears"
PRINTER_REPOSITORY_NAME: Final = "ha-escpos-thermal-printer"
PRINTER_REPOSITORY_URL: Final = (
    f"https://github.com/{PRINTER_REPOSITORY_OWNER}/{PRINTER_REPOSITORY_NAME}"
)
PRINTER_HACS_URL: Final = (
    "https://my.home-assistant.io/redirect/hacs_repository/"
    f"?owner={PRINTER_REPOSITORY_OWNER}&repository={PRINTER_REPOSITORY_NAME}&category=integration"
)
HACS_URL: Final = "https://www.hacs.xyz/docs/use/"
ADD_PRINTER_URL: Final = "/config/integrations/dashboard/add?domain=escpos_printer"

# Options
CONF_REQUIRE_ADMIN: Final = "require_admin"
CONF_SHOW_IN_SIDEBAR: Final = "show_in_sidebar"
DEFAULT_REQUIRE_ADMIN: Final = True
DEFAULT_SHOW_IN_SIDEBAR: Final = True

# Repair issue ids
ISSUE_PRINTER_INTEGRATION_MISSING: Final = "printer_integration_missing"
ISSUE_NO_PRINTER_CONFIGURED: Final = "no_printer_configured"
