# Firstlight — app starter

A **running seed** of the Firstlight app (Biblical Parenting Guide), implementing the [design system](../prd/design-system.md) so the warmth is tangible, not just described. Built to be extended by Opus per [`../AGENTS.md`](../AGENTS.md) and the [PRD set](../prd/).

## What's here (working)
- **Firstlight design tokens** as code — `src/styles/tokens.css` (light "Morning" / dark "Evening", follows the OS, user-overridable).
- **Signature components** — `ScriptureBlock` (KJV ∥ NASB1995 in the serif face + tap-to-reveal word study), `Button` (incl. warm/clay hospitality variant), `Card`, `ThemeToggle`.
- **Three signature screens** — `Threshold` (warm, no-signup welcome), `Today` (welcome-in, one clear next step, no streaks), `ChapterReader` (one section per screen, auto-saves place, hand-back ending).
- **Content-as-data** — loads **Chapter 1** ("Unless the LORD Builds") from `src/data/chapter-01.json`, typed against `src/content/types.ts` (mirrors [`../content/schema/chapter.schema.json`](../content/schema/chapter.schema.json)).
- **Local-first** progress + theme via `localStorage` (production swaps to Dexie/IndexedDB + optional sync).
- **PWA** — installable, offline-capable (vite-plugin-pwa / Workbox).

## Run
```bash
cd app
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build
npm run preview    # serve the build
```

## Deliberately NOT here yet (build next, per PRD)
Journal & Prayer (client-encrypted), Companion (eval-gated), Daily verse, Wellbeing quick-access, Crisis screen (≤2 taps), Together/share, full router + bottom-nav, real Bible-API + Scripture verifier, the admin console, and the content compiler (`content/` → bundle). See [`../prd/web-app-prd.md`](../prd/web-app-prd.md) and [`../prd/user-experience-prd.md`](../prd/user-experience-prd.md).

## Guardrails baked in (don't remove)
No streaks/guilt, no "you've been gone", no engagement mechanics, welcome-in on every return, tokens-only styling, one primary action per screen. See [`../ai-values/guardrails.md`](../ai-values/guardrails.md) and design-system §7.
