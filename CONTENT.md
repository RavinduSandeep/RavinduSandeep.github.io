# Content review — items to verify

This file lists content that was **carried over from the old site / CV** and may
need your confirmation, plus **privacy-sensitive items removed** during the
redesign. Nothing here was invented — where a fact was missing, it was left out
rather than filled in. Edit `assets/js/data.js` to change any site content.

## ✅ Please verify these facts
- **Current role** — "Engineer — Electrical & Electronic, Richard Pieris &
  Company PLC (ARPICO), Mattegoda — Nov 2025 – Present." Taken from your CV.
- **Tea Blending Machine** — the off-grid LiFePO4 / BMS work was **removed** per
  your correction (you didn't do that). No cleared photo exists, so the card uses
  a **branded schematic cover** (`assets/images/tea-blending-cover.svg`) instead
  of a wrong photo. Swap in a real photo + set `cover` in `data.js` when ready.
- **Fabric Inspection Digitalization** — now uses your real process-flow slide
  (`assets/images/fabric-inspection.png`) and details from your Portfolio PDF
  (start 23/04/2025, Product Development).
- **Garment Tube Stretching Machine** — enriched from your Portfolio PDF
  (18,000-pc Lululemon order, 4 workers → 1 operator, up to 4 tubes/cycle,
  HMI-controlled). Confirm these figures are OK to publish.
- **Publications** — pulled from your Google Scholar profile: a KDU Journal of
  Multidisciplinary Studies paper (Vol. 8 No. 1) and a 2025 IEEE ICIIS paper.
  Confirm the years/venues are exactly right.
- **Image cropping fixed** — project images now display **uncropped**
  (`object-fit: contain`) on a subtle schematic backdrop, so full photos show.
- **Automated Pick-and-Place** — reuses `project-4.png` (conveyor). Replace if a
  dedicated photo exists.
- **GPA (3.26/4.00)** and award ("1st Runner-Up, 8th Annual Research Symposium,
  2024") — carried from CV; confirm still accurate to present publicly.
- **Old site experience dates** differed from the CV (e.g. D Samson was shown as
  "2013–2015" on the old site but is "Aug 2023 – Jan 2024" in the CV). The CV
  dates were used as the source of truth. Confirm.

## 🔒 Privacy-sensitive content REMOVED from the public page
- Personal phone number (+94 …) — removed from page.
- Date of birth — removed.
- Home/city address + embedded Google Map — removed.
- **Referee names, emails and phone numbers** (Mr. Thulith Jayarathne,
  Dr. Chathurika Silva) — removed from the page entirely.
- Placeholder "testimonials"/blog/lorem-ipsum content — removed.

## ⚠️ Downloadable resume — action needed
`assets/docs/Ravindu-Madanayaka-CV.pdf` is a **copy of your CV** so the
"Download Resume" button works. That PDF still contains your **personal phone
number and the two referees' phone numbers/emails**. If you don't want those
public, replace this file with a redacted "public" version of your CV. To hide
the button entirely, set `resume: ""` in `data.js`.

## 🔗 Links / assets still to provide (optional)
- Per-project GitHub / demo links — add to each project's `links` object.
- A raster `og-cover.png` (1200×630). An SVG version is generated; some
  platforms prefer PNG. Convert `assets/images/og-cover.svg` if needed.
- Real photos for the tea machine, teleconferencing robot, and dashboards.
