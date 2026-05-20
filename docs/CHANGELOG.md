# Cogniloop Changelog

- 2026-05-20 curriculum: add Reinforcement Learning subject to ML Fundamentals pack (MDPs, dynamic programming, Q-learning, policy gradients, exploration/exploitation, deep RL — 6 new topics); update pack blurb

- 2026-05-20 micro-animation: EvalCard strengths and gaps bullets now cascade in from the left with staggered 55ms-per-item delay, making feedback easier to read progressively instead of landing all at once

- 2026-05-20 a11y: ShortcutsModal now traps keyboard focus inside the dialog (Tab/Shift+Tab cycles within), moves focus to the close button on open, and returns it to the trigger button on close

- 2026-05-20 empty state polish: heatmap on /history now highlights today's cell with an accent glow so users know where they are; adds a friendly nudge below the grid when no activity has been logged yet

- 2026-05-19 brand voice: SharedView meta line now shows "Exam mode" / "Chill mode" / "Expert mode" via getMode() instead of raw modeId ("exam"); footer drops "URL-encoded payload" jargon for plain-English privacy copy

- 2026-05-19 skeleton loader: StatsPanel now shows 5 shimmer placeholder cards while localStorage hydrates instead of returning null, eliminating layout shift on landing and history pages

- 2026-05-19 refactor: extract repeated isInTextField keyboard guard into lib/kbd.ts; update NavBar, Session, TemplatesView, Landing to use it — removes ~24 lines of duplicated boilerplate

- 2026-05-18 keyboard shortcut: press N from the session report to immediately start a new session without reaching for the mouse; documented in ShortcutsModal

- 2026-05-17 tiny feature: fire a success toast whenever a concept transitions to "mastered" during a session so users get real-time confirmation of their progress

- 2026-05-17 dependency bump: katex 0.16.45→0.16.47 (patch — two bug-fix releases)

- 2026-05-16 UI copy polish: session header now shows "Round N / 8" text label alongside the progress bar so users always know their round count at a glance

- 2026-05-16 perf: add 128-entry module-level LRU cache in Math.tsx so identical KaTeX expressions (repeated formulas across rounds) are rendered only once
- 2026-05-15 curriculum: add Observability & Reliability subject to System Design pack (SLOs/SLIs, distributed tracing, metrics/alerting, log aggregation, chaos engineering — 5 new topics)

- 2026-05-15 micro-animation: concept tracker items cascade in with staggered fade-up (55ms per item) on session load; switch animation-fill-mode to "both" so items stay invisible during their delay

- 2026-05-15 a11y: link all SettingsView form labels to their controls via htmlFor/id; add aria-label to Show/Hide key button; add role=radiogroup + role=radio + aria-checked to provider preference buttons

- 2026-05-14 fix: repair broken JSX string escaping in math-hint tooltip (Session.tsx); correct stale Pollinations model name in FAQ (gpt-oss-20b → openai/openai-fast/mistral)

- 2026-05-13 fix: restore Landing.tsx component body (accidentally truncated in Economics commit); add timer-urgent pulse animation for Exam mode final 10 seconds

- 2026-05-13 curriculum: add Economics pack (micro, macro, behavioral & international — 15 topics across 3 subjects; updates count to 8 packs across all copy)

- 2026-05-09 UI copy polish: report view tag renamed "Session report" → "Coaching report"; subtitle drops mechanical "On:" prefix and fixes "mode Exam" → "Exam mode" word order

- 2026-05-09 tiny feature: Feynman journal prompt in session report now has a one-click "Copy" button so users can paste it straight into their journal app

- 2026-05-09 empty state polish: StatsPanel now shows a coaching nudge on first visit instead of blank space — "Streak, rounds drilled, and mastered concepts appear here — finish your first session to start tracking."

- 2026-05-09 curriculum: add CARS (Critical Analysis and Reasoning Skills) as the 4th MCAT subject — 5 topics covering main idea, author purpose, evidence evaluation, inference, and comparative passage analysis; fixes gap between blurb and actual data

- 2026-05-09 perf: wrap ModePicker in React.memo so it skips re-renders on every Landing keystroke; add role="group" + aria-pressed for correct toggle-button semantics

- 2026-05-09 keyboard shortcut: press / to focus the filter input on /templates (matches landing page behaviour); ShortcutsModal label updated to reflect both pages; aria-label added to filter input

- 2026-05-09 refactor: replace remaining raw internal <a> tags with Next.js Link in HistoryView empty-state CTA and Session error-state Settings link — adds right-click/middle-click/screen-reader semantics

- 2026-05-09 tiny feature: answer field now shows a live word count ("N words · ") while typing, encouraging users to write fuller explanations

- 2026-05-09 dependency bump: next 16.2.5→16.2.6 (patch)

- 2026-05-09 micro-animation: Toast notifications now show a thin draining progress bar at the bottom so users can see how long until auto-dismiss

- 2026-05-09 a11y: add aria-label="Site navigation" to NavBar <nav> and aria-current="page" to the active link — screen readers now announce which page is current

- 2026-05-09 curriculum: add Data Structures subject to GATE CSE pack (arrays/strings, linked lists, stacks/queues, trees, heaps, hashing — 6 topics covering a major exam section)

- 2026-05-08 micro-animation: EvalCard now shows an animated score bar (0–3 → 0–100%) that slides in via CSS transition on each round result, using role=meter for accessibility

- 2026-05-08 brand voice: tighten copy in ConceptPanel ("drilled N×" vs "N attempts"), report Feynman label, TemplatesView footer, and heatmap tooltip ("drilled" vs "active")

- 2026-05-08 refactor: replace router.push("/") with Next.js Link in SessionShell (Session.tsx) and WhyView CTA — removes two useRouter calls, gives proper anchor semantics (right-click, middle-click, screen reader)

- 2026-05-08 a11y: add id="main" to every <main> element across all 7 page components so the existing skip-to-content link in layout.tsx actually works


- 2026-05-08 README/docs update: add /settings page + SettingsView/Toast components + 5 missing lib files (sessionLogic, settings, hints, fetchRetry, rateLimit) to Architecture section

- 2026-05-08 UI copy polish: report view shows getMode().name (Chill/Exam/Expert) instead of raw modeId in subtitle and markdown export; BucketCard empty states get coaching-voice messages

- 2026-05-08 a11y: add role=progressbar + aria-valuemin/max/now to session progress bar and all concept tracker bars in Session.tsx

- 2026-05-08 UI copy polish: history session list shows proper mode display name (Chill/Exam/Expert) instead of raw lowercase modeId via getMode()
- 2026-05-08 skeleton loader: SettingsView replaces blank null flash with shimmer skeleton (tag, heading, description, three section cards) while localStorage hydrates
- 2026-05-08 micro-animation: wire up GRADING_HINTS in answer field during evaluating phase — rotating coaching hints replace dead silence while the LLM grades

- 2026-05-06 curriculum: add System Design pack (8 core concepts + 6 design problems, 7th curriculum)
- 2026-05-06 skeleton loader: history page shows shimmer cards while localStorage loads, preventing flash of empty state
- 2026-05-06 a11y: ShortcutsModal gets role=dialog + aria-modal + aria-labelledby; trigger and close buttons get aria-label; answer textarea gets aria-label
- 2026-05-07 curriculum: add AP CSP subject to AP Computer Science pack (7 topics: binary, internet, cybersecurity, algorithms, abstractions, data/privacy, societal impact)
- 2026-05-07 empty state polish: templates filter no-match state upgraded to branded card with helpful copy and clear-filter button; concept tracker bars gain smooth background color transition
- 2026-05-07 keyboard shortcut: document G+S (go to settings) in ShortcutsModal and README — shortcut was live in NavBar but invisible to users
- 2026-05-07 perf: wrap ConceptPanel, EvalCard, Block, DiffDots in React.memo to skip KaTeX re-renders on every answer keystroke
- 2026-05-07 micro-animation: btn-primary hover gains accent glow ring; curriculum cards lift on hover; feature grid cards gain hover bg highlight
- 2026-05-07 friendlier error message: map raw LLM error strings (429, network fail, timeout, parse error) to plain-English messages in Session error state and toast notifications
- 2026-05-07 UI copy polish: WhyView comparison table now lists System Design as the 7th curriculum pack; Landing keyboard-first blurb updated to include g+w, g+s, and e shortcuts
- 2026-05-07 a11y: replace NavBar button elements with Next.js Link for proper anchor semantics (right-click, middle-click, screen reader "link" role)
- 2026-05-07 UI copy polish: surface totalMastered concepts count in StatsPanel (was computed in lifetimeStats but never rendered); grid bumped to 5 columns
- 2026-05-07 dependency bump: next 16.2.4→16.2.5, react + react-dom 19.2.4→19.2.6 (patch-only)
- 2026-05-07 skeleton loader: SharedView replaces blank null flash with shimmer skeleton (title, meta, button, concept tags, 3 round cards) while URL token decodes
- 2026-05-07 refactor: extract browserCallCtx() helper into lib/settings.ts; remove 3 repeated getSettings/useBrowserDirect blocks from Session.tsx
- 2026-05-07 brand voice: rewrite lib/hints.ts loading messages to use coaching language (gaps, blind spots, weak spots, forced articulation, Feynman) instead of generic engineer status copy
- 2026-05-07 UI copy polish: fix stale "6 curriculum packs" in OG image to 7; add System Design to templates page description; add per-page metadata to /study
- 2026-05-07 curriculum: add Generative AI & LLMs subject to ML Fundamentals pack (tokenization, pre-training, RLHF, prompt engineering, diffusion models, LLM evaluation — 6 new topics)
- 2026-05-08 a11y: replace Landing.tsx nav/card buttons with Next.js Link (right-click, middle-click, screen-reader semantics); add aria-label to topic input, notes textarea, and nav landmark
- 2026-05-08 tiny feature: add live topic search/filter to /history session list — makes README "searchable list" claim true; shows "N shown" count and no-results card with clear button
- 2026-05-08 keyboard shortcut: wire up M (mic toggle) and L (read-aloud toggle) in VoiceInput and ReadAloud — shortcuts were documented in ShortcutsModal but not implemented
- 2026-05-08 curriculum: add Engineering Mathematics subject to GATE CSE (logic, set theory, graph theory, combinatorics, probability, linear algebra — 6 topics); fix blurb (was "ML", now "discrete math")
- 2026-05-08 perf: useMemo for heatmap build and filtered session list in HistoryView — eliminates redundant O(90) date loop and filter pass on every search keystroke; merge two separate react imports into one
