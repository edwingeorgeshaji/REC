# Edwin George Shaji

A personal portfolio with a blueberry photograph, a gold serif wordmark,
coordinated light/dark themes, and dedicated project pages.

## Run locally

Requires Node.js 22 or newer. No package installation is needed.

```sh
npm run dev
```

Open https://edwingeorgeshaji.com. After source edits, run `npm run build` and refresh.

```sh
npm run build
npm run check
```

For the isolated interaction tests, install development dependencies once with
`npm ci`, then run `npm test`. Happy DOM is used only in tests and is never
shipped to visitors. These tests exercise state and fallbacks, not visual layout.

The build generates static HTML in `dist/`. Content is readable without
JavaScript; the small client script handles theme preference, scroll-aware
navigation, mobile navigation, and the contact return address.

## Structure

```text
src/
  content/profile.mjs   Biography, links, education, skills, certificates, roles
  content/projects.mjs Projects, contributions, outcomes, optional media
  templates/           Shared layout, home, project pages, icons, illustrations
  styles.css           Theme tokens, layout, components, responsive rules
  motion.css           Entrance, reveal, artwork, hover, and page animations
  app.js               Progressive interactions
  motion.js            Motion lifecycle, theme reveal, reversible disclosures
public/
  assets/              Original hero image and replaceable résumé
  fonts/               Self-hosted fonts
scripts/
  build.mjs            Static page generation
  serve.mjs            Local development server
  check.mjs            Content and internal resource checks
```

## Editing content

Edit the content files instead of generated HTML. Add projects with a unique
lowercase hyphenated `slug`. Set `featured: true` to include a project in the
main grid. Other projects appear in the expandable archive. Each project gets
its own generated page.

Dates, repositories, demos, and media can be `null`. They will be omitted.
Do not fill gaps with guesses. Outstanding factual details are recorded in
the workspace's `docs/portfolio-brief.md`.

To replace an illustration, add an image to `public/assets/projects/`, set
`image: '/assets/projects/example.webp'`, and provide meaningful `imageAlt`.
The original concept illustrations are labelled as such, never as screenshots.

Certificates support `title`, `type`, `issuer`, `date`, `url`, and `published`.
The initial entries are certificate titles from the supplied résumé. Issuers,
verification links, and uploaded certificate files are still pending. Set
`published: false` to keep a draft record out of the site.

Replace `public/assets/edwin-george-shaji-resume.pdf` with the final résumé.
The current file is the placeholder supplied by Edwin. Set `profile.portrait`
when a portrait is supplied; there is no fake portrait or placeholder image.

## Typography

Parceh is the hero font, supplied in `fonts/Parceh.otf` and served from
`public/fonts/parceh.otf`. Set `profile.heroFont` to change the font asset.
Cormorant Garamond is used for section headings and as the hero fallback.
Manrope is used for body copy. Google Fonts assets are self-hosted;
the page does not request fonts from Google at runtime. Their OFL license
texts are retained in `public/fonts/`.

## Themes and navigation

Colour tokens live at the top of `src/styles.css`. The hero title stays
`#FFE79F` in both themes. The original photo blends to `#0c1724` in dark mode
and `#e6edf3` in light mode. The initial theme is dark; the chosen preference
persists locally. Selecting text follows the theme's blueberry/gold palette.

The header hides when scrolling down and returns when scrolling up. It stays
available while the mobile menu is open or a navigation control has visible
keyboard focus. The theme switch remains available at the upper right.

## Motion

The hero reveals each word through a mask while the photograph slowly settles.
Pointer and scroll movement add restrained depth without taking over native
scrolling. Section content reveals as it enters the viewport; anything already
visible on arrival, including a section linked by a URL hash, stays readable.

Project panels tilt slightly on precise pointers and their SVG concept diagrams
animate only while on screen. Touch devices keep straightforward interactions.
Experience panels and the archive animate opening and closing, including rapid
reversals. The navigation indicator tracks the current or hovered section.

Theme switching uses a circular View Transition when supported and a colour
fade otherwise. Compatible browsers also crossfade project-page navigation.
Every enhancement respects reduced-motion preferences, including changes during
the visit. Keyboard focus reveals hidden content immediately. No scroll hijacking,
custom cursor, animation framework, or continuous offscreen rendering is used.

Motion settings and timings live in `src/motion.css` and `src/motion.js`.

## Contact delivery

The native HTML form posts to FormSubmit at Edwin's supplied email address.
Browser validation runs first. FormSubmit handles the spam check, processing,
and success redirect. No delivery secrets or account credentials are embedded.
The site does not show a fabricated success message after a failed request.

**One-time setup still required:** submit a real test message on the deployed
site, then confirm the activation email in Edwin's inbox. Check that subsequent
messages arrive and reply correctly. Until that is done, email delivery is
unverified. Direct `mailto:` contact remains available. The initial build did
not send a test message or trigger an activation email.

Documentation: https://formsubmit.co/

## Hosting

This project is configured as an owner-private Sites preview in
`.openai/hosting.json`. Generated files can also be hosted by any static host.
When the final domain is purchased, update `profile.siteUrl`, connect the
domain, and rebuild. Absolute social metadata and the sitemap derive from it.
The contact return URL follows the active origin automatically.

## Verification and launch checklist

- Build and check all generated pages and internal resources.
- Check desktop/mobile layouts, both themes, keyboard navigation, archive,
  experience disclosures, header scroll behaviour, and project pages.
- Inspect Parceh’s metrics and hero text wrapping on small screens.
- Replace the placeholder résumé; add the approved portrait/screenshots.
- Activate and verify contact email delivery.
- Update changing statuses (especially SIH results and current roles).
- Confirm private/public audience and custom domain before public launch.

Browser automation was blocked by the environment's URL policy during the
initial build. Source and HTTP checks do not replace visual browser review.
