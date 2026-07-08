# HANDOFF — Building Firstlight from here

**Read this first if you are the build agent (Opus / Claude Code) or a developer picking up implementation.** This is the single door into the work. It tells you the mission, what already exists and runs, the exact next tasks with acceptance criteria, and how "done" is defined.

---

## 0. The mission (never violate this)
> Lead Christians back to reliance on God — back to Jesus Christ, through His Holy Spirit — **never** toward reliance on the AI or the app. A feature that makes a tired parent feel more behind, more attached to a screen, or more dependent on this tool than on God and their church is wrong by definition. Build it warmer, smaller, and pointed outward.

Full law: [`AGENTS.md`](AGENTS.md) → [`ai-values/VALUES.md`](ai-values/VALUES.md) + [`ai-values/guardrails.md`](ai-values/guardrails.md).

## 1. Reading order before you write code
1. [`AGENTS.md`](AGENTS.md) — build guide, stack, conventions, the "heart check."
2. [`ai-values/VALUES.md`](ai-values/VALUES.md) + [`guardrails.md`](ai-values/guardrails.md) — the non-negotiables (enforced in product mechanics, not just copy).
3. [`prd/PERSONALITY.md`](prd/PERSONALITY.md) — voice; the "three hats."
4. [`prd/design-system.md`](prd/design-system.md) — tokens, type, motion, anti-patterns.
5. [`prd/web-app-prd.md`](prd/web-app-prd.md) — architecture, data model, API, auth, security, privacy, a11y, CI gates.
6. [`prd/user-experience-prd.md`](prd/user-experience-prd.md) — screen-by-screen flows + microcopy.
7. [`prd/admin-console-prd.md`](prd/admin-console-prd.md) — the admin surface.
8. [`prd/biblical-parenting-guide-app-prd.md`](prd/biblical-parenting-guide-app-prd.md) — the 16 chapters, metrics, mobile/Java path.
9. Content contract: [`content/README.md`](content/README.md) + [`content/schema/chapter.schema.json`](content/schema/chapter.schema.json).

## 2. What already exists (don't rebuild it)
| Area | State | Where |
|---|---|---|
| Research library | ✅ 16 files (word studies, scripture studies, theology, CCF, wellbeing, relationships, discipleship) | [`research/`](research/) |
| AI value system | ✅ 10 values + machine-readable JSON + 10 guardrails | [`ai-values/`](ai-values/) |
| Claude skill (Companion) | ✅ SKILL.md + 10 test scenarios + 6 golden transcripts + rubric | [`skills/biblical-parenting-companion/`](skills/biblical-parenting-companion/) |
| Full PRD set | ✅ product, web-app, admin, UX, design system, personality | [`prd/`](prd/) |
| Content pipeline | ✅ schema + **Chapter 1** authored (json+md); golden template | [`content/`](content/) |
| **Running PWA starter** | ✅ builds & serves — tokens, ScriptureBlock, 3 screens, Chapter 1 loads, local-first, PWA | [`app/`](app/) |

**Verify the starter runs before extending it:**
```bash
cd app && npm install && npm run build   # tsc --noEmit + vite build must pass
npm run dev                              # http://localhost:5173
```

## 3. The build backlog (prioritized, with acceptance criteria)

### 🏁 Sprint 1 — Finish the MVP reading core (target: pilot-ready web, PRD milestone M0→M1)
Do these in order. Each is "done" only when its acceptance criteria pass **and** it honors the guardrails in §4.

1. **Content compiler** — replace the hand-copied `app/src/data/chapter-01.json` with a build step that compiles [`content/chapters/*.json`](content/chapters/) → the app bundle, validated against [`content/schema/chapter.schema.json`](content/schema/chapter.schema.json).
   *Done when:* adding a chapter JSON makes it appear in the app with no manual copy; invalid content fails the build with a clear error.
2. **Author Chapters 2–5** (finish Part I: *A Gift Not a Project*, *You First*, *Made in His Image*) from [`research/`](research/), following the Chapter 1 pattern exactly.
   *Done when:* all 4 validate against the schema, every teaching claim has a `sources[]` entry, and every scripture `text` is verbatim (see verifier below).
3. **Scripture-quotation verifier (CI gate)** — string-match every rendered/authored quotation against the licensed source (KJV bundled; NASB1995 via provider). Fabricated/misquoted verse = build fail. (web-app-prd §12; guardrail against fabricated Scripture.)
   *Done when:* deliberately corrupting a verse fails CI.
4. **Design-token contrast check (CI gate)** — validate every color pairing in [`tokens.css`](app/src/styles/tokens.css) meets WCAG AA (design-system §2.3).
5. **Real router + navigation** — add `react-router`; bottom tab bar (mobile) / left rail (desktop), ≤5 items: **Today · Read · Journal & Prayer · You** (Companion hidden until Sprint 2). (UX §3.)
6. **Read library screen** — Parts I–IV chapter list, calm cards, quiet progress (no %-as-pressure). (UX §4.3.)
7. **Local-first storage** — swap `localStorage` for **Dexie/IndexedDB** for progress/journal/prayer; works fully offline, no account. (web-app-prd §4.3.)
8. **Journal & Prayer screens** — private notebook + prayer list with gentle "answered" (dawn bloom). **No streaks.** (Encryption lands in Sprint 2 with accounts; keep bodies local-only until then.) (UX §4.4.)
9. **Wellbeing quick-access + Crisis screen** — three doors (exhausted/guilty/anxious) → grace-first micro-content; **crisis screen reachable in ≤2 taps from anywhere**, region-aware resources (US 988; PH NCMH). (UX §4.6, §8; guardrail G6.)
10. **Settings ("You")** — theme, text size, daily-verse time (opt-in), statement-of-stream page, plain-language privacy, optional account stub, export/delete stubs. (UX §4.7.)
11. **Self-host Newsreader** (Scripture serif), subset + `font-display: swap`. (design-system §3.)

*Sprint 1 exit:* a calm, offline, accessible PWA a pilot Dgroup can read Part I in — welcome-in, no signup wall, crisis help always ≤2 taps, zero engagement mechanics.

### 🏗️ Sprint 2 — Companion + backend + admin (PRD milestone M2)
12. **Backend BFF** — implement the API in [web-app-prd §4](prd/web-app-prd.md) (TypeScript Fastify **or** Java Spring Boot — see decision D2). Postgres schema, magic-link auth + RBAC, optional-account sync.
13. **Client-side encryption** for journal & prayer bodies (server stores ciphertext only; admins can never read — admin-console-prd §1).
14. **Companion (F6)** — embed the [skill](skills/biblical-parenting-companion/SKILL.md) as system prompt via Claude API **server-side only**; guardrail pre/post checks; crisis escalation; bounded sessions with hand-back endings. **CI runs the [10 eval scenarios](skills/biblical-parenting-companion/tests/test-scenarios.md); zero hard-fails is a ship gate** (rubric). Ship behind a feature flag until green.
15. **Admin console** (admin-console-prd) — land in this order: Dashboard (God-reliance metrics, refuses vanity metrics) + Content Studio (live preview, Scripture verifier, versioned publish) + Audit + minimal People/RBAC + Settings → then Safety (crisis queue, feedback triage, crisis-resource CRUD) + Companion Ops (eval runner) + guarded Database admin.
16. **Together/share (F7)** — discussion-guide share (link/PDF), warm "Invite your spouse."

### 📱 Sprint 3 — Mobile (PRD milestone M3)
17. **Capacitor packaging** — Android shell as a real **Java/Kotlin** project (satisfies the "Java app" goal), iOS via the Swift shell. Keep all logic framework-agnostic so this stays UI work. Store compliance + AI disclosure.

### 🌱 Sprint 4 — (PRD milestone M4)
18. **Family worship helper (F8)** (Read–Sing–Pray–Catechize + catechism packs) and **Tagalog localization** (copy is already externalized-ready).

## 4. Definition of done / CI gates (every change)
From [`AGENTS.md`](AGENTS.md) §6 + web-app-prd §12. A change is done when:
- ✅ lint + `tsc --noEmit` + tests pass
- ✅ **design-token contrast** check passes
- ✅ **Scripture-quotation verifier** passes (no fabricated/misquoted verses)
- ✅ **Companion eval = 0 hard-fails** (if the change touches the Companion)
- ✅ Lighthouse a11y / PWA / best-practices ≥ 95
- ✅ honors every guardrail below

**Guardrails you must not break (design-system §7, guardrails G1–G10):** no streaks/guilt · no red "missed" · no "we miss you" re-engagement · no infinite feed/autoplay · no badge anxiety · no "daily goal"/engagement framing · no points/leaderboards · welcome-in on every return regardless of absence · crisis help ≤2 taps · journal/prayer bodies never server-readable · tokens-only styling · one primary action per screen · Companion always ends with the hand-back and is honest it's a tool.

## 5. Owner decisions still open (ask before assuming)
| # | Decision | Recommendation |
|---|---|---|
| D1 | Product name **Firstlight** — trademark/app-store clear? | Run USPTO + App Store/Play search; alternates: Homeward, Rooted, The Well, Cornerstone Home. Keep name as one config token to swap globally. |
| D2 | Backend: TypeScript vs Java Spring Boot | **TS Fastify now** — the "Java app" goal is met on mobile via Capacitor's Android shell; don't split the backend. |
| D3 | DB: Supabase vs managed Postgres | **Supabase** for fastest path (auth + RLS + storage + realtime). |
| D4 | Accounts optional at launch (local-first only)? | **Yes** — sync as later opt-in. |
| D5 | Crisis regions at launch | US (988) + Philippines (NCMH) first; extensible via `crisis_resources`. |

## 6. Copy-paste kickoff prompt for your build agent
Paste this to Opus / Claude Code to begin Sprint 1:

```
You are building "Firstlight" (Biblical Parenting Guide) in this repository.
Before writing code, read HANDOFF.md, then AGENTS.md, then ai-values/VALUES.md +
guardrails.md, then prd/design-system.md, prd/PERSONALITY.md, prd/web-app-prd.md,
and prd/user-experience-prd.md. A running PWA starter already exists in app/ —
verify it builds (cd app && npm install && npm run build) before extending it.

Execute Sprint 1 from HANDOFF.md §3 IN ORDER, starting with the content compiler.
For each task, meet its acceptance criteria and the Definition of Done in §4, and
never violate the guardrails in §4. Do not add any engagement/streak/guilt
mechanics. Every screen must welcome-in (never scold), keep crisis help ≤2 taps,
and hand the user back to God, the Word, and real people. Style only via the
design tokens. Ask me the open decisions in §5 (D1–D5) before they block you.
Work in small, verifiable commits on the current branch; run the build after each.
```

---
*"Except the LORD build the house, they labour in vain that build it."* — Psalm 127:1 (KJV). Build the tool so the Builder gets the house.
