# Ravindu Madanayaka — Engineering Portfolio

A premium, fast, accessible personal portfolio for an **Automation / Embedded /
R&D Engineer**. It presents real engineering systems spanning electronics,
control, embedded firmware and supervisory software.

**Live:** https://ravindusandeep.github.io/

---

## Tech stack

- **Vanilla HTML + CSS + JavaScript** — no framework, no build step.
- Chosen deliberately: for a root GitHub Pages user site this gives the best
  Core Web Vitals, zero base-path headaches, and instant deploys. No dependency
  to break, nothing to `npm install`.
- Fonts: Sora / Inter / JetBrains Mono (Google Fonts, `display=swap`).
- No JS libraries. All icons are inline SVG. All animations are GPU-friendly and
  respect `prefers-reduced-motion`.

## Features

- **Compact, section-based layout** — hero, projects, experience, skills,
  research & achievements, education, contact. Sticky top nav with
  active-section highlighting.
- **Hero that answers "who is this?" in one screen** — name, title, one-line
  pitch, focus-area chips, an animated `system.stack` panel (Hardware →
  Embedded → Automation → Edge → Digital) and four featured projects.
- **Projects rail** — category tabs + horizontal scroll-snap browsing with
  prev/next controls and a counter, instead of a long stacked grid.
- **Case-study modal** — two-pane on desktop, bottom sheet on tablet/mobile,
  prev/next project navigation, focus-trapped, keyboard accessible.
- **Experience as tabs**, **skills as chip groups** (accordion on mobile),
  achievements strip + research cards + publications side by side,
  education as a 2×2 grid.
- **Mobile-specific navigation** — bottom tab bar (Home / Projects / Work /
  Skills / Contact) plus a full-width menu sheet with Resume / GitHub /
  LinkedIn / Scholar links. Horizontal-scroll chips and tabs where they save
  vertical space.
- Dark (primary) + light theme, remembered in `localStorage`, no flash on load.
- Content fully separated from layout (`assets/js/data.js`).
- SEO: meta description, canonical, Open Graph, Twitter card, JSON-LD `Person`,
  `sitemap.xml`, `robots.txt`, web manifest, SVG favicon + social cover.
- WCAG-minded: semantic landmarks, skip link, visible focus, keyboard nav,
  aria labels, 44px touch targets, reduced-motion support.

## Project structure

```
index.html                 # semantic markup, SEO meta, section shells
robots.txt · sitemap.xml · site.webmanifest
CONTENT.md                 # items to verify + privacy notes (read this)
assets/
  css/style.css            # design system (dark + light, responsive)
  js/data.js               # ← EDIT THIS: all portfolio content
  js/main.js               # rendering + interactions
  images/                  # project photos, favicon.svg, og-cover.svg
  docs/Ravindu-Madanayaka-CV.pdf   # resume (see CONTENT.md privacy note)
```

## Editing content

All content lives in **`assets/js/data.js`** — no HTML/CSS edits required.

### Add a project
Copy any object inside `projects[]` and fill the fields:

```js
{
  id: "my-project",
  title: "My New System",
  category: "Industrial Automation", // becomes a filter automatically
  featured: true,                    // large card + opens case study
  year: "2026",
  cover: "assets/images/my-photo.jpg",
  problem: "One-line problem statement.",
  challenge: "…",
  solution: "…",
  contribution: ["…", "…"],
  architecture: ["Sensor", "PLC", "HMI"],   // renders an arrow flow diagram
  tech: ["PLC", "Python"],
  result: "…",
  links: { github: "", demo: "", caseStudy: "" } // omit/empty to hide
}
```

Update `experience`, `education`, `capabilities`, `research`, `achievements`,
`publications` and `profile` (name, title, links, resume path) the same way.
The first four projects with `featured: true` appear in the hero. Set any link to `""` to hide its button.

## Local development

No build needed. Serve the folder over HTTP (needed so `fetch`/module paths and
relative assets resolve correctly):

```bash
# Python
python -m http.server 8080
# or Node
npx serve .
```
Then open http://localhost:8080.

## Deployment (GitHub Pages)

This is a **user site** deployed from the repo root — no build pipeline needed:

1. Push to `main` of `RavinduSandeep/RavinduSandeep.github.io`.
2. GitHub → **Settings → Pages → Source: Deploy from a branch → `main` / `root`**.
3. Live within ~1 minute at https://ravindusandeep.github.io/.

All asset paths are relative (`assets/…`), so it works at the domain root
without configuration.

## License

Content © Ravindu Madanayaka. Code available for reference.
