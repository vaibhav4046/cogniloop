# Cogniloop Changelog

- 2026-05-06 curriculum: add System Design pack (8 core concepts + 6 design problems, 7th curriculum)
- 2026-05-06 skeleton loader: history page shows shimmer cards while localStorage loads, preventing flash of empty state
- 2026-05-06 a11y: ShortcutsModal gets role=dialog + aria-modal + aria-labelledby; trigger and close buttons get aria-label; answer textarea gets aria-label
- 2026-05-07 curriculum: add AP CSP subject to AP Computer Science pack (7 topics: binary, internet, cybersecurity, algorithms, abstractions, data/privacy, societal impact)
- 2026-05-07 empty state polish: templates filter no-match state upgraded to branded card with helpful copy and clear-filter button; concept tracker bars gain smooth background color transition
- 2026-05-07 keyboard shortcut: document G+S (go to settings) in ShortcutsModal and README — shortcut was live in NavBar but invisible to users
- 2026-05-07 perf: wrap ConceptPanel, EvalCard, Block, DiffDots in React.memo to skip KaTeX re-renders on every answer keystroke
- 2026-05-07 micro-animation: btn-primary hover gains accent glow ring; curriculum cards lift on hover; feature grid cards gain hover bg highlight
- 2026-05-07 friendlier error message: map raw LLM error strings (429, network fail, timeout, parse error) to plain-English messages in Session error state and toast notifications
