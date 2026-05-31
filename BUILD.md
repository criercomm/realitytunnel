# Build & maintenance notes

## How this site is structured

The site is plain HTML + React. The React components live in the `.jsx` source
files at the repo root. Those are **not** loaded by the browser directly — they
are precompiled to plain JavaScript in the **`build/`** folder, and the HTML
pages load the compiled `build/*.js` files.

### Why it's set up this way

The site used to compile the `.jsx` files **in the browser** at page load (using
Babel + React's development build). That worked on desktop but crashed iPhone
Safari ("Can't open this page") because compiling ~200KB of JSX at runtime ran
the phone out of memory. Precompiling once, ahead of time, removes that work from
the visitor's device entirely and uses the smaller, faster **production** build
of React.

## Source files vs. compiled files

| Source (edit these)   | Compiled output (generated — don't hand-edit) |
| --------------------- | --------------------------------------------- |
| `tweaks-panel.jsx`    | `build/tweaks-panel.js`                       |
| `shared.jsx`          | `build/shared.js`                             |
| `i18n.jsx`            | `build/i18n.js`                               |
| `direction-a.jsx`     | `build/direction-a.js`                        |
| `project-page.jsx`    | `build/project-page.js`                       |
| `app.jsx`             | `build/app.js`                                |

Every file in `build/` starts with a banner reminding you it's generated.

## Which page loads what

- **`index.html`** (homepage) → `tweaks-panel`, `shared`, `i18n`, `direction-a`, `app`
- **Project pages** (`talentolandia.html`, `millie-the-robot.html`,
  `manchester-united.html`, `hp-ar.html`, `interbank-360.html`,
  `hackers-worst-nightmare.html`, `ra-link-bcp.html`) → `shared`, `i18n`, `project-page`

## How to change a component

1. Edit the relevant **`.jsx`** file (the source of truth).
2. **Rebuild** the matching `build/*.js` file (see below).
3. Commit **both** the `.jsx` and the regenerated `build/*.js`, and push.

> If you edit a `.jsx` file but forget to rebuild, nothing changes on the live
> site — the browser only ever loads `build/*.js`.

## How to rebuild

The compiled files are just each `.jsx` run through Babel's React preset and
wrapped in an IIFE (so each file keeps its own scope). Any of these works:

### Option A — ask the assistant
The simplest path: ask the assistant that produced these files to "rebuild the
build/ folder from the .jsx sources." It regenerates all six in one step.

### Option B — Node / npm (local)
```bash
npm install --save-dev @babel/core @babel/preset-react
```
Then a small script, `build.mjs`:
```js
import { readFileSync, writeFileSync } from 'node:fs';
import { transformSync } from '@babel/core';

const files = [
  'tweaks-panel.jsx', 'shared.jsx', 'i18n.jsx',
  'direction-a.jsx', 'project-page.jsx', 'app.jsx',
];

for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const { code } = transformSync(src, { presets: ['@babel/preset-react'] });
  const out = `/* Compiled from ${f} — do not edit directly; edit the .jsx source and rebuild. */\n;(function(){\n${code}\n})();\n`;
  writeFileSync('build/' + f.replace(/\.jsx$/, '.js'), out);
  console.log('built build/' + f.replace(/\.jsx$/, '.js'));
}
```
Run it with `node build.mjs` whenever a `.jsx` file changes.

## Deploying

This is a static site (GitHub Pages). To deploy, commit and push the changed
files — make sure the **`build/` folder is included**. There is no server-side
step.
