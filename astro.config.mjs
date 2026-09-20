// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE } from './src/site.config';

// Pages flagged off in site.config.ts are not built, but the sitemap
// integration works from the route list, so exclude them here too.
const offline = Object.entries(SITE.pages)
  .filter(([, on]) => !on)
  .map(([key]) => `/${key}/`);

// /card is the business-card QR landing page: live and noindex, but kept out of
// the sitemap. (Its .vcf is an endpoint, which the sitemap never lists.)
const unlisted = [...offline, '/card/'];

export default defineConfig({
  site: SITE.url,
  integrations: [
    sitemap({
      filter: (page) => !unlisted.some((prefix) => new URL(page).pathname.startsWith(prefix)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
