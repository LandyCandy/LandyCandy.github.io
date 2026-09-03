# richardlandy.me — "Inspection" Design System

Theme concept: the visual language of machine vision itself — inspection HUDs,
detection overlays, pass/fail readouts. Dark, technical, confident. Bold without
being loud: the motifs are used sparingly, like annotations on a frame, never
as decoration wallpaper.

The accent is **Laser Violet** `#A48ED9`; the pass green is reserved for
semantic pass states only.

---

## Color

### Neutrals

| Token | Hex | Role |
|---|---|---|
| `bg-0` | `#1A1D21` | Page background |
| `bg-1` | `#22262B` | Surface (cards, panels) |
| `bg-2` | `#2C3137` | Raised surface, hover fills |
| `line` | `#3A4046` | Borders, dividers |
| `line-soft` | `#2E3339` | Hairlines, subtle separation |
| `text-hi` | `#E8EBEE` | Headings, primary text |
| `text-mid` | `#A3ACB5` | Body text, descriptions |
| `text-low` | `#6E7883` | Readout labels, metadata |

### Semantic

| Token | Hex | Role |
|---|---|---|
| `pass` | `#6BC495` | Pass/success states, positive stats |
| `fail` | `#D9636F` | Fail/error states — rare, deliberate |

### Accent

| Token | Hex | Role |
|---|---|---|
| `accent` | `#A48ED9` | Buttons, links, brackets, detection motifs |
| `accent-ink` | `#1C1330` | Text on accent fills |
| `accent-glow` | `rgba(164,142,217,.16)` | Hover rings, focus glow |

**Rules:** the accent earns attention and never competes with `pass` green; `fail` red appears only for
genuine error/contrast moments (never decoratively). All text colors meet WCAG
AA on their backgrounds.

## Typography

| Face | Usage |
|---|---|
| **Space Grotesk** (500/600/700) | Display — headings, buttons, nav |
| **Inter** (400/500/600) | Body text |
| **JetBrains Mono** (400/500) | Readouts only — metadata, labels, stats, hex values |

### Scale

| Step | Size/Line | Face | Usage |
|---|---|---|---|
| Display XL | 64/1.05, -0.02em | Space Grotesk 700 | Hero H1 |
| Display L | 40/1.1, -0.01em | Space Grotesk 700 | Page titles |
| Heading | 28/1.2 | Space Grotesk 600 | Section heads, card titles |
| Body | 16/1.65 | Inter 400 | Paragraphs |
| Small | 14/1.5 | Inter 400 | Secondary text, captions |
| Readout | 11/1.4, +0.14em, uppercase | JetBrains Mono 500 | Metadata labels |

**Rule:** mono is a seasoning, not a base — if a block of running text is set
in JetBrains Mono, it's wrong. Readouts are short: labels, stats, coordinates.

## Motifs

1. **Bounding-box brackets** — corner brackets (2px, accent color) frame the
   headshot and project thumbnails, echoing detection overlays. Two corners
   (top-left + bottom-right) for cards; all four for the headshot.
2. **Detection labels** — the headshot carries a mono tag like
   `PERSON · 0.998`, project thumbnails carry `FRAME 0042 · PASS`. Playful,
   used once per view at most.
3. **Readout metadata** — dates, tags, and stats set as mono readouts, e.g.
   `// DEFECT DETECTION · 2026` or `FALSE REJECTS −40%`.
4. **Reticle/scanline** — a hairline crosshair or single scan line as a subtle
   background accent in the hero only. Static, low contrast, never animated
   distractingly.

**Restraint rule:** max two motifs visible per viewport. The content reads
first; the HUD garnish reads second.

## Spacing & layout

- Base unit 4px; common steps 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.
- Max content width 1120px; generous vertical rhythm (96px between page sections).
- Corners: 2px radius on interactive elements (sharp, instrument-like), 4px on cards. No pills.
- Borders over shadows: 1px `line` borders define surfaces; shadows minimal.

## Components

- **Primary button:** accent background, `accent-ink` text, Space Grotesk 600,
  2px radius; hover lifts with `accent-glow` ring.
- **Ghost button:** 1px `line` border, `text-hi` label; hover swaps border to accent.
- **Mono link:** JetBrains Mono, accent color, `→` suffix; hover underlines.
- **Tag chip:** mono readout in a 1px-bordered chip, `bg-1` fill.
- **Project card:** `bg-1` surface, thumbnail with brackets + detection label,
  readout metadata line, Space Grotesk title, then a two-column
  **Challenge / Approach** pair with accent mono labels. Most work is
  experimental R&D — lead with the problem and the design, not before/after
  metrics (there is often no prior system to beat).

## Voice

Direct, technical, first person. Short sentences. Confident without hype —
metrics and specifics over adjectives. No exclamation marks.

## Do / Don't

- **Do** keep pages predominantly neutral; accent earns attention.
- **Do** use real numbers in readouts (rounded, confidentiality-safe).
- **Don't** animate the motifs beyond subtle hover states.
- **Don't** use fail-red for emphasis; it means something.
- **Don't** set body copy in mono or display faces.
