# richardlandy.me

Personal site for Richard Landy — computer vision and optical inspection for
advanced manufacturing. Built with [Astro](https://astro.build) and Tailwind,
hosted on GitHub Pages.

See [SPEC.md](SPEC.md) for goals, structure, and content rules, and
[design/DESIGN.md](design/DESIGN.md) for the visual system.

## Develop

```bash
npm install
npm run dev
```

## Deploy

Every push to `main` builds the site and publishes it via
`.github/workflows/deploy.yml`. The repo's Pages source must be set to
"GitHub Actions". The custom domain is pinned by `public/CNAME`.

## Editing content

All copy lives in `src/content/` as Markdown. Blog posts and project writeups
are one file each. Site-wide values (LinkedIn URL, resume PDF path, Formspree
form ID) live in `src/site.config.ts`.
