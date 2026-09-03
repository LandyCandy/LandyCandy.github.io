# richardlandy.me — Personal Website Spec

**Owner:** Richard Landy — Head of Software at BrightSpot Automation
**Domain:** richardlandy.me (registered on AWS — Route 53)
**Date:** 2026-08-16
**Status:** Draft for approval

---

## 1. Purpose & positioning

A personal brand site for Richard Landy, establishing him as an expert voice in
**computer vision, machine vision, and optical inspection equipment for advanced
manufacturing**.

Three goals, in priority order:

1. **Conference launchpad** — a credible home base to point people to at
   VISION 2026 (Stuttgart, October 2026) and the Synthetic Data Symposium.
   Someone who meets Richard at a booth or talk should land here and immediately
   understand who he is and why he's worth following.
2. **Freelance / client pipeline** — a services page and low-friction contact
   path that converts conference conversations and search traffic into
   engagements. Services are offered **independently, on the side** of the
   BrightSpot Automation role: the homepage presents "Head of Software at
   BrightSpot Automation" as the current position, while the Services page is
   written in Richard's personal voice with a one-line note that engagements are
   independent and not affiliated with his employer.
3. **Professional presence** — the polished result when anyone Googles
   "Richard Landy".

**Audience:** machine vision engineers, manufacturing engineering managers,
automation integrators, and conference organizers. International, English-speaking.

**Language:** English only.

---

## 2. Site map

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | Hero with name, title, one-line positioning statement; highlights of projects and recent writing; clear paths to Services and Contact |
| Resume | `/resume` | Full HTML resume, scannable in-browser, with PDF download button |
| Projects | `/projects` | Grid of 3–6 featured projects; each links to a detail page |
| Project detail | `/projects/<slug>` | **Challenge → Approach** writeup with images; one page per project. Most work is experimental R&D — lead with the problem and the design, not before/after metrics (often no prior system to beat) |
| Blog | `/blog` | Article index, newest first |
| Blog post | `/blog/<slug>` | Individual articles (Markdown) |
| Services | `/services` | What Richard offers, engagement types, who it's for, call-to-action to contact |
| Contact | `/contact` | Contact form + LinkedIn link |
| 404 | `*` | On-brand not-found page |

Global footer on every page: LinkedIn, contact link, copyright.

---

## 3. Tech stack (chosen per "you pick what's best")

- **Framework:** [Astro](https://astro.build) — static output, Markdown content
  collections for blog posts and projects (adding a post = adding one `.md` file),
  near-zero JavaScript shipped, excellent Lighthouse scores out of the box.
- **Styling:** Tailwind CSS.
- **Content:** Astro content collections — `src/content/blog/` and
  `src/content/projects/` as Markdown with frontmatter (title, date, summary,
  tags, hero image).
- **Contact form:** Formspree (no backend, free tier 50 submissions/month,
  spam filtering included). The form ID lives in `src/site.config.ts`
  (`formspreeId`); the contact page hides the form until it is set.
  Submissions are emailed to Richard by Formspree — the address is configured
  in their dashboard and never appears in markup.
- **Hosting:** **GitHub Pages** (free). Switched from Netlify on 2026-09-03 to
  reuse the existing GitHub account and keep code and hosting in one place;
  the trade-off is that form handling moves to Formspree. A GitHub Actions
  workflow (`.github/workflows/deploy.yml`) builds and publishes on every push
  to `main`. HTTPS is provisioned automatically once DNS resolves.
- **DNS:** Domain stays on Route 53. `public/CNAME` pins the custom domain on
  the GitHub side. On the Route 53 side, add four `A` records for the apex
  pointing at GitHub Pages' IPs (185.199.108.153, 185.199.109.153,
  185.199.110.153, 185.199.111.153), optionally the matching `AAAA` records
  (2606:50c0:8000::153 through 2606:50c0:8003::153), and a `CNAME` for `www`
  pointing at `<github-username>.github.io`. GitHub redirects `www` → apex
  automatically. (No nameserver change needed.)
- **Global site config:** a single `src/site.config.ts` holds name, title,
  domain, LinkedIn URL, and any future social links. Every component reads from
  it — set the LinkedIn URL once there and it appears in the footer, contact
  page, and structured data. The same file holds per-page launch flags
  (`pages`): a page set to `false` leaves the nav, homepage, and sitemap and
  its URL returns the 404 page, so unfinished sections (Blog, Services) stay
  offline until their content is real.
- **Repo:** Git repository (to be initialized), hosted on GitHub. GitHub
  Actions is the CI/CD; in the repo settings, Pages → Source must be set to
  "GitHub Actions" rather than a branch.
- **Resume PDF:** Resume page gets a dedicated print stylesheet; the PDF is
  generated from that page and committed as a static asset
  (`/richard-landy-resume.pdf`) so the download button always works offline of
  any tooling. Both the page and the PDF **exclude phone, email, and address** —
  the contact form and LinkedIn are the only channels (see §6 privacy).

## 4. Design direction — "Bold & personal"

Theme concept: **"Inspection"** — the visual language of machine vision itself.
*Finalized 2026-08-17 via Claude Design; canonical rules live in
[design/DESIGN.md](design/DESIGN.md) and [design/tokens.json](design/tokens.json).*

- **Mood:** dark, technical, confident. Not a corporate template.
- **Palette (final):** graphite base (`#1A1D21`), **Laser Violet accent
  `#A48ED9`**, desaturated semantic pass green / fail red reserved for meaning.
- **Motifs (used sparingly):** bounding-box corner brackets around the headshot
  and project cards; a subtle scanline/reticle accent in the hero; monospace
  "readout" labels for metadata (dates, tags, stats) as a nod to inspection HUDs.
- **Typography:** a characterful display face for headings (e.g., Space Grotesk),
  a clean text face for body (e.g., Inter), monospace (e.g., JetBrains Mono) for
  accents only.
- **Imagery:** real project imagery preferred (inspection rigs, detection
  overlays, synthetic data renders) — with confidentiality-safe substitutes where
  client/employer work can't be shown.
- Fully responsive; the design must also survive a recruiter printing the resume page.

Two homepage mockup variants will be produced for sign-off before the full build.

---

## 5. Content plan

Content is being written **from scratch**; drafting is part of the project.
For each item: Richard supplies raw material (bullet points, links, facts), and
drafts are produced for his approval.

| Content | Source | Needed for |
|---|---|---|
| Positioning one-liner + hero copy | Draft from interview; propose 3–4 options | Home |
| Bio (short ~50w and long ~200w) | Draft from interview | Home, About section |
| Headshot | Richard to supply (availability TBD) | Home |
| Resume (roles, dates, accomplishments, skills, education) | Richard supplies facts; formatted + polished | Resume |
| 3–5 project writeups | Richard lists candidates; interview per project (problem, approach, results, what can be shown publicly) | Projects |
| Services offering | Draft from interview — see open question #1 | Services |
| 2–3 launch blog posts | Topic brainstorm, then draft. Candidate themes: synthetic data for inspection models, lessons from optical inspection deployments, build-vs-buy for vision systems. Timed so the site isn't empty at VISION 2026 | Blog |
| Headshot | Existing headshot available; Richard may replace it before launch (site built so swapping one image file updates it everywhere) | Home |
| LinkedIn URL | Richard to supply later — single global config var (see §3), placeholder until then | Footer, Contact |

---

## 5a. Confidentiality-safe project writeups

Projects involve employer and client work, so every writeup follows this
playbook. The goal: demonstrate expertise through **how Richard thinks and
works**, not through disclosing whose line the camera was pointed at.

**Framing rules**

1. **Anonymize the who, keep the what.** "A tier-1 automotive electronics
   manufacturer" or "a medical device line producing ~2M units/year" — industry
   and scale give credibility without identity. Never name clients; name
   BrightSpot only in the resume's role description, not in project stories.
2. **Write about the problem class, not the engagement.** Frame each piece
   around a reusable challenge ("detecting sub-surface defects on specular
   metals", "closing the sim-to-real gap with synthetic training data") rather
   than a specific contract. Expertise generalizes; contracts don't.
3. **Techniques over parameters.** Describe the approach and architecture at the
   level found in conference talks. Omit proprietary specifics: exact optical
   configurations, tuned thresholds, cycle times tied to a customer's line,
   custom fixture designs.
4. **Relative, rounded metrics.** "Cut false rejects by roughly 40%" is
   compelling and safe; "from 3.1% to 1.9% on line 7" is traceable. No absolute
   production volumes, yields, or costs attributable to a specific customer.
5. **No client-identifying imagery.** No part photos with identifiable
   geometry, logos, fixtures, or facility shots. Substitutes, in order of
   preference: synthetic renders (on-brand for the synthetic-data positioning),
   public datasets, staged bench setups, or abstracted diagrams of the
   inspection pipeline.

**Process rules**

6. **Contract check first.** Before drafting, check the relevant employment
   agreement / NDA / MSA for publicity and confidentiality clauses. When a
   writeup is borderline, get written OK from the employer or client — or drop
   that detail. Default is always omission.
7. **The recognition test.** Before publishing, ask: *could the customer's
   engineer recognize their own project from this?* If yes, generalize further.
8. **Fallback format.** Where an engagement can't be sanitized enough to be a
   story, cover the same ground as a **capability page** ("What it takes to
   deploy optical inspection for X") — no engagement narrative at all, same
   demonstration of depth.

---

## 6. Non-functional requirements

- **Performance:** Lighthouse ≥95 on all categories; no render-blocking third-party scripts.
- **SEO:** unique titles/descriptions per page, Open Graph + Twitter card images
  (branded template), `sitemap.xml`, `robots.txt`, structured data (`Person` +
  `Article` JSON-LD).
- **Accessibility:** WCAG AA contrast (checked against the dark palette), semantic
  landmarks, keyboard-navigable, alt text on all imagery.
- **Analytics:** **none.** No tracking scripts, no cookies, no cookie banner.
  For SEO feedback without visitor tracking, register the site with **Google
  Search Console** and **Bing Webmaster Tools** — these report search
  impressions, queries, and indexing health from the search-engine side and add
  zero code to the site.
- **Privacy / anti-scraping:** no email address, phone number, or postal address
  appears anywhere on the site, in the resume page, in the PDF, or in page
  source — the contact form and LinkedIn are the only channels. `Person` JSON-LD
  is limited to name, job title, and site/LinkedIn URLs. Form submissions go to
  Formspree, which emails Richard server-side (the address is configured in
  the Formspree dashboard, never exposed in markup).
- **Maintainability:** all content and copy is editable as Markdown — no code
  changes. Blog posts and projects are one file each; resume jobs
  (`src/content/resume/experience/`), education, the skills list
  (`src/content/copy/resume.md`), service offerings (`src/content/services/`),
  and page copy (`src/content/copy/`) are all Markdown too. `src/site.config.ts`
  holds only identity/infrastructure values (name, role, URLs, LinkedIn, PDF path,
  coordinates).

---

## 7. Open questions

1. **Project list** — which 3–5 projects to feature. Each will go through the
   §5a confidentiality playbook during drafting.
2. **Headshot** — keep the existing one or reshoot before VISION 2026 (swap is
   a one-file change either way).
3. ~~LinkedIn URL~~ — resolved 2026-09-03; set in the global site config.

*Resolved 2026-08-16: registrar (AWS/Route 53), services positioning
(independent, on the side), analytics (none — Search Console only), contact
privacy (form + LinkedIn only, no published PII).*

---

## 8. Suggested milestones (targeting VISION 2026, October 2026)

| Milestone | Target |
|---|---|
| Spec approved, open questions resolved | late Aug 2026 |
| Design mockups (2 homepage variants) approved | early Sep 2026 |
| Site built; resume + projects + services content drafted | mid Sep 2026 |
| Blog launch posts written; content review complete | late Sep 2026 |
| Deployed to richardlandy.me, DNS live, OG cards verified | ≥1 week before VISION 2026 |

---

## 9. Out of scope (for launch)

- German translation (site copy kept translation-friendly for a possible later version)
- Dedicated speaking/talks page (can be added when there are talks to list)
- Newsletter signup
- CMS/admin UI — content is edited as Markdown in the repo
