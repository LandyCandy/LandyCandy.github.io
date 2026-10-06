/**
 * Contact-card data — the single source for /card and /richard-landy.vcf.
 * Identity values shared with the rest of the site come from site.config.ts.
 */
import { SITE } from '../site.config';

export interface Card {
  eventNote: string;
  givenName: string;
  familyName: string;
  fullName: string;
  title: string;
  org: string;
  urls: { home: string; work: string; linkedin: string };
  address: { city: string; region: string; country: string };
  /** Emitted as EMAIL;TYPE=INTERNET,WORK when set. */
  email?: string;
  /** E.164, e.g. '+13035550100'. Emitted as TEL;TYPE=CELL when set. */
  phone?: string;
}

export const CARD: Card = {
  // Change this line before each conference — it becomes the contact's NOTE.
  eventNote: 'Met at VISION 2026, Stuttgart. Machine vision / NIR optical inspection for photovoltaics.',

  givenName: 'Richard',
  familyName: 'Landy',
  fullName: SITE.name,
  title: 'Head of Software',
  org: 'BrightSpot Automation',
  urls: {
    home: SITE.url,
    work: 'https://brightspotautomation.com',
    linkedin: SITE.linkedin,
  },
  address: { city: 'Boulder', region: 'CO', country: 'USA' },

  // Optional. SPEC §6 keeps email and phone off the site, so these stay out of
  // the vCard until filled in deliberately.
  email: 'landy@brightspotautomation.com',
  // phone: '+13035550100',
};
