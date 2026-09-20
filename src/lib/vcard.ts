/**
 * vCard 3.0 (RFC 2426) serialiser for src/pages/richard-landy.vcf.ts.
 * Output is UTF-8 with CRLF line endings, no blank lines, and content lines
 * folded at 75 octets.
 */
import type { Card } from '../data/card';

const CRLF = '\r\n';
const MAX_OCTETS = 75;

/** Escape a text value: backslash, newline, comma, semicolon. */
export function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

/**
 * Fold one content line. Continuation lines start with a single space, which
 * counts toward their 75 octets. Splits land between code points so a
 * multi-byte UTF-8 sequence is never broken.
 */
export function foldLine(line: string): string {
  const encoder = new TextEncoder();
  const out: string[] = [];
  let current = '';
  let octets = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (octets + size > MAX_OCTETS) {
      out.push(current);
      current = ' ';
      octets = 1;
    }
    current += char;
    octets += size;
  }
  out.push(current);
  return out.join(CRLF);
}

/** REV timestamp, e.g. 20260921T120000Z. */
function revStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
}

export interface VCardOptions {
  rev: Date;
  /** 256×256 JPEG, embedded as PHOTO when present. */
  photoJpeg?: Buffer;
}

export function buildVCard(card: Card, { rev, photoJpeg }: VCardOptions): string {
  const { address: adr, urls } = card;
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeText(card.familyName)};${escapeText(card.givenName)};;;`,
    `FN:${escapeText(card.fullName)}`,
    `ORG:${escapeText(card.org)}`,
    `TITLE:${escapeText(card.title)}`,
    card.email && `EMAIL;TYPE=INTERNET,WORK:${escapeText(card.email)}`,
    card.phone && `TEL;TYPE=CELL:${escapeText(card.phone)}`,
    // URL values are URIs, not text — emitted as-is.
    `URL;TYPE=HOME:${urls.home}`,
    `URL;TYPE=WORK:${urls.work}`,
    // Apple's grouped-label convention: the URL shows as "LinkedIn" in iOS Contacts.
    urls.linkedin && `item1.URL:${urls.linkedin}`,
    urls.linkedin && 'item1.X-ABLabel:LinkedIn',
    `ADR;TYPE=WORK:;;;${escapeText(adr.city)};${escapeText(adr.region)};;${escapeText(adr.country)}`,
    `NOTE:${escapeText(card.eventNote)}`,
    photoJpeg && `PHOTO;ENCODING=b;TYPE=JPEG:${photoJpeg.toString('base64')}`,
    `REV:${revStamp(rev)}`,
    'END:VCARD',
  ].filter((line): line is string => Boolean(line));

  return lines.map(foldLine).join(CRLF) + CRLF;
}
