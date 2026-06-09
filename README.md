# Cogniloop

<p align="center">
  <a href="https://cogniloop-vaibhav4046s-projects.vercel.app">
    <img src="docs/screenshots/hero.png" alt="The AI tutor that refuses to give you the answer" width="100%" />
  </a>
</p>

> The AI tutor that **refuses** to give you the answer.

**Live:** https://cogniloop-vaibhav4046s-projects.vercel.app

Most AI study tools summarize content for you — and quietly destroy your understanding. Cogniloop does the opposite: it forces **active recall** through the Feynman technique, drills you with Socratic questions, evaluates your explanations, and adapts each round to your blind spots.

```
You paste a topic.
Cogniloop extracts the concepts.
Cogniloop asks. You explain.
Cogniloop grades. Cogniloop probes the gap.
Loop until mastered.
```

---

## What it does (115+ shipped features)

**Core loop**
- Locked Socratic system prompt — refuses to give answers, forces explanation
- 5 question types: explain, apply, contrast, predict, trace
- Adaptive difficulty 1–5, scales with your performance
- 0–3 scoring rubric per round with verdict + gaps + strengths
- Concept state machine: `weak → shaky → solid → mastered`
- Live concept tracker sidebar with progress bars
- 8-round soft cap with smart "should-end" detection

**3 study modes**
- **Chill** — patient, hints generously, low starting difficulty
- **Exam** — strict grading, 90s timer per round, mid-range difficulty
- **Expert** — adversarial, first-principles, starts at difficulty 3

**8 curriculum templates** — pre-loaded concept maps, click-to-start
- JEE Main (Physics, Chemistry, Math — NCERT)
- NEET UG (Bio, Physics, Chemistry)
- GATE CSE (data structures, algorithms, OS, DBMS, computer networks, compiler theory, digital logic, engineering math — 8 standalone subjects)
- MCAT (Bio/Biochem, Chem/Phys, Psych/Soc, CARS — all 4 sections)
- AP Computer Science (CSA + CSP)
- ML Fundamentals (linear algebra, probability, optimization, neural nets, unsupervised learning, transformers, generative AI/LLMs, RL, MLOps)
- System Design (distributed systems, databases, APIs, scaling, microservices — interview-ready)
- Economics (micro, macro, behavioral, international, financial markets — AP, college, CFA Level 1)

**Input / output**
- Voice input via Web Speech API (Chrome/Edge)
- Read-aloud questions via Speech Synthesis
- LaTeX/KaTeX math rendering in questions, answers, evaluations
- Live math preview while typing
- In-session LaTeX math syntax panel — toggle with `t` for a quick reference card covering common symbols and expressions mid-answer; pairs with live preview for STEM-heavy sessions (JEE/NEET/GATE/MCAT)
- Markdown export of full session
- URL-encoded shareable session links — no backend, no leaks
- One-click copy button on the active session question card — paste directly into Notion, Anki, or any notes app; `c` keyboard shortcut
- One-click "Print / PDF" button in the coaching report — triggers the browser print dialog to save the session as a clean PDF (light theme, headers/sidebar hidden); `p` keyboard shortcut
- Per-round feedback card with strengths + gaps as bullet lists
- Collapsible round-review in coaching report — question, answer, score, and verdict per round
- Live word count while typing — color-coded amber / accent / green as explanation depth grows
- Question-type-aware answer placeholder — five coaching-voice prompts matched to explain / apply / contrast / predict / trace
- Question-type-aware "Stuck?" starters — one-click seed phrase opens the right frame for each question type (Feynman, concrete scenario, mechanism diff, cause-effect chain, step-by-step trace)
- Browser tab title shows the active study topic (e.g. "Backpropagation · Cogniloop")
- Live running average score in session header — e.g. "Round 3 / 8 · avg 2.5/3" — once the first round is graded
- Coaching report subtitle and markdown export show total words written across all rounds (e.g. "5 rounds · 12 min · avg 2.3/3 · 847 words written") — concrete measure of explanation depth

**Persistence + accountability**
- Daily streak counter (Duolingo-style)
- 90-day activity heatmap
- Lifetime stats: sessions, rounds, mastered concepts, avg score, study time
- Full session history with searchable list and Study again one-click
- Session search empty state offers "Study this topic now →" to launch a session directly on any unmatched search phrase
- localStorage-only — no accounts, no logs, no servers

**LLM layer**
- Multi-provider with automatic fallback
- Default: Pollinations.ai free public endpoint (no API key, no signup)
- Optional: Groq Llama 3.3 70B if `GROQ_API_KEY` env var is set
- Retry with exponential backoff
- Strict JSON mode + multi-strategy parser (raw, fenced, slice)
- Edge runtime on every route

**UX details**
- Sleek dark theme, Linear-inspired
- Geist font, KaTeX math styling
- Keyboard-first: `?` shortcuts panel, `g+g` home, `g+t` `g+h` `g+w` `g+s` quick-nav, `/` to focus, `Enter` to start · `⌘/Ctrl+Enter` to submit, `1/2/3` mode switch, `e` to end, `m`/`l` mic/read-aloud, `c` copy question, `f` focus answer, `h` Stuck? starter, `t` toggle math panel, `n` new session, `d` download report, `p` print PDF, `s` share link, `j` copy Feynman journal prompt, `r` re-drill weak concept / retry on error, `v` toggle round-by-round review in report, `b` browse curriculum templates
- Per-round difficulty dots, mode badges, question-type tags
- Scroll-progress reading bar on `/templates`, `/history`, `/why` — accent-colored 2px bar fills as you scroll
- Back-to-top button on long-scrolling pages — appears after 20% scroll depth, smooth-scrolls to top, instant jump when `prefers-reduced-motion` is set
- Sticky concept tracker on desktop, collapsible mobile
- Session resume on browser refresh
- Empty-state coaching card on the home page
- Score trend sparkline in coaching report — color-coded dots across all rounds
- Rotating coaching hints during start, grading, and report phases — 8 / 8 / 8 pool, brand voice throughout
- Previously-drilled dot on each curriculum topic button in `/templates` — accent dot when that topic exists in session history; `aria-label` appends "— previously drilled" for screen readers; zero network requests, invisible to first-time visitors
- Filter result in `/templates` shows `N of 8 packs · M topics` — see at a glance how much drill content the current query covers
- Mode-colored dot on session history cards in `/history` — green=Chill, amber=Exam, purple=Expert for instant visual scan without reading the label
- Actionable error tips in session error state — 429 rate-limit, 404 not-found, and timeout each show a specific fix (wait+retry, switch provider, use Groq) with a direct Settings link instead of the generic "retry" fallback

**Pages**
- `/` — landing with mode picker, examples, curriculum cards, feature grid
- `/templates` — full curriculum browser with topic-level filter
- `/history` — heatmap, streak, lifetime stats, session list
- `/why` — comparison table vs ChatGPT/Claude, 7-question FAQ, 6 use cases
- `/study` — the active session
- `/settings` — Groq API key, provider preference, voice language, TTS rate/pitch
- `/shared/[token]` — read-only view of any URL-encoded session

## Why this beats wrapping ChatGPT yourself

| | Cogniloop | ChatGPT / Claude |
|---|---|---|
| Default behavior | Asks you to explain | Answers immediately |
| Bypass-resistance | System prompt + UI lock | One re-prompt away |
| Concept progress map | Live, structured | None — buried in scrollback |
| Difficulty scaling | Explicit 1–5 | Improvised tone |
| Coaching report | Markdown export, study plan, journal prompt | Loose prose if asked |
| Streak / accountability | Yes | No |
| Curriculum templates | 8 packs, 100+ topics | Cold-start every chat |
| Privacy | Browser-only | Server-stored |
| Cost | $0 forever | $0 limited / $20+ pro |

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 App Router |
| UI | React 19 + Tailwind CSS v4 |
| Language | TypeScript (strict) |
| Math | KaTeX |
| Runtime | Edge functions on every `/api/*` route |
| LLM | Pollinations.ai (default, no key) → Groq Llama 3.3 70B (fallback) |
| Persistence | `localStorage` (history, streak, in-flight session) |
| Hosting | Vercel |

## Architecture

```
app/
├── page.tsx                  → landing
├── study/page.tsx            → session container
├── templates/page.tsx        → curriculum browser
├── history/page.tsx          → streak, heatmap, sessions list
├── why/page.tsx              → comparison + FAQ + use cases
├── settings/page.tsx         → API key, provider, voice preferences
├── shared/[token]/page.tsx   → read-only session view
└── api/session/
    ├── start/route.ts        → extract concepts + first question
    ├── turn/route.ts         → evaluate + next question
    └── report/route.ts       → coaching report

components/
├── Landing.tsx               → home with input + mode picker + examples
├── Session.tsx               → state machine + question/answer/eval + report
├── TemplatesView.tsx         → curriculum browser with filter
├── HistoryView.tsx           → heatmap + sessions list
├── WhyView.tsx               → comparison + FAQ + use-cases
├── SharedView.tsx            → read-only shared session
├── SettingsView.tsx          → API key + voice settings UI
├── NavBar.tsx                → top nav with g+x shortcuts
├── ModePicker.tsx            → Chill/Exam/Expert
├── StatsPanel.tsx            → streak / sessions / rounds / avg score
├── VoiceInput.tsx            → Web Speech API mic
├── ReadAloud.tsx             → Speech Synthesis
├── ShortcutsModal.tsx        → ? panel
├── ShortcutsLoader.tsx       → lazy-loads ShortcutsModal out of the critical bundle
├── ScrollProgress.tsx        → 2 px accent reading-progress bar (/templates, /history, /why)
├── Toast.tsx                 → ephemeral error / success notifications
├── Math.tsx                  → KaTeX renderer with $...$ + $$...$$
└── Logo.tsx

lib/
├── types.ts                  → SessionState, Round, Concept, Evaluation
├── prompts.ts                → SYSTEM_CORE + EXTRACT/EVAL/REPORT + mode overlays
├── llm.ts                    → multi-provider chat() with retry + JSON parser
├── sessionLogic.ts           → runStart / runTurn / runReport (shared by edge + browser)
├── settings.ts               → UserSettings read/write + browserCallCtx() helper
├── modes.ts                  → Chill / Exam / Expert
├── curricula.ts              → 8 curriculum packs
├── hints.ts                  → loading / grading / ending hint copy
├── storage.ts                → history, streak, lifetime stats
├── share.ts                  → URL-safe base64 encode/decode
├── fetchRetry.ts             → fetch with exponential-backoff retry
├── rateLimit.ts              → edge-side rate-limit middleware
├── labels.ts                 → QTYPE_DESC / STRENGTH_DESC / QTYPE_PLACEHOLDER / STUCK_STARTERS / STRENGTH_COLOR
├── kbd.ts                    → isInTextField keyboard guard (shared across all pages)
├── useAutoExpand.ts          → auto-expanding textarea hook
└── useGlobalNav.ts           → g+x chord navigation shortcuts
```

## Run locally

```bash
git clone https://github.com/vaibhav4046/cogniloop.git
cd cogniloop
npm install
npm run dev
```

Open http://localhost:3000 — no `.env` required.

Optional: set `GROQ_API_KEY` in `.env.local` for higher-quality / faster responses via Groq Llama 3.3 70B (free tier available at console.groq.com).

## Deploy

```bash
vercel deploy --prod
```

Edge runtime is already configured per route.

## Roadmap

- [ ] Spaced repetition queue across sessions (return weak concepts on a schedule)
- [ ] PDF / image OCR ingestion for textbook pages
- [ ] Classroom mode — teacher generates topic + dashboard, students drill
- [ ] Anki / Obsidian export
- [ ] Self-hostable LLM backend (Ollama)

## Author

Built by **Vaibhav Lalwani** — [github.com/vaibhav4046](https://github.com/vaibhav4046)

## License

MIT
