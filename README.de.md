# ESC/POS Thermodrucker Designer für Home Assistant

[🇬🇧 English](README.md) · **🇩🇪 Deutsch**

Gestalte Etiketten, Einkaufslisten, QR-Codes und Liebesbriefe in einem modernen Web-Designer direkt in Home Assistant und drucke sie auf deinen ESC/POS-Thermodruckern.

## Voraussetzungen

- Home Assistant 2025.1 oder neuer
- Die Integration [ESC/POS Thermal Printer](https://github.com/cognitivegears/ha-escpos-thermal-printer) mit mindestens einem Drucker. Der Designer erkennt sie selbst; fehlt sie, führt dich der Einrichtungsdialog direkt zu ihrem HACS-Eintrag.

## Installation

1. Suche in HACS (Home Assistant 2026.10 und älter) oder unter **Einstellungen → Marketplace** (2026.11 und neuer) nach **ESC/POS Thermal Printer Designer**, oder nutze diesen Button: [![In HACS öffnen](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=seb5594&repository=hass-escpos-thermal-printing-designer-integration&category=integration). Findet die Suche es nicht, füge dieses Repository am selben Ort zuerst als benutzerdefiniertes Repository hinzu (Kategorie **Integration**). Lade es dann herunter.
2. Starte Home Assistant neu.
3. Gehe zu **Einstellungen → Geräte & Dienste → Integration hinzufügen** und wähle **ESC/POS Thermal Printer Designer**.
