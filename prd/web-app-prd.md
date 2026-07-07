# Web App PRD — "Firstlight" (Biblical Parenting Guide)

**Version:** 1.0 (build-ready draft)
**Date:** 2026-07-07
**Scope:** The complete web application — architecture, data, APIs, auth, security, privacy, accessibility, i18n, analytics, deployment — covering **both** the user-facing app and the admin console (the admin has its own deep-dive in [`admin-console-prd.md`](admin-console-prd.md)).
**Companion docs:** product/content PRD [`biblical-parenting-guide-app-prd.md`](biblical-parenting-guide-app-prd.md) · design [`design-system.md`](design-system.md) · voice [`PERSONALITY.md`](PERSONALITY.md) · user flows [`user-experience-prd.md`](user-experience-prd.md) · values [`../ai-values/`](../ai-values/).
**Build note:** the owner will implement with Opus; this doc is the blueprint, not the code.

---

## 1. Product summary

Firstlight is a warm, minimalist, Apple-caliber web app (PWA) that guides new parents through a Biblical parenting curriculum — Scripture in parallel KJV/NASB1995 with Hebrew/Greek word origins, Reformed/Baptist depth, CCF-style discipleship — and a bounded AI Companion. Its north star inverts the industry's: **success is a parent who needs the app less because they rely on God more.** See the content model (16 chapters) and success metrics in the [product PRD](biblical-parenting-guide-app-prd.md).

Two surfaces, one codebase and design system:
1. **User app** — reading, Scripture, journal, prayer, wellbeing, Companion. (This doc §5, UX PRD.)
2. **Admin console** — content management, database administration, dashboards, user & safety operations, AI eval monitoring. (This doc §6 overview, [admin PRD](admin-console-prd.md) in full.)

---

## 2. Goals, non-goals, principles

**Goals**
- Ship a fast, offline-capable, accessible PWA that feels calm and finishable.
- One design system, tokenized, feeding web now and Capacitor mobile later (Android Java/Kotlin shell + iOS Swift shell — see product PRD §9).
- A single, powerful **admin page** for content, data, dashboards, and safety.
- Enforce the anti-dependence values in *product mechanics*, not just copy.

**Non-goals** (contractual — from product PRD §3): not a social feed, not an AI-chat product with a Bible skin, no engagement gamification, no child data collection. v1 English-only.

**Engineering principles**
1. **Local-first for the user.** Reading, journal, prayer work fully offline with no account; the network is an enhancement, not a gate.
2. **Content is data, the repo is the CMS source.** Chapters/word-studies/verses are versioned structured content; admin edits flow back as reviewable changes.
3. **Framework-agnostic core.** All domain logic in plain TypeScript modules + content JSON, so mobile/Java ports are UI work, not rebuilds.
4. **Boring, durable stack.** Proven tools over novelty; the app must run for years with low maintenance.
5. **Values enforced in CI.** Token-contrast checks, Scripture-quotation verification, and the Companion eval suite gate every release.

---

## 3. Architecture

### 3.1 High-level
```
┌────────────────────────────────────────────────────────────────┐
│  CLIENTS                                                        │
│  • User PWA (React/TS, installable, offline via service worker) │
│  • Admin SPA (same stack, separate route/bundle, gated)         │
│  • Later: Capacitor Android (Java/Kotlin shell) + iOS (Swift)   │
└───────────────┬────────────────────────────────────────────────┘
                │ HTTPS / JSON
┌───────────────▼────────────────────────────────────────────────┐
│  API (BFF)  — Node/TypeScript (Fastify/Nest) OR Java Spring Boot│
│  • Auth  • Sync  • Content delivery  • Companion proxy          │
│  • Admin API (RBAC-gated)  • Webhooks  • Audit log              │
└───────┬───────────────┬───────────────┬────────────────────────┘
        │               │               │
┌───────▼──────┐ ┌──────▼───────┐ ┌─────▼─────────────┐
│ Postgres     │ │ Object store │ │ External services │
│ (Supabase or │ │ (images,     │ │ • Claude API      │
│  managed PG) │ │  audio, PDF) │ │ • Bible text API  │
│              │ │              │ │   (NASB1995 lic.) │
└──────────────┘ └──────────────┘ │ • Email (magic    │
                                   │   links)          │
                                   │ • Crisis-line data│
                                   └───────────────────┘
```

### 3.2 Stack decision (recommended)
- **Frontend:** React 18 + TypeScript + Vite; **Tailwind CSS** driven by `tokens.json` (design system §10); Radix UI primitives (accessible, unstyled) skinned to Firstlight; TanStack Query for server state; Zustand for local UI state; **Dexie/IndexedDB** for local-first data; Workbox service worker for offline + installable PWA.
- **Backend:** TypeScript **Fastify** (or NestJS) as a thin BFF. *If the owner prefers a JVM path to align with the eventual Java mobile ambition,* **Spring Boot (Java 21)** is a first-class alternative — the API contract in §4 is framework-neutral. Pick one; don't split.
- **DB:** **Postgres**, via **Supabase** (auth + row-level security + storage + realtime out of the box, fastest path) or plain managed PG. This doc assumes Supabase-style capabilities but nothing hard-depends on it.
- **AI:** Claude API behind the BFF (never call from the browser — keep keys server-side). Default model `claude-sonnet-5` for cost/latency; escalate to an Opus-class model for the Companion's pastoral nuance where warranted. System prompt = the [skill](../skills/biblical-parenting-companion/SKILL.md) + [values.json](../ai-values/values.json).
- **Hosting:** Vercel/Netlify (frontend + edge) + Fly.io/Render/Railway or Supabase (API + DB). Object storage: Supabase Storage / S3-compatible.

### 3.3 Content pipeline (repo → app)
The `research/` and chapter content in this repo is the *authoring source*. A build step compiles Markdown/JSON → a **versioned content bundle** (`content@x.y.z`) shipped to clients and cached offline. The admin console edits a working copy in the DB; publishing writes a new content version and (optionally) opens a git PR back to the repo for provenance. Scripture text is layered in at render time (KJV bundled; NASB1995 from licensed API) — never stored redundantly in a way that violates license (see [copyright doc](../docs/translations-and-copyright.md)).

---

## 4. Data model & API

### 4.1 Postgres schema (core tables)
```
users              (id, email, display_name, created_at, locale, theme_pref,
                    role  -- 'parent' | 'admin' | 'editor' | 'pastor_reviewer',
                    stage -- 'expecting' | 'newborn' | 'infant' | 'toddler' | null,
                    deleted_at)                     -- soft delete, GDPR
auth_sessions      (id, user_id, token_hash, expires_at, device, revoked_at)
content_versions   (id, semver, status -- 'draft'|'in_review'|'published'|'archived',
                    created_by, published_at, changelog)
chapters           (id, content_version_id, part, order_index, slug, title,
                    est_minutes, status, body_md, sources_json)   -- authored content
chapter_sections   (id, chapter_id, kind -- 'read'|'word'|'reflect'|'practice'
                    |'together'|'pray', order_index, body_md, meta_json)
word_studies       (id, lemma, language -- 'hebrew'|'greek', strongs, translit,
                    gloss, origin_md, payoff, refs_json)
verses_cache       (id, ref, translation -- 'KJV'|'NASB1995', text, licensed bool)
                    -- KJV rows persist; NASB rows are short-lived cache per license
progress           (user_id, chapter_id, section_id, state -- 'seen'|'done',
                    updated_at)                      -- local-first; synced if account
journal_entries    (id, user_id, chapter_id?, prompt_ref?, body_enc, created_at,
                    updated_at)                      -- client-encrypted body
prayers            (id, user_id, title, body_enc, answered_at?, created_at)
companion_sessions (id, user_id, started_at, ended_at, message_count,
                    handback_given bool, crisis_flag bool, model, eval_sample bool)
companion_messages (id, session_id, role, content, created_at, retained bool)
                    -- retained=false by default; purged after session per privacy §8
feedback           (id, user_id?, target -- 'chapter'|'companion'|'app', target_id,
                    kind -- 'helpful'|'error'|'concern', note, created_at)
audit_log          (id, actor_id, action, entity, entity_id, diff_json, at)  -- admin
crisis_resources   (id, region, name, kind -- 'hotline'|'text'|'emergency',
                    contact, hours, notes, active)
invites            (id, from_user_id, to_email?, share_token, resource_type
                    -- 'chapter'|'discussion_guide', resource_id, created_at)
```
Notes: `body_enc`/`body_end` fields are **client-side encrypted** (journal & prayer content) — the server stores ciphertext; even admins cannot read them (privacy §8). RLS: a user can only ever read their own rows; admin roles scoped by `audit_log`-tracked permissions.

### 4.2 API surface (REST, versioned `/v1`)
```
Auth
  POST /v1/auth/magic-link        {email} → emails a one-time link (passwordless)
  POST /v1/auth/verify            {token} → session
  POST /v1/auth/logout
  GET  /v1/me                     → profile, prefs

Content (public-read, cacheable, ETag'd)
  GET  /v1/content/version        → current published semver
  GET  /v1/content/chapters       → list (part, order, title, est_minutes)
  GET  /v1/content/chapters/:slug → full chapter + sections
  GET  /v1/content/word-studies/:lemma
  GET  /v1/scripture?ref=&tr=     → verse text (KJV local; NASB via licensed provider)

User data (auth, RLS, mostly optional — local-first mirror)
  GET/PUT /v1/progress
  GET/POST/PATCH/DELETE /v1/journal        (ciphertext only)
  GET/POST/PATCH/DELETE /v1/prayers
  POST /v1/feedback
  POST /v1/invites  ; GET /v1/invites/:token (public resolve → shareable guide)
  POST /v1/account/export   ; POST /v1/account/delete   (GDPR self-serve)

Companion (auth, rate-limited, guardrail-enforced)
  POST /v1/companion/session          → new bounded session
  POST /v1/companion/message          → streamed reply; server injects skill+values,
                                         runs pre/post guardrail checks, sets crisis_flag
  POST /v1/companion/session/:id/end

Admin (RBAC, audited — see admin PRD)
  /v1/admin/*  → content CRUD & publish, users, feedback triage, safety queue,
                 dashboards/metrics, crisis-resource CRUD, companion-eval runs
```
All endpoints: JSON, idempotency keys on writes, cursor pagination, ETags on content, structured errors `{code, message, hint}`. OpenAPI spec is the contract of record.

### 4.3 Sync model
Local-first: the client owns the truth for `progress`, `journal`, `prayers` in IndexedDB. If the user creates an account, a **last-write-wins per record** sync (with `updated_at`) mirrors to Postgres; journal/prayer bodies sync as ciphertext. No account ⇒ no server rows ever. Reading requires no network after first content cache.

---

## 5. User app — functional scope (feature list)
Full screen-by-screen flows in the [UX PRD](user-experience-prd.md); content in the [product PRD](biblical-parenting-guide-app-prd.md). Summary:

- **F1 Chapter reader** — offline, calm, 5–10 min segments; Read/Word/Reflect/Practice/Together/Pray structure.
- **F2 Parallel Scripture viewer** — KJV ∥ NASB1995, tap-word → word-study card.
- **F3 Journal** — private, client-encrypted, per-chapter reflect prompts.
- **F4 Prayer list** — family prayers, "answered" marking (no streaks).
- **F5 Daily verse** — opt-in, user-chosen time, points *into* Word/family.
- **F6 Companion** — bounded AI, hand-back endings, crisis escalation, "verify in your own Bible" framing. Post-MVP (v1.1), gated by eval suite.
- **F7 Together/share** — spouse/Dgroup discussion guide as link/PDF.
- **F8 Family worship helper** — the 10-min liturgy + catechism packs (v1.2).
- **Wellbeing quick-access** — "I'm exhausted / guilty / anxious" → grace-first micro-content; crisis screen ≤ 2 taps from anywhere.
- **Settings** — theme (system/morning/evening), text size, daily-verse time, account/export/delete, translations, statement-of-stream page.

---

## 6. Admin console — overview
One cohesive, gated admin surface (full spec: [`admin-console-prd.md`](admin-console-prd.md)). Sections:
1. **Dashboard** — health & the *right* metrics (completion, practice-done, hand-back compliance; explicitly *not* time-in-app).
2. **Content Studio** — CRUD chapters/sections/word-studies; live preview in the real reader; draft → review → publish with versioning; git-PR provenance.
3. **Database admin** — safe, guard-railed table browser/editor (read-mostly; destructive ops require confirmation + audit; encrypted user content is never readable).
4. **People** — user list (minimal PII), roles/RBAC, account export/delete requests.
5. **Safety** — crisis-flag queue from Companion, feedback triage, crisis-resource management per region.
6. **Companion Ops** — run the eval scenarios, view scores/hard-fails, manage the system prompt version, sample transcripts (privacy-safe).
7. **Audit** — every admin action logged and reviewable.

Design: same Firstlight system, quieter — calm, competent, precise (design system; admin tone in PERSONALITY §6).

---

## 7. Auth, roles, security

- **Auth:** passwordless **magic-link** (email) for parents — no passwords to leak, lowest friction for exhausted users; optional passkeys later. Admin/staff: same + mandatory 2FA (TOTP) and IP-aware sessions.
- **RBAC roles:** `parent`, `editor` (content), `pastor_reviewer` (content + theology sign-off), `admin` (full), scoped by policy and fully audited. Principle of least privilege.
- **Security baseline:** TLS everywhere; HttpOnly/SameSite cookies or short-lived JWT + refresh; CSRF protection; strict CSP; rate limiting (esp. auth + Companion); input validation (zod/DTO) on every endpoint; parameterized queries/ORM only; secrets in a vault, never in the client; dependency scanning + Dependabot; server-side Claude key. Pen-test before public launch.
- **Abuse/safety:** Companion rate limits; content-safety pre/post filters; crisis detection path (§9); no PII in logs.

## 8. Privacy (a first-class feature, not a footer)

Firstlight handles a family's spiritual and emotional life. Privacy is pastoral care.
- **Data minimization:** reading needs no account; only email if they choose one. No child profiles (product PRD §7). No selling data, ever. No third-party ad/tracking SDKs.
- **Client-side encryption** of journal & prayer bodies — the server (and admins) store only ciphertext. Losing a device password loses the data by design; we make this clear and offer opt-in recovery.
- **Companion privacy:** conversations are **not** used for training; not retained server-side beyond the live session by default (`retained=false`), except a small, consented, de-identified eval sample. Disclosed in-product.
- **Analytics:** privacy-respecting, self-hostable (e.g., Plausible/PostHog-EU, no cookies, no cross-site), event-level only, never on journal/prayer/Companion *content*. See §10.
- **Rights:** self-serve export and delete (`/v1/account/*`); honor GDPR/CCPA; soft-delete then hard-purge on a fixed schedule; clear, human-readable privacy policy (reuse/adapt the existing `PRIVACY_POLICY.md` pattern from the sibling repo).

## 9. Safety & crisis handling (product-wide)

Implements [guardrail G6](../ai-values/guardrails.md) beyond just the Companion:
- A persistent, gentle **"I need help now"** affordance reachable in ≤ 2 taps from anywhere → crisis screen with region-aware hotlines (US 988; Philippines NCMH; extensible via `crisis_resources`), "call your doctor," "reach your pastor," and baby-safety guidance for postpartum crisis.
- Companion messages run a **pre-check** (detect crisis/harm/abuse signals) and **post-check** (guardrail compliance) server-side; a crisis signal short-circuits to the escalation response and sets `crisis_flag` for the admin Safety queue (human awareness, *not* surveillance of content — flag + minimal context only, respecting encryption/consent).
- Content reviewed by a **pastor + a perinatal-health professional** before launch (product PRD §11).

## 10. Analytics & success measurement
Measured the repo's way (product PRD §8 / Value 10): we track **completion and practice-done**, hand-back compliance, and share actions — and **deliberately do not** optimize time-in-app, DAU streaks, or Companion message volume. Events are anonymous/aggregate; a dashboard surfaces the north-star proxy ("was the app *used up*, not hung around in"). Quarterly qualitative question drives design review: *"Are you praying, reading, and talking with your family more or less since using this?"*

## 11. Accessibility & internationalization
- **A11y:** WCAG 2.2 AA; full keyboard nav; visible focus; screen-reader labels; ≥ 44px targets; respects `prefers-reduced-motion` and `prefers-color-scheme`; readable one-handed at arm's length; captioned/optional audio. Test with axe + manual SR passes in CI.
- **i18n:** all copy externalized from day one (even though v1 is English) so **Tagalog/Taglish** (the CCF community's first localization) is a content job, not a refactor. Scripture translation selection is per-locale-aware.

## 12. Testing & quality gates (CI)
- Unit/integration (domain core, API), component tests (Vitest/RTL), E2E happy paths (Playwright).
- **Design tokens:** automated contrast validation of every color pairing (design system §2.3).
- **Scripture integrity:** a verifier string-matches every rendered quotation against the licensed source text; a mismatch fails the build (guardrail against fabricated Scripture).
- **Companion:** the [10 test scenarios](../skills/biblical-parenting-companion/tests/test-scenarios.md) run against the live skill on every prompt change; **zero hard-fails required** to ship (per [rubric](../skills/biblical-parenting-companion/tests/evaluation-rubric.md)).
- Performance budgets (§13); Lighthouse ≥ 95 PWA/Best-Practices/Accessibility.

## 13. Performance & offline
- First contentful paint < 1.5s on mid-tier mobile; route-level code splitting; content prefetched and cached; images responsive + lazy; fonts self-hosted, subset, `font-display: swap`.
- **Offline:** installed PWA reads all cached chapters, journals, and prays with no network. Companion, sync, and NASB-API text degrade gracefully with clear, warm offline states.

## 14. Environments, deployment, ops
- **Envs:** local → preview (per-PR) → staging → production. Seeded content fixtures for dev.
- **CI/CD:** GitHub Actions — lint, typecheck, test, token-contrast, Scripture-verify, Companion-eval, build, deploy previews; protected `main`.
- **Ops:** error monitoring (Sentry), uptime checks, structured logs (no PII), DB backups + tested restore, migration discipline (one-way, reviewed), feature flags for staged rollout (Companion behind a flag until eval-green).
- **Cost control:** Companion behind rate limits + model tiering; content is static/cacheable; NASB API calls cached within license limits.

## 15. Roadmap alignment
Maps to the product PRD milestones: **M0** content alpha (ch. 1–5, content pipeline, tokens) → **M1** MVP web (F1–F5, PWA offline, pilot Dgroup) → **M2** full content + Companion (eval-gated) + admin Content Studio & Safety → **M3** Capacitor mobile (Android Java/Kotlin shell + iOS) → **M4** family-worship helper + Tagalog. Admin console lands incrementally: Dashboard + Content Studio at M1, Safety + Companion Ops at M2.

## 16. Open questions (owner)
1. Backend language: TypeScript (fastest, one language) **or** Java Spring Boot (aligns with the eventual Java mobile ambition)? *(Recommendation: TS now; the Java goal is satisfied on mobile via Capacitor's Android shell — don't split the backend.)*
2. Supabase (fastest managed path) vs. self-managed Postgres?
3. Accounts fully optional at launch (local-first only), with sync as a later opt-in? *(Recommendation: yes.)*
4. Confirm launch regions for the crisis-resource set (US + PH first?).
5. Trademark/name: confirm **Firstlight** is clear, or pick from the alternates.

---

*"Except the LORD build the house, they labour in vain that build it."* — Psalm 127:1 (KJV). We build the tool so the Builder gets the house.
