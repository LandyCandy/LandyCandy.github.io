import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    // Lower numbers surface first on the homepage and project index.
    order: z.number().default(99),
    tags: z.array(z.string()).default([]),
    kind: z.string().default('R&D'),
    // HUD label on the card thumbnail, e.g. 'DEFECT · 0.987'.
    detection: z.string().default('DEFECT · 0.987'),
    challenge: z.string(),
    approach: z.string(),
    draft: z.boolean().default(false),
  }),
});

// One file per job; the Markdown body is the bullet list.
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resume/experience' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    period: z.string(),
    order: z.number().default(99),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resume/education' }),
  schema: z.object({
    degree: z.string(),
    institution: z.string(),
    year: z.string(),
    // Optional qualifier shown after the institution, e.g. a concentration.
    detail: z.string().optional(),
    order: z.number().default(99),
  }),
});

// One file per service offering; the Markdown body is the description.
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(99),
  }),
});

// Page-copy singletons (home.md, resume.md, services.md, contact.md).
// Each page reads its own file by id; all fields optional so files carry
// only what they need.
const copy = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/copy' }),
  schema: z.object({
    kicker: z.array(z.string()).optional(),
    tagline: z.string().optional(),
    intro: z.string().optional(),
    ctaHeading: z.string().optional(),
    skills: z.array(z.string()).optional(),
    skillGroups: z
      .array(z.object({ label: z.string(), items: z.array(z.string()) }))
      .optional(),
    disclaimer: z.string().optional(),
    // Resume "Recognition" section; year optional.
    awards: z
      .array(z.object({ title: z.string(), org: z.string(), year: z.string().optional() }))
      .optional(),
  }),
});

export const collections = { blog, projects, experience, education, services, copy };
