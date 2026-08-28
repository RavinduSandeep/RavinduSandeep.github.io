# Content review — items to verify

This file lists content that was **carried over from the old site / CV** and may
need your confirmation, plus **privacy-sensitive items removed** during the
redesign. Nothing here was invented — where a fact was missing, it was left out
rather than filled in. Edit `assets/js/data.js` to change any site content.

## ✅ Please verify these facts
- **Current role** — "Engineer — Electrical & Electronic, Richard Pieris &
  Company PLC (ARPICO), Mattegoda — Nov 2025 – Present." Taken from your CV.
- **Tea Blending Machine** — no dedicated photo existed in the repo, so the card
  currently reuses `project-7.png` (panel wiring). **Add a real photo** and set
  `cover` for the `tea-blending` project in `data.js`.
- **Fabric Inspection Digitalization** — reuses `project-9.png` as a placeholder.
  Add a dashboard screenshot if you have one.
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
