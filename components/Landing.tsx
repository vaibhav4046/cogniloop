"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { ModePicker } from "./ModePicker";
import { StatsPanel } from "./StatsPanel";
import { CURRICULA } from "@/lib/curricula";
import type { ModeId } from "@/lib/modes";
import { isInTextField } from "@/lib/kbd";
import { useAutoExpand } from "@/lib/useAutoExpand";

const EXAMPLES = [
  "Backpropagation in neural networks",
  "How TCP handshake works",
  "Bayes' theorem with a real example",
  "What actually happens during meiosis",
  "Greedy vs dynamic programming",
];

const FEATURES = [
  { t: "Socratic, not summary", b: "Locked system prompt refuses to give answers. Forces explanation." },
  { t: "Concept tracker", b: "Live concept map: weak → shaky → solid → mastered." },
  { t: "Adaptive difficulty", b: "Each question targets your weakest concept, scales 1–5." },
  { t: "Voice input + read-aloud", b: "Speak answers, hear questions. Web Speech API. Free." },
  { t: "LaTeX rendering", b: "Native math support. Greek, equations, integrals — all renderable." },
  { t: "8 curriculum packs", b: "JEE, NEET, GATE-CSE, MCAT, AP-CS, ML Fundamentals, System Design, Economics — pre-loaded." },
  { t: "3 modes", b: "Chill (gentle), Exam (timed, strict), Expert (first-principles)." },
  { t: "Streaks + history", b: "Daily streak, lifetime stats, full session history." },
  { t: "Shareable sessions", b: "Export any session as a link — encoded locally, nothing ever touches a server." },
  { t: "Coaching report", b: "Final report with study plan, journal prompt, markdown export." },
  { t: "Keyboard-first", b: "Every action has a shortcut. Press ? to open the panel — navigate, submit, and drill without touching the mouse." },
  { t: "100% client-side", b: "Sessions live in your browser only. No accounts, no servers, nothing ever leaves your device." },
];

export function Landing() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [mode, setMode] = useState<ModeId>("exam");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useAutoExpand(taRef, notes, 240);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/" && !isInTextField(e.target)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function pickExample(s: string) {
    setTopic(s);
    setErr(null);
  }

  async function start() {
    if (submitting) return;
    if (!topic.trim() && !notes.trim()) {
      setErr("Type a topic or paste your notes.");
      return;
    }
    setSubmitting(true);
    setErr(null);

    sessionStorage.setItem(
      "cl:pending",
      JSON.stringify({
        topic: topic.trim(),
        notes: notes.trim(),
        modeId: mode,
      })
    );
    router.push("/study");
  }

  return (
    <main id="main" className="min-h-screen flex flex-col">
      <header className="px-6 sm:px-10 py-5 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-1" aria-label="Site navigation">
          <Link href="/templates" className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] px-3 py-1.5">Templates</Link>
          <Link href="/history" className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] px-3 py-1.5">History</Link>
          <Link href="/why" className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] px-3 py-1.5">Why</Link>
          <Link href="/settings" className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] px-3 py-1.5">Settings</Link>
          <a
            href="https://github.com/vaibhav4046/cogniloop"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] px-3 py-1.5"
          >
            GitHub →
          </a>
        </nav>
      </header>

      <section className="flex-1 flex flex-col items-center px-6 pt-8 pb-16">
        <div className="w-full max-w-[720px] fade-up">
          <div className="flex justify-center mb-6">
            <span className="tag">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              Free · No signup · No API keys · 100% client-side
            </span>
          </div>

          <h1 className="text-4xl sm:text-[54px] font-semibold tracking-tight text-center leading-[1.04]">
            The AI tutor that <span className="text-[var(--accent)]">refuses</span> to give you the answer.
          </h1>

          <p className="text-[var(--fg-muted)] text-center mt-5 text-[15.5px] leading-relaxed max-w-[580px] mx-auto">
            Most AI study tools summarize for you and quietly destroy your understanding. Cogniloop drills you. Paste a topic, explain it back in your own words, and let the loop find your blind spots — round by round.
          </p>

          <div className="mt-8">
            <StatsPanel />
          </div>

          <div className="mt-8 card p-5">
            <div className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-2">
              Topic
            </div>
            <input
              ref={inputRef}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. backpropagation, photosynthesis, monetary policy…"
              aria-label="Study topic"
              className="w-full bg-transparent outline-none text-[16px] placeholder:text-[var(--fg-dim)]"
              maxLength={400}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) start();
              }}
            />

            <details className="mt-4 group">
              <summary className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] cursor-pointer select-none list-none flex items-center gap-2">
                <span className="inline-block transition-transform group-open:rotate-90">›</span>
                Studying from a textbook or lecture? Drop your notes here
              </summary>
              <textarea
                ref={taRef}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Paste your textbook excerpt, class notes, or reading — the AI drills you on your material, not generic answers."
                aria-label="Study notes or source material"
                className="w-full bg-transparent outline-none text-[14px] min-h-[100px] mt-3"
                maxLength={12000}
              />
              <div className="text-[11px] text-[var(--fg-dim)] mt-1 text-right">
                {notes.length}/12000
              </div>
            </details>

            <div className="mt-5 pt-4 border-t border-[var(--line-soft)]">
              <div className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-2">
                Mode
              </div>
              <ModePicker value={mode} onChange={setMode} />
            </div>

            {err && (
              <div className="mt-3 text-sm text-[var(--bad)]">{err}</div>
            )}

            <button
              onClick={start}
              disabled={submitting}
              className="btn-primary mt-5 w-full py-3 rounded-xl text-[15px]"
            >
              {submitting ? "Starting the loop…" : "Begin the loop  ↵"}
            </button>
            <div className="text-[11px] text-[var(--fg-dim)] text-center mt-2">
              ⌘/Ctrl + Enter to start  ·  press / anywhere to focus topic
            </div>
          </div>

          <div className="mt-10">
            <div className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-3">
              Try an example
            </div>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => pickExample(ex)}
                  className="btn-ghost px-3 py-1.5 text-xs rounded-lg"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)]">
                Curriculum packs
              </div>
              <Link href="/templates" className="text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg)]">
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CURRICULA.slice(0, 6).map((c, i) => (
                <Link
                  key={c.id}
                  href={`/templates#${c.id}`}
                  className="card p-3 text-left hover:border-[#2a2e34] hover:bg-[var(--bg-elev)] hover:-translate-y-px transition-all duration-150 block item-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="text-[13px] font-medium tracking-tight">
                    {c.name}
                  </div>
                  <div className="text-[11px] text-[var(--fg-muted)] mt-0.5">
                    {c.region}
                  </div>
                  <div className="text-[11px] text-[var(--fg-dim)] mt-1">
                    {c.subjects.reduce((n, s) => n + s.topics.length, 0)} topics
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-[20px] font-semibold tracking-tight">
              What makes it different
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {FEATURES.map((f) => (
                <div key={f.t} className="card p-4 hover:bg-[var(--bg-elev)] transition-colors duration-150">
                  <div className="text-[13.5px] font-medium tracking-tight">{f.t}</div>
                  <div className="text-[12.5px] text-[var(--fg-muted)] mt-1.5 leading-relaxed">
                    {f.b}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 card p-6">
            <div className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-2">
              Why not just use ChatGPT or Claude?
            </div>
            <div className="text-[14px] leading-relaxed">
              They <em>can</em> roleplay a tutor. But the moment you say <em>&ldquo;just give me the answer&rdquo;</em>, they oblige — and that&apos;s the failure mode killing learning. Cogniloop&apos;s system prompt is locked, the UI is shaped only for explanation + grading, and your concept progress persists across sessions in a structured way generic chatbots don&apos;t surface.
            </div>
            <Link href="/why" className="btn-ghost mt-4 px-4 py-2 rounded-lg text-xs inline-block">
              Full comparison + use cases →
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 sm:px-10 py-6 text-[11px] text-[var(--fg-dim)] flex flex-col sm:flex-row gap-2 items-center justify-between border-t border-[var(--line-soft)]">
        <span>Built by <span className="text-[var(--fg-muted)]">Vaibhav Lalwani</span></span>
        <span>Powered by an open free LLM endpoint · MIT licensed · <a href="https://github.com/vaibhav4046/cogniloop" target="_blank" rel="noreferrer" className="hover:text-[var(--fg)]">github.com/vaibhav4046/cogniloop</a></span>
      </footer>
    </main>
  );
}
