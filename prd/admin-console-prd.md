# Admin Console PRD — "Firstlight" Steward

**Version:** 1.0 (build-ready draft)
**Date:** 2026-07-07
**Scope:** The single, unified admin surface — database administration, dashboards, content management, people & roles, safety operations, and Companion AI operations.
**Parent doc:** [`web-app-prd.md`](web-app-prd.md) (architecture, data model, API, auth). Design: [`design-system.md`](design-system.md). Voice: [`PERSONALITY.md`](PERSONALITY.md) §6.

---

## 1. Purpose & philosophy

The admin console is where the **stewards** of Firstlight — the owner, editors, a pastor-reviewer — tend the app: shape its content, watch its health, care for its people, and guard its safety. It is not a cold "control panel." It carries the same soul as the user app: calm, competent, precise, and values-driven.

Design creed for the admin: **"Powerful, but quiet."** Sleek, minimalist, Apple-style — a data-dense surface that never feels heavy. Sage/ink palette, generous space, hairline tables, one clear action at a time. A steward should feel *in control and unhurried*, the same way a parent feels welcomed.

Guiding constraints:
- **Least privilege + full audit.** Every action is role-gated and logged (`audit_log`).
- **Privacy is inviolable.** Journal and prayer bodies are client-encrypted ciphertext; **admins can never read them** — the UI shows "🔒 Encrypted — not readable by design" wherever they'd appear. This is a feature we're proud of, surfaced explicitly.
- **Safety over convenience.** Destructive DB actions are guard-railed, confirmed, and reversible where possible.
- **The right metrics only.** Dashboards celebrate *God-reliance* outcomes and refuse to display engagement-maximizing vanity metrics ([Value 10 / G7](../ai-values/guardrails.md)).

---

## 2. Access, roles, layout

### 2.1 Roles (RBAC — from web PRD §7)
| Role | Can do |
|---|---|
| `admin` | Everything, incl. DB admin, roles, publishing, deletion |
| `editor` | Content Studio (draft/edit), preview, submit for review; no DB admin, no publish |
| `pastor_reviewer` | Review & theologically approve content; comment; can block publish; read-only elsewhere |
| (`parent`) | No admin access |

Admin/staff auth: magic-link **+ mandatory TOTP 2FA**, short sessions, IP-aware. All admin routes behind `/admin`, separate bundle, server-enforced (never client-only) authorization.

### 2.2 Layout
- **Left sidebar** (collapsible): Dashboard · Content Studio · Database · People · Safety · Companion Ops · Audit · Settings. Firstlight sage active state, thin icons, calm.
- **Top bar:** environment badge (⚠️ red only for *production* to prevent fat-finger edits), global search, current user + role, quick "help/what-am-I-looking-at" affordance.
- **Content area:** one primary task, generous whitespace, hairline data tables, right-side detail drawers rather than page-jumps.
- Fully responsive (stewards may triage on a phone), keyboard-navigable, AA-accessible.

---

## 3. Section 1 — Dashboard

The home of the console: *is the app healthy, and is it doing its actual job* (leading people to God, not to the app)?

**Cards (each with sparkline + plain-language reading):**
- **Health strip:** API uptime, error rate, DB status, Companion availability, last content publish, last backup ✓. Green/calm; only genuine problems draw the eye.
- **The North Star:** *"Used up, not hung around in."* Chapter **completion** rate, **practice-done** self-reports per completed chapter, discussion guides **shared**. (Web PRD §10.)
- **Companion integrity:** last eval run result, **hard-fail count (must be 0)**, hand-back-compliance %, crisis-flags awaiting review (links to Safety).
- **People:** activated parents, stage mix (expecting/newborn/…), new this week — counts only, no drill into private content.
- **Wellbeing pulse:** thumbs-up rate on wellbeing quick-access ("this helped me go to God/people").
- **Deliberately absent / actively refused:** time-in-app, session frequency, DAU-streak leaderboards, Companion message-volume-as-success. A small note states *why* they're absent (Value 10), so a future well-meaning admin doesn't "add engagement metrics."

Date-range filter; export to CSV; all figures aggregate/anonymous.

---

## 4. Section 2 — Content Studio

Where chapters, sections, and word-studies are authored, reviewed, and published — with live preview in the *real* reader and safe versioning.

### 4.1 Content tree & editor
- Left: the content tree (Parts I–IV → chapters → sections Read/Word/Reflect/Practice/Together/Pray). Drag to reorder (writes `order_index`).
- Center: a calm **Markdown editor** with a Scripture-aware toolbar:
  - Insert **Scripture block** → pick ref + translation(s); it auto-fetches KJV (local) and NASB1995 (licensed API), renders the signature serif block, and **runs the quotation verifier** (must match source char-for-char or it flags — guardrail against fabricated Scripture).
  - Insert **word-study link** → autocomplete from `word_studies` (chanak, paideia, …).
  - Insert **sources** → citations back to `research/` files (provenance required for teaching content).
- Right: **live preview** rendering exactly as the user reader will (same components/tokens), light/dark toggle, mobile/desktop frame.

### 4.2 Review & publish workflow
`draft → in_review → published → (archived)` with content **versioning** (`content_versions.semver`):
1. Editor drafts, self-checks (verifier, links, est-minutes).
2. Submit for review → **pastor_reviewer** gets theology sign-off queue; can comment inline and **block** or **approve**. (Doctrinal integrity gate — this is the human backstop behind the [values](../ai-values/VALUES.md).)
3. Admin publishes → new `content_version`, changelog required, clients pick up the new bundle; **optionally opens a git PR back to this repo** for provenance and history.
4. Rollback = republish a previous version (one click, audited). Nothing is ever hard-deleted; archive instead.

### 4.3 Word-study & verse management
- CRUD `word_studies` (lemma, language, Strong's, translit, gloss, origin, payoff, refs).
- `verses_cache` viewer: KJV persists; NASB rows shown with **license/TTL status** so we stay within Lockman/API terms (copyright doc). A usage meter warns before limits.
- Crisis-resource content lives in Safety (§6), not here.

---

## 5. Section 3 — Database administration

A **safe, guard-railed** way to inspect and correct data without handing anyone a raw SQL console into production.

### 5.1 Table browser
- Read-first views of non-sensitive tables (users [minimal], progress, content_*, feedback, invites, crisis_resources, companion_sessions [metadata only], audit_log).
- Filter/sort/paginate; column-level redaction; **encrypted fields render as "🔒 Encrypted — not readable"** (journal/prayer bodies, companion message content unless consented eval sample).
- Row detail in a drawer; related-record links (e.g., a user → their sessions' *metadata*, never their private text).

### 5.2 Guarded editing & operations
- Inline edit only on a safe allowlist of fields (e.g., a user's `role`, a crisis resource's phone number). Each edit → confirm modal showing the exact diff → writes `audit_log` with actor, before/after, timestamp.
- **Destructive ops** (delete/anonymize, role escalation to `admin`, bulk changes): require typing the entity name to confirm, are soft-delete by default, log fully, and where possible are **reversible** for a grace window. Bulk/raw operations are gated to `admin` + production double-confirm.
- **No arbitrary SQL in the UI.** Advanced migrations run through reviewed, versioned migration files in CI (web PRD §14), not the console — the console is for operational corrections, not schema surgery.
- **Backups & restore:** view last backup, trigger on-demand backup, and *test-restore into staging* from here; never restore straight over prod without a confirmation gauntlet.
- GDPR ops: process `account/export` and `account/delete` requests (soft-delete → scheduled purge), with audit trail.

---

## 6. Section 4 — People & Section 5 — Safety

### 6.1 People
- User list with **minimal PII** (email, display name, stage, locale, created, role) — and a visible reminder that private content is unreadable by design.
- Manage roles/RBAC (audited); handle export/delete requests; resend magic links; deactivate abusive accounts (Companion abuse).
- No profiling, no cohorts built on private content, no messaging users from here beyond transactional (no marketing blasts — anti-dark-pattern, G7).

### 6.2 Safety (the pastoral heart of the console)
- **Crisis-flag queue:** Companion sessions where the server-side pre-check set `crisis_flag`. Shows **minimal context only** (flag reason, timestamp, region, whether escalation copy was shown) — *not* a transcript dump; respects encryption/consent. Purpose is **human awareness and improving the safety net**, never surveillance. Reviewer can confirm the escalation fired correctly and flag any gap for follow-up.
- **Feedback triage:** the `feedback` stream — "error" (possible Scripture/theology mistake → routes to Content Studio + pastor_reviewer), "concern," "helpful." SLA on error/concern items.
- **Crisis-resource management:** CRUD `crisis_resources` by region (US 988, PH NCMH, emergency numbers, hours) — the data behind the user app's ≤2-tap crisis screen (web PRD §9). Changes are audited and reviewed (wrong hotline = real harm).
- Optional: a "pastor + perinatal professional" review checklist status before launch/whenever content changes.

---

## 7. Section 6 — Companion Ops

Operate and guard the AI Companion.
- **Eval runner:** trigger the [10 test scenarios](../skills/biblical-parenting-companion/tests/test-scenarios.md) against the current system-prompt/model; view per-scenario scores, the **hard-fail count (ship gate = 0)**, and diffs vs. the last run ([rubric](../skills/biblical-parenting-companion/tests/evaluation-rubric.md)). Block promoting a prompt/model that isn't eval-green (feature flag).
- **System-prompt versioning:** the Companion prompt = [SKILL.md](../skills/biblical-parenting-companion/SKILL.md) + [values.json](../ai-values/values.json); manage versions, see what's live, roll back.
- **Model & cost:** current model tier, token spend, rate-limit config; escalate/de-escalate model per cost/quality.
- **Sampled transcripts:** only the small **consented, de-identified eval sample** (web PRD §8) — for quality review, clearly labeled; ordinary user conversations are never retained or viewable.
- **Guardrail monitor:** hand-back-compliance %, crisis-escalation firings, honesty-about-AI checks — trend lines; regressions alert.

---

## 8. Section 7 — Audit & Section 8 — Settings

- **Audit log:** immutable, searchable record of every admin/editor/reviewer action (actor, action, entity, diff, time). Filter by actor/entity/date; export. This is the accountability backbone (Proverbs 11:14; nothing done in the dark).
- **Settings:** environment info, feature flags (Companion, daily-verse, sync), content-version pin, theme, integrations (Bible API keys, email, analytics, Sentry — secrets referenced from vault, never shown), and a **statement-of-stream** editor (the app's public Reformed/Baptist, CCF-aligned disclosure — [guardrail G9](../ai-values/guardrails.md)).

---

## 9. Non-functional requirements
- **Security:** all of web PRD §7 plus admin-only hardening (2FA required, prod-edit friction, server-enforced RBAC, per-action audit, session pinning).
- **A11y & design:** same AA bar and Firstlight tokens as the user app; data-dense but calm; keyboard-first for power users; dark "Evening" mode for late-night stewards.
- **Performance:** fast tables (virtualized), optimistic edits with audit-safe confirm, resilient to large datasets via cursor pagination.
- **Reliability:** admin actions are transactional; nothing partially applies; backups verified.

## 10. MVP → later
- **M1 (with MVP web):** Dashboard (health + north-star), Content Studio (author/preview/publish + versioning + Scripture verifier), Audit, minimal People (roles), Settings.
- **M2 (with Companion):** Safety (crisis queue, feedback triage, crisis-resource CRUD), Companion Ops (eval runner, prompt versioning), Database admin (guarded browser/edit + backups).
- **M3+:** deeper analytics exports, Tagalog content workflows, pastor-review dashboards.

## 11. Open questions (owner)
1. Who holds `admin` vs. `pastor_reviewer` at launch (separation of content power from publishing power)?
2. Git-PR-on-publish provenance: on by default, or manual export?
3. Retention window for reversible soft-deletes before hard purge (default proposal: 30 days)?
4. Do we want the eval runner on a schedule (nightly) in addition to on-change?

---

*"Moreover it is required in stewards, that a man be found faithful."* — 1 Corinthians 4:2 (KJV). The console exists to keep the stewards faithful.
