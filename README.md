<p align="center">
  <img src="site/public/favicon.svg" width="48" height="48" alt="Edwin George Shaji logo" />
</p>
<h1 align="center">Edwin George Shaji - Portfolio</h1>
<p align="center">
  My personal portfolio, built with HTML, CSS, vanilla JavaScript, and a Node.js static site generator.
  A home for my projects, experience, and explorations in software, AI, and quantum computing.
</p>
<p align="center">
  ♪ <a href="https://edwingeorgeshaji.com">Visit the website</a> ♪
</p>

<p align="center">
  <img src="site/docs/hero-preview.png" width="100%" alt="Edwin George Shaji's portfolio hero featuring pink lilies and handwritten lettering" />
</p>

## 🛠 Set-up

Requires **Node.js 22 or newer**. From the repository root:

1. Enter the site directory and install dependencies.

   ```sh
   cd site
   npm ci
   ```

2. Start the development server.

   ```sh
   npm run dev
   ```

   Open [localhost:4173](http://127.0.0.1:4173). Changes to `src/` and `public/` rebuild automatically; refresh your browser to see them.

## 🚀 Build and run for production

Run these commands inside `site/`:

1. Generate and validate the static site.

   ```sh
   npm run build
   npm run check
   ```

2. Preview the production build locally.

   ```sh
   npm run preview
   ```

   Stop the development server first: both commands use port `4173`.

Deploy the contents of `site/dist/` to a static host. For Git-based hosting, set the root directory to `site`, the build command to `npm run build`, and the output directory to `dist`.

## 🎨 Colour codes

| Colour | Dark theme | Light theme |
| --- | --- | --- |
| Background | ![#101d17](https://placehold.co/15/101d17/101d17.png) `#101d17` | ![#e7eddf](https://placehold.co/15/e7eddf/e7eddf.png) `#e7eddf` |
| Surface | ![#192b21](https://placehold.co/15/192b21/192b21.png) `#192b21` | ![#d9e4d2](https://placehold.co/15/d9e4d2/d9e4d2.png) `#d9e4d2` |
| Text | ![#e8ede2](https://placehold.co/15/e8ede2/e8ede2.png) `#e8ede2` | ![#263e2e](https://placehold.co/15/263e2e/263e2e.png) `#263e2e` |
| Muted text | ![#a3b3a6](https://placehold.co/15/a3b3a6/a3b3a6.png) `#a3b3a6` | ![#586f5d](https://placehold.co/15/586f5d/586f5d.png) `#586f5d` |
| Accent | ![#dfb7c5](https://placehold.co/15/dfb7c5/dfb7c5.png) `#dfb7c5` | ![#824b61](https://placehold.co/15/824b61/824b61.png) `#824b61` |
| Borders | ![#354b3c](https://placehold.co/15/354b3c/354b3c.png) `#354b3c` | ![#b6c8af](https://placehold.co/15/b6c8af/b6c8af.png) `#b6c8af` |

For content editing and design guidance, see [site/README.md](site/README.md) and [site/DESIGN.md](site/DESIGN.md).
