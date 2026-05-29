import Link from "next/link";
import { NavBar } from "./NavBar";
import { ScrollProgress } from "./ScrollProgress";

const COMPARE = [
  { row: "Default behavior", cogniloop: "Asks you to explain. Refuses to answer.", chatgpt: "Answers and summarizes by default.", claude: "Answers and summarizes by default." },
  { row: "Bypass-resistance", cogniloop: "System prompt + UI lock. Can't break out.", chatgpt: "Reroll a prompt — you get the answer.", claude: "Reroll a prompt — you get the answer." },
  { row: "Concept tracker", cogniloop: "Live: weak → shaky → solid → mastered.", chatgpt: "None. Buried in chat scrollback.", claude: "None. Buried in chat scrollback." },
  { row: "Adaptive difficulty", cogniloop: "Explicit 1-5 scale per round.", chatgpt: "Improvised tone, not structured.", claude: "Improvised tone, not structured." },
  { row: "Coaching report output", cogniloop: "Structured: study plan, gaps, journal prompt, markdown export.", chatgpt: "Loose prose if you ask for it.", claude: "Loose prose if you ask for it." },
  { row: "Streak / accountability", cogniloop: "Daily streak, 90-day heatmap, lifetime stats.", chatgpt: "Not shown.", claude: "Not shown." },
  { row: "Curriculum templates", cogniloop: "JEE, NEET, GATE-CSE, MCAT, AP-CS, ML, System Design, Economics — 8 packs pre-loaded.", chatgpt: "Cold start every time.", claude: "Cold start every time." },
  { row: "Voice in / read-aloud", cogniloop: "Web Speech, free, in-app.", chatgpt: "Voice paywall on free tier.", claude: "No native voice on free." },
  { row: "Math rendering", cogniloop: "KaTeX in questions and answers.", chatgpt: "MathJax (good).", claude: "Plain text by default." },
  { row: "Privacy", cogniloop: "Sessions live in browser only. No accounts, no logs.", chatgpt: "Stored on OpenAI servers.", claude: "Stored on Anthropic servers." },
  { row: "API key required", cogniloop: "No.", chatgpt: "Free tier has limits + signup.", claude: "Free tier has limits + signup." },
  { row: "Cost", cogniloop: "$0. Forever.", chatgpt: "$0 limited / $20+ for full.", claude: "$0 limited / $20+ for full." },
];

const FAQ = [
  {
    q: "Why can't I just tell ChatGPT to be a Socratic tutor?",
    a: "You can. But you can also un-tell it in one prompt. The friction is wrong: ChatGPT defaults to answering, you have to fight it to drill yourself. Cogniloop defaults to drilling, you can't make it answer. The default is the product.",
  },
  {
    q: "Claude has Projects with persistent memory now. Doesn't that solve it?",
    a: "Projects store text across chats. They don't show you a structured concept-mastery map, don't enforce a question-answer-evaluate loop, don't track streaks, don't render a final coaching report. Memory ≠ workflow.",
  },
  {
    q: "Isn't this just a wrapper?",
    a: "It's a wrapper in the same sense Linear is a wrapper around a database, Superhuman is a wrapper around IMAP, and Notion is a wrapper around a rich-text editor. The win is product focus and locked behavior — same primitives, different game.",
  },
  {
    q: "What LLM does it use?",
    a: "Default: Pollinations.ai's free public endpoint (openai / openai-fast / mistral — no API key needed). With a server-side GROQ_API_KEY set, it uses Groq's Llama 3.3 70B for higher quality and speed. Multi-provider with retry + automatic fallback.",
  },
  {
    q: "What about hallucinations?",
    a: "Cogniloop doesn't generate explanations to feed you — it generates questions and grades your explanations. The model's hallucination surface is tiny. If your pasted notes are wrong, you'll be questioned on wrong stuff — but that's a content issue, not a tool issue. For high-stakes accuracy, paste your textbook content as notes.",
  },
  {
    q: "Why are sessions client-side only?",
    a: "Privacy + simplicity. No login, no leak, no GDPR. You own your data, it never leaves your browser. The trade-off: clearing browser data deletes your history. Mark sessions to markdown if you want long-term storage.",
  },
  {
    q: "When should I NOT use Cogniloop?",
    a: "When you want answers, not learning. When you're cramming raw facts (use Anki). When you need step-by-step solutions to homework (use a tutor or solver). When you need coding execution (use ChatGPT Code Interpreter or Claude with tools).",
  },
];

const USE_CASES = [
  {
    who: "Pre-exam revision",
    blurb:
      "Night before JEE/NEET/MCAT/GATE — paste a chapter, drill yourself for 20 min. The concept tracker tells you exactly which sub-topics to revisit before sleeping.",
  },
  {
    who: "Lecture follow-up",
    blurb:
      "Right after class — paste your notes, see if you actually understood or just transcribed. Identify weak concepts before they pile up.",
  },
  {
    who: "Self-study from textbooks",
    blurb:
      "Reading a chapter? Paste the section, then close the book. If you can explain it well enough that Cogniloop scores you 2-3, you're good. If not, re-read.",
  },
  {
    who: "Interview prep",
    blurb:
      "ML/CS roles love system-design and concept questions. Use Expert mode on topics like 'distributed consensus' or 'transformer attention' — get adversarial drilling.",
  },
  {
    who: "Teaching / TA work",
    blurb:
      "Generate question banks for office hours by running sessions in Exam mode and exporting markdown. Or assign specific topics to students and review their session reports.",
  },
  {
    who: "Long-term retention",
    blurb:
      "Streaks + history make daily reviews stick. Even 10 minutes a day on different topics beats 4-hour cram sessions for retention (spacing effect).",
  },
];

export function WhyView() {
  return (
    <main id="main" className="min-h-screen flex flex-col">
      <ScrollProgress />
      <NavBar />
      <section className="flex-1 max-w-[920px] w-full mx-auto px-6 py-8 fade-up">
        <span className="tag mb-4">Why Cogniloop</span>
        <h1 className="text-3xl sm:text-[42px] font-semibold tracking-tight leading-[1.1]">
          ChatGPT and Claude can answer anything.
          <br />
          <span className="text-[var(--accent)]">That&apos;s the bug, not the feature.</span>
        </h1>
        <p className="text-[var(--fg-muted)] text-[15px] mt-5 leading-relaxed max-w-[640px]">
          For actual learning, the tool that gives you answers is the tool that prevents learning. Cogniloop is built on the opposite principle: lock the AI into questioning, lock the UI into explanation, surface progress visibly so the learner can&apos;t lie to themselves.
        </p>

        <h2 className="text-[18px] font-semibold tracking-tight mt-12 mb-4">
          Side-by-side
        </h2>
        <div className="card overflow-x-auto">
          <table className="w-full [border-collapse:collapse]">
            <caption className="sr-only">Feature comparison: Cogniloop vs ChatGPT vs Claude</caption>
            <thead>
              <tr className="border-b border-[var(--line)] bg-[var(--bg-elev)] text-[11px] uppercase tracking-wider text-[var(--fg-dim)]">
                <th scope="col" className="px-4 py-3 text-left font-normal w-[19%]" />
                <th scope="col" className="px-4 py-3 text-left font-normal w-[31%] text-[var(--accent)]">Cogniloop</th>
                <th scope="col" className="px-4 py-3 text-left font-normal w-[25%]">ChatGPT</th>
                <th scope="col" className="px-4 py-3 text-left font-normal w-[25%]">Claude</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r, i) => (
                <tr key={r.row} className={i % 2 !== 0 ? "bg-[var(--bg-soft)]" : ""}>
                  <th scope="row" className="px-4 py-3 text-left font-normal text-[12.5px] text-[var(--fg-muted)]">{r.row}</th>
                  <td className="px-4 py-3 text-[12.5px] text-[var(--fg)]">{r.cogniloop}</td>
                  <td className="px-4 py-3 text-[12.5px] text-[var(--fg-muted)]">{r.chatgpt}</td>
                  <td className="px-4 py-3 text-[12.5px] text-[var(--fg-muted)]">{r.claude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-[18px] font-semibold tracking-tight mt-14 mb-4">
          Built for these study moments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {USE_CASES.map((u, i) => (
            <div key={u.who} className="card p-4 item-in" style={{ animationDelay: `${i * 70}ms` }}>
              <div className="text-[13.5px] font-medium tracking-tight">
                {u.who}
              </div>
              <div className="text-[12.5px] text-[var(--fg-muted)] mt-1.5 leading-relaxed">
                {u.blurb}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-[18px] font-semibold tracking-tight mt-14 mb-4">
          FAQ
        </h2>
        <div className="flex flex-col gap-2">
          {FAQ.map((f, i) => (
            <details key={f.q} className="card p-4 group item-in" style={{ animationDelay: `${i * 55}ms` }}>
              <summary className="cursor-pointer flex items-center justify-between gap-4 list-none text-[14px] font-medium tracking-tight">
                <span>{f.q}</span>
                <span className="text-[var(--fg-dim)] group-open:rotate-90 transition-transform">
                  ›
                </span>
              </summary>
              <p className="mt-3 text-[13px] text-[var(--fg-muted)] leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </div>

        <div className="card p-6 mt-12 text-center">
          <h3 className="text-[18px] font-semibold tracking-tight">
            One loop is enough to feel it.
          </h3>
          <p className="text-[var(--fg-muted)] text-sm mt-2">
            No signup. No key. Under two minutes.
          </p>
          <Link
            href="/"
            className="btn-primary mt-5 px-5 py-2.5 rounded-lg text-sm inline-block"
          >
            Begin the loop →
          </Link>
        </div>
      </section>
      <footer className="px-6 sm:px-10 py-6 text-[11px] text-[var(--fg-dim)] border-t border-[var(--line-soft)]">
        Built by Vaibhav Lalwani. MIT licensed.
      </footer>
    </main>
  );
}
