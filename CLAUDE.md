# Reality Tunnel — Project Context

## What this is

Static marketing site for **Reality Tunnel**, a creative studio (nextlatam.com). Plain HTML + precompiled React. No build server, no framework, no package.json in the deploy folder — just files.

## Stack

- HTML pages load compiled JS from `build/` — never raw `.jsx`
- React components live in `.jsx` source files at the repo root
- `.jsx` → `build/*.js` via Babel (`@babel/preset-react`), wrapped in an IIFE
- Deployed to GitHub Pages (static, no server-side step)

## Source → output map

| Edit this       | Generates                  |
|-----------------|----------------------------|
| `tweaks-panel.jsx` | `build/tweaks-panel.js` |
| `shared.jsx`    | `build/shared.js`          |
| `i18n.jsx`      | `build/i18n.js`            |
| `direction-a.jsx` | `build/direction-a.js`   |
| `project-page.jsx` | `build/project-page.js` |
| `app.jsx`       | `build/app.js`             |

**After editing any `.jsx`, always rebuild the matching `build/*.js` and commit both.**

## Page → script dependencies

- `index.html` → tweaks-panel, shared, i18n, direction-a, app
- Project pages (`*.html`) → shared, i18n, project-page

## Rebuild command (Node)

```bash
node build.mjs
```

(Requires `@babel/core` and `@babel/preset-react` installed locally. See BUILD.md for the full script.)

## Deploy

Commit and push — `build/` must be included. GitHub Pages serves it directly.

## Pre-launch checklist (still pending)

1. **Geist font files** — place 6 `.woff2` files in `fonts/` (see README.md for list)
2. **Domain in SEO files** — update `robots.txt` (1 ref) and `sitemap.xml` (7 refs) to the live domain
3. **Project hero images** — 2 of 6 missing in `projects/` folder

## Key assets

- `reality-tunnel-loop.mp4` / `.webm` — hero background video (H.264 + VP9)
- `reality-tunnel-logo-animated.svg` — primary brand lockup
- `clients/` — 45 client logo PNGs (marquee strip)
- `clients-testimonials/` — 4 portrait PNGs
