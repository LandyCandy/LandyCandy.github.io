import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { SITE } from '../site.config';
import { renderOgImage } from '../lib/og';

// Site-wide Open Graph / Twitter card, built once to /og.png and referenced
// from every page by src/layouts/Base.astro.
export const GET: APIRoute = async () => {
  const home = (await getEntry('copy', 'home'))?.data;
  const png = await renderOgImage({
    title: SITE.name,
    subtitle: SITE.role,
    kicker: home?.kicker,
    domain: new URL(SITE.url).host,
  });
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
