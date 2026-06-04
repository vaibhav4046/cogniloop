# Cogniloop Changelog

- 2026-06-04 keyboard shortcut: press F during the answering phase to focus the answer field — useful after using C to copy the question, M for mic, L for read-aloud, or any interaction that moves focus away from the textarea; aria-keyshortcuts="f" added to the textarea; F listed in ShortcutsModal Session section

- 2026-06-04 additional curriculum topic: added "Biotechnology: principles, processes and applications" to NEET Biology (9→10 topics) — tools of recombinant DNA technology (restriction endonucleases, cloning vectors: pBR322, Ti plasmid, phage λ; insertional inactivation for screening), PCR (denaturation/annealing/extension cycle, Taq polymerase, exponential amplification), recombinant human insulin production in E. coli (A/B chains synthesised separately, disulfide linkage, Humulin), Bt crops (Cry proteins from Bacillus thuringiensis: mechanism of pore formation in insect midgut epithelium; Cry IAc for bollworm, Bt cotton and Bt brinjal), RNA interference for nematode resistance, gene therapy for ADA deficiency (retroviral vector, periodic booster), molecular diagnostics (PCR for HIV/TB, ELISA: sandwich and competitive formats), DNA fingerprinting (VNTR/STR analysis), bioethics: Cartagena Protocol on Biosafety, biopiracy (turmeric and Basmati rice patent disputes), Convention on Biological Diversity benefit-sharing; a 5–7 question NEET chapter (NCERT Class 12 Ch 11–12) tested via Bt toxin mechanism, PCR steps, ELISA types, and biosafety principles — previously absent from the pack as a standalone topic

- 2026-06-04 additional curriculum topic: added "Parallel and distributed computing" to AP CSP (7→8 topics) — sequential vs parallel processing, Amdahl's Law speedup bound, multi-core/GPU/distributed memory hardware, map-reduce pattern, race conditions and synchronization, distributed computing trade-offs (latency, fault tolerance, scalability), and AP CSP exam focus on identifying parallelizable tasks and calculating speedup; Big Idea 4 (Computing Systems and Networks) previously absent from the AP CSP pack

- 2026-06-04 tiny feature: "Print / PDF" button added to the coaching report — triggers the browser print dialog (Ctrl+P / ⌘+P or press P) so users can save their session as a PDF; globals.css already had print media styles (light theme, hidden header/sidebar/buttons) so the output is clean; P keyboard shortcut wired into the report keyboard handler alongside D/S/J/R; listed in ShortcutsModal Report section

- 2026-06-04 tiny feature: "Pick up where you left off" chips on the landing page now show a mode-colored dot (green=Chill, amber=Exam, purple=Expert) so returning users can see at a glance which study mode they last used for each recent topic; hover title also updated to include mode name (e.g. "Backpropagation · Exam mode · today")
- 2026-06-03 a11y: auto-focus notes textarea when the "Drop your notes here" details section opens (saves keyboard users a Tab press), and add `aria-hidden="true"` to decorative `›` chevrons in the notes summary and WhyView FAQ summaries so screen readers skip the punctuation glyph

- 2026-06-03 micro-animation: one-shot brightness flash on the concept progress bar when a concept reaches "mastered" strength — key-driven remount triggers the animation only at the mastery transition

- 2026-06-03 additional curriculum topic: added "Semiconductor electronics and logic gates" to JEE Physics (8→9 topics) — energy bands (conductors/semiconductors/insulators), intrinsic vs extrinsic semiconductors (n-type/p-type, majority/minority carriers), p-n junction (depletion region, forward/reverse bias, I-V characteristics), half-wave and full-wave bridge rectifiers (efficiency 40.6% vs 81.2%), Zener diode voltage regulation, BJT transistor (npn/pnp, α and β current gains, CE configuration as switch and amplifier), logic gates (AND/OR/NOT, NAND/NOR as universal gates, XOR for half-adder), De Morgan's theorems; a 2–4 question JEE Main chapter (NCERT Class 12 Ch 14) previously absent from the JEE Physics pack while already present in NEET Physics

- 2026-06-03 additional curriculum topic: added "Amines and diazonium salts" to NEET Chemistry (7→8 topics) — amine classification (1°/2°/3° aliphatic and aromatic); basicity order: 2° aliphatic > 1° > NH₃ > 3° (solvation effect) > aromatic amines (lone pair delocalised into ring, pKb ≈9.4 vs methylamine pKb ≈3.4); preparation: reduction of nitro compounds (Fe/HCl → 1° amine), nitriles and amides (LiAlH₄), Hofmann degradation (amide → 1° amine losing one C), Gabriel phthalimide synthesis (gives pure 1° amine, avoids over-alkylation); chemical reactions: acylation with RCOCl (Schotten-Baumann), carbylamine test (1° amine + CHCl₃/KOH → foul isocyanide — positive for 1° only), Hinsberg test (C₆H₅SO₂Cl: 1° gives NaOH-soluble sulfonamide, 2° gives insoluble sulfonamide, 3° no reaction), reaction with HNO₂ (1° aliphatic → N₂↑; 1° aromatic at 0–5°C → stable diazonium salt); diazonium salt reactions: Sandmeyer (CuCl → ArCl, CuBr → ArBr, CuCN → ArCN), Balz-Schiemann (→ ArF via BF₄⁻), deamination with H₃PO₂ (→ ArH), azo coupling with phenol/aniline → azo dyes; a 3–5 question NEET Chemistry chapter (NCERT Class 12 Ch 13) tested via basicity comparisons, carbylamine/Hinsberg tests, and Sandmeyer reactions, previously absent from the pack

- 2026-06-03 additional curriculum topic: added "CI/CD for ML pipelines and responsible AI" to ML Fundamentals MLOps (4→5 topics) — automated model testing (unit, behavioral/invariance, integration tests), data validation gates (Great Expectations, Deequ, distribution shift alerts), automated retraining pipelines with evaluation gates before model promotion, champion-challenger A/B routing, model cards and datasheets; responsible AI: group fairness metrics (demographic parity, equalized odds, calibration), the impossibility theorem when base rates differ, bias sources (historical, representation, aggregation bias), auditing tools (Fairlearn, AIF360, What-If Tool); privacy-preserving ML: differential privacy (ε-δ guarantee, DP-SGD: gradient clipping + calibrated noise, privacy budget accounting), federated learning (FedAvg, non-IID challenges); regulatory context: EU AI Act risk tiers, NIST AI RMF, SR 11-7 model risk management; explainability: SHAP (Shapley values), LIME (local linear approximation), counterfactual explanations; the only MLOps subject topic missing from the pack and a core topic in MLE interviews

- 2026-06-03 refactor: move STRENGTH_PCT from Session.tsx into lib/labels.ts — the Record<ConceptStrength, number> map (weak 18%, shaky 45%, solid 75%, mastered 100%) now lives alongside STRENGTH_COLOR, STRENGTH_DESC, and the other strength maps in the single source of truth for concept-strength display data; Session.tsx imports it instead of defining it locally

- 2026-06-03 perf: wrap StatsPanel in React.memo — Landing.tsx re-renders on every topic/notes keystroke (topic is local state); without memo, StatsPanel and its 6 Stat child components went through React reconciliation on each keypress even though the loaded stats never change; memo's shallow prop comparison (compact is always undefined on Landing and History) short-circuits these entirely, eliminating dozens of wasted re-renders per typing session

- 2026-06-03 additional curriculum topic: added "Authentication and authorization patterns" to System Design Core Concepts (8→9 topics) — session-based auth vs stateless JWT (access + refresh token rotation, RS256/HS256, short TTL ~15 min); OAuth 2.0 flows (Authorization Code + PKCE, Client Credentials, deprecated Implicit); OIDC identity layer; API key scoping and rotation; RBAC vs ABAC vs ReBAC (Google Zanzibar); SSO/SAML 2.0 and enterprise IdP federation; password hashing with bcrypt/scrypt/Argon2id; TOTP/FIDO2 MFA; distributed session store (Redis); common pitfalls: JWT revocation gap, IDOR, privilege escalation, confused deputy in microservices; a high-signal system design interview topic previously absent from the pack

- 2026-06-03 empty state polish: add custom 404 page (`app/not-found.tsx`) — branded card with "Dead link — but your weak concepts are still waiting to be drilled." copy, two CTAs (Start a session, Browse templates), and a 404 tab title; previously Next.js served a plain white fallback

- 2026-06-03 accessibility: add `aria-label="Study [topic]"` to every curriculum topic button in TemplatesView — screen readers now announce the action ("Study Mechanics") instead of just the topic label, improving keyboard navigation for assistive-technology users

- 2026-06-03 keyboard shortcut: press H during the answering phase to fill in the question-type-aware "Stuck?" starter phrase — same as clicking the Stuck? button; `aria-keyshortcuts="h"` added to the button, H listed in ShortcutsModal Session section, README keyboard-first blurb updated

- 2026-06-03 micro-animation: staggered item-in entrance on ModePicker buttons — Chill, Exam, and Expert cascade in at 0 / 65 / 130 ms on landing-page load, matching the curriculum card and feature grid stagger patterns; compact (in-session error card) variant is unchanged

- 2026-06-03 additional curriculum topic: added "Gravitation and properties of bulk matter" to NEET Physics (8→9 topics) — universal law of gravitation (F = Gm₁m₂/r²), variation of g with altitude/depth/rotation, gravitational potential energy, escape velocity (v_e = √(2gR) ≈ 11.2 km/s), orbital velocity (v₀ = √(GM/r)), geostationary satellites, Kepler's three laws (ellipse, equal areas, T²∝r³); elastic properties: Young's/bulk/shear modulus, Hooke's law, elastic potential energy; fluid statics: pressure P = P₀+ρgh, Pascal's law, Archimedes' principle, floatation; surface tension: excess pressure in drop (2T/r) vs soap bubble (4T/r), capillary rise h = 2T cosθ/(ρrg); fluid dynamics: continuity equation (A₁v₁=A₂v₂), Bernoulli's equation with Torricelli theorem, Stokes' law (F=6πηrv), terminal velocity, Reynolds number; a 8–12 question NEET Physics combination of NCERT Class 11 Ch 8–10 covering a significant NEET section previously absent from the pack

- 2026-06-03 UI copy polish: truncate verbose curriculum topic labels in TemplatesView to short names before " — " dash (e.g. "Solid state chemistry" instead of full NCERT bullet); full string still passed to AI; hover title reveals complete text

- 2026-06-02 README/docs update: bump "70+" → "80+" shipped features; add copy-button bullet to Input/output; add 6 missing files to Architecture (ScrollProgress.tsx, ShortcutsLoader.tsx, labels.ts, kbd.ts, useAutoExpand.ts, useGlobalNav.ts)

- 2026-06-02 UI copy polish: fix "rounds" always-plural in coaching report subtitle (now handles "1 round" correctly); add descriptive title tooltip to the "End & report" button explaining why it's disabled until round 2; prepend round count to the markdown export metadata line

- 2026-06-02 brand voice tightening: replaced two near-duplicate ENDING_HINTS ("Assembling your personalized study plan…" and "Checking what you can retrieve cold versus what you only recognised…") with "Scheduling the concepts most likely to slip away first…" and "Finding the foundational gap that's holding the rest back…"; fixed README hint-pool count from 8/8/6 → 8/8/8

- 2026-06-02 additional curriculum topic: added "Alcohols, phenols and ethers" to JEE Chemistry (12→13 topics) — alcohol classification (primary/secondary/tertiary), physical properties (H-bonding, solubility), preparation (hydration, NaBH₄/LiAlH₄ reduction, Grignard), reactions (dehydration at 140°C/170°C, oxidation with PCC vs KMnO₄, Lucas test, Fischer esterification, reaction with Na); phenol acidity via resonance-stabilized phenoxide (pKa 10 vs alcohol pKa 16); EAS of phenol (ortho/para-director), Kolbe-Schmitt and Reimer-Tiemann reactions, tribromophenol test; Williamson synthesis for ethers (SN2, primary R-X), ether cleavage by HI/HBr, epoxide ring-opening under acidic (Markovnikov) and basic (anti-Markovnikov, inversion) conditions; a 3–5 question JEE Main chapter (NCERT Class 12 Ch 11) covering most functional-group organic chemistry tested in JEE Main, previously absent from the pack

- 2026-06-02 a11y: add aria-controls + aria-hidden on rounds-review toggle, and role="region" aria-label on BucketCards in coaching report — screen readers can now identify what the expand button controls and jump directly to Mastered/Shaky/Weak result regions

- 2026-06-02 additional curriculum topic: added "Anomaly detection and density estimation" to ML Fundamentals > Unsupervised Learning (3→4 topics) — statistical methods (z-score, IQR), KDE with bandwidth tradeoff, GMMs via EM algorithm, one-class SVM, Isolation Forest path-length intuition, autoencoder reconstruction error, LOF; evaluation with AUROC and precision-recall; novelty detection vs outlier detection distinction; applications in fraud, intrusion detection, and predictive maintenance

- 2026-06-02 dependency bump: next 16.2.6→16.2.7 (patch)

- 2026-06-02 micro-animation: staggered pop-in for score trend dots in the coaching report — each colored score square now scales+fades in 60 ms after the previous, creating a left-to-right cascade reveal every time the report loads

- 2026-06-02 additional curriculum topic: added "Strings and string manipulation" to AP CSA (8→9 topics) — String immutability and reference vs value equality (== vs equals()), key methods: length(), charAt(i), substring(begin, end), indexOf(str), compareTo(other), equals(), equalsIgnoreCase(), toLowerCase()/toUpperCase(), trim(); concatenation with + and type coercion rules (String + int → String); Integer wrapper: parseInt(), String.valueOf(), auto-boxing; iterating characters with charAt(i) in a for loop; common patterns: reverse, palindrome check, building result strings; null vs empty string distinction and NullPointerException risk; a major AP CSA Unit 2 chapter previously absent from the pack

- 2026-06-02 perf: memoize SessionCard in HistoryView — extract the inline session article from `filtered.map` into a stable memo component; `studyAgain` converted to `useCallback([router])` so its reference is stable; prevents every session card from re-rendering on unrelated state changes (confirmClear toggle, importErr appear/dismiss), matching the CurriculumCard memo pattern in TemplatesView

- 2026-06-02 keyboard shortcut: `c` key copies the current session question to clipboard during answering phase — mirrors the copy button; panel and README updated

- 2026-06-02 tiny feature: "Copy" button on the active session question card — one click copies the question text to clipboard (resets after 2 s, clears on each new round); lets users paste questions directly into Notion, Anki, or any notes app without leaving the session

- 2026-06-02 a11y: add aria-labelledby to CurriculumCard <section> elements in TemplatesView so screen readers announce each pack by name; upgrade WhyView use-case cards from <div> to <article>/<h3>/<p> for proper semantic structure

- 2026-06-02 additional curriculum topic: added "Environmental and resource economics" to Economics > Behavioral & International (4→5 topics) — Hotelling's rule for exhaustible resources, Coase theorem and its limitations at scale, Pigouvian tax vs cap-and-trade ETS (cost certainty vs quantity certainty), tragedy of the commons and Ostrom's polycentric governance (Nobel 2009), environmental Kuznets curve, weak vs strong sustainability, discount rate controversy (Stern vs Nordhaus); a 3–5 question topic for AP Environmental Science, AP Macro, college environmental economics, and CFA Level 1 ESG investing previously absent from the pack

- 2026-06-01 micro-animation: staggered fade-up on FeatureGrid cards and item-in on "Try an example" chips in Landing.tsx — both previously appeared without per-item entry animation

- 2026-06-01 additional curriculum topic: expanded NEET Chemistry "Biomolecules" stub into a full NCERT Class 12 Ch 14 topic — carbohydrate classification (reducing vs non-reducing sugars, α/β-D-glucopyranose Haworth projection, mutarotation, amylose/amylopectin/cellulose structural differences), amino acid chemistry (L-configuration, zwitterion form, 9 essential amino acids, peptide bond formation), protein denaturation (disrupts 2°/3°/4° only, agents: heat/pH/urea), enzyme cofactors (metallic ions vs coenzymes derived from B-vitamins: NAD⁺/FAD), vitamins (fat-soluble A/D/E/K vs water-soluble B-complex and C with all deficiency diseases), and nucleic acids (phosphodiester backbone, DNA antiparallel helix with Chargaff's rules, RNA differences); complements the existing Biology Biomolecules expansion with the chemistry-focused lens tested in NEET Chemistry

- 2026-06-01 dependency bump: react + react-dom 19.2.6→19.2.7 (patch)

- 2026-06-01 additional curriculum topic: added "Haloalkanes and haloarenes" to NEET Chemistry (6→7 topics) — classification and nomenclature; SN1 (carbocation, racemization, polar protic, 3° substrate) vs SN2 (backside attack, Walden inversion, polar aprotic, 1° substrate); E1 vs E2 with Zaitsev/Hofmann product distinction; haloarenes (shorter C–X bond, ipso substitution only, o/p directors); Grignard reagent prep and reactions with aldehydes, ketones, CO₂, and water; polyhalogen compounds: CHCl₃, CCl₄, iodoform test (CH₃CO– gives CHI₃), DDT biomagnification, freons/CFCs and ozone depletion; a 3–5 question NEET Chemistry chapter (NCERT Class 12 Ch 10) previously absent from the pack

- 2026-06-01 additional curriculum topic: added "Statistics" to JEE Mathematics (11→12 topics) — measures of central tendency (mean via direct/step-deviation methods, combined mean, median for raw/grouped data using l+((n/2−cf)/f)·h, mode for raw/grouped data using modal-class formula), empirical relation mode≈3 median−2 mean; measures of dispersion (range, mean deviation about mean/median, variance σ² via direct and shortcut step-deviation formula, standard deviation, effect of linear transform σ_{a+bx}=|b|·σ_x); coefficient of variation CV=(σ/x̄)·100 for comparing consistency of two datasets; an NCERT Class 11 Ch 15 chapter (1–2 JEE Main questions per exam) completing the JEE Math syllabus

- 2026-06-01 additional curriculum topic: added "Research methods and statistics" to MCAT Psychological, Social, Biological Foundations (6→7 topics) — experimental design (IV/DV, control groups, confounds, operational definitions), within- vs between-subjects designs, single/double-blind studies, placebo effect; research types (case studies, naturalistic observation, surveys, correlational vs experimental — only experiments establish causation, longitudinal vs cross-sectional); descriptive statistics (mean/median/mode, SD, z-scores, normal distribution 68-95-99.7 rule, skew); inferential statistics (null/alternative hypotheses, Type I and II errors, p-value, statistical significance, statistical power); validity (internal, external, construct, ecological) and reliability (test-retest, inter-rater, Cronbach's alpha); sampling methods and bias; APA ethical guidelines (informed consent, debriefing, right to withdraw, minimal harm, IRB); a high-yield MCAT topic explicitly tested in every exam's Psych/Soc section but previously absent from the pack

- 2026-06-01 UI copy polish: "Pick up where you left off" buttons on the landing page now show relative study date (today / yesterday / Xd ago) — topic name truncates cleanly with min-w-0 flex layout so the date label never wraps or gets clipped

- 2026-06-01 micro-animation: staggered scale-in for heatmap active cells — studied-day cells on the /history heatmap now pop in with a 0.24 s spring animation (cubic-bezier overshoot), each delayed by 7 ms × cell index so they cascade left-to-right top-to-bottom; inactive/today cells appear instantly, preserving the visual hierarchy

- 2026-06-01 perf: memoize CurriculumCard in TemplatesView — extract inline section JSX into a memo component with a stable useCallback for startWith, preventing all 100+ topic buttons from re-rendering on every filter keystroke; animation delays pinned to original CURRICULA index via a module-level map so props stay stable

- 2026-06-01 a11y: fix Exam-mode timer live region — `aria-live` was toggled dynamically between "assertive" and "off" (unreliable in all major screen readers); replaced with a separate stable `aria-live="assertive"` span that is empty when time ≥ 10 s and contains the spoken countdown ("N seconds remaining") only when time is critical, while the visible timer retains its `role="timer"` and sr-only text for manual navigation

- 2026-06-01 additional curriculum topic: added "Biomolecules" to NEET Biology (8→9 topics) — carbohydrates (mono/di/polysaccharides, reducing vs non-reducing sugars), amino acids (20 standard, zwitterion form, essential vs non-essential), protein levels (1°→2° α-helix/β-sheet→3° tertiary→4° quaternary), lipids (triglycerides, amphipathic phospholipids, steroids), nucleic acids (DNA double helix Watson-Crick, Chargaff's rules, mRNA/tRNA/rRNA roles), enzymes (holoenzyme = apoenzyme + cofactor, lock-and-key vs induced-fit, Michaelis-Menten Km, competitive vs non-competitive inhibition, allosteric regulation); a 8–10 question NEET Bio chapter (NCERT Class 11 Ch 9) previously absent from the pack

- 2026-06-01 additional curriculum topic: added "Surface chemistry" to JEE Chemistry (12→13 topics) — physisorption vs chemisorption, Freundlich and Langmuir isotherms, heterogeneous and enzyme catalysis, promoters and poisons; lyophilic vs lyophobic colloids, preparation (peptization, condensation), purification (dialysis), Tyndall effect, Brownian motion, electrophoresis, coagulation (Hardy-Schulze rule, gold number); O/W vs W/O emulsions; micelles and CMC; a 2–4 question JEE Main chapter (NCERT Class 12 Ch 5) previously absent from the pack

- 2026-06-01 brand voice: extend ENDING_HINTS pool 6 → 8 to match STARTING_HINTS and GRADING_HINTS (adds "Checking what you can retrieve cold versus what you only recognised…" and "Ranking the gaps most likely to trip you in the next session…"); tighten NEET UG blurb in lib/curricula.ts — removes the spec-list second sentence ("Magnetism, semiconductor electronics… added for complete NEET coverage") in favour of a single coaching-voice line matching the JEE blurb pattern

- 2026-06-01 refactor: extract g+x global nav shortcuts into lib/useGlobalNav.ts — NavBar.tsx no longer duplicates the chord-detection loop; Landing.tsx now calls useGlobalNav() so g+t/g+h/g+w/g+s work on the home page for the first time

- 2026-05-31 refactor: move STRENGTH_COLOR from Session.tsx into lib/labels.ts — removes the duplicate ternary chain in SharedView.tsx that mapped ConceptStrength → CSS variable; both consumers now import from the single source of truth alongside STRENGTH_DESC, QTYPE_DESC and the other label maps

- 2026-05-31 additional curriculum topic: added "Waves, oscillations and SHM" to NEET Physics (7→8 topics) — SHM equation (x = A sin(ωt+φ)), spring-mass (ω = √(k/m)) and simple pendulum (ω = √(g/L)); energy in SHM; wave equation (y = A sin(kx−ωt)), wave speed in strings and medium; standing waves, harmonics, resonance; beats and Doppler effect; a 6–8 question NEET Physics chapter (NCERT Class 11 Ch 14–15) previously absent from the pack

- 2026-05-31 additional curriculum topic: added "p-block elements" to JEE Chemistry (10→11 topics) — Groups 13–18 covering boron Lewis acidity, carbon allotropes and silicates, inert-pair effect; nitrogen cycle and phosphorus oxoacids; sulfur allotropes and contact process; halogen trends, oxoacids of Cl, and interhalogen compounds; xenon fluorides (XeF₂/XeF₄/XeF₆); periodic trends across p-block; a 3–5 question JEE Main chapter (NCERT Class 11 Ch 11 + Class 12 Ch 7) previously absent from the pack

- 2026-05-31 keyboard shortcut: added J in report phase to copy the Feynman journal prompt — wired into the existing copyJournal() via reportKbdRef, aria-keyshortcuts="j" on the button, new entry in ShortcutsModal Report section, README keyboard list updated

- 2026-05-31 tiny feature: StatsPanel now shows a "Study time" stat (e.g. "45m", "1h 30m") computed from completed session durations — lifetimeStats() gains totalMins, the skeleton and live grid update from 5 to 6 columns (2-col mobile → 3-col tablet → 6-col desktop) so the new card slots in without crowding

- 2026-05-31 a11y: answer textarea now has aria-describedby="current-question" so screen readers announce the active question text when the field receives focus; round/avg counter gains aria-live="polite" aria-atomic="true" so new-round and new-score updates are announced without interrupting ongoing speech

- 2026-05-31 additional curriculum topic: added "Calculus and numerical methods" to GATE CSE Engineering Mathematics (6→7 topics) — limits/continuity, partial derivatives, maxima/minima, Lagrange multipliers, definite integrals, Green's/Stokes'/Gauss' theorems; first/second-order ODEs; numerical methods: bisection, Newton-Raphson, Gaussian elimination/LU, Euler's/Runge-Kutta, trapezoidal/Simpson's integration; this chapter is ~10–15% of GATE CS marks but was absent from the pack

- 2026-05-31 micro-animation: details[open] content now fades and slides in (0.22s ease) via a 5-line CSS keyframe; affects FAQ panels in /why and the notes expander on the landing page — replaces abrupt pop with a polished reveal; prefers-reduced-motion honoured by existing global rule

- 2026-05-31 additional curriculum topic: added "Solid state chemistry" to JEE Chemistry (9→10 topics) — classification of solids (ionic, covalent, molecular, metallic); crystal lattice and unit cells (simple cubic, BCC, FCC); packing efficiency and coordination number; radius ratios for ionic solids; point defects (Schottky: cation-anion pair missing, lowers density; Frenkel: cation displaced to interstitial, common in AgCl); interstitial and impurity defects; band theory (valence vs conduction band, conductors/semiconductors/insulators); n-type vs p-type semiconductors (doping); ferromagnetism, paramagnetism, ferrimagnetism; a 3-5 question JEE Main chapter (NCERT Class 12 Chapter 1) previously absent from the pack

- 2026-05-31 skeleton loader: "Pick up where you left off" row on the landing page now shows 2 shimmer chip placeholders while localStorage hydrates, replacing the abrupt pop-in that occurred after mount; a `recentMounted` flag differentiates "loading" from "no history" so first-time users see only a brief skeleton then a clean fade-out

- 2026-05-31 docs: README bump 65+ → 70+ shipped features; document live avg score in session header, "Study this topic now →" history empty-state CTA, and corrected Enter-to-start vs ⌘/Ctrl+Enter-to-submit keyboard shortcut distinction

- 2026-05-31 perf: memoize lastRound, lastEval, and liveAvg in Session.tsx — all three derive from `rounds` but previously recomputed on every answer keystroke and every Exam-mode timer tick (once/sec); wrapping in useMemo([rounds]) cuts wasted filter/reduce/array-access to zero between round transitions

- 2026-05-31 UI copy polish: session round counter now visible on mobile — "Round N / 8" shows on all screen sizes (was hidden on small screens); avg score remains desktop-only to save horizontal space; math syntax toggle button gains aria-expanded state so screen readers announce expanded/collapsed

- 2026-05-31 additional curriculum topic: added "Chemical kinetics" to JEE Chemistry (8→9 topics) — rate of reaction, rate laws (differential and integrated), order and molecularity, zero/first/second-order half-lives, Arrhenius equation (activation energy Ea, frequency factor A, k = Ae^(−Ea/RT)), collision theory vs transition-state theory, pseudo-first-order reactions, mechanisms and rate-determining step; a 5-7 question JEE Main chapter (NCERT Class 12 Chapter 4) previously absent from the pack

- 2026-05-30 tiny feature: session header now shows a live running average score (e.g. "Round 3 / 8 · avg 2.5/3") once at least one round has been graded — gives real-time performance feedback mid-session without waiting for the coaching report; displayed alongside the existing round counter and progress bar on desktop

- 2026-05-30 additional curriculum topic: added "Solutions and colligative properties" to NEET Chemistry (5→6 topics) — vapour pressure and Raoult's law (ideal solutions, positive/negative deviations, azeotropes), four colligative properties (relative lowering of vapour pressure, ΔTb = Kb·m boiling-point elevation, ΔTf = Kf·m freezing-point depression, osmotic pressure π = iMRT), Van't Hoff factor i for electrolytes (degree of dissociation, association, abnormal molar masses), and Henry's law for gas solubility; a 3-5 question NEET Chemistry chapter (NCERT Class 12 Chapter 2) previously absent from the pack

- 2026-05-30 additional curriculum topic: added "Trigonometry and inverse trigonometric functions" to JEE Mathematics (10→11 topics) — covers compound angle formulas (sin/cos/tan of A±B), double-angle and half-angle formulas, product-to-sum and sum-to-product identities, general solutions of trig equations (sin θ = k, cos θ = k, tan θ = k), inverse trig functions: domain/range/principal values of arcsin/arccos/arctan, key identities (arcsin x + arccos x = π/2), properties of triangles (sine rule, cosine rule, area = ½ab sin C), heights and distances; a 3-5 question JEE Main topic previously absent from the pack

- 2026-05-30 curriculum: add MLOps & Production ML subject to ML Fundamentals (model serving, feature stores, drift detection, experiment tracking) — fills the practitioner gap left by the theory-focused existing subjects

- 2026-05-30 keyboard shortcut: pressing Enter (plain, no modifier) in the topic input on the landing page now starts the loop — matches the "Begin the loop ↵" button label that already implied this; keyboard hint below the button simplified from "⌘/Ctrl + Enter to start" to "Enter to start"; IME composition guard (nativeEvent.isComposing) prevents accidental submission mid-composition

- 2026-05-30 perf: lazy-load ShortcutsModal via next/dynamic({ ssr: false }) in a thin ShortcutsLoader client wrapper — removes the modal's JS from the critical initial bundle so it loads in a deferred chunk after hydration, shaving parse/eval work from the first paint on every page

- 2026-05-30 brand voice: tighten three first-impression copy strings — empty-submit error on landing ("Enter a topic above — or paste your notes — to start the loop"), zero-state StatsPanel ("Drill your first topic and your streak, sessions, and mastered concepts will track here automatically"), and session resume hint ("Picking up where you left off…" instead of generic "Loading session…")

- 2026-05-30 micro-animation: SettingsView section cards now cascade in with staggered fade-up — "Bring your own API key" at 80ms, "Voice + read-aloud" at 190ms, "Reset" at 290ms — consistent with the coaching report cascade and other page patterns; previously all three sections appeared simultaneously when the skeleton resolved

- 2026-05-30 UI copy polish: extend Landing example topics from 5 to 8 — adds JEE Physics (electromagnetic induction), Economics (price ceilings), and System Design (consistent hashing) to show curriculum breadth on first load

- 2026-05-30 additional curriculum topic: added "Backtracking and string algorithms" to GATE CSE Algorithms (5→6 topics) — covers N-Queens, Hamiltonian path, graph coloring via systematic backtracking with pruning; KMP failure function construction, Rabin-Karp rolling hash, Z-algorithm for pattern matching; amortized analysis (aggregate, accounting, potential methods)

- 2026-05-30 friendlier error message: error card footer tip is now context-aware — network/offline errors say "Check your connection"; auth errors say "Go to Settings and paste a fresh key"; quota errors say "Switch to Pollinations (free)"; all others say the short retry nudge + Groq key suggestion; also adds Safari's "load failed" and "aborted/AbortError" to humanizeError coverage

- 2026-05-30 a11y: concept mastery progress bars now expose `aria-valuetext` with the human-readable strength description ("Well understood — minor edge cases still possible" instead of "75%"); error card gains `role="alert" aria-atomic="true"` so screen readers announce errors immediately on phase transition; concept tracker `<ul>` gets `aria-label="Concept tracker"` for explicit list context

- 2026-05-30 empty state polish: /history "no matching sessions" empty state now offers a "Study this topic now →" primary button alongside "Clear search" — consistent with the /templates zero-results empty state; clicking pre-fills the search term as the study topic and navigates to /study

- 2026-05-30 additional curriculum topic: added "Stereochemistry and spectroscopy" to MCAT Chemical & Physical Foundations (4→5 topics) — covers R/S and E/Z configuration, optical activity, enantiomers, diastereomers, meso compounds, IR/NMR stretches, and mass spectrometry fragmentation

- 2026-05-29 micro-animation: staggered item-in entrance animations on /why USE_CASES cards and FAQ items — consistent with existing grid animation patterns used on landing and templates pages

- 2026-05-29 micro-animation: concept strength badge in ConceptPanel now pops in (pop-in) whenever its strength level changes during a session — the keyed re-mount triggers the existing pop-in CSS animation, giving tactile feedback when a concept upgrades from weak → shaky → solid → mastered; reduced-motion users see an instant swap

- 2026-05-29 additional curriculum topic: added "Design a real-time collaborative editor (Google Docs / Figma)" to System Design → Design Problems, covering OT vs CRDTs, cursor/presence broadcasting, WebSocket rooms, conflict resolution, and offline reconciliation (6→7 topics)

- 2026-05-29 a11y: TemplatesView filter now announces result counts to screen readers via a stable aria-live="polite" region — "3 of 8 curriculum packs match" on each filter change, "No curriculum packs match …" on zero results; a matching visible count ("3 of 8 packs") appears below the input for visual users, consistent with HistoryView's "N shown" pattern

- 2026-05-29 refactor: move QTYPE_PLACEHOLDER and STUCK_STARTERS from Session.tsx into lib/labels.ts, co-locating all question-type label data alongside the existing QTYPE_DESC constant; no behavior change

- 2026-05-29 UI copy polish: coaching report round review now shows per-round "What you got" and "Still missing" bullet lists — the same Block component used by EvalCard in the active session and SharedView, making all three surfaces consistent; previously the collapsible "Review all rounds" section only showed verdict text without the strengths and gaps breakdown

- 2026-05-29 empty state polish: ConceptPanel now shows "All N concepts mastered — no gaps left on this topic." in accent color with a fade-up animation below the concept list when every concept in the session reaches mastered state — gives real-time confirmation of full mastery without requiring an explicit action

- 2026-05-29 perf: extract curriculum cards on the landing page into a memoized CurriculaPicker component with pre-computed topic counts, preventing re-renders of the 6 static curriculum cards on every keystroke in the topic input

- 2026-05-29 UI copy polish: shared session round cards now show per-round strengths ("What you got") and gaps ("Still missing") bullet lists alongside score and verdict — consistent with the EvalCard in the active session and the markdown export

- 2026-05-29 curriculum: add "Development economics" to Economics Behavioral & International (3→4 topics) — covers Sen's capability approach and HDI, poverty traps (geographic, institutional, behavioral), Gini coefficient and Lorenz curve, Kuznets curve, Lewis dual-economy model, conditional vs absolute convergence, the Sachs vs Easterly foreign-aid debate, J-PAL randomized controlled trials (Banerjee & Duflo), and microfinance; fills the most significant gap in the Economics pack for AP Macro, college econ, and CFA Level 1 students

- 2026-05-29 micro-animation: "Pick up where you left off" chips on the landing page now animate in — the section container fades up and each chip slides in with a staggered 70ms-per-chip item-in delay, replacing the abrupt pop-in that occurred after localStorage hydrated on mount

- 2026-05-29 tiny feature: markdown export now includes per-round strengths and gaps — the "What you got" and "Still missing" bullet lists from each EvalCard are preserved in the downloaded .md file alongside the score and verdict, making the export a complete post-session reference

- 2026-05-29 docs: bump "55+ shipped features" to "65+" in README; add question-type-aware placeholders, Stuck? starters, and word-count color-coding to Input/output; add scroll-progress bar and rotating coaching hints to UX details; clarify `r` shortcut covers both retry-on-error and re-drill-weak-concept

- 2026-05-28 brand voice: tighten SettingsView copy — page description drops administrative "Pollinations is the free fallback" spec-list for "No account, no cloud" coaching voice; voice-support status tags simplified from "Voice input: supported/unsupported" to "Mic ready / Mic unavailable — Chrome/Edge only" and "Read-aloud ready / unavailable"; footer updated from "Never sent anywhere except the chosen LLM provider" to "Your key, your device. Nothing leaves your browser except the topic you drill."

- 2026-05-28 curriculum: add "Biological classification and diversity of life" to NEET Biology (7→8 topics) — covers the 5-kingdom system (Monera, Protista, Fungi, Plantae, Animalia) with kingdom characteristics, major animal phyla (Porifera through Chordata — body plans, symmetry, coelom, notochord), plant kingdom divisions (algae, bryophytes, pteridophytes, gymnosperms, angiosperms — alternation of generations), and viruses/viroids/lichens; a high-yield NEET Bio topic spanning ~8-10 NEET questions (NCERT Class 11 Chapters 2-4) previously absent from the pack

- 2026-05-28 refactor: /templates search now matches subject names (e.g. "Operating Systems", "Engineering Mathematics") in addition to topic strings — the subjects.some() predicate was missing an s.name check, so subject-level searches silently returned no results

- 2026-05-28 keyboard shortcut: press R in the session error state to retry — keyboard handler added to phase-based effect, aria-keyshortcuts="r" on the Retry button, a subtle "Press R to retry" hint shown under the error card buttons, and the shortcut documented in the ? shortcuts panel (Session section)

- 2026-05-28 UI copy polish: SharedView meta line now shows avg score when evaluations exist (e.g. "4 rounds · Exam mode · avg 2.25/3 · 5 concepts"), CTA button copy changed from "Try this topic yourself" to "Drill this topic yourself" to match brand voice, and "rounds"/"concepts" pluralize correctly for 1-round sessions

- 2026-05-28 a11y: TemplatesView filter gets a visible ✕ clear button (appears when filter has text, refocuses input on click) — makes the clear-filter UX discoverable for mouse users beyond the Esc shortcut; subject names within each curriculum card promoted from <div> to <h3> so screen readers can navigate the /templates page heading outline (h1 page → h2 curriculum → h3 subject)

- 2026-05-28 micro-animation: fix streak count-up — split suffix "d" into a separate prop so useCountUp receives a plain integer and animates correctly; streak now counts up from 0 on page load like sessions/rounds/mastered

- 2026-05-28 curriculum: add "Immunology and the immune response" to MCAT Biological & Biochemical Foundations (6→7 topics) — covers innate vs adaptive immunity, B-cell activation and antibody isotypes (IgM/IgG/IgA/IgE/IgD), T-cell classes (CD4⁺ helper, CD8⁺ cytotoxic, Treg), MHC class I vs II antigen presentation, complement system (classical, lectin, alternative pathways), clonal selection, active vs passive immunity, and vaccine types (live-attenuated, inactivated, subunit, mRNA); a high-yield MCAT Bio/Biochem topic previously absent from the pack

- 2026-05-28 perf: wrap ReadAloud and VoiceInput in React.memo and stabilize the onTranscript prop via useCallback — both components only change on round transitions, not on every answer keystroke, so they no longer re-render during typing

- 2026-05-28 tiny feature: "Stuck?" button now seeds a question-type-aware opening phrase — "explain" gets a Feynman-style starter, "apply" prompts a concrete example, "contrast" opens on the mechanism difference, "predict" starts the cause-and-effect chain, "trace" begins a step-by-step walkthrough; replaces the single generic "I'm not sure — but I'd guess…" with five coaching-voice primes matched to the current question being asked

- 2026-05-28 curriculum: expand GATE CSE Theory & Compilers from 3 to 5 topics — adds NP-completeness and reductions (P vs NP, Cook-Levin theorem, canonical NP-complete problems, approximation strategies) and formal grammars and automata (regex-to-NFA/DFA, DFA minimization, CFL pumping lemma, Chomsky normal form, CYK algorithm, closure properties), bringing the subject in line with the 5-topic depth of all other GATE CSE subjects

- 2026-05-28 a11y: fix rotating loading hints not announced by screen readers — `aria-live` regions in PhaseLoader and the grading-hint section were keyed, so React unmounted and remounted the live region on each rotation instead of updating its text; moving the `key` + animation class to a nested `<span>` keeps the live region stable so hint changes are now properly announced with `aria-atomic="true"`

- 2026-05-28 curriculum: add "Model evaluation and validation" to ML Fundamentals Models (7→8 topics) — covers k-fold and stratified cross-validation, bias-variance tradeoff (underfitting vs overfitting), evaluation metrics (precision, recall, F1-score, ROC-AUC, confusion matrix), hyperparameter tuning (grid search, random search, Bayesian optimization), and train/validation/test split discipline; a core ML practitioner topic absent from the pack

- 2026-05-28 micro-animation: add scroll-progress reading bar to /templates and /history — the accent-colored 2px top bar that already existed on /why now appears on the two other long scrolling pages, giving users positional feedback as they browse curriculum packs or session history

- 2026-05-27 a11y: form errors and settings status now announced to screen readers — Landing.tsx form-validation error gets a persistent `role="alert"` / `aria-live="assertive"` container so the "Type a topic" message is announced on submission; SettingsView "Saved ✓" toast gains `role="status"` / `aria-live="polite"`; Groq key-test result (✓ valid / ✗ invalid) wrapped in a persistent `aria-live="polite"` span so the outcome is read without visual focus

- 2026-05-27 empty state polish: /templates "no matches" empty state now offers a "Drill this topic anyway →" primary button alongside "Clear filter" — so users who search a niche topic not covered by any curriculum pack (e.g. "quantum entanglement") can launch a session directly without backtracking to the home page

- 2026-05-27 curriculum: add "Business cycles and economic indicators" to Economics > Macroeconomics (6→7 topics) — covers cycle phases (expansion, peak, recession, trough), NBER dating, leading indicators (yield curve inversion, building permits, stock prices, new orders), lagging indicators (unemployment, CPI, prime rate), and coincident indicators (GDP, payroll employment, personal income); a core AP Macro and CFA Level 1 topic previously absent from the pack

- 2026-05-27 refactor: merge 3 separate report keyboard-shortcut useEffect hooks (d/r/s keys) into one effect with a single shared ref — reduces 3 addEventListener calls to 1 and removes ~18 lines of duplicated boilerplate; identical behavior preserved

- 2026-05-27 brand voice: tighten HistoryView page description ("Every concept you've faced, every streak you've kept — all here. Nothing on a server.") and footer ("No servers, no accounts — your entire study history lives here and nowhere else."); tighten TemplatesView page description ("Skip the cold start. Pick any concept from your actual syllabus and go straight into the loop.") and footer ("Every concept here is a live drill. Pick one — the first question lands in under 10 seconds.")

- 2026-05-27 docs: sync README keyboard shortcuts (add 1/2/3 mode switch and s share-link), update GATE CSE from 7→8 standalone subjects (adding digital logic), and add microservices to System Design blurb

- 2026-05-27 a11y: convert WhyView comparison table from div-grid to semantic <table> with <caption class="sr-only">, <th scope="col"> column headers, and <th scope="row"> row headers — screen readers can now navigate the Cogniloop vs ChatGPT vs Claude feature table properly; also switches overflow-hidden to overflow-x-auto for mobile horizontal scroll

- 2026-05-27 curriculum: add "Sequences and series" to JEE Mathematics (9→10 topics) — covers AP/GP nth term and sum formulas, arithmetic-geometric series, infinite GP, binomial theorem (general term, middle term, coefficients), and sum of special series (Σn, Σn², Σn³); a core JEE Math chapter previously absent from the pack

- 2026-05-27 curriculum: add "Digital Logic Design" subject to GATE CSE pack (5 topics: Boolean algebra/K-maps, number systems/binary arithmetic, combinational circuits, sequential circuits/flip-flops/counters, finite state machines) — a core GATE exam subject previously absent; update pack blurb from 7 to 8 standalone subjects

- 2026-05-27 tiny feature: coaching report subtitle and markdown export now show session duration in minutes (e.g. "5 rounds · 18 min · avg 2.33/3") — captured via a ref the moment the user clicks "End & report", using rounds[0].createdAt as the start anchor

- 2026-05-27 keyboard shortcut: press 1 / 2 / 3 on the home page (when not in a text field) to instantly switch to Chill / Exam / Expert mode; documented in the ? shortcuts panel

- 2026-05-27 curriculum: add "Microservices & Cloud-Native" subject to System Design pack (5 topics: service decomposition/DDD, inter-service communication/circuit-breaker, CQRS/event-sourcing/saga, API gateway/BFF, Kubernetes/container orchestration) — a heavy interview topic previously absent; update pack blurb to mention microservices

- 2026-05-27 UI copy polish: replace native browser confirm() in SettingsView "Clear settings" with the same double-click confirmation pattern used by HistoryView — first click turns the button label to "Click again to confirm" and auto-resets after 4 seconds, removing the jarring OS-level dialog that broke the app's visual style

- 2026-05-27 micro-animation: count-up animation for integer stats in StatsPanel — Sessions, Rounds, and Mastered concepts ease from 0 to their final value on mount using an ease-out-quad rAF loop; streak ("5d") and avg score ("2.34") skip it automatically; respects prefers-reduced-motion

- 2026-05-26 perf: wrap FeatureGrid in React.memo in Landing.tsx — the 12 "What makes it different" cards are pure static content that re-rendered on every topic/notes keystroke; extracting into a module-level memo component eliminates those re-renders with zero behavior change

- 2026-05-26 a11y: add @media (prefers-reduced-motion: reduce) to globals.css — cuts all animation/transition durations to 0.01ms and collapses iteration counts to 1; skeleton shimmer replaced with a static placeholder tint so users with vestibular disorders or OS-level motion reduction get an instant, non-animated experience across all pages

- 2026-05-26 empty state polish: session answer textarea placeholder is now specific to the current question type — "explain" gets a Feynman teaching nudge, "apply" prompts for a concrete scenario, "contrast" focuses on mechanism differences, "predict" asks for cause-and-effect chains, and "trace" asks for step-by-step walkthrough — replacing the single generic placeholder with five coaching-voice prompts that match the question being asked

- 2026-05-26 tiny feature: landing page shows a "Pick up where you left off" row of up to 3 recent session topics as clickable chips — clicking pre-fills the topic input and focuses it, letting returning users restart a topic in one click without visiting /history

- 2026-05-26 brand voice: tighten three feature-grid blurbs in Landing.tsx — "Adaptive difficulty", "Voice input + read-aloud", and "LaTeX rendering" rewritten from spec-list copy to coaching voice; WhyView bottom CTA button copy changed from "Start a session →" to "Begin the loop →" to match landing page

- 2026-05-26 a11y: Exam mode countdown timer gains role="timer" so screen readers identify it as a timer widget; the emoji is aria-hidden and a sr-only span provides a readable "X seconds remaining" / "X minutes Y seconds remaining" label — announced assertively under 10 seconds, queryable at any time

- 2026-05-26 UI copy polish: concept tracker hides "drilled 0×" for concepts not yet tested in the current session (noisy and misleading at session start); coaching report bucket card headers suppress the "0" count badge when a bucket is empty (the empty-state message already communicates this)

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
