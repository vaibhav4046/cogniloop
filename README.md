# Cogniloop

<p align="center">
  <a href="https://cogniloop-vaibhav4046s-projects.vercel.app"><img src="docs/screenshots/hero.png" alt="AI tutor that refuses to give answers" width="100%" /></a>
</p>

> The AI tutor that **refuses** to give you the answer.

Most AI study tools summarize content for you — and quietly destroy your understanding. Cogniloop does the opposite: it forces **active recall** through the Feynman technique, drills you with Socratic questions, evaluates your explanations, and adapts each round to your blind spots.

**Live demo:** _(deployed on Vercel — see top of repo)_

---

## Why this exists

Reddit and r/college threads agree: students are drowning in "summarize this for me" wrappers that pass exams short-term and erode learning long-term. There is a glaring gap for tools that **make you do the thinking** while still giving structured feedback.

Cogniloop is that tool.

## What it does

1. **Paste a topic or your lecture notes.**
2. The AI extracts the underlying concepts and builds a live concept tracker.
3. It asks you a question — **explain**, **apply**, **contrast**, **predict**, or **trace** — calibrated to your weakest concept.
4. You answer in your own words. The AI grades the answer 0–3, surfaces what you got, calls out what's missing, and updates concept strengths (`weak → shaky → solid → mastered`).
5. The next question targets the next weakest spot. Difficulty scales with you.
6. When you've mastered the map (or hit the round cap), Cogniloop generates a coaching report with a personalized study plan and a 5-minute Feynman journal prompt.

No accounts. No API keys. No tracking. Sessions live in your browser.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| Language | TypeScript (strict) |
| Runtime | Edge functions for all `/api/*` routes |
| LLM | [Pollinations.ai](https://pollinations.ai) — free, no API key required, OpenAI-compatible |
| Persistence | `localStorage` only — fully client-side |
| Hosting | Vercel |

## Architecture

```
app/
├── page.tsx                  → landing
├── study/page.tsx            → session container
├── api/
│   └── session/
│       ├── start/route.ts    → extract concepts + first question
│       ├── turn/route.ts     → evaluate answer + next question
│       └── report/route.ts   → coaching report
components/
├── Landing.tsx               → home with input + examples
├── Session.tsx               → state machine + UI for the loop
└── Logo.tsx
lib/
├── types.ts                  → SessionState, Round, Concept, Evaluation
├── prompts.ts                → SYSTEM_CORE + 3 task prompts
└── llm.ts                    → Pollinations chat() + JSON extraction
```

Each route enforces strict JSON output from the model and validates the schema before returning. The Socratic core is encoded in three prompts (`EXTRACT_AND_FIRST_QUESTION`, `EVALUATE_AND_NEXT`, `FINAL_REPORT`) layered on a shared `SYSTEM_CORE` that hard-bans direct explanations.

## Run locally

```bash
git clone https://github.com/vaibhav4046/cogniloop.git
cd cogniloop
npm install
npm run dev
```

Open http://localhost:3000

No `.env` needed. No keys to manage.

## Deploy

```bash
vercel deploy --prod
```

Vercel auto-detects Next.js. Edge runtime is already configured per route.

## Roadmap

- [ ] Voice input for answers (speech-to-text)
- [ ] Spaced-repetition queue across sessions
- [ ] PDF / image OCR ingestion for textbook pages
- [ ] Shareable session reports (URL-encoded, no backend)
- [ ] Optional self-hosted LLM backend (Ollama)

## Author

Built by **Vaibhav Lalwani**.

## License

MIT
