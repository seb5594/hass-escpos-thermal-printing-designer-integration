# Templates

A template is a design plus the *fill-in values* it asks for before printing. The designer ships twenty of them, in English and German; the language follows Home Assistant. Your own designs live next to them and can ask for values too.

## The built-in designs

| Id | Name | Category | Values | Paper |
|----|------|----------|--------|-------|
| `builtin:best_before_label` | Best-before label / Mindesthaltbarkeits-Etikett | food | `name`, `days` | 320×240 px label |
| `builtin:chore_card` | Chore card / Aufgabenkarte | todo | `task`, `person`, `days` | 384 px roll |
| `builtin:freezer_label` | Freezer label / Gefrier-Etikett | food | `name`, `months` | 320×240 px label |
| `builtin:gift_tag` | Gift tag / Geschenkanhänger | fun | `name`, `wish` | 320×240 px label |
| `builtin:love_letter` | Love letter / Liebesbrief | love | `name`, `message`, `signature` | 384 px roll |
| `builtin:love_note_label` | Love label / Liebes-Etikett | love | `text` | 320×240 px label |
| `builtin:medicine_label` | Medicine label / Medikamenten-Etikett | label | `name`, `dose`, `emoji` | 384×192 px label |
| `builtin:morning_briefing` | Good morning / Guten Morgen | fun | `weather`, `quote` | 384 px roll |
| `builtin:opened_label` | Opened on / Geöffnet am | food | `name`, `days` | 320×240 px label |
| `builtin:pet_label` | Pet tag / Haustier-Etikett | label | `name`, `emoji` | 384×192 px label |
| `builtin:qr_contact` | Contact card / Kontaktkarte | qr | `name`, `phone`, `email` | 384 px roll |
| `builtin:qr_link` | QR link / QR-Link | qr | `url`, `title` | 384 px roll |
| `builtin:quick_checklist` | Quick checklist / Schnelle Checkliste | todo | `title`, `tasks` | 384 px roll |
| `builtin:receipt_ticket` | Receipt / Kassenbon | receipt | `shop`, `lines`, `total` | 384 px roll |
| `builtin:shopping_list` | Shopping list / Einkaufsliste | shopping | `list` | 384 px roll |
| `builtin:shopping_list_compact` | Shopping list (compact) / Einkaufsliste (kompakt) | shopping | `list` | 384 px roll |
| `builtin:snack_label` | Bold label / Plakatives Etikett | label | `name` | 384×192 px label |
| `builtin:storage_label` | Storage label / Aufbewahrungs-Etikett | label | `name` | 384×192 px label |
| `builtin:todo_checklist` | To-do checklist / Aufgaben-Checkliste | todo | `list`, `title` | 384 px roll |
| `builtin:wifi_qr` | Wi-Fi guest card / WLAN-Gästekarte | qr | `ssid`, `password`, `security` | 384 px roll |

Use the id with the `escpos_designer.print_template` service or the blueprints. Passing values works like this:

```yaml
action: escpos_designer.print_template
data:
  template_id: "builtin:wifi_qr"
  variables:
    ssid: Guest-WiFi
    password: welcome123
```

Values you leave out use the template's defaults.

## Fill-in values

Open a design, choose the **Design** tab and scroll to **Fill-in values**. Each value has

- a **name**, used in texts as `{{ vars.name }}`,
- a **type**: text, long text, number, yes/no, date or to-do list,
- a **label** shown in the print dialog, and a **default**.

Avoid names that collide with Python dictionary methods such as `items`, `keys` or `values`; use `lines` or `entries` instead.

A *to-do list* value shows a list picker when printing. Use it in a list element by choosing **To-do list → Ask when printing**, which fills the list's entity with `{{ vars.<name> }}`.

## Making your own

1. Start from a built-in design that is close, or a blank one, and change it.
2. Save it. Saving a built-in design stores a copy under **My designs**; the original stays untouched.
3. Add fill-in values for anything that changes between prints, and use them in your texts.

Your last ten saved or printed designs appear in the **New design** dialog.

## Date arithmetic

Home Assistant templates make shelf lives easy:

```jinja
{{ (now() + timedelta(days=vars.days | int(0))).strftime('%d.%m.%Y') }}   {# today plus N days #}
{{ (now() + timedelta(days=30 * (vars.months | int(0)))).strftime('%m/%Y') }}   {# month and year #}
```

The *date and time* element has weekday and month names in English, German, French, Spanish, Italian and Dutch (`%A`, `%a`, `%B`, `%b`) and can shift the date by days and hours without any template.
