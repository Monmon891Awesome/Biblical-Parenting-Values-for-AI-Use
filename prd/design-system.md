# Design System — "Firstlight"

> *"The LORD's lovingkindnesses… are new every morning."* — Lamentations 3:22–23 (NASB1995)

The visual and interaction language for the Biblical Parenting Guide app (both the **user app** and the **admin console**). This is the single source of truth for color, type, spacing, motion, and components. Every screen in the other PRDs references tokens defined here.

---

## 1. Brand direction

### 1.1 Name (proposal)
Working product name: **Firstlight**. Rationale for the owner:
- Ties to Lamentations 3:22–23 (mercies *new every morning*) — perfect for exhausted new parents who need dawn, not judgment.
- Warm, human, hopeful. **Does not shout "Christian brand"** — no cross-in-the-logo, no churchy signaling — yet Jesus is unmistakably the source of the light for anyone who looks closely (John 8:12, "I am the light of the world").
- Available-sounding, but **run a trademark + app-store search before commit** (App Store, Play, USPTO). Alternatives if taken: *Homeward*, *Rooted*, *The Well*, *Cornerstone Home*.

The name in this doc is "Firstlight" as a placeholder; swap globally when finalized.

### 1.2 The feeling (the psychology brief)
When a frightened, sleep-deprived new parent opens this app at 2 a.m., the *body* should relax before the mind reads a word. We are designing for the nervous system first:

| We want them to feel | We avoid making them feel |
|---|---|
| Welcomed to a table, not enrolled in a program | Behind, judged, or graded |
| Rest, warmth, breathing room | Urgency, clutter, alarm |
| "This was made by someone who loves me" | "This is a religious product marketing at me" |
| Quiet confidence and safety | Hype, gamified pressure, guilt |

The emotional archetype is **hospitality** — the home of a wise, gentle, unhurried friend who happens to be deeply grounded in Christ. Think the warmth of morning light through a kitchen window, a worn good book, a cup of coffee, a soft voice. Apple's restraint and craft; a home's warmth.

### 1.3 Design principles
1. **Rest over engagement.** Whitespace is a feature. The app should feel calm and finishable, never bottomless.
2. **Warm, not loud.** Authentic materials and natural tones over saturated "brand" colors. Christ is the inspiration, not the billboard.
3. **The Word is the hero.** Scripture gets the most beautiful typography on the screen (a treasured-book serif). UI recedes; the text shines.
4. **One thing per screen.** Especially for the weary: a single clear focus, a single clear next step.
5. **Gentle motion.** Things *breathe* in and out; nothing pops, bounces, or demands. Respect `prefers-reduced-motion`.
6. **Accessible by default.** WCAG 2.2 AA minimum; large tap targets; readable at arm's length one-handed while holding a baby.

---

## 2. Color

Warm, natural, low-saturation. Two moods share one palette. All pairings below meet WCAG AA for their stated use.

### 2.1 Core tokens (light — "Morning")
```
--canvas:        #FAF6EF   /* warm ivory — app background */
--surface:       #FFFFFF   /* cards, sheets (very slight warm tint ok: #FFFDFA) */
--surface-sunk:  #F2ECE1   /* wells, inputs, subtle insets */
--ink:           #2E2A26   /* primary text — warm near-black, never pure #000 */
--ink-muted:     #7A7268   /* secondary text, captions */
--ink-faint:     #A79E92   /* tertiary, placeholders */
--hairline:      #E7DFD3   /* borders, dividers (1px, low contrast) */

--sage:          #5E6B4F   /* PRIMARY — olive/sage; calm, natural, growth (Ps 128 olive) */
--sage-soft:     #EAEDE3   /* primary tint — selected states, chips */
--sage-deep:     #46503B   /* primary pressed / text-on-light-sage */

--clay:          #C67B52   /* WARM ACCENT — terracotta; hospitality, the table */
--clay-soft:     #F6E7DC   /* accent tint */

--dawn:          #E6B45C   /* HIGHLIGHT — soft gold; use sparingly for "firstlight"
                              moments: streak-free encouragement, answered prayer */
--peace:         #6E8B74   /* success / calm confirmations */
--care:          #B4573F   /* errors & warnings — muted clay-red, pastoral not alarming */
```

### 2.2 Core tokens (dark — "Evening")
Warm charcoal, never cold slate. Accents lift slightly for contrast.
```
--canvas:        #1E1B18
--surface:       #26221E
--surface-sunk:  #17140F
--ink:           #EDE7DE
--ink-muted:     #A79E92
--ink-faint:     #7A7268
--hairline:      #362F28
--sage:          #9BAA83
--sage-soft:     #2C3326
--sage-deep:     #B7C49F
--clay:          #DB9569
--clay-soft:     #3A2C21
--dawn:          #E6B45C
--peace:         #8FB097
--care:          #D98268
```

### 2.3 Usage rules
- **Sage is the primary action color** (buttons, active nav, links). Clay is the *warm* accent for hospitality moments (welcome, invite a spouse, share). Dawn is a rare highlight — a sunrise, not a neon sign.
- **Never** use `--care` (red) for anything a struggling parent didn't do "wrong." No red badges for missed days. Ever (see anti-shame rules, §7).
- Crisis/safety UI is the *one* place we allow firm, unmissable contrast — but still warm (`--care` on `--surface`, bold, with clear iconography), never panic-red.
- Maintain ≥ 4.5:1 for body text, ≥ 3:1 for large text / UI icons. Validate every token pairing in build (see the design/token test in the web-app PRD).

---

## 3. Typography

Two families. Scripture and headings feel like a cherished book; UI feels like a calm modern app.

```
--font-scripture: "Newsreader", "Source Serif 4", Georgia, serif;   /* Scripture + chapter titles */
--font-ui:        -apple-system, BlinkMacSystemFont, "SF Pro Text",
                  "Inter", system-ui, sans-serif;                    /* everything else */
--font-mono:      "SF Mono", "JetBrains Mono", monospace;            /* admin/code only */
```
- **Scripture** always renders in `--font-scripture`, slightly larger line-height (1.7), generous measure (max 66ch), often with a subtle left rule or `--surface-sunk` card — it should look *set apart* and beautiful. Translation label (KJV/NASB1995) in small caps `--ink-faint`.
- Ship self-hosted webfonts (Newsreader is open-source/OFL); do not hotlink. On Apple platforms UI leans on SF via the system stack for native feel.

### Type scale (UI, rem @ 16px base)
| Token | Size / line | Use |
|---|---|---|
| `display` | 2.5 / 1.15, serif | Chapter title, welcome |
| `h1` | 2.0 / 1.2 | Section headers |
| `h2` | 1.5 / 1.3 | Sub-sections |
| `h3` | 1.25 / 1.35 | Card titles |
| `body-lg` | 1.125 / 1.6 | Reading text (default in chapters) |
| `body` | 1.0 / 1.55 | UI text |
| `caption` | 0.875 / 1.4 | Labels, meta |
| `micro` | 0.75 / 1.3, small-caps | Translation tags, overlines |

Weights: 400 (body), 500 (UI emphasis), 600 (headings). Avoid heavy/black weights — they read as "loud."

---

## 4. Space, shape, elevation

- **Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 64, 96. Default screen padding 24; card padding 24–32. Be generous — crowding creates anxiety.
- **Radius:** `--r-sm 10px` (inputs, chips), `--r-md 16px` (cards, sheets), `--r-lg 24px` (feature cards, modals), `--r-pill 999px` (primary buttons).
- **Elevation:** soft, warm, low. Shadows are diffuse and tinted, never harsh.
  ```
  --shadow-1: 0 1px 2px rgba(46,42,38,.04), 0 2px 8px rgba(46,42,38,.06);
  --shadow-2: 0 4px 16px rgba(46,42,38,.08), 0 12px 32px rgba(46,42,38,.06);
  ```
  Prefer hairline borders + tint over heavy shadow. Frosted/translucent sheets (backdrop blur) are welcome for that Apple-material feel, with a warm tint.

---

## 5. Iconography & imagery

- **Icons:** thin, rounded line icons (≈1.75px stroke), calm and friendly. SF Symbols on Apple; an open set like Lucide (rounded) elsewhere for consistency. No hard corners, no aggressive glyphs.
- **No clichés.** Avoid stock crosses, praying-hands, doves, stained glass, dramatic sunbeams. If we need warmth, use **natural, human, tactile** imagery: morning light, linen, wood, an olive branch, hands and a table, a window. Abstract organic shapes and gentle grain/paper textures over literal religious symbols.
- **Illustration style (if used):** soft, hand-drawn, warm-neutral, lots of negative space — like a gentle children's-book vignette, but grown-up. One accent color max per illustration.
- **Photography:** candid, warm-lit, real families of varied ethnicity; never glossy stock or staged "perfect Christian family." Authenticity over aspiration.

---

## 6. Motion

- **Feel:** breathe, don't bounce. Durations 180–320ms; easing `cubic-bezier(0.22, 1, 0.36, 1)` (gentle ease-out). Page transitions: soft cross-fade + 8px rise.
- Micro-interactions: a quiet settle, a soft fade of a verse into view (like light arriving). Answered-prayer / chapter-complete: a single, gentle `--dawn` glow that blooms once and fades — a sunrise, not confetti.
- **Always** honor `prefers-reduced-motion: reduce` → cross-fades only, no movement.

---

## 7. Anti-patterns (hard bans — enforced in review)

These implement the [guardrails](../ai-values/guardrails.md) at the pixel level:
1. ❌ **No shame mechanics.** No red "missed" markers, no broken-streak animations, no "you haven't been here in 5 days" guilt. Progress is quiet and forgiving; a returning user is greeted with warmth, never a scold.
2. ❌ **No dark-pattern re-engagement.** No manipulative push copy ("We miss you!"), no infinite feed, no autoplay, no badge-count anxiety.
3. ❌ **No loud religiosity.** No aggressive branding, no ALL-CAPS Scripture, no guilt-driven CTAs.
4. ❌ **No dopamine gamification.** Points, leaderboards, and compulsive streaks are banned (Value 10 / guardrail G7). Gentle, optional milestones only.
5. ❌ **No engagement-time framing** anywhere in UI copy ("You've read 47 days in a row!"). Instead: "Go be with your family" nudges.

---

## 8. Component library (tokens → parts)

Core components both apps share (detailed states in the UX PRD). All meet AA, have 44×44px min tap targets, visible focus rings (`--sage`, 2px offset), and reduced-motion variants.

- **Button** — Primary (sage pill, white text), Secondary (surface + hairline), Ghost (text only), Warm (clay, for hospitality actions like "Invite your spouse"). One primary per screen.
- **Card** — `--surface`, `--r-md`, `--shadow-1`; the atomic unit of chapters, prayers, journal.
- **Scripture block** — serif, sunk surface or left-rule, translation tag; the app's signature element.
- **Sheet / Modal** — bottom sheet on mobile (frosted, warm), centered modal on desktop.
- **Input / Textarea** — sunk surface, generous padding, calm focus; journaling should feel like writing in a nice notebook.
- **Nav** — user app: bottom tab bar (mobile) / left rail (desktop), ≤ 5 items. Admin: left sidebar.
- **Quiet progress** — thin, soft, no numbers-as-pressure; "3 of 4 in this chapter," never percentages that shame.
- **Crisis banner** — the deliberate exception: firm, clear, always-reachable "I need help now" affordance (see UX PRD safety section).
- **Empty states** — warm, welcoming, never "you have nothing" — e.g., an empty prayer list reads "A quiet place for the names on your heart."

---

## 9. Voice in the UI (see also [PERSONALITY.md](PERSONALITY.md))
Microcopy is gentle, first-person-plural, unhurried. "Let's start here." "Whenever you're ready." "Rest tonight — He's keeping watch (Psalm 121:4)." Never "Complete your daily goal!" Buttons are invitations, not commands: "Begin," "Read together," "Sit with this," "Done for today."

---

## 10. Tokens as code (starter `tokens.css`)
Ship as CSS custom properties with a `[data-theme]` switch (system-default, user-overridable), consumed by Tailwind via `theme.extend`. The light/dark values in §2 are the canonical source; generate the Tailwind config and any native color assets from a single `tokens.json` so the web app and the Capacitor mobile shells stay in lockstep. Keep one file; never hardcode a hex outside it.
