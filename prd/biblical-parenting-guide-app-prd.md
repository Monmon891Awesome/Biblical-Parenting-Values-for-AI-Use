# PRD — Biblical Parenting Guide

**Product:** Biblical Parenting Guide — a chapters-based discipleship app for new parents
**Version:** 1.0 (draft for review)
**Date:** 2026-07-07
**Depends on:** the research library ([`../research/`](../research/)), value system ([`../ai-values/`](../ai-values/)), and Claude skill ([`../skills/biblical-parenting-companion/`](../skills/biblical-parenting-companion/)) in this repository.

---

## 1. Vision

New parents are exhausted, anxious, flooded with contradictory advice, and — if they are believers — longing to raise their children for Christ in a modern, ever-evolving world. **Biblical Parenting Guide** walks them chapter by chapter through what God's Word actually says about parenting — KJV and NASB1995 side by side, with Hebrew/Greek word origins, Reformed/Baptist depth, and CCF-style discipleship practice — so that they are *led to Christ while raising their children for Him*.

**The product's north star inverts the industry's:** success is a parent who needs the app less because they rely on God more. Every feature is designed to end with the user praying, opening their Bible, or turning toward their spouse, child, and church.

> *"Unless the LORD builds the house, They labor in vain who build it."* — Psalm 127:1 (NASB1995)

## 2. Target users & personas

| Persona | Snapshot | Primary needs |
|---|---|---|
| **Anna, 27 — expectant first-time mom** | Believer, attends church + small group; terrified and excited; googles everything at 2 a.m. | A trustworthy Biblical path through the fear; wellbeing content; permission to rest |
| **Marco, 31 — new dad, young believer** | Saved two years ago at a CCF-style church; wants to lead his family but never saw it modeled | Step-by-step chapters; how to start family worship; what a father does (Eph 6:4) |
| **Ruth & James, 30s — parents of two under five** | Mature believers, time-starved; devotions collapsed after kid #2 | Micro-length content; repair and grace; marriage upkeep; Dgroup discussion material |
| **Secondary: Dgroup leaders / grandparents** | Walking with new parents | Shareable chapters and discussion questions |

## 3. Goals & non-goals

**Goals**
1. Deliver a complete, chapters-based Biblical parenting curriculum for the first years of parenting (pregnancy → toddler), readable in 5–10 minute sessions.
2. Present Scripture in parallel KJV/NASB1995 with tap-to-open word studies (Hebrew/Greek origins) — teaching the *method*, not just conclusions.
3. Embed the **Biblical Parenting Companion** AI (this repo's skill + values) as a bounded helper, governed by [`guardrails.md`](../ai-values/guardrails.md).
4. Strengthen real relationships: prompts toward spouse, child, church/Dgroup; shareable discussion guides.
5. Support parental wellbeing with grace-first content (rest, guilt, anxiety) and honest crisis referral.
6. Ship web-first, then package for Android/iOS (§9).

**Non-goals**
- ❌ Not a social network, feed, or content-scroll product.
- ❌ Not a replacement for church, pastors, counselors, or medical professionals — the app says so explicitly and often.
- ❌ Not an AI chat product with a Bible skin — the AI is one bounded feature, not the center.
- ❌ No engagement-maximizing mechanics (see §8 — enforced by [guardrail G7](../ai-values/guardrails.md)).
- ❌ v1 is English-only (Tagalog/Taglish is the first localization candidate given the CCF community — v2).

## 4. Content model — the chapters

Chapters are authored from the research library; each cites its sources in-repo. Structure per chapter: **Read** (core teaching, 5–10 min) → **The Word** (key passages, parallel KJV/NASB1995, word-study popovers) → **Reflect** (heart questions) → **Practice** (one small obedience this week) → **Together** (spouse/Dgroup discussion) → **Pray** (a written prayer to make one's own).

### Part I — Foundations (before and just after birth)
1. **Unless the LORD Builds** — parenting begins with worship, not technique *(Ps 127–128 study)*
2. **A Gift, Not a Project** — receiving your child as heritage; entrusting outcomes to God *(Ps 127; Reformed foundations)*
3. **You, First** — the parent's own walk with Christ; abiding before doing *(Deut 6:5–6; John 15; discipleship study)*
4. **Made in His Image** — what your baby *is*; dignity, dedication (*chanak*), and vision *(Gen 1:27; word studies)*

### Part II — The Blueprint (the core curriculum)
5. **The Shema Home** — Deuteronomy 6 as the family blueprint; sit/walk/lie/rise rhythms *(Deut 6 study)*
6. **Hearts Before Hands** — heart-first parenting; the root and the fruit *(Proverbs study; MRI)*
7. **Nurture and Admonition** — Ephesians 6:4 deep-dive; *paideia* and *nouthesia*; never provoking *(Eph 6/Col 3 study)*
8. **Discipline That Flows from Delight** — correction as covenant love; both channels; repair *(Prov 3, 13, 29; Heb 12)*
9. **The Little Church** — family worship and catechesis, small and sustainable *(family worship guide)*
10. **M.O.T.I.V.A.T.E.** — the Tan-Chi framework, one letter at a time *(CCF study)* *(seek permission/partnership for extended use — §11)*

### Part III — The Parents (wellbeing and marriage)
11. **He Gives His Beloved Sleep** — exhaustion, anxiety, and the God who keeps watch *(wellbeing study)*
12. **New Mercies for Guilty Parents** — failure, confession, repair, and grace *(wellbeing; Lam 3)*
13. **The Marriage Under the Roof** — one flesh as the child's first security *(relationships study)*
14. **Never Alone** — church, Dgroups, and the one-anothers *(relationships; CCF)*

### Part IV — Sent Ones (vision)
15. **Arrows, Not Trophies** — raising children for God's purposes in a changing world; screens, culture, and courage *(Ps 127:4–5; discipleship study)*
16. **Disciples Who Make Disciples** — your family as your first Dgroup; multiplication *(CCF; Matt 28)*

Each chapter ships with a **Dgroup discussion guide** (shareable as text/PDF).

## 5. Features

### F1 — Chapter reader (MVP core)
Clean, offline-capable reading; progress per chapter (position, not gamified); adjustable text size; dark mode; 5–10 min read segments.

### F2 — Parallel Scripture viewer (MVP core)
KJV ∥ NASB1995 side-by-side or stacked toggle; tap a highlighted word → word-study card (lemma, Strong's, origin, one-line payoff) sourced from [`research/word-studies/`](../research/word-studies/). **Licensing:** KJV bundled (public domain); NASB1995 via licensed API (API.Bible / Biblia) or direct Lockman license — never scraped (see [`../docs/translations-and-copyright.md`](../docs/translations-and-copyright.md)).

### F3 — Reflect & Practice journal (MVP)
Private, local-first journal attached to each chapter's heart questions and weekly practice; export/backup optional. No cloud requirement for v1.

### F4 — Prayer list (MVP)
Simple family prayer list with "answered" marking — building the Psalm 78:4 habit of retelling what God has done. No streaks, no badges.

### F5 — Daily verse (MVP, opt-in)
One verse (rotating through the research library's anchor texts) at a user-chosen time. Notification copy always points *into* Scripture or family ("Read it to your spouse tonight"), never merely back into the app.

### F6 — Companion (post-MVP, v1.1)
The Biblical Parenting Companion (this repo's skill) embedded via Claude API:
- System prompt = `SKILL.md` + `values.json`; release-gated by the [test suite](../skills/biblical-parenting-companion/tests/test-scenarios.md) and [rubric](../skills/biblical-parenting-companion/tests/evaluation-rubric.md) (zero hard-fails required).
- Session-bounded by design: hand-back endings, no persistent "relationship," crisis escalation per guardrail G6, visible "this is a tool, verify in your own Bible" framing.
- Rate/length limits that respect G7 (no engagement engineering).

### F7 — Together / share (v1.1)
Share a chapter's discussion guide to a spouse or Dgroup (link/PDF/WhatsApp-friendly text). No in-app social graph.

### F8 — Family worship helper (v1.2)
The 10-minute liturgy (Read–Sing–Pray–Catechize) as a guided flow; catechism Q&A packs (Baptist Catechism / children's first questions); memory verse review.

## 6. User journeys (MVP)

1. **First run:** brief welcome → "Where are you?" (expecting / newborn / toddler) → recommended starting chapter → reading within 60 seconds. No account required for reading (local progress); optional account only for backup/sync.
2. **Daily loop:** open → continue chapter (5–10 min) → one heart question → one practice → *app suggests closing*: "Go do the practice — that's the point. He gives to His beloved sleep."
3. **Hard night:** wellbeing quick-access ("I'm exhausted / I feel guilty / I'm anxious") → Chapter 11/12 micro-content → prayer → if crisis signals: crisis screen (hotlines, doctor, pastor) — always ≤ 2 taps from anywhere.

## 7. Information architecture & data

- **Content:** chapters + word studies + verses as versioned structured content (Markdown/JSON) generated from this repo — the repo is the CMS.
- **User data:** journal, prayer list, progress — local-first (IndexedDB / device storage), optional encrypted sync when accounts land (v1.1+). Minimal PII (email only, if account created).
- **Children's data:** the app is for *parents* (18+). It stores no child profiles beyond optional first names in the user's private prayer/journal text. No analytics on journal/prayer content, ever.
- **AI data:** Companion conversations are not used for training; not retained server-side beyond the session; clearly disclosed.

## 8. Success metrics — measured the repo's way

Per [guardrail G7](../ai-values/guardrails.md) and Value 10, we do **not** optimize session length, DAU streaks, or message counts.

**North-star proxy:** chapter *completion* + practice *marked done* (self-report) — i.e., the app was *used up*, not *hung around in*.

| Metric | Target (6 mo post-launch) |
|---|---|
| Readers completing Part I | ≥ 40% of activated users |
| "Practice done" self-reports per completed chapter | ≥ 50% |
| Discussion guides shared (spouse/Dgroup) | ≥ 25% of completers share ≥ 1 |
| Wellbeing quick-access satisfaction ("this helped me go to God/people") | ≥ 80% thumbs-up |
| Companion hand-back compliance (audited sample vs. rubric) | 100% pass, zero hard-fails |
| **Deliberately not tracked as success:** time-in-app, session frequency beyond content pace, Companion message volume | — |

Qualitative: quarterly user interviews asking one question above all — *"Are you praying, reading, and talking with your family more or less since using this?"* "More" is the product working; "less" triggers a design review regardless of other numbers.

## 9. Technical architecture & the Android/iOS export path

### Phase 1 — Web app (MVP)
- **Frontend:** React + TypeScript + Vite; Tailwind; PWA (installable, offline chapters via service worker).
- **Content pipeline:** this repo → build step compiles Markdown/JSON → static content bundle; app ships content-versioned.
- **Backend (thin):** none required for MVP reading (static + local storage). v1.1: lightweight API (accounts/sync, Companion proxy) — Node/TypeScript or Java Spring Boot (see below), Postgres.
- **Bible text:** KJV bundled; NASB1995 through API.Bible/Biblia with license.
- **AI:** Claude API (`claude-sonnet-5` default for cost/quality; `claude-fable-5`-class models where deeper pastoral nuance is warranted) behind our proxy with the skill as system prompt; eval harness in CI runs the test scenarios on every skill change.

### Phase 2 — Mobile export ("Java-based app for Android/iOS")
An honest note on the "Java" goal: **Android**'s native stack is Java/Kotlin, but **iOS does not run Java** (Swift/Objective-C). Three viable paths, with a recommendation:

| Option | How | Pros | Cons |
|---|---|---|---|
| **A. Capacitor wrap (recommended)** | Package the existing PWA in Capacitor shells — the Android shell is a real Android Studio **Java/Kotlin** project you can extend natively; iOS shell is Xcode/Swift | One codebase; fastest to store; Android side is genuinely Java-extendable (notifications, widgets) | iOS shell is Swift (unavoidable on iOS) |
| B. Native Android (Java/Kotlin) + native iOS | Full rewrites per platform | Best platform feel | 3 codebases; slowest; highest cost |
| C. JVM cross-platform (Kotlin Multiplatform; or Java-centric Gluon/Codename One) | Shared JVM-language core | Single JVM-language codebase | Smaller ecosystems; UI compromises; KMP is Kotlin, not Java proper |

**Recommendation:** Ship Phase 1 PWA → Phase 2 **Capacitor** (Android shell in Java/Kotlin as desired; iOS via the Capacitor Swift shell) → revisit Option B/C only if native performance or platform features demand it. Architecture rule from day one: all logic in framework-agnostic TypeScript modules + content JSON, so any later port (including a Java rewrite) is a UI job, not a rebuild.

### Phase 3 — Store launch
Play Store + App Store; store-compliance for religious content + AI disclosure; privacy policy per §7.

## 10. Milestones

| Milestone | Scope | Est. duration |
|---|---|---|
| **M0 — Content alpha** | Chapters 1–5 authored from research; parallel-Scripture data format; word-study cards | 3–4 wks |
| **M1 — MVP web** | F1–F5, Parts I–II content, PWA offline, soft launch to a pilot Dgroup | 6–8 wks after M0 |
| **M2 — Full content + Companion** | All 16 chapters; F6 (Companion) behind eval gate; F7 share | 6 wks after M1 |
| **M3 — Mobile** | Capacitor Android (Java/Kotlin shell) + iOS; store submissions | 4–6 wks after M2 |
| **M4 — v1.2** | F8 family worship helper; Tagalog localization spike | ongoing |

Pilot plan: recruit 10–20 new-parent couples via a partner church/Dgroup network for M1 feedback; their "are you praying/reading/talking more?" answers gate M2.

## 11. Risks & mitigations

| Risk | Mitigation |
|---|---|
| **NASB1995 licensing** | Engage Lockman/API.Bible early (M0); KJV/WEB fallback for bulk display keeps product shippable regardless |
| **MOTIVATE™ content rights** | Chapter 10 currently teaches the framework with attribution at fair-use depth; pursue permission/partnership with the Tan-Chis/CCF for anything deeper; restructure to our own Scripture-direct teaching if declined |
| **AI theological error** | Eval suite with zero-hard-fail gate; verse-quotation verifier (string-match against licensed text) before display; visible Berean framing; feedback flag on every Companion reply |
| **AI dependence (the core risk this repo exists to prevent)** | Guardrails G1–G10 enforced in prompt AND product (session bounds, hand-back UI, no re-engagement notifications); §8 metrics make dependence a failure, not a KPI |
| **Crisis misuse** | Crisis screen ≤ 2 taps from anywhere; G6 escalation in Companion; content reviewed by a pastor + a perinatal-health professional before launch |
| **Doctrinal scope creep** | Statement-of-stream page (Reformed/Baptist, CCF-aligned) in-app; disputed matters follow guardrail G9 |
| **Scope creep generally** | Non-goals section is contractual; new features must pass the test: *"does this send the user to God and people, or keep them here?"* |

## 12. Open questions (for the owner)

1. Partnership: approach CCF/GLC formally about MOTIVATE licensing and pilot Dgroups?
2. Accounts: is v1 acceptable fully local-first (no login), with sync later?
3. Monetization: free? donation-supported? (Recommendation: free + donations; nothing paywalled that a struggling parent needs at 2 a.m.)
4. Which crisis-line set beyond US 988 for launch regions (esp. Philippines: NCMH crisis hotline)?

---

*"Except the LORD build the house, they labour in vain that build it."* — Psalm 127:1 (KJV). This PRD is a plan for laboring **with** the Builder, not instead of Him.
