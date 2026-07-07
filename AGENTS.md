# AGENTS.md — Build Guide for Firstlight

Guidance for any AI agent (Opus, Claude Code, etc.) or human building the **Firstlight** app (Biblical Parenting Guide) from this repository. Read this first. It tells you *how to build, what not to break, and who this product is.*

> **The one rule above all rules:** Every line of code, copy, and design must serve the mission — *lead Christians back to reliance on God, back to Jesus Christ through His Holy Spirit, never toward reliance on the AI or the app.* If a feature would make a tired parent feel more behind, more attached to a screen, or more dependent on this tool than on God and their church, it is wrong by definition. Build it warmer, smaller, and pointed outward.

---

## 1. What this repo is
Two things live here:
1. **A research + values library** (`research/`, `ai-values/`, `docs/`) — the theological and design substance.
2. **A product to be built** — the **Firstlight** app, fully specified in `prd/`.

You are (usually) here to build #2 from #1. The repo is the app's content source and its conscience.

## 2. Read these before you write code (in order)
1. [`ai-values/VALUES.md`](ai-values/VALUES.md) + [`ai-values/guardrails.md`](ai-values/guardrails.md) — the non-negotiables. **Enforced in product mechanics, not just copy.**
2. [`prd/PERSONALITY.md`](prd/PERSONALITY.md) — who the product is (voice, the three hats).
3. [`prd/design-system.md`](prd/design-system.md) — tokens, type, color, motion, anti-patterns. **Never hardcode a hex or a font outside the tokens.**
4. [`prd/web-app-prd.md`](prd/web-app-prd.md) — architecture, data model, API, auth, security, privacy, a11y, CI gates.
5. [`prd/admin-console-prd.md`](prd/admin-console-prd.md) — the admin surface.
6. [`prd/user-experience-prd.md`](prd/user-experience-prd.md) — screen-by-screen flows and microcopy.
7. [`prd/biblical-parenting-guide-app-prd.md`](prd/biblical-parenting-guide-app-prd.md) — the 16 chapters, metrics, mobile/Java export path.
8. Content substance as you build chapters: `research/**`.

## 3. Recommended stack (see web-app-prd §3 for full rationale)
- **Frontend:** React 18 + TypeScript + Vite; Tailwind driven by `tokens.json`; Radix primitives skinned to Firstlight; TanStack Query; Zustand; Dexie/IndexedDB (local-first); Workbox PWA.
- **Backend:** TypeScript Fastify/Nest BFF (default) — *or* Java Spring Boot if the owner chooses the JVM path. API contract is framework-neutral.
- **DB:** Postgres (Supabase or managed). **AI:** Claude API server-side only.
- **Mobile (later):** Capacitor — Android shell is a real **Java/Kotlin** project (satisfies the "Java app" goal); iOS via the Swift shell. Keep all logic framework-agnostic so this stays a UI job.

## 4. How to build here (conventions)
- **Local-first & offline** are requirements, not features. Reading/journal/prayer work with no account and no network.
- **Content is data.** Chapters/word-studies/verses are structured content compiled from this repo; don't hardcode teaching text in components.
- **Tokens or nothing.** All color/space/type/motion come from the design system tokens. Add to `tokens.json`, never inline.
- **Accessibility is a gate,** not a polish pass: AA contrast, keyboard, screen-reader, `prefers-reduced-motion`, ≥44px targets, one-handed use.
- **Framework-agnostic core:** domain logic in plain TS modules; UI is thin. This protects the future Java/mobile port.
- **Secrets server-side.** Never ship the Claude key or Bible-API key to the browser.
- **Small, reviewable commits.** Match the existing repo's calm, descriptive commit style.

## 5. Hard guardrails you must not violate (from `ai-values/guardrails.md`)
When building **any AI/Companion** surface:
- Quote Scripture only from verified licensed sources; **the build has a verifier that fails on fabricated/misquoted verses** — keep it green.
- The Companion is **bounded**: hand-back endings, honest "I'm a tool," crisis escalation (G6), no persistence-as-confidant, no engagement optimization.
- **Zero hard-fails** on the [Companion eval suite](skills/biblical-parenting-companion/tests/evaluation-rubric.md) is a ship gate (run `skills/biblical-parenting-companion/tests/test-scenarios.md` on every prompt change).

When building **any UI/UX**:
- **Banned:** streaks/guilt, red "missed" markers, "we miss you" notifications, infinite feeds, autoplay, badge-count anxiety, "daily goal"/engagement framing, points/leaderboards, any dark-pattern retention (design-system §7, UX PRD §9).
- A returning user is **welcomed, never scolded**, regardless of absence.
- Crisis help is reachable in **≤2 taps** from anywhere.
- **Privacy:** journal/prayer bodies are **client-encrypted**; the server and admins store only ciphertext. Never build a path that reads them.

When building the **admin**:
- Least privilege + full audit on every action; production edits have friction; destructive ops are confirmed, soft-delete, reversible.
- Dashboards show God-reliance outcomes (completion, practice-done, hand-back compliance) and **refuse** vanity/engagement metrics — with a note explaining *why*, so no one "helpfully" adds them later.

## 6. CI / definition of done (web-app-prd §12)
A change is done when: lint + typecheck pass; unit/component/E2E green; **design-token contrast check** passes; **Scripture-quotation verifier** passes; **Companion eval = zero hard-fails** (if the change touches the Companion); Lighthouse a11y/PWA/best-practices ≥ 95; and it honors every guardrail above. If you can't verify it, say so plainly — don't claim green.

## 7. Naming
The product name **Firstlight** is a placeholder pending a trademark/app-store check (design-system §1.1). Keep it as a single token/config value so it can be swapped globally. Alternatives on file: Homeward, Rooted, The Well, Cornerstone Home.

## 8. The heart check (run this on every feature)
Before you ship anything, ask the three hats (PERSONALITY §3):
- **Pastor:** Is this true, and does it point to Christ — not to us?
- **Psychologist:** Will a depleted, frightened parent feel welcomed, dignified, and calmer — or more behind?
- **Architect:** Is this the one clear, beautiful, finishable next step — and does it hand the work *back* to the parent, then get out of the way?

If all three say yes, build it. If not, make it warmer, smaller, and more clearly pointed home.

---

*"Except the LORD build the house, they labour in vain that build it."* — Psalm 127:1 (KJV). Build accordingly.
