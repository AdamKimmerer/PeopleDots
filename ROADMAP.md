# Roadmap

The goal for v1 is a static web app with no server. You pick or upload a photo, place dots with a mouse, touch or keyboard, and export a full-resolution image to download or share. Your photos never leave your device.

The 2021 prototype is being replaced rather than repaired. Most of its dependencies are deprecated:

- Create React App was sunset in 2025.
- `node-sass` is end-of-life.
- Hammer.js hasn't had a release since 2016.
- Twitter as a sharing target is gone.

The export server isn't needed once export happens in the browser. The visual design (palette, typography, layout) carries over.

## Done

- [x] MIT license
- [x] Removed committed API keys from the code and the git history
- [x] Removed third-party photos the project doesn't have the rights to; replaced them with original placeholders
- [x] `.env.example` and `.gitignore` cleanup

## 1. Clean slate

- [ ] Tag the 2021 code as `legacy-2021`; remove `DotsNode/`, `dots-react/` and unused assets from `main`
- [ ] Scaffold Vite + React + TypeScript at the repo root
- [ ] Add lint and format (ESLint + Prettier, or Biome), Vitest and Playwright
- [ ] Self-host the Inconsolata font (no Google Fonts requests)
- [ ] Port the palette, typography and spacing to CSS custom properties, using native CSS nesting instead of Sass
- [ ] Add GitHub Actions CI on every PR: `npm ci`, lint, typecheck, unit tests, browser tests, build. Pin actions to commit SHAs; use a read-only token.
- [ ] Turn on Dependabot for npm and Actions; turn on secret scanning and push protection
- [ ] Hosting with a preview deploy for each PR (Cloudflare or Netlify, both of which support a `_headers` file)

## 2. Editor core

- [ ] Dot model: `{ id, color, cx, cy, r }` in the photo's own pixel coordinates (centre and radius, the same unit on both axes)
- [ ] One update function for add, move, resize, recolour, delete and bring-to-front, with undo/redo
- [ ] Unit tests for coordinate conversion, clamping and undo
- [ ] Render as an `<img>` plus an `<svg viewBox>` overlay in an aspect-ratio box; the photo always fits the viewport
- [ ] Pointer Events: select and drag in one gesture; two-finger pinch around the dot's centre; a resize handle; scroll-wheel and trackpad resize; `touch-action: none`
- [ ] Keyboard: Delete; arrow keys to nudge (Shift for larger steps); `[` `]` to resize; Cmd/Ctrl+Z to undo and Shift+Cmd/Ctrl+Z to redo; Esc to deselect; Tab to cycle dots
- [ ] Place a new dot by tapping or clicking the photo; swatches set the current colour and recolour the selected dot
- [ ] Desktop layout (toolbar beside the photo) and mobile layout (toolbar below it)
- [ ] Accessibility: labelled, focusable dots and buttons; visible focus; contrast checked

## 3. Choosing a photo

- [ ] Upload with a file picker, drag-and-drop or paste
- [ ] Validate untrusted files: images only (no SVG); cap file size and decoded pixel count; clear errors (e.g. HEIC in browsers that can't decode it)
- [ ] Library of public-domain or CC0 photos (e.g. Met Open Access, Smithsonian Open Access, Library of Congress), with credits
- [ ] Generate a thumbnail and a capped full-size version of each library image
- [ ] Masonry grid with CSS `columns`, with lazy-loaded thumbnails
- [ ] Save work in progress (photo and dots) in IndexedDB; browser Back moves between steps

## 4. Export and share

- [ ] Canvas export at the photo's full resolution; scale down to stay under iOS Safari's canvas size limit
- [ ] Black and white applied per pixel (Safari doesn't enable `ctx.filter`)
- [ ] Prepare the image when the Share step opens, so the Share button responds immediately
- [ ] Share via `navigator.share({ files })` where supported; Download everywhere; Copy caption
- [ ] Test on iOS Safari, Android Chrome, and desktop Chrome, Safari and Firefox

## 5. Content and legal

- [ ] Real home-page copy explaining Baldessari's idea, with quotes attributed to their sources
- [ ] Example images made with the app from library photos
- [ ] About and privacy page (no uploads, no accounts, no cookies)
- [ ] Title, description, social preview tags, icons and web app manifest
- [ ] `SECURITY.md` with a contact address

## 6. Security hardening

- [ ] Content Security Policy and other security headers in `public/_headers`, run in report-only mode on previews first, then enforced
- [ ] No `innerHTML` or `dangerouslySetInnerHTML` (enforced by a lint rule)
- [ ] Keep runtime dependencies to React and React DOM; commit the lockfile
- [ ] Check the deployed headers with Mozilla's HTTP Observatory

## 7. Release

- [ ] Custom domain with HTTPS
- [ ] Beta with a handful of people on different devices
- [ ] Launch: seed a hashtag with example images; post on Bluesky, Mastodon, Instagram and Threads

## Later

- Crop
- Android share target (a PWA you can share a photo into)
- A gallery of other people's results
- Shapes other than dots
