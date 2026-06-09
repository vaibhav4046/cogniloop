"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { ModePicker } from "./ModePicker";
import { StatsPanel } from "./StatsPanel";
import { CURRICULA } from "@/lib/curricula";
import { getHistory } from "@/lib/storage";
import type { ModeId } from "@/lib/modes";
import { isInTextField } from "@/lib/kbd";
import { useAutoExpand } from "@/lib/useAutoExpand";
import { useGlobalNav } from "@/lib/useGlobalNav";
import { MODE_COLOR } from "@/lib/labels";

const EXAMPLES = [
  "Backpropagation in neural networks",
  "How TCP handshake works",
  "Bayes' theorem with a real example",
  "What actually happens during meiosis",
  "Greedy vs dynamic programming",
  "Electromagnetic induction — Faraday's law and Lenz's law",
  "Supply and demand — why price ceilings create shortages",
  "Consistent hashing and distributed caching",
];

const FEATURES = [
  { t: "Socratic, not summary", b: "Locked system prompt refuses to give answers. Forces explanation." },
  { t: "Concept tracker", b: "Live concept map: weak → shaky → solid → mastered." },
  { t: "Adaptive difficulty", b: "Dials in on the concept you're shakiest on. Difficulty climbs as you improve, drops when you're stuck." },
  { t: "Voice input + read-aloud", b: "Say your answer out loud instead of typing. Questions read back to you. Web Speech API — free, no plugins." },
  { t: "LaTeX rendering", b: "Math renders in questions, your answers, and the coaching report. Type LaTeX inline — no tool switching." },
  { t: "8 curriculum packs", b: "JEE, NEET, GATE-CSE, MCAT, AP-CS, ML Fundamentals, System Design, Economics — pre-loaded." },
  { t: "3 modes", b: "Chill (gentle), Exam (timed, strict), Expert (first-principles)." },
  { t: "Streaks + history", b: "Daily streak, lifetime stats, full session history." },
  { t: "Shareable sessions", b: "Export any session as a link — encoded locally, nothing ever touches a server." },
  { t: "Coaching report", b: "Final report with study plan, journal prompt, markdown export." },
  { t: "Keyboard-first", b: "Every action has a shortcut. Press ? to open the panel — navigate, submit, and drill without touching the mouse." },
  { t: "100% client-side", b: "Sessions live in your browser only. No accounts, no servers, nothing ever leaves your device." },
];

const CURRICULA_PREVIEW = CURRICULA.slice(0, 6).map((c) => ({
  ...c,
  topicCount: c.subjects.reduce((n, s) => n + s.topics.length, 0),
}));

const CurriculaPicker = memo(function CurriculaPicker() {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)]">
          Curriculum packs
        </div>
        <Link href="/templates" aria-label="See all curriculum templates" className="text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg)]">
          See all <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {CURRICULA_PREVIEW.map((c, i) => (
          <Link
            key={c.id}
            href={`/templates#${c.id}`}
            className="card p-3 text-left hover:border-[#2a2e34] hover:bg-[var(--bg-elev)] hover:-translate-y-px transition-all duration-150 block item-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="text-[13px] font-medium tracking-tight">{c.name}</div>
            <div className="text-[11px] text-[var(--fg-muted)] mt-0.5">{c.region}</div>
            <div className="text-[11px] text-[var(--fg-dim)] mt-1">{c.topicCount} topics</div>
          </Link>
        ))}
      </div>
    </div>
  );
});

const FeatureGrid = memo(function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      {FEATURES.map((f, i) => (
        <article key={f.t} className="card p-4 hover:bg-[var(--bg-elev)] transition-colors duration-150 fade-up" style={{ animationDelay: `${i * 45}ms` }}>
          <h3 className="text-[13.5px] font-medium tracking-tight">{f.t}</h3>
          <p className="text-[12.5px] text-[var(--fg-muted)] mt-1.5 leading-relaxed">
            {f.b}
          </p>
        </article>
      ))}
    </div>
  );
});

function relTime(ts: number): string {
  const days = Math.floor((Date.now() - ts) / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days}d ago`;
}

const MODE_CHIP_LABEL: Record<string, string> = {
  chill: "Chill",
  exam: "Exam",
  expert: "Expert",
};

type RecentEntry = { topic: string; modeId: string; createdAt: number };

const RecentTopics = memo(function RecentTopics({
  topics,
  onPick,
}: {
  topics: RecentEntry[];
  onPick: (t: string) => void;
}) {
  if (topics.length === 0) return null;
  return (
    <div className="mt-6 fade-up">
      <div className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-3">
        Pick up where you left off
      </div>
      <div className="flex flex-wrap gap-2">
        {topics.map(({ topic: t, modeId, createdAt }, i) => (
          <button
            key={t}
            onClick={() => onPick(t)}
            aria-label={`Resume ${t} — ${MODE_CHIP_LABEL[modeId] ?? "Exam"} mode, ${relTime(createdAt)}`}
            title={`${t} · ${MODE_CHIP_LABEL[modeId] ?? "Exam"} mode · ${relTime(createdAt)}`}
            className="btn-ghost px-3 py-1.5 text-xs rounded-lg item-in flex items-center gap-2 max-w-[280px]"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: MODE_COLOR[modeId] ?? "var(--fg-dim)" }}
              aria-hidden="true"
            />
            <span className="truncate min-w-0">↻ {t}</span>
            <span className="text-[10px] text-[var(--fg-dim)] shrink-0">{relTime(createdAt)}</span>
          </button>
        ))}
      </div>
    </div>
  );
});

const ExampleChips = memo(function ExampleChips({
  onPick,
}: {
  onPick: (ex: string) => void;
}) {
  return (
    <div className="mt-10">
      <div className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-3">
        Try an example
      </div>
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex, i) => (
          <button
            key={ex}
            onClick={() => onPick(ex)}
            className="btn-ghost px-3 py-1.5 text-xs rounded-lg item-in"
            style={{ animationDelay: `${i * 35}ms` }}
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
});

export function Landing() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [mode, setMode] = useState<ModeId>("exam");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [recentTopics, setRecentTopics] = useState<{ topic: string; modeId: string; createdAt: number }[]>([]);
  const [recentMounted, setRecentMounted] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useAutoExpand(taRef, notes, 240);
  useGlobalNav();

  useEffect(() => {
    const hist = getHistory();
    const seen = new Set<string>();
    const recent: { topic: string; modeId: string; createdAt: number }[] = [];
    for (const r of hist) {
      if (r.topic && !seen.has(r.topic)) {
        seen.add(r.topic);
        recent.push({ topic: r.topic, modeId: r.modeId, createdAt: r.createdAt });
        if (recent.length >= 3) break;
      }
    }
    setRecentTopics(recent);
    setRecentMounted(true);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (isInTextField(e.target)) return;
      if (e.key === "/") { e.preventDefault(); inputRef.current?.focus(); return; }
      if (e.key === "1") setMode("chill");
      else if (e.key === "2") setMode("exam");
      else if (e.key === "3") setMode("expert");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pickTopic = useCallback((s: string) => {
    setTopic(s);
    setErr(null);
    inputRef.current?.focus();
  }, []);

  async function start() {
    if (submitting) return;
    if (!topic.trim() && !notes.trim()) {
      setErr("Enter a topic above — or paste your notes — to start the loop.");
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
            aria-label="Cogniloop on GitHub"
            className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] px-3 py-1.5"
          >
            GitHub <span aria-hidden="true">→</span>
          </a>
        </nav>
      </header>

      <section className="flex-1 flex flex-col items-center px-6 pt-8 pb-16">
        <div className="w-full max-w-[720px]">
          <div className="flex justify-center mb-6 fade-up">
            <span className="tag">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              Free · No signup · No API keys · 100% client-side
            </span>
          </div>

          <h1 className="text-4xl sm:text-[54px] font-semibold tracking-tight text-center leading-[1.04] fade-up" style={{ animationDelay: "70ms" }}>
            The AI tutor that <span className="text-[var(--accent)]">refuses</span> to give you the answer.
          </h1>

          <p className="text-[var(--fg-muted)] text-center mt-5 text-[15.5px] leading-relaxed max-w-[580px] mx-auto fade-up" style={{ animationDelay: "140ms" }}>
            Most AI study tools summarize for you and quietly destroy your understanding. Cogniloop drills you. Paste a topic, explain it back in your own words, and let the loop find your blind spots — round by round.
          </p>

          <div className="mt-8 fade-up" style={{ animationDelay: "200ms" }}>
            <StatsPanel />
          </div>

          <div className="mt-8 card p-5 fade-up" style={{ animationDelay: "260ms" }}>
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
                if (e.key === "Enter" && !e.nativeEvent.isComposing) start();
              }}
            />
            {topic.length > 300 && (
              <div className="text-[11px] text-[var(--fg-dim)] text-right mt-1">
                {topic.length} / 400
              </div>
            )}

            <details
              className="mt-4 group"
              onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) taRef.current?.focus();
              }}
            >
              <summary className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] cursor-pointer select-none list-none flex items-center gap-2">
                <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90">›</span>
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
              {notes.length > 0 && (
                <div className={`text-[11px] mt-1 text-right ${
                  notes.length >= 11000 ? "text-[var(--bad)]" :
                  notes.length >= 8000 ? "text-[var(--warn)]" :
                  "text-[var(--fg-dim)]"
                }`}>
                  {notes.length} / 12000
                </div>
              )}
            </details>

            <div className="mt-5 pt-4 border-t border-[var(--line-soft)]">
              <div className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-2">
                Mode
              </div>
              <ModePicker value={mode} onChange={setMode} />
            </div>

            <div
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              className={`text-sm text-[var(--bad)]${err ? " mt-3" : ""}`}
            >
              {err}
            </div>

            <button
              onClick={start}
              disabled={submitting}
              className="btn-primary mt-5 w-full py-3 rounded-xl text-[15px]"
            >
              {submitting ? "Starting the loop…" : "Begin the loop  ↵"}
            </button>
            <div className="text-[11px] text-[var(--fg-dim)] text-center mt-2 flex items-center justify-center gap-1 flex-wrap">
              <kbd className="font-mono bg-[var(--bg-elev)] border border-[var(--line)] px-2 py-0.5 rounded">Enter</kbd>
              {" to start · "}
              <kbd className="font-mono bg-[var(--bg-elev)] border border-[var(--line)] px-2 py-0.5 rounded">/</kbd>
              {" to focus topic"}
            </div>
          </div>

          <ExampleChips onPick={pickTopic} />

          {!recentMounted ? (
            <div className="mt-6" aria-hidden="true">
              <div className="skeleton h-[11px] w-32 rounded mb-3" />
              <div className="flex flex-wrap gap-2">
                <div className="skeleton h-[30px] w-36 rounded-lg" />
                <div className="skeleton h-[30px] w-28 rounded-lg" />
              </div>
            </div>
          ) : (
            <RecentTopics topics={recentTopics} onPick={pickTopic} />
          )}

          <CurriculaPicker />

          <div className="mt-14">
            <h2 className="text-[20px] font-semibold tracking-tight">
              What makes it different
            </h2>
            <FeatureGrid />
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
