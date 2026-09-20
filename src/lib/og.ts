/**
 * Branded Open Graph / Twitter card (1200×630), rendered at build time by
 * src/pages/og.png.ts. Mirrors the homepage hero: readout kicker, name, role,
 * and the headshot framed by bounding-box brackets with a detection label.
 *
 * satori lays out the element tree and converts all text to paths; sharp
 * rasterises the resulting SVG. No system fonts are needed on the build
 * machine — the faces come from the @fontsource packages the site already uses.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// Tokens from design/DESIGN.md.
const T = {
  bg: '#1A1D21',
  line: '#3A4046',
  hi: '#E8EBEE',
  mid: '#A3ACB5',
  low: '#6E7883',
  accent: '#A48ED9',
} as const;

// Same aspect ratio as the hero frame (320×400).
const FRAME_W = 300;
const FRAME_H = 375;
const PAD = 72;

// Paths resolve from the project root: the built endpoint runs from a bundled
// chunk, so import.meta.url would not point back into src/. The headshot is
// the same file the hero <Image> uses — swapping it updates both.
const ROOT = process.cwd();
const HEADSHOT = path.join(ROOT, 'src/assets/headshot.jpg');
const FONT_DIR = path.join(ROOT, 'node_modules/@fontsource');

type Style = Record<string, string | number>;
interface El {
  type: string;
  props: Record<string, unknown>;
}

// satori takes a React-like element tree; plain objects keep JSX out of it.
const h = (type: string, props: Record<string, unknown>, children?: unknown): El => ({
  type,
  props: children === undefined ? props : { ...props, children },
});

// Readout: the .ro class from global.css scaled for a 1200px canvas.
const mono: Style = {
  fontFamily: 'JetBrains Mono',
  fontWeight: 500,
  fontSize: 16,
  letterSpacing: 2.2,
};

async function font(pkg: string, file: string, name: string, weight: 500 | 700) {
  const data = await readFile(path.join(FONT_DIR, pkg, 'files', file));
  return { name, weight, style: 'normal' as const, data };
}

// One L-shaped bracket: two 2px accent bars anchored to a shared corner,
// sitting 8px outside the frame like the .corner-* classes in global.css.
function bracket(corner: 'tl' | 'tr' | 'bl' | 'br'): El {
  const arm = 22;
  const vertical = corner[0] === 't' ? 'top' : 'bottom';
  const horizontal = corner[1] === 'l' ? 'left' : 'right';
  const bar: Style = {
    position: 'absolute',
    backgroundColor: T.accent,
    [vertical]: 0,
    [horizontal]: 0,
  };
  return h(
    'div',
    {
      style: {
        position: 'absolute',
        display: 'flex',
        width: arm,
        height: arm,
        [vertical]: -8,
        [horizontal]: -8,
      },
    },
    [h('div', { style: { ...bar, width: 2, height: arm } }), h('div', { style: { ...bar, width: arm, height: 2 } })],
  );
}

export interface OgProps {
  title: string;
  subtitle: string;
  /** Readout terms above the title; the last one is set in the accent colour. */
  kicker?: readonly string[];
  /** Footer readout, e.g. the site host. */
  domain?: string;
}

export async function renderOgImage({ title, subtitle, kicker = [], domain }: OgProps): Promise<Buffer> {
  const [fonts, headshot] = await Promise.all([
    Promise.all([
      font('space-grotesk', 'space-grotesk-latin-700-normal.woff', 'Space Grotesk', 700),
      font('space-grotesk', 'space-grotesk-latin-500-normal.woff', 'Space Grotesk', 500),
      font('jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff', 'JetBrains Mono', 500),
    ]),
    // Pre-crop at 2× so the card stays crisp; embedding the full 1766×2208
    // source would only bloat the intermediate SVG.
    sharp(HEADSHOT)
      .resize(FRAME_W * 2, FRAME_H * 2, { fit: 'cover' })
      .jpeg({ quality: 88 })
      .toBuffer(),
  ]);
  const headshotSrc = `data:image/jpeg;base64,${headshot.toString('base64')}`;

  const terms = kicker.map((t) => t.toUpperCase());
  const head = terms.slice(0, -1);
  // e.g. "// MACHINE VISION · OPTICAL INSPECTION ·" followed by the accent tail.
  const kickerHead = head.length > 0 ? `// ${head.join(' · ')} ·` : '//';
  const kickerTail = terms.at(-1);

  const tree = h(
    'div',
    {
      style: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        padding: PAD,
        backgroundColor: T.bg,
        color: T.hi,
      },
    },
    [
      // Copy column
      h('div', { style: { display: 'flex', flexDirection: 'column', flex: 1, paddingRight: 64 } }, [
        terms.length > 0
          ? h(
              'div',
              { style: { display: 'flex', flexWrap: 'wrap', columnGap: 10, rowGap: 4, ...mono, color: T.low } },
              [h('span', {}, kickerHead), h('span', { style: { color: T.accent } }, kickerTail)],
            )
          : null,
        h(
          'div',
          {
            style: {
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              marginTop: 22,
            },
          },
          title,
        ),
        h(
          'div',
          {
            style: {
              fontFamily: 'Space Grotesk',
              fontWeight: 500,
              fontSize: 30,
              lineHeight: 1.3,
              color: T.mid,
              marginTop: 18,
            },
          },
          subtitle,
        ),
      ]),
      // Headshot with detection label and bounding-box brackets
      h('div', { style: { position: 'relative', display: 'flex', width: FRAME_W, height: FRAME_H } }, [
        h(
          'div',
          { style: { position: 'absolute', top: -36, left: -8, ...mono, color: T.accent } },
          'PERSON · 0.998',
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              width: FRAME_W,
              height: FRAME_H,
              borderRadius: 4,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: T.line,
              overflow: 'hidden',
            },
          },
          [
            h('img', {
              src: headshotSrc,
              width: FRAME_W,
              height: FRAME_H,
              style: { width: FRAME_W, height: FRAME_H, objectFit: 'cover' },
            }),
          ],
        ),
        bracket('tl'),
        bracket('tr'),
        bracket('bl'),
        bracket('br'),
      ]),
      // Footer readout
      domain
        ? h('div', { style: { position: 'absolute', left: PAD, bottom: PAD - 8, ...mono, color: T.low } }, domain)
        : null,
    ],
  );

  const svg = await satori(tree as never, { width: OG_WIDTH, height: OG_HEIGHT, fonts });
  return sharp(Buffer.from(svg)).png().toBuffer();
}
