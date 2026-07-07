# User Experience PRD — "Firstlight" (the parent's journey)

**Version:** 1.0 (build-ready draft)
**Date:** 2026-07-07
**Scope:** The user-facing experience — screen-by-screen flows, states, microcopy, emotional/psychological design, and safety UX.
**Companion docs:** design [`design-system.md`](design-system.md) · voice [`PERSONALITY.md`](PERSONALITY.md) · features/architecture [`web-app-prd.md`](web-app-prd.md) · content [`biblical-parenting-guide-app-prd.md`](biblical-parenting-guide-app-prd.md).

---

## 1. Experience thesis

A new parent arrives tired, uncertain, and a little afraid. Firstlight should feel like **crossing the threshold of a warm home** where a wise, gentle friend is glad you came. Nothing shouts. Everything breathes. The Word is beautiful on the page. And every visit ends by gently sending you back to God and your family — you leave *more* capable of being the parent God made you to be, not more attached to a screen.

Designed for the real context of use: **one hand, dim room, short attention, interruption-prone, often 2 a.m.** Every screen assumes the reader is depleted and treats that as sacred, not as a conversion funnel.

---

## 2. Emotional design map (the psychologist's layer)

| Moment | Parent's likely inner state | What the UX does |
|---|---|---|
| First open | Overwhelmed, skeptical of "another app" | Radical calm; almost nothing on screen; one warm sentence; no signup wall |
| Daily return | Behind, guilty | Warm welcome-in *regardless of absence*; zero streak/guilt cues |
| Reading | Distractible, tired | One idea per screen; 5–10 min; save-place everywhere; serif Scripture that rewards attention |
| Hard night | Anxious, ashamed, maybe scared | Grace-first micro-content; comfort before content; crisis help always ≤2 taps |
| Finishing | Wanting more / avoidant | Gentle hand-back: "go pray / go to your spouse"; permission to stop |
| Being pointed out | Ready to grow | Clear, small, doable next step in the real world |

The through-line: **regulate the nervous system, restore dignity, then point to Christ and people.** (Values 5, 8, 9.)

---

## 3. Navigation & information architecture

**Bottom tab bar (mobile) / left rail (desktop), ≤ 5 items:**
1. **Today** — home; where you left off + one gentle offering (daily verse, next section).
2. **Read** — the chapter library (Parts I–IV).
3. **Companion** — the bounded AI helper *(v1.1; hidden until shipped)*.
4. **Journal & Prayer** — private reflections + prayer list.
5. **You** — settings, wellbeing quick-access entry, statement-of-stream, account.

A soft, always-present **"I need help now"** affordance (small, calm, top-right / in You and Companion) → crisis screen in ≤2 taps from anywhere (§8).

---

## 4. Key flows (screen by screen)

### 4.1 First run (no wall, no rush)
1. **Threshold screen** — warm ivory, the mark, one line: *"You made it here. Come in."* Single button: **Begin**. (No signup, no permissions ask yet.)
2. **One gentle question** — *"Where are you right now?"* → Expecting · Newborn · A few months in · Toddler days. (Sets `stage`; skippable.)
3. **A word of welcome** — 2 sentences + one verse (Lam 3:22–23), and the promise that shapes everything: *"This won't add to your plate. It points you to the One who carries it."*
4. **Land in Today** — already showing the recommended first chapter, ready to read in <60s. Account offered *later*, only for backup/sync, never required.

Microcopy law: nothing here uses "sign up," "unlock," "get started free," or a progress bar. Hospitality, not onboarding funnel.

### 4.2 Today (home)
- Warm greeting by time of day (no name required): *"Good evening. Glad you're here."*
- **Continue** card: where you left off (chapter + section), one tap to resume.
- **One offering:** today's verse (opt-in) *or* the next small section — never a wall of choices.
- Optional quiet line of encouragement from PERSONALITY (rotating, never guilt): *"Even five minutes is faithfulness."*
- If returning after a gap: *"Welcome back — no catching up needed. Start wherever."* (Anti-shame, design system §7.)

### 4.3 Reading a chapter
- **Chapter open:** serif title (display), est. minutes, a calm cover motif (natural/organic, no clichés). Sections shown as a short, forgiving list (Read · The Word · Reflect · Practice · Together · Pray) — "3 of 6," never a % that pressures.
- **Read section:** `body-lg`, generous measure, auto-saves position; tap to advance; distraction-free.
- **The Word section (signature):** KJV ∥ NASB1995 in the serif Scripture block; toggle side-by-side/stacked; **tap a highlighted word** → a soft bottom-sheet word-study card (*chanak* — "to dedicate," related to Hanukkah… one-line payoff), with "read more in the study." Beautiful, unhurried, the visual peak of the app.
- **Reflect:** 1–3 heart questions → optional private journal entry (encrypted); "keep it in your head" is equally honored.
- **Practice:** one small real-world obedience this week; can add to a gentle "this week" list (no nagging).
- **Together:** a spouse/Dgroup discussion prompt with a one-tap **share** (link/PDF) — a warm clay "Invite your spouse" action.
- **Pray:** a written prayer in serif, framed as *"a prayer you might make your own,"* + a soft close: *"Now close this, and go."* Chapter-complete = a single gentle `--dawn` bloom (a sunrise), then a hand-back, then stop.

### 4.4 Journal & Prayer
- **Journal:** a calm, notebook-like writing surface; entries tied to chapters or freeform; **client-encrypted**; a small lock note reassures ("Only you can read this — even we can't"). Empty state: *"A quiet place to think. Whenever you're ready."*
- **Prayer list:** add names/requests; mark **answered** (gentle dawn bloom + it moves to a tender "He heard" section — the Psalm 78:4 remembering habit). **No streaks, no counts-as-pressure.** Empty state: *"A quiet place for the names on your heart."*

### 4.5 Companion (v1.1)
- Entry framed honestly: *"A gentle helper. Not your pastor, not the Spirit — a tool that points you to the Word and to people. Always check it against your own Bible (Acts 17:11)."*
- Chat is **bounded by design:** warm brief replies, the hand-back ending (read/pray/person), and a natural close — no infinite thread, no "ask me anything forever." Long/circling sessions trigger the session-boundary gentle exit (Ps 127:2).
- **Crisis:** any harm/abuse/postpartum-crisis signal → immediate escalation screen (§8), no counseling. A per-message "verify / this helped / this concerns me" feedback tap.
- Visible reminder it doesn't pray or feel; it can *write* a prayer for you to pray.

### 4.6 Wellbeing quick-access
- Reachable from **You** and offered proactively when the app senses a hard moment (e.g., late-night Companion tone) — *offered*, never forced.
- Three doors: **I'm exhausted · I feel guilty · I'm anxious** → 60–90 second grace-first micro-content (Matt 11:28–30 / Lam 3:22–23 / Phil 4:6–7), one breath, one verse, one tiny step, and *"who could you tell?"* Ends by sending them to rest, prayer, or a person.
- If distress reads as crisis-level → routes to the crisis screen.

### 4.7 Settings ("You")
- Theme (System · Morning · Evening), text size, daily-verse on/off + time, translations shown, language (English v1).
- Account: create (magic-link) for backup/sync — clearly optional; **export my data**, **delete my account** (self-serve).
- **Statement of stream** page (Reformed/Baptist, CCF-aligned; humble, links to research), privacy policy (plain language), about, and a gentle "how this app thinks about your time" note explaining why there are no streaks.

---

## 5. Microcopy library (samples — see PERSONALITY.md)
- Primary CTAs: **Begin** · **Read together** · **Sit with this** · **Done for today** · **Invite your spouse**.
- Loading: *"One moment…"* (never spinners with hype copy).
- Offline: *"You're offline — your chapters and journal are right here. The rest will catch up later."*
- Error (gentle): *"Something went sideways on our end. Nothing you did. Try again in a bit."*
- Re-entry: *"Good to see you. Come in."*
- Close: *"Go — and may the Lord bless your house."*

## 6. Visual & motion (per design system)
Warm ivory canvas, sage primary, clay for hospitality moments, dawn used once-in-a-while as a sunrise. Serif Scripture is the hero. Soft, breathing transitions (180–320ms ease-out); chapter-complete/answered-prayer = a single gentle glow, never confetti. Full `prefers-reduced-motion` and dark "Evening" support. No religious clichés; natural, human, tactile imagery only. (design-system §5–7.)

## 7. Accessibility (per web PRD §11)
One-handed reachability; ≥44px targets; AA contrast on every token pairing; full keyboard + screen-reader support; large-text mode that reflows gracefully; captions/optional audio. Test with real tired-parent scenarios (dim room, one hand, interruptions).

## 8. Safety UX (crisis) — the deliberate exception
- **Always ≤2 taps.** A calm, ever-present "I need help now."
- **Crisis screen:** clear and directive but still warm — region-aware hotlines (US 988; PH NCMH; local emergency), "call your doctor," "reach your pastor," and, for postpartum crisis, plain baby-safety guidance ("put the baby somewhere safe and call now"). One line of comfort (Ps 34:18) — no more. **No parenting content, no study, no upsell.** This is the one screen allowed firm, unmissable contrast (design system §2.3).
- Companion + wellbeing both route here on crisis signals; the escalation copy mirrors [skill playbook T05](../skills/biblical-parenting-companion/tests/sample-transcripts.md).

## 9. Anti-patterns (UX-level, enforced in review)
Mirrors design-system §7 and [G7](../ai-values/guardrails.md): no streaks/guilt, no red "missed," no manipulative notifications ("we miss you!"), no infinite feed/autoplay, no badge-count anxiety, no "daily goal" framing, no dark-pattern retention. A returning parent is welcomed, never scolded. The measure of a good session is that the parent *closed the app and went to their family.*

## 10. Success (experience-level)
The experience is working when a parent says: *"I feel welcomed, not judged. I understood the Word a little better. And I closed it to go pray / talk to my spouse / hold my child."* That sentence is the whole design brief (Values 6, 7, 9, 10).

---

*"Come to Me, all who are weary… and I will give you rest."* — Matthew 11:28 (NASB1995). The whole experience is a doorway to that rest — then it opens and lets them walk through.
