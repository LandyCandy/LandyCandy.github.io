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

export default defineConfig({
  site: SITE.url,
  integrations: [
    sitemap({
      filter: (page) => !offline.some((prefix) => new URL(page).pathname.startsWith(prefix)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
