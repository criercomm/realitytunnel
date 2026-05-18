# Reality Tunnel — Deployment Package

This folder is a complete static-site deploy. Drop the contents into the
web-root of any web server (Apache, Nginx, S3+CloudFront, Netlify, Vercel
static, etc.) and the site will work.


## Folder structure

    /
    ├── index.html                           Homepage (immersive hero + sections)
    ├── project-*.html                       6 project case studies
    ├── clients/                             45 client logo PNGs (marquee)
    ├── clients-testimonials/                4 testimonial portrait PNGs
    ├── reality-tunnel-loop.mp4              Hero background video (H.264, 6.3MB)
    ├── reality-tunnel-loop.webm             Hero background video (VP9, 2.6MB)
    ├── reality-tunnel-poster.jpg            Hero video poster frame
    ├── reality-tunnel-logo-animated.svg     Brand asset: animated lockup
    ├── reality-tunnel-logo-static.svg       Brand asset: static lockup
    ├── reality-tunnel-mark.svg              Brand asset: mark only
    ├── .htaccess                            Apache compression + caching config
    ├── robots.txt                           Search engine directives
    └── sitemap.xml                          Search engine sitemap


## What's still needed before going live

### 1. Geist font files

The HTML references `fonts/geist-latin.woff2` and `fonts/geist-mono-latin.woff2`
(plus four more variants). These files are NOT included — get them from:

    https://github.com/vercel/geist-font/tree/main/packages/next/dist/fonts

Place the six woff2 files in a `fonts/` subfolder. Without them, the site
will fall through to system fonts (-apple-system / Segoe UI / Inter) which
look close to Geist but not identical.

The six files needed:
    fonts/geist-latin.woff2
    fonts/geist-latin-ext.woff2
    fonts/geist-cyrillic.woff2
    fonts/geist-mono-latin.woff2
    fonts/geist-mono-latin-ext.woff2
    fonts/geist-mono-cyrillic.woff2

### 2. Domain references in SEO files

`robots.txt` and `sitemap.xml` currently use `https://www.nextlatam.com/`.
Update both to the new domain before deploying:

    robots.txt:    one reference
    sitemap.xml:   seven references (one per page)

### 3. Project hero images

The 6 project pages each reference a hero image in `projects/`:

    projects/manchester_united.webp
    projects/interbank_360.webp           (referenced as proj-thumb)
    projects/hp_ar.webp
    projects/talentolandia.webp
    projects/hackers_worst_nightmare.webp
    projects/360_virtual_tour.webp

Only one (`manchester_united.webp`) is referenced in the homepage's "Selected
work" grid; the other five there have empty thumb spans. Source the project
imagery from the studio's existing archives, place in a `projects/` folder,
and update HTML references if filenames differ.


## What's in this build

- **Homepage**: video-background immersive hero with animated Reality
  Tunnel lockup, hero copy, "Trusted by" strip, then 6 light-mode sections
  (services, work, approach, testimonials, clients marquee, contact) and
  the footer.
- **Project pages**: 6 static case studies, rebranded to the new identity
  (new logo lockup, new email, new copyright). Project body content is
  unchanged from the original — only the brand surface elements changed.
- **All 49 inline images** (45 client logos + 4 testimonial portraits)
  are present as separate files in their folders. The HTML references
  them via relative paths so the browser can cache them efficiently.
- **Video assets** are present in two formats. Browsers will pick whichever
  they support (WebM is ~60% smaller; MP4 is the broadly-compatible fallback).


## What's NOT in this build

- The original `index.html` from before the rebrand (replaced)
- `logo-next.webp` (old brand mark, no longer referenced)
- `hero_image.webp` (original static hero, not used by the new immersive design)
- `gen_projects.py` (build-time tooling, not a runtime asset)
- An older `reality-tunnel-logo.svg` (superseded by the three new variants)


## Server config notes

- The included `.htaccess` enables gzip compression and 1-year browser
  caching on static assets. It's Apache-specific. For Nginx, equivalent
  directives are needed in the server block.
- All asset paths are relative, so the site works at any URL path (root or
  subdirectory). No absolute paths anywhere except in `sitemap.xml` (which
  you'll update with the new domain anyway).
- The site has no server-side dependencies — pure HTML/CSS/JS/static assets.
