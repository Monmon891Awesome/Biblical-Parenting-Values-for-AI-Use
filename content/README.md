# Content — the app's chapters as data

This directory is the **authoring source** for the Firstlight app's content (per [`../prd/web-app-prd.md`](../prd/web-app-prd.md) §3.3: *the repo is the CMS source*). A build step compiles these files into a versioned content bundle the app ships and caches offline.

## Structure

```
content/
  schema/chapter.schema.json     JSON Schema for a chapter (contract of record)
  chapters/NN-slug.json          one file per chapter (structured, machine-readable)
  chapters/NN-slug.md            the same chapter, human-readable (for review/reading)
```

## The chapter model

Every chapter follows the six-section rhythm from the [product PRD](../prd/biblical-parenting-guide-app-prd.md) §4:

| Section `kind` | Purpose |
|---|---|
| `read` | Core teaching (5–10 min) |
| `word` | Key passages in parallel KJV/NASB1995 + Hebrew/Greek word-study links |
| `reflect` | Heart questions (→ optional private journal) |
| `practice` | One small real-world obedience this week |
| `together` | Spouse/Dgroup discussion prompt (shareable) |
| `pray` | A written prayer to make one's own |

Scripture is referenced by `ref` + `translation` and rendered at display time (KJV bundled; NASB1995 via licensed API — never stored in violation of [copyright](../docs/translations-and-copyright.md)). Word studies link by `lemma` into [`../research/word-studies/`](../research/word-studies/).

## Rules (enforced by CI — web-app-prd §12)
- Every teaching claim traces to a `sources[]` entry pointing at a `research/` file.
- Every `scripture` block's `text` must match the licensed source verbatim (the quotation verifier fails the build otherwise).
- Voice follows [`../prd/PERSONALITY.md`](../prd/PERSONALITY.md); design renders via [`../prd/design-system.md`](../prd/design-system.md) tokens.

## Status
- ✅ `01-unless-the-lord-builds` — first chapter, establishes the format
- ⬜ Chapters 2–16 — author from `research/` following this pattern (see product PRD §4 for the full list)
