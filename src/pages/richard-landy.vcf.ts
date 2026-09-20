import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { CARD } from '../data/card';
import { buildVCard } from '../lib/vcard';

// Contact file linked from /card, built once to /richard-landy.vcf.
// Like /card, this URL is tied to printed business cards — do not rename it.

// Same source file as the hero <Image> and the OG card (see src/lib/og.ts for
// why the path resolves from the project root).
const HEADSHOT = path.join(process.cwd(), 'src/assets/headshot.jpg');
const PHOTO_SIZE = 256;
const PHOTO_MAX_BYTES = 20 * 1024;
// Where the square crop sits in the portrait's spare height (0 = top, 1 = bottom).
// 0.35 keeps the hair and the full beard inside the circular mask Contacts apps apply.
const PHOTO_CROP_BIAS = 0.35;

// Square crop for the contact photo, stepping JPEG quality down until it fits
// the size budget. A missing headshot skips PHOTO rather than failing the build.
async function contactPhoto(): Promise<Buffer | undefined> {
  let source: Buffer;
  try {
    source = await readFile(HEADSHOT);
  } catch {
    console.warn(`[vcf] ${HEADSHOT} not found — PHOTO omitted from the vCard.`);
    return undefined;
  }
  const { width = 0, height = 0 } = await sharp(source).metadata();
  const side = Math.min(width, height);
  const square = sharp(source)
    .extract({
      left: Math.round((width - side) / 2),
      top: Math.round((height - side) * PHOTO_CROP_BIAS),
      width: side,
      height: side,
    })
    .resize(PHOTO_SIZE, PHOTO_SIZE);
  for (let quality = 82; quality >= 40; quality -= 6) {
    const jpeg = await square.clone().jpeg({ quality, mozjpeg: true }).toBuffer();
    if (jpeg.length <= PHOTO_MAX_BYTES) return jpeg;
  }
  console.warn('[vcf] headshot does not fit the PHOTO size budget — PHOTO omitted from the vCard.');
  return undefined;
}

export const GET: APIRoute = async () => {
  const vcf = buildVCard(CARD, { rev: new Date(), photoJpeg: await contactPhoto() });
  return new Response(vcf, {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
  });
};
