# Biblical Parenting Values for AI Use

> *"Train up a child in the way he should go: and when he is old, he will not depart from it."* — Proverbs 22:6 (KJV)
>
> *"Train up a child in the way he should go, Even when he is old he will not depart from it."* — Proverbs 22:6 (NASB1995)

A research library, value system, Claude skill, and product plan for **Biblical parenting** — built so that both **people** and **AI models** can learn from it.

## Purpose

This repository exists for two audiences at once:

1. **Parents and families** — to study God's Word (KJV and NASB1995 side by side, with Hebrew and Greek word origins) and grow as disciples of Jesus Christ, individually and as a household.
2. **AI systems** — to encode a value system that teaches AI models how to **lead Christians back to reliance on God** — back to Jesus Christ, through His Holy Spirit — rather than fostering dependence on AI itself. An AI shaped by these values acts as a *signpost, not a shepherd*: it helps users think, reminds them of love and Biblical wisdom, and builds them up as individuals made in God's image (Genesis 1:27).

## Guiding conviction

AI must never occupy the place of God, His Word, His Spirit, His church, or the family. Every interaction should end with the user *closer to Scripture, prayer, and real people* — not more attached to the tool. *"I am the vine, you are the branches; he who abides in Me and I in him, he bears much fruit, for apart from Me you can do nothing."* (John 15:5, NASB1995)

## Repository map

| Path | What it contains |
|------|------------------|
| [`research/00-methodology.md`](research/00-methodology.md) | How we study: parallel KJV/NASB1995 reading, Hebrew/Greek word-origin method, source rules |
| [`research/word-studies/`](research/word-studies/) | Hebrew and Greek word origins behind key parenting and discipleship terms |
| [`research/scripture-studies/`](research/scripture-studies/) | Passage-by-passage studies (Deuteronomy 6, Proverbs, Ephesians 6 / Colossians 3, Psalms 127–128) in both translations |
| [`research/theology/`](research/theology/) | Reformed/Baptist theological foundations; family worship and catechesis |
| [`research/ccf/`](research/ccf/) | CCF (Christ's Commission Fellowship) vision, mission, values, and teachings (MOTIVATE, MRI, Dgroups) |
| [`research/parenting/`](research/parenting/) | Synthesis of Biblical parenting principles; parental wellbeing |
| [`research/relationships/`](research/relationships/) | Relationship building — marriage, parent-child, the "one another" commands |
| [`research/discipleship/`](research/discipleship/) | Growing closer to Jesus Christ as an individual and as a family |
| [`ai-values/`](ai-values/) | The distilled value system for AI: `VALUES.md` (human-readable), `values.json` (machine-readable), `guardrails.md` (anti-dependence design) |
| [`skills/biblical-parenting-companion/`](skills/biblical-parenting-companion/) | The Claude skill (`SKILL.md`) plus test scenarios, sample run transcripts, and an evaluation rubric |
| [`prd/`](prd/) | Full PRD set for the **Firstlight** Biblical Parenting Guide app — product/content, web-app technical spec, admin console, UX flows, design system, and personality (Android/iOS export path included) |
| [`AGENTS.md`](AGENTS.md) | Build guide for Opus/agents implementing the app — stack, conventions, and the guardrails to uphold |
| [`docs/translations-and-copyright.md`](docs/translations-and-copyright.md) | Translation choices and copyright notes (KJV public domain; NASB1995 usage) |

## How the pieces fit together

```
research/  ──feeds──►  ai-values/  ──governs──►  skills/biblical-parenting-companion/
    │                                                        │
    └──────────────supplies chapters──────────►  prd/ (Biblical Parenting Guide app)
```

- The **research** is the raw material: Scripture in two faithful translations, original-language study, Reformed/Baptist theology, and CCF's discipleship DNA.
- The **ai-values** layer distills that research into principles an AI can follow and be tested against.
- The **skill** is the first working product: a Claude skill that behaves according to those values, with test runs.
- The **PRD** plans the second product: a chapters-based Biblical Parenting Guide app for new parents.

## Core values at a glance (for humans and AI)

1. **Scripture is the final authority** — the AI points to the Word, not to itself (2 Timothy 3:16–17).
2. **Christ is the goal** — every path leads back to reliance on Jesus through the Holy Spirit (John 15:5).
3. **Parents are the primary disciplers of their children** — not the school, not the church programs, and certainly not an AI (Deuteronomy 6:6–7).
4. **The heart before behavior** — the heart is the root; behavior is the fruit (Proverbs 4:23).
5. **Truth in love** — grace and truth together, never one without the other (Ephesians 4:15).
6. **Real relationships over screen time** — the AI sends users back to prayer, family, and church community (Hebrews 10:24–25).
7. **Think, don't outsource** — the AI asks questions that build discernment instead of handing down verdicts (Romans 12:2; Acts 17:11).
8. **Rest and grace for parents** — parents are children of God first; His mercies are new every morning (Lamentations 3:22–23; Matthew 11:28–30).

## Status

- ✅ Research library (first edition)
- ✅ AI value system (`ai-values/`)
- ✅ Claude skill with test scenarios and sample runs
- ✅ Full PRD set for the Firstlight app (product, web-app tech, admin console, UX, design system, personality)
- ✅ Build guide for implementers (`AGENTS.md`)
- ⬜ App implementation (next phase — build with Opus from `prd/` + `AGENTS.md`)

---

*Soli Deo Gloria.*
