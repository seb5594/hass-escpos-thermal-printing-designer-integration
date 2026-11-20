# Templates

A template is a design plus the *fill-in values* it asks for before printing. The designer ships 39 of them, in English and German; the language follows Home Assistant. Your own designs live next to them and can ask for values too.

## The built-in designs

| Id | Name | Category | Values | Paper |
|----|------|----------|--------|-------|
| `builtin:best_before_label` | Best-before label / Mindesthaltbarkeits-Etikett | food | `name`, `days` | 320×240 px label |
| `builtin:birthday_card` | Birthday card / Geburtstagskarte | fun | `name`, `age`, `wish` | 384 px roll |
| `builtin:chore_card` | Chore card / Aufgabenkarte | todo | `task`, `person`, `days` | 384 px roll |
| `builtin:daily_planner` | Daily planner / Tagesplaner | todo | `first`, `second`, `third` | 384 px roll |
| `builtin:freezer_label` | Freezer label / Gefrier-Etikett | food | `name`, `months` | 320×240 px label |
| `builtin:fridge_note` | Family note / Familien-Notiz | fun | `title`, `message`, `from` | 384 px roll |
| `builtin:gift_tag` | Gift tag / Geschenkanhänger | fun | `name`, `wish` | 320×240 px label |
| `builtin:invitation` | Invitation / Einladung | fun | `event`, `date`, `time`, `place`, `note` | 384 px roll |
| `builtin:love_letter` | Love letter / Liebesbrief | love | `name`, `message`, `signature` | 384 px roll |
| `builtin:love_letter_hearts` | Love letter with hearts / Liebesbrief mit Herzen | love | `to`, `message`, `signature` | 384 px roll |
| `builtin:love_note_label` | Love label / Liebes-Etikett | love | `text` | 320×240 px label |
| `builtin:meal_plan` | Meal plan / Wochenplan Essen | food | `plan` | 384 px roll |
| `builtin:medicine_label` | Medicine label / Medikamenten-Etikett | label | `name`, `dose`, `emoji` | 384×192 px label |
| `builtin:morning_briefing` | Good morning / Guten Morgen | fun | `weather`, `quote` | 384 px roll |
| `builtin:name_badge` | Name badge / Namensschild | label | `name` | 400×240 px label |
| `builtin:opened_label` | Opened on / Geöffnet am | food | `name`, `days` | 320×240 px label |
| `builtin:packing_list` | Packing list / Packliste | todo | `trip` | 384 px roll |
| `builtin:parcel_label` | Parcel label / Paketaufkleber | label | `to`, `from`, `tracking` | 400×640 px label |
| `builtin:pet_label` | Pet tag / Haustier-Etikett | label | `name`, `emoji` | 384×192 px label |
| `builtin:plant_label` | Plant care tag / Pflanzen-Etikett | label | `name`, `days`, `light` | 400×240 px label |
| `builtin:qr_contact` | Contact card / Kontaktkarte | qr | `name`, `phone`, `email` | 384 px roll |
| `builtin:qr_link` | QR link / QR-Link | qr | `url`, `title` | 384 px roll |
| `builtin:quick_checklist` | Quick checklist / Schnelle Checkliste | todo | `title`, `tasks` | 384 px roll |
| `builtin:quote_card` | Quote card / Spruchkarte | fun | `quote`, `author` | 384 px roll |
| `builtin:receipt_ticket` | Receipt / Kassenbon | receipt | `shop`, `lines`, `total` | 384 px roll |
| `builtin:recipe_card` | Recipe card / Rezeptkarte | food | `title`, `servings`, `time`, `ingredients`, `steps` | 384 px roll |
| `builtin:reward_chart` | Sticker chart / Belohnungskarte | fun | `name`, `goal` | 384 px roll |
| `builtin:shopping_list` | Shopping list / Einkaufsliste | shopping | `list` | 384 px roll |
| `builtin:shopping_list_bold` | Shopping list (bold) / Einkaufsliste (plakativ) | shopping | `list` | 384 px roll |
| `builtin:shopping_list_compact` | Shopping list (compact) / Einkaufsliste (kompakt) | shopping | `list` | 384 px roll |
| `builtin:shopping_list_extras` | Shopping list + write-in lines / Einkaufsliste + Notizzeilen | shopping | `list` | 384 px roll |
| `builtin:shopping_list_market` | Shopping list (market) / Einkaufsliste (Markt) | shopping | `list` | 384 px roll |
| `builtin:shopping_list_store` | Shopping list with store and budget / Einkaufsliste mit Laden und Budget | shopping | `list`, `store`, `budget` | 384 px roll |
| `builtin:snack_label` | Bold label / Plakatives Etikett | label | `name` | 384×192 px label |
| `builtin:storage_label` | Storage label / Aufbewahrungs-Etikett | label | `name` | 384×192 px label |
| `builtin:thank_you_note` | Thank-you note / Dankeschön-Zettel | fun | `to`, `message`, `signature` | 384 px roll |
| `builtin:todo_checklist` | To-do checklist / Aufgaben-Checkliste | todo | `list`, `title` | 384 px roll |
| `builtin:weather_today` | Weather today / Wetter heute | fun | `weather` | 384 px roll |
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
- a **type**: text, long text, number, yes/no, date, to-do list or entity,
- a **label** shown in the print dialog, and a **default**.

Avoid names that collide with Python dictionary methods such as `items`, `keys` or `values`; use `lines` or `entries` instead.

An *entity* value shows a dropdown with every entity of the chosen domain (for example `weather`) and starts with the first one it finds, so a template written for `weather.home` works on every installation. Use `{{ state_translated(vars.weather) }}` to print the state in your Home Assistant language.

A *to-do list* value shows a list picker when printing. Built-in shopping lists look for a list called like "shopping" or "Einkauf" and preselect it; a variable can carry such search words as `hints` in its JSON. Use it in a list element by choosing **To-do list → Ask when printing**, which fills the list's entity with `{{ vars.<name> }}`.

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

## Recently printed

Every print from the designer is remembered together with the values you entered, by default the last ten (change this under the integration's options; `0` turns it off). They appear under the **Recently printed** filter in the gallery, where you can print one again, **save it as a template**, or remove it. Prints started by services or automations are not recorded.
