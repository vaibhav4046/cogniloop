# Cogniloop Changelog

- 2026-05-26 UI copy polish: keyboard hint below the "Begin the loop" button now uses styled `<kbd>` elements matching the ShortcutsModal — ⌘/Ctrl and Enter render as chip badges instead of raw text; topic input shows a subtle character counter (e.g. "312 / 400") only when the user approaches the 400-char limit, matching the notes field pattern

- 2026-05-26 micro-animation: coaching report sections now cascade in with staggered fade-up — headline at 0ms, bucket cards at 80ms, study plan at 160ms, Feynman card at 240ms, action buttons at 300ms — replaces the single block fade-in with a progressive reveal that draws the eye through the report

- 2026-05-26 keyboard shortcut: press Escape while the filter input on /templates or the search input on /history is focused to clear its value and blur the field — pairs with the existing / shortcut to focus; ShortcutsModal Esc label updated to mention "Clear filter / search"

- 2026-05-26 tiny feature: word count in the session answer textarea is now color-coded — amber under 20 words (write more), accent purple at 20–49 words (good start), green at 50+ words (thorough explanation); gives users a subtle depth signal without interrupting flow

- 2026-05-26 refactor: extract duplicate QTYPE_DESC and STRENGTH_DESC constants from Session.tsx and SharedView.tsx into lib/labels.ts — single source of truth, ~20 lines of duplicated code removed

- 2026-05-26 perf: wrap ModeSwitcher and BucketCard in React.memo — ModeSwitcher skips re-renders on every answer keystroke (modeId and setModeId are stable), BucketCard skips re-renders when copy/share state changes in the coaching report (report.mastered/shaky/weak arrays are stable once the report is set)

- 2026-05-26 curriculum: add "Searching and sorting" to AP CSA (7→8 topics) covering linear/binary search, selection/insertion/merge sort, sort stability, and iterative vs recursive implementations — a full exam unit that was absent; expand MCAT Psych/Soc (4→6 topics) with "Biological bases of behavior" (brain structures, neurotransmitters, sleep, emotion theories) and "Identity, attitudes, and group behavior" (self-concept, stereotypes, conformity, bystander effect) — two of the most heavily weighted MCAT Psych/Soc areas previously missing

- 2026-05-26 a11y: error and warn toasts now use role="alert" + aria-live="assertive" so screen readers interrupt immediately to announce them, while info/success toasts keep role="status" + aria-live="polite"; all toasts gain aria-atomic="true" so the full message is read as a unit

- 2026-05-25 curriculum: expand MCAT Bio/Biochem (4→6 topics) with "Amino acids and protein structure" and "Cardiovascular and respiratory physiology" — two of the most heavily tested MCAT sections previously absent; expand Chem/Phys (3→4 topics) with "Electrochemistry" (galvanic cells, Nernst equation, Faraday's laws); flesh out existing topic blurbs with testable detail

- 2026-05-25 curriculum: add "Optimization algorithms" (SGD, Adam, cosine decay) to ML Fundamentals Math & Stats (4→5 topics); add new "Unsupervised Learning" subject with 3 topics — clustering, dimensionality reduction, and self-supervised/contrastive learning — two major ML areas previously absent from the pack; update blurb and README

- 2026-05-25 keyboard shortcut: press S from the coaching report to copy the share link — complements N (new session), D (export markdown), and R (re-drill); listed in ShortcutsModal Report section; button gains title tooltip and aria-keyshortcuts="s"

- 2026-05-25 micro-animation: heatmap today's cell now pulses with the accent glow animation instead of a static border ring — the empty-state copy already called it "glowing", now it actually is

- 2026-05-25 friendlier error message: HistoryView import backup now shows coaching-voice error messages — wrong-version and missing-history throws use plain English; JSON/parse errors are caught and humanized; error display gains a Dismiss button

- 2026-05-25 README/docs update: bump "45+ shipped features" to "55+"; add collapsible round-review and browser-tab-title features to Input/output; add Study-again one-click to Persistence; add `d` download-report and `r` re-drill to keyboard-first shortcut blurb

- 2026-05-25 UI copy polish: "What's inside" section heading → "What makes it different"; "Keyboard-first" blurb drops raw shortcut notation for plain-English copy; "Shareable session links" feature title trimmed and blurb drops "URL-encoded session state" jargon; WhyView "Use cases" heading → "Built for these study moments"; CTA "Try one round. See the difference." → "One loop is enough to feel it."

- 2026-05-25 curriculum: add "Complex numbers and quadratic equations" and "Matrices and determinants" to JEE Mathematics (7→9 topics), and "Recurrent networks and sequence models" (RNN, LSTM, GRU, seq2seq) to ML Fundamentals Models — three core topics previously missing from both packs

- 2026-05-25 tiny feature: coaching report now has a collapsible "Review all N rounds" section showing each round's question, answer, score, and verdict — lets users revisit what they said without needing to export markdown or open a share link

- 2026-05-25 perf: useMemo for evald/avg/totalMins in ReportView (avoids recomputation on copied/shareUrl state changes), plus hoist inline score-color bg object to module-level SCORE_BG constant (no per-iteration allocation in the score trend map)

- 2026-05-25 micro-animation: curriculum pack section cards on /templates now cascade in with staggered item-in animation (60ms per-card delay, idx 0–7), matching the landing page curriculum card entrance pattern; newly filtered cards also animate in when the search changes

- 2026-05-25 brand voice: Landing.tsx notes section summary and placeholder rewritten to coaching voice — "Studying from a textbook or lecture? Drop your notes here" replaces the administrative "Optional: paste your notes…"; Stuck? button gains a title tooltip explaining its purpose instead of the mechanical aria-label

- 2026-05-25 a11y: add aria-keyshortcuts to all shortcut-bearing buttons (?, m, l, e, n, d, r) so assistive technologies surface keyboard shortcuts for the shortcuts panel trigger, voice input, read-aloud, end-session, and the three coaching-report actions

- 2026-05-25 skeleton loader: heatmap card on /history now shows 90 shimmer cells matching the real grid layout while localStorage loads, replacing the brief flash of an empty inactive grid

- 2026-05-25 refactor: export dayKey from lib/storage.ts and remove the identical duplicate in HistoryView.tsx — single source of truth for the YYYY-MM-DD timestamp formatter used by streak tracking and the 90-day heatmap

- 2026-05-24 curriculum: add "Magnetic effects of current and magnetism" and "Semiconductor electronics and communication systems" to NEET Physics (5→7 topics), and "Electrochemistry" to NEET Chemistry (4→5 topics) — three major NEET sections previously missing from the pack; update blurb to reflect complete coverage

- 2026-05-24 UI copy polish: SharedView round cards now capitalize question-type tags (Explain/Apply/Contrast/Predict/Trace), replace raw "diff N" label with filled/hollow dot indicator matching the session view, and concept strength tags gain hover tooltips with coaching-voice descriptions

- 2026-05-24 keyboard shortcut: press R from the coaching report to immediately re-drill the first weak/shaky concept — complements N (new session) and D (export markdown); listed in ShortcutsModal Report section; Re-drill button title hints at the shortcut

- 2026-05-24 micro-animation: history session list cards cascade in with staggered fade-up entrance (35ms per-card delay, capped at card 12), matching the StatsPanel and concept tracker patterns — list feels progressive on load and updates gracefully when search filters change

- 2026-05-24 UI copy polish: ShortcutsModal flat shortcut list reorganised into four labelled sections (Global, Navigate, Session, Report) — same 14 shortcuts, scannable at a glance without the "(in session)" / "(from report)" inline annotations

- 2026-05-24 tiny feature: browser tab title updates to the session topic (e.g. "Backpropagation · Cogniloop") once the session loads, making multi-tab study instantly identifiable; resets to "Study · Cogniloop" on unmount

- 2026-05-24 keyboard shortcut: press D from the coaching report to instantly download the markdown export — complements the existing N (new session) shortcut and is listed in the ShortcutsModal; implemented with a stable-ref useEffect inside ReportView so the listener never re-registers during the static report phase

- 2026-05-24 brand voice: expand loading hint pools — STARTING_HINTS 5→8, GRADING_HINTS 5→8, ENDING_HINTS 4→6 — giving repeat users more variety during session start, grading, and report generation phases

- 2026-05-24 refactor: extract repeated auto-expand textarea logic from Landing.tsx and Session.tsx into a shared useAutoExpand hook in lib/useAutoExpand.ts — removes ~10 lines of duplicated boilerplate, identical behavior preserved

- 2026-05-24 UI copy polish: ShortcutsModal nav-destination labels now capitalize page names (Home/History/Templates/Why/Settings), drop the URL-style "/why" prefix, and the E key label clarifies it generates a report ("End session & generate report" vs "End session early"); / shortcut label trimmed to remove the page-list parenthetical

- 2026-05-24 perf: ScrollProgress replaces useState with a DOM ref — scroll handler writes width and aria-valuenow directly to the element, eliminating per-scroll-event React re-renders on /why

- 2026-05-24 a11y: heatmap grid gains role="img" + aria-label summarising active-day count and streak so screen readers get a meaningful description instead of 90 silent coloured cells; each cell gets aria-hidden="true"; ScoreBadge gets aria-hidden="true" since avg score is already spoken in the session meta text

- 2026-05-24 micro-animation: landing page curriculum pack cards now cascade in with staggered item-in animation (60ms per-card delay), matching the entrance style used by concept tracker items, EvalCard bullets, and study plan entries

- 2026-05-24 curriculum: split GATE CSE "Core CS" into standalone "Algorithms" (5 topics: analysis, greedy, D&C, DP, graph) and "Theory & Compilers" (3 topics: theory of computation, compiler design, computer organization) — brings subject count to 7, matching the README claim; update pack blurb to list all 7 subjects

- 2026-05-24 tiny feature: answer textarea in session auto-expands as the user types (up to 400px) — consistent with the notes field on the landing page; longer answers no longer require internal scrolling

- 2026-05-23 micro-animation: /why page gains a 2px accent reading-progress bar fixed at the viewport top that fills as the user scrolls through the comparison table and FAQ; extracted as a reusable ScrollProgress client component with role="progressbar" aria attributes

- 2026-05-23 README/docs update: sync README with current state — bump "35+ shipped features" to "45+"; update GATE CSE description to list 7 standalone subjects; add CARS to MCAT (all 4 sections); add generative AI/LLMs to ML Fundamentals; add financial markets to Economics; add g+g home shortcut to keyboard-first blurb

- 2026-05-23 curriculum: add "Computer Networks" as a standalone subject to GATE CSE (data link layer, network layer, transport layer, application layer, and network security — 5 topics covering the ~11% GATE weightage previously collapsed into a single Core CS line); remove redundant "Computer networks" entry from Core CS

- 2026-05-23 friendlier error message: humanizeError in Session now maps 502/bad-gateway, "malformed model output", and HTTP 500 to plain-English coaching copy instead of leaking raw error strings; generic catch-all for long or "HTTP …"-prefixed messages replaces the previous bare `return raw` fallback

- 2026-05-23 brand voice: ConceptPanel strength badges (weak/shaky/solid/mastered) gain coaching-voice title tooltips explaining each level on hover; header now shows "N / M mastered" count (accented when all are mastered) instead of a static concept count

- 2026-05-23 curriculum: add "Operating Systems" as a standalone subject to GATE CSE (process management, CPU scheduling, synchronization & deadlocks, memory management, file systems — 5 topics replacing the single-line OS entry in Core CS and matching the ~10-15% GATE weightage)

- 2026-05-23 tiny feature: "Study again" button on every history session card — one click reloads that topic in the same mode straight into /study, matching the Re-drill pattern already in the coaching report

- 2026-05-23 tiny feature: "Re-drill" one-click button in coaching report — appears when weak or shaky concepts remain, pre-fills that concept as the session topic and navigates straight to /study; share URL in report is now a clickable link instead of plain text

- 2026-05-23 keyboard shortcut: press G then G to navigate home from any page — the double-G chord completes the nav set (G+T templates, G+H history, G+W why, G+S settings) and is listed in the ShortcutsModal; handler restructures the NavBar key listener to intercept the second G press before it resets the buffer

- 2026-05-23 refactor: extract shared PhaseLoader component in Session.tsx — the identical dot-pulse + hint-rotate JSX used by the booting/starting and ending phases is now a single named component, removing ~17 lines of duplicated markup

- 2026-05-23 micro-animation: StatsPanel stat cards cascade in with staggered fade-up (55ms per-card delay) after the skeleton resolves, so the five stats appear progressively instead of flashing in all at once

- 2026-05-23 perf: wrap TemplatesView `filtered` in `useMemo` — hoists `filter.trim().toLowerCase()` outside the per-item callback and short-circuits to the full CURRICULA array when the filter is empty, avoiding redundant work on every unfiltered render

- 2026-05-23 UI copy polish: landing page curriculum cards now show a topic count ("22 topics") below the region label, giving users an at-a-glance sense of each pack's depth before clicking through to /templates

- 2026-05-23 a11y: ReadAloud button gains aria-label ("Read question aloud" / "Stop reading aloud"), aria-pressed state, accent highlight while speaking (matching VoiceInput's active style), pulsing icon animation, and aria-hidden on the SVG; waves now render while audio plays rather than while idle

- 2026-05-23 curriculum: add "Financial Markets & Instruments" as a 4th subject to the Economics pack (bond pricing & duration, equity valuation, portfolio theory/CAPM, derivatives/options, market efficiency — 5 topics covering the financial markets section of CFA Level 1 that the pack blurb promised but previously lacked); update pack blurb to mention financial markets

- 2026-05-22 brand voice: mode blurbs in ModePicker now lead with the most concrete differentiator per mode — Chill surfaces "patient hints + no timer", Exam surfaces "90-second clock + no hints", Expert surfaces "first-principles only + will find every gap" — replacing generic spec bullets with coaching-voice copy

- 2026-05-22 empty state polish: coaching report study plan now shows "Nothing to revisit — all concepts held up under pressure." instead of a blank card when the LLM returns an empty study plan (perfect session)

- 2026-05-22 curriculum: add "Database Management Systems" as a standalone subject to GATE CSE (ER model, relational model + SQL, normalization, transaction management, indexing + query processing — 5 topics covering the full DBMS section worth ~10% of GATE marks); remove the single-line "Databases" entry from Core CS

- 2026-05-22 README/docs update: sync keyboard shortcuts (add m/l/n), add live word count and score sparkline to feature list

- 2026-05-22 UI copy polish: coaching report study plan card now shows topic count and total estimated time ("3 topics · 18 min") in the card header, giving users an at-a-glance sense of the recommended study load

- 2026-05-22 UI copy polish: history session cards now show session duration (e.g. "8 min") when available, fix "1 rounds" → "1 round" pluralization, and hide the "0 mastered" label (non-info that reads as a failure)

- 2026-05-22 friendlier error message: Session humanizeError now covers 401/unauthorized (directs to Settings) and quota-exhausted cases; SettingsView Groq key-test errors give actionable copy ("copy the full key from console.groq.com/keys"); SharedView broken-link message explains what to do next

- 2026-05-22 curriculum: add "Waves & Oscillations" to JEE Physics (SHM, wave equation, sound, Doppler, standing waves) and "Electrochemistry" to JEE Chemistry (electrolytic cells, Faraday's laws, electrode potentials, Nernst equation) — two major JEE topics previously missing from the pack

- 2026-05-22 micro-animation: coaching report study-plan items and bucket-card concept lists now cascade in with staggered item-in animation (70ms and 55ms per-item delays), making the final report feel like a progressive reveal rather than a static wall of text

- 2026-05-22 keyboard shortcut: press / on the /history page to focus the session search input — consistent with landing and templates; placeholder text updated to hint at the shortcut; ShortcutsModal label updated to list all three pages

- 2026-05-22 a11y: DiffDots component now has role="img" + aria-label ("Difficulty N of 5") so screen readers announce question difficulty; inner dot spans get aria-hidden="true"; session difficulty tag gains a title tooltip for sighted hover

- 2026-05-22 refactor: ShortcutsModal now uses isInTextField from lib/kbd.ts instead of an inline text-field guard — removes duplicate logic missed during the earlier kbd.ts extraction

- 2026-05-22 perf: convert WhyView to a Server Component by removing the unneeded "use client" directive — static comparison table, FAQ, and use-case cards are now prerendered as HTML and excluded from the client JS bundle

- 2026-05-22 tiny feature: score trend sparkline in coaching report — a row of color-coded score dots (red=0, amber=1, green=2, purple=3) shows the user's performance arc across rounds at a glance

- 2026-05-20 UI copy polish: question type tag in active session now capitalizes the label (Explain/Apply/Contrast/Predict/Trace) and shows a native tooltip describing each type on hover — helps users understand what kind of answer is expected

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
