"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "./Logo";
import type {
  Concept,
  Round,
  SessionStartResponse,
  SessionTurnResponse,
  Evaluation,
  ConceptStrength,
} from "@/lib/types";

type Phase = "booting" | "starting" | "asking" | "answering" | "evaluating" | "ending" | "report" | "error";

interface ReportData {
  headline: string;
  mastered: string[];
  shaky: string[];
  weak: string[];
  studyPlan: { concept: string; action: string; minutes: number }[];
  feynmanPrompt: string;
}

const STRENGTH_COLOR: Record<ConceptStrength, string> = {
  weak: "var(--bad)",
  shaky: "var(--warn)",
  solid: "var(--good)",
  mastered: "var(--accent)",
};

const STRENGTH_PCT: Record<ConceptStrength, number> = {
  weak: 18,
  shaky: 45,
  solid: 75,
  mastered: 100,
};

export function Session() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("booting");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [answer, setAnswer] = useState("");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const startSession = useCallback(async (t: string, n: string) => {
    setPhase("starting");
    setErrMsg(null);
    try {
      const res = await fetch("/api/session/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: t, notes: n }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as SessionStartResponse;
      setConcepts(data.concepts);
      setRounds([data.firstRound]);
      setPhase("answering");
    } catch (e) {
      setErrMsg(e instanceof Error ? e.message : "Unknown error");
      setPhase("error");
    }
  }, []);

  useEffect(() => {
    const raw = sessionStorage.getItem("cl:pending");
    if (!raw) {
      const persisted = localStorage.getItem("cl:session");
      if (persisted) {
        try {
          const s = JSON.parse(persisted);
          setTopic(s.topic);
          setNotes(s.notes);
          setConcepts(s.concepts);
          setRounds(s.rounds);
          setPhase(s.phase ?? "answering");
          return;
        } catch {}
      }
      router.replace("/");
      return;
    }
    sessionStorage.removeItem("cl:pending");
    const parsed = JSON.parse(raw) as { topic: string; notes: string };
    setTopic(parsed.topic);
    setNotes(parsed.notes);
    void startSession(parsed.topic, parsed.notes);
  }, [router, startSession]);

  useEffect(() => {
    if (phase === "answering" || phase === "evaluating") {
      localStorage.setItem(
        "cl:session",
        JSON.stringify({ topic, notes, concepts, rounds, phase })
      );
    }
  }, [topic, notes, concepts, rounds, phase]);

  useEffect(() => {
    if (phase === "answering" && taRef.current) {
      taRef.current.focus();
    }
  }, [phase, rounds.length]);

  async function submitAnswer() {
    if (phase !== "answering" || !answer.trim()) return;
    setPhase("evaluating");
    setErrMsg(null);
    const lastIdx = rounds.length - 1;
    const updatedRounds = rounds.map((r, i) =>
      i === lastIdx ? { ...r, answer: answer.trim() } : r
    );
    setRounds(updatedRounds);

    try {
      const res = await fetch("/api/session/turn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          notes,
          concepts,
          rounds: updatedRounds,
          answer: answer.trim(),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as SessionTurnResponse;

      const evaluatedRounds = updatedRounds.map((r, i) =>
        i === lastIdx ? { ...r, evaluation: data.evaluation } : r
      );
      const finalRounds = data.nextRound
        ? [...evaluatedRounds, data.nextRound]
        : evaluatedRounds;

      setRounds(finalRounds);
      setConcepts(data.updatedConcepts);
      setAnswer("");

      if (data.shouldEnd || !data.nextRound) {
        await endSession(finalRounds, data.updatedConcepts);
      } else {
        setPhase("answering");
      }
    } catch (e) {
      setErrMsg(e instanceof Error ? e.message : "Turn failed");
      setPhase("error");
    }
  }

  async function endSession(rs?: Round[], cs?: Concept[]) {
    setPhase("ending");
    try {
      const res = await fetch("/api/session/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          concepts: cs ?? concepts,
          rounds: rs ?? rounds,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as ReportData;
      setReport(data);
      setPhase("report");
      localStorage.removeItem("cl:session");
    } catch (e) {
      setErrMsg(e instanceof Error ? e.message : "Report failed");
      setPhase("error");
    }
  }

  function newSession() {
    localStorage.removeItem("cl:session");
    router.push("/");
  }

  if (phase === "booting" || phase === "starting") {
    return (
      <SessionShell>
        <div className="flex flex-col items-center justify-center flex-1 text-center fade-up">
          <span className="dot-pulse mb-4">
            <span /><span /><span />
          </span>
          <div className="text-[var(--fg-muted)] text-sm">
            {phase === "starting" ? "Building your concept map…" : "Loading session…"}
          </div>
        </div>
      </SessionShell>
    );
  }

  if (phase === "error") {
    return (
      <SessionShell>
        <div className="flex flex-col items-center justify-center flex-1 text-center px-6 fade-up">
          <div className="card p-6 max-w-md">
            <div className="text-[var(--bad)] text-sm font-medium mb-2">
              Something snapped
            </div>
            <div className="text-[13px] text-[var(--fg-muted)] mb-4">
              {errMsg ?? "Unknown error"}
            </div>
            <div className="text-[11px] text-[var(--fg-dim)] mb-5 leading-relaxed">
              The free LLM endpoint can rate-limit or hiccup. Retry usually fixes it.
            </div>
            <div className="flex gap-2 justify-center">
              <button onClick={() => location.reload()} className="btn-primary px-4 py-2 rounded-lg text-sm">
                Retry
              </button>
              <button onClick={newSession} className="btn-ghost px-4 py-2 rounded-lg text-sm">
                Start over
              </button>
            </div>
          </div>
        </div>
      </SessionShell>
    );
  }

  if (phase === "ending") {
    return (
      <SessionShell>
        <div className="flex flex-col items-center justify-center flex-1 text-center fade-up">
          <span className="dot-pulse mb-4">
            <span /><span /><span />
          </span>
          <div className="text-[var(--fg-muted)] text-sm">Compiling your report…</div>
        </div>
      </SessionShell>
    );
  }

  if (phase === "report" && report) {
    return (
      <SessionShell>
        <ReportView report={report} topic={topic} rounds={rounds} onNew={newSession} />
      </SessionShell>
    );
  }

  const lastRound = rounds[rounds.length - 1];
  const prevRound = rounds.length >= 2 ? rounds[rounds.length - 2] : null;
  const lastEval: Evaluation | undefined = prevRound?.evaluation;

  return (
    <SessionShell
      progress={
        rounds.length > 0
          ? Math.min(rounds.length / 8, 1)
          : 0
      }
      onEnd={() => endSession()}
      canEnd={rounds.length >= 2 && phase === "answering"}
    >
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 px-6 sm:px-10 py-6 max-w-[1180px] w-full mx-auto">
        <div className="flex flex-col gap-5 min-w-0">
          {lastEval && (
            <EvalCard evaluation={lastEval} key={`eval-${rounds.length}`} />
          )}

          <div className="card p-5 fade-up" key={`q-${rounds.length}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="tag">Round {lastRound.id}</span>
              <span className="tag">{lastRound.questionType}</span>
              <span className="tag">
                <DiffDots level={lastRound.difficulty} />
              </span>
            </div>
            <div className="text-[18px] sm:text-[19px] leading-relaxed font-medium tracking-tight">
              {lastRound.question}
            </div>
          </div>

          <div className="field p-4">
            <textarea
              ref={taRef}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={phase !== "answering"}
              placeholder="Explain in your own words. Reasoning > recall. Examples are gold."
              className="w-full bg-transparent outline-none text-[15px] min-h-[140px] leading-relaxed disabled:opacity-60"
              maxLength={6000}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  submitAnswer();
                }
              }}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="text-[11px] text-[var(--fg-dim)]">
                {answer.length}/6000  ·  ⌘/Ctrl + Enter to submit
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setAnswer("I'm not sure — but I'd guess…")}
                  disabled={phase !== "answering"}
                  className="btn-ghost text-xs px-2.5 py-1 rounded-md"
                >
                  Stuck?
                </button>
                <button
                  onClick={submitAnswer}
                  disabled={phase !== "answering" || !answer.trim()}
                  className="btn-primary text-sm px-4 py-2 rounded-lg"
                >
                  {phase === "evaluating" ? "Grading…" : "Submit  ↵"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-4 lg:self-start">
          <ConceptPanel concepts={concepts} />
        </aside>
      </div>
    </SessionShell>
  );
}

function SessionShell({
  children,
  progress,
  onEnd,
  canEnd,
}: {
  children: React.ReactNode;
  progress?: number;
  onEnd?: () => void;
  canEnd?: boolean;
}) {
  const router = useRouter();
  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 sm:px-10 py-4 flex items-center justify-between border-b border-[var(--line-soft)]">
        <button onClick={() => router.push("/")} aria-label="Home">
          <Logo />
        </button>
        <div className="flex items-center gap-3">
          {typeof progress === "number" && (
            <div className="hidden sm:block w-32">
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>
          )}
          {onEnd && (
            <button
              onClick={onEnd}
              disabled={!canEnd}
              className="btn-ghost text-xs px-3 py-1.5 rounded-md"
            >
              End & report
            </button>
          )}
        </div>
      </header>
      <div className="flex-1 flex flex-col">{children}</div>
    </main>
  );
}

function ConceptPanel({ concepts }: { concepts: Concept[] }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[12px] font-medium tracking-tight text-[var(--fg)]">
          Concept tracker
        </div>
        <div className="text-[10px] text-[var(--fg-dim)] uppercase tracking-wider">
          {concepts.length} concepts
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {concepts.map((c) => (
          <li key={c.id} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] tracking-tight truncate">{c.name}</span>
              <span
                className="text-[10px] uppercase tracking-wider font-medium"
                style={{ color: STRENGTH_COLOR[c.strength] }}
              >
                {c.strength}
              </span>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${STRENGTH_PCT[c.strength]}%`,
                  background: STRENGTH_COLOR[c.strength],
                }}
              />
            </div>
            <div className="text-[10px] text-[var(--fg-dim)]">
              {c.attempts} attempt{c.attempts === 1 ? "" : "s"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EvalCard({ evaluation }: { evaluation: Evaluation }) {
  const tone =
    evaluation.score >= 3
      ? { label: "Nailed it", color: "var(--good)" }
      : evaluation.score === 2
      ? { label: "Solid", color: "var(--good)" }
      : evaluation.score === 1
      ? { label: "Partial", color: "var(--warn)" }
      : { label: "Off the mark", color: "var(--bad)" };

  return (
    <div className="card p-4 fade-up">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-[11px] uppercase tracking-wider font-semibold"
          style={{ color: tone.color }}
        >
          {tone.label} · {evaluation.score}/3
        </span>
      </div>
      <div className="text-[14px] tracking-tight mb-3 text-[var(--fg)]">
        {evaluation.verdict}
      </div>
      {evaluation.strengths.length > 0 && (
        <Block label="What you got" items={evaluation.strengths} color="var(--good)" />
      )}
      {evaluation.gaps.length > 0 && (
        <Block label="Still missing" items={evaluation.gaps} color="var(--bad)" />
      )}
    </div>
  );
}

function Block({ label, items, color }: { label: string; items: string[]; color: string }) {
  return (
    <div className="mt-2">
      <div className="text-[10px] uppercase tracking-wider text-[var(--fg-dim)] mb-1">
        {label}
      </div>
      <ul className="flex flex-col gap-1">
        {items.map((it, i) => (
          <li key={i} className="text-[12.5px] text-[var(--fg-muted)] leading-relaxed flex gap-2">
            <span style={{ color }}>•</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DiffDots({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className="w-1 h-1 rounded-full"
          style={{
            background: n <= level ? "var(--accent)" : "var(--line)",
          }}
        />
      ))}
    </span>
  );
}

function ReportView({
  report,
  topic,
  rounds,
  onNew,
}: {
  report: ReportData;
  topic: string;
  rounds: Round[];
  onNew: () => void;
}) {
  const avg =
    rounds.filter((r) => r.evaluation).reduce((s, r) => s + (r.evaluation?.score ?? 0), 0) /
    Math.max(rounds.filter((r) => r.evaluation).length, 1);

  function downloadMd() {
    const lines: string[] = [];
    lines.push(`# Cogniloop session — ${topic || "untitled"}`);
    lines.push("");
    lines.push(`**Headline:** ${report.headline}`);
    lines.push(`**Avg score:** ${avg.toFixed(2)} / 3`);
    lines.push("");
    lines.push("## Mastered");
    report.mastered.forEach((c) => lines.push(`- ${c}`));
    lines.push("");
    lines.push("## Shaky");
    report.shaky.forEach((c) => lines.push(`- ${c}`));
    lines.push("");
    lines.push("## Weak");
    report.weak.forEach((c) => lines.push(`- ${c}`));
    lines.push("");
    lines.push("## Study plan");
    report.studyPlan.forEach((s) =>
      lines.push(`- **${s.concept}** (${s.minutes} min): ${s.action}`)
    );
    lines.push("");
    lines.push("## Feynman journal prompt");
    lines.push(`> ${report.feynmanPrompt}`);
    lines.push("");
    lines.push("## Rounds");
    rounds.forEach((r) => {
      lines.push(`### Round ${r.id} — ${r.questionType} (diff ${r.difficulty})`);
      lines.push(`**Q:** ${r.question}`);
      if (r.answer) lines.push(`**A:** ${r.answer}`);
      if (r.evaluation) {
        lines.push(`**Score:** ${r.evaluation.score}/3 — ${r.evaluation.verdict}`);
      }
      lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cogniloop-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex-1 max-w-[800px] w-full mx-auto px-6 py-10">
      <div className="fade-up">
        <div className="tag mb-4">Session report</div>
        <h2 className="text-3xl font-semibold tracking-tight leading-tight">
          {report.headline}
        </h2>
        <div className="text-[var(--fg-muted)] text-sm mt-2">
          {topic ? `On: ${topic}` : ""} · {rounds.length} rounds · avg {avg.toFixed(2)}/3
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <BucketCard label="Mastered" items={report.mastered} color="var(--accent)" />
          <BucketCard label="Shaky" items={report.shaky} color="var(--warn)" />
          <BucketCard label="Weak" items={report.weak} color="var(--bad)" />
        </div>

        <div className="card p-5 mt-6">
          <div className="text-[12px] uppercase tracking-wider text-[var(--fg-dim)] mb-3">
            Study plan
          </div>
          <ul className="flex flex-col gap-3">
            {report.studyPlan.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-[12px] text-[var(--fg-dim)] min-w-[42px]">
                  {s.minutes}m
                </span>
                <div>
                  <div className="text-[14px] tracking-tight font-medium">{s.concept}</div>
                  <div className="text-[13px] text-[var(--fg-muted)] leading-relaxed">
                    {s.action}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5 mt-4">
          <div className="text-[12px] uppercase tracking-wider text-[var(--fg-dim)] mb-2">
            Journal prompt (5 min)
          </div>
          <div className="text-[14px] leading-relaxed italic text-[var(--fg)]">
            “{report.feynmanPrompt}”
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={onNew} className="btn-primary px-5 py-2.5 rounded-lg text-sm">
            New session
          </button>
          <button onClick={downloadMd} className="btn-ghost px-5 py-2.5 rounded-lg text-sm">
            Export markdown
          </button>
        </div>
      </div>
    </div>
  );
}

function BucketCard({ label, items, color }: { label: string; items: string[]; color: string }) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
        <span className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)]">
          {label}
        </span>
        <span className="text-[11px] text-[var(--fg-dim)] ml-auto">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <div className="text-[12px] text-[var(--fg-dim)]">—</div>
      ) : (
        <ul className="flex flex-col gap-1">
          {items.map((it, i) => (
            <li key={i} className="text-[13px] tracking-tight">
              {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
