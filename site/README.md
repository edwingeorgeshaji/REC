# Edwin George Shaji

A static personal portfolio built around pink lilies, forest and sage greens,
Jalvair lettering, and restrained motion. No runtime dependencies, API keys,
external fonts, analytics, or contact service.

## Install, run, build

Requires Node.js 22 or newer. From this directory:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4173. Source changes rebuild automatically; refresh the
browser to see them. `npm ci` validates the lockfile; there are no packages to download.

```sh
npm run build
npm run check
npm run preview
```

Stop the dev server before starting preview, which serves the production output
at the same address. Deploy `dist/` to a static host with directory-index support.
No server-side application is required.

## Structure and editing

- `src/content/profile.mjs`: biography, links, education, toolkit, roles, certificates.
- `src/content/projects.mjs`: all project facts, contributions, outcomes and links.
- `src/templates/`: shared layout, homepage, collections, project pages and SVG art.
- `src/styles.css`: theme tokens, layout, responsive rules and motion styles.
- `src/app.js`: theme transition and copy-email control.
- `src/navigation.js`: persistent header and scroll-aware active indicator.
- `src/motion.js`: section reveals, portrait tilt and toolkit motion.
- `src/toolkit.js`: Toolkit subpage chapter states and linked scroll sizing.
- `public/`: optimized images, supplied fonts, font license and draft résumé.
- `assets/source/`: supplied original lily image, retained outside the public build.
- `scripts/`: static generator, local server and integrity checks.

Edit content files, never generated `dist/` pages. Projects need a unique `slug`;
the first two records with `featured: true` appear on the homepage. All projects get individual pages
and a listing at `/projects/`. Full records live at `/experience/`, `/about/`
`/certificates/` and `/toolkit/`. Do not invent unknown details or add missing-report placeholder blocks. Follow [DESIGN.md](DESIGN.md) for content schemas, ordering and interaction rules.

Certificate records use a stable `slug`, `title`, `type`, `issuer`, `date`,
`description`, `image`, and `published`. Set `published: false` to hide a draft.
Certificates have non-clickable collection cards, not detail pages; homepage
marquee links target `/certificates/#<slug>`. Both collections default to grid
and share a session-only view preference.
Replace `public/resume.pdf` to update the résumé while retaining inline viewing.

## Visuals and motion

The supplied lily image is served as a 101 KB WebP; its original PNG is retained.
The homepage portrait has 480px and 920px WebP variants; its original `edw.png`
is retained in `assets/source/`. The About subpage keeps its separate portrait.
Both supplied OTF fonts are included unchanged. Jalvair is used
for the hero name, Parceh for headings, and DM Sans for body text.
Georgia supplies punctuation and digits missing from the decorative Parceh font.
The DM Sans OFL license is included beside its self-hosted font.

The hero image remains static. Its bottom 18% blends into each theme. Scroll
reveals use native scrolling; the portrait has a small pointer tilt and the skill
constellation responds only while visible. The header remains visible, with a
retargetable section indicator. Theme changes use a circular reveal through
View Transitions where supported, with a color-transition fallback. R.E.C swipes
 down and refreshes home. All motion respects `prefers-reduced-motion`.

Content and navigation work without JavaScript. Direct email and social links
replace the contact form. There is no delivery provider to activate.

## Hosting and verification

### Adding experience

Edit `experienceRecords` in `src/content/profile.mjs`. Keep the newest role first
within each organisation and supply ISO `start` / `end` months (`YYYY-MM`) alongside
the display date; ongoing roles use `current: true` and `end: null`. The homepage
automatically shows the first four: ongoing roles, then most recently ended,
with newer start dates breaking ties. Keep `anchor` stable so saved links survive sorting.

When adding an experience with an AI assistant, automatically find the organisation's
official PNG logo on the web, download it into `public/assets/organisations/`, and
record its source here. Prefer official organisation sites or official brand repositories;
verify the organisation's LinkedIn URL. Do not invent or substitute a different logo.
Logos are stored locally, not fetched by visitors or at build time. All experience
logos are transparent, cropped and optically sized. The six current logos were supplied
by Edwin; original PNGs live in `assets/source/organisations/`. Self-contained SVGs
embed those originals with cropped viewBoxes. NeST also has a saved dark-theme
variant that lightens its black lettering without changing the coloured mark.

Résumé links open `/resume.pdf`. The local server and generated `_headers` specify
inline display and the download filename `Resume - Edwin George Shaji.pdf`.
Use a host that supports `_headers`, or configure the equivalent Content-Disposition
header on your host. The visitor's PDF/browser settings still control viewer behaviour.

The Sites preview keeps its existing owner-private audience. `.openai/hosting.json`
defines the static build. When the final domain is connected, update
`profile.siteUrl`; canonical URLs and the sitemap use it.

`npm run check` validates all 17 pages, internal links and anchors, unique IDs,
heading structure and shipped asset usage. Browser QA should cover 390, 768,
1280 and 1440 px, both themes, section jumps, keyboard focus, copy email,
collection/detail pages and the browser console.

Toolkit logo sources: PennyLane's official pennylane.ai icon, Qiskit/qiskit.org and n8n-io/n8n repository assets; MySQL and Docker marks from devicons/devicon. Brand marks belong to their respective owners. AI coding assistants are included in Tools & workflow. Toolkit labels use names only.


## Design reference

See [DESIGN.md](DESIGN.md) for the complete visual, responsive and motion specification, source snapshot and asset inventory.
