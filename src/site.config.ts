/**
 * Global site configuration — identity and infrastructure values only.
 * Page copy and prose live in src/content/ (Markdown); this file is for
 * values that feed the nav, footer, meta tags, and structured data.
 */
export const SITE = {
  name: 'Richard Landy',
  role: 'Head of Software at BrightSpot Automation',
  // SEO fallback <meta name="description"> — page prose lives in src/content/copy/.
  description:
    'Computer vision and optical inspection for advanced manufacturing — from optics and lighting to models running at line rate.',
  url: 'https://richardlandy.me',

  // Set once and it appears in the footer, contact page, and JSON-LD.
  // Leave empty to hide LinkedIn everywhere.
  linkedin: 'https://www.linkedin.com/in/richard-landy/',

  // Path to the committed resume PDF (e.g. '/richard-landy-resume.pdf').
  // Leave empty to hide the download button until the PDF exists.
  resumePdf: '',

  // Formspree form ID — the part after /f/ in the endpoint URL
  // (e.g. 'xkgqzabc' for https://formspree.io/f/xkgqzabc).
  // Create a form at https://formspree.io, paste the ID here, done.
  // Leave empty to hide the contact form until it exists.
  formspreeId: '',

  // Page flags. A page set to false is offline until its content is ready:
  // it leaves the nav, the homepage, and the sitemap, and its URL returns the
  // site's 404 page. Flip to true to launch it. Home and Contact are always on.
  pages: {
    projects: true,
    blog: false,
    resume: true,
    services: false,
  },

  // Footer readout. No street address anywhere — coordinates only.
  coordinates: '40.00518° N · 105.16161° W',
} as const;
