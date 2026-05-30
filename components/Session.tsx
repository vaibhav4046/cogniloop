"use client";

import { useEffect, useRef, useState, useCallback, memo, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "./Logo";
import { Tex } from "./Math";
import { VoiceInput } from "./VoiceInput";
import { ReadAloud } from "./ReadAloud";
import { ModePicker } from "./ModePicker";
import { useToast } from "./Toast";
import { pushHistory, bumpStreak } from "@/lib/storage";
import { encodeShare } from "@/lib/share";
import { runStart, runTurn, runReport, type ReportData } from "@/lib/sessionLogic";
import { browserCallCtx } from "@/lib/settings";
import { fetchJson } from "@/lib/fetchRetry";
import { STARTING_HINTS, GRADING_HINTS, ENDING_HINTS, pickHint } from "@/lib/hints";
import { isInTextField } from "@/lib/kbd";
import { getMode, type ModeId } from "@/lib/modes";
import { useAutoExpand } from "@/lib/useAutoExpand";
import { QTYPE_DESC, STRENGTH_DESC, QTYPE_PLACEHOLDER, STUCK_STARTERS } from "@/lib/labels";
import type {
  Concept,
  Round,
  SessionStartResponse,
  SessionTurnResponse,
  Evaluation,
  ConceptStrength,
} from "@/lib/types";

type Phase =
  | "booting"
  | "starting"
  | "answering"
  | "evaluating"
  | "ending"
  | "report"
  | "error";

function humanizeError(raw: string | null): string {
  if (!raw) return "An unexpected error occurred.";
  const m = raw.toLowerCase();
  if (m.includes("429") || m.includes("rate limit") || m.includes("rate-limit"))
    return "AI endpoint is temporarily rate-limited — retry in a few seconds.";
  if (m.includes("failed to fetch") || m.includes("networkerror") || m.includes("network error") || m.includes("load failed"))
    return "Network error — check your connection and retry.";
  if (m.includes("503") || m.includes("service unavailable"))
    return "AI provider is temporarily unavailable — retry in a moment.";
  if (m.includes("401") || m.includes("unauthorized"))
    return "API key rejected — go to Settings and paste a fresh key from console.groq.com/keys.";
  if (m.includes("quota") || m.includes("credits") || m.includes("insufficient"))
    return "API key has run out of credits — switch provider to Pollinations in Settings (free, no key needed).";
  if (m.includes("timeout") || m.includes("timed out"))
    return "The AI took too long to respond — retry usually fixes this.";
  if (m.includes("aborted") || m.includes("aborterror"))
    return "Request was interrupted — tap Retry to continue.";
  if (m.includes("json") || m.includes("parse") || m.includes("unexpected token"))
    return "AI returned a malformed response — retry usually fixes this.";
  if (m.includes("malformed") || m.includes("missing fields") || m.includes("missing field"))
    return "AI returned an incomplete response — retry usually fixes this.";
  if (m.includes("502") || m.includes("bad gateway"))
    return "AI service returned a server error — retry in a moment.";
  if (m.includes("500") || m.includes("internal server"))
    return "An internal error occurred in the AI service — retry usually fixes this.";
  if (raw.length > 120 || m.startsWith("http "))
    return "Something went wrong with the AI — retry usually fixes this.";
  return raw;
}

function errorTip(raw: string | null) {
  const m = raw?.toLowerCase() ?? "";
  if (m.includes("401") || m.includes("unauthorized"))
    return <>Go to <Link href="/settings" className="underline">Settings</Link> and paste a fresh key from console.groq.com/keys.</>;
  if (m.includes("quota") || m.includes("credits") || m.includes("insufficient"))
    return <>Switch provider to Pollinations in <Link href="/settings" className="underline">Settings</Link> — free, no key needed.</>;
  if (m.includes("failed to fetch") || m.includes("networkerror") || m.includes("network error") || m.includes("load failed") || m.includes("aborted") || m.includes("aborterror"))
    return <>Check your connection, then retry.</>;
  return <>Retry usually fixes this. For unlimited speed, paste a free Groq key in <Link href="/settings" className="underline">Settings</Link>.</>;
}

function fmtTimeLabel(sec: number): string {
  if (sec < 60) return `${sec} second${sec !== 1 ? "s" : ""} remaining`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m} minute${m !== 1 ? "s" : ""}${s > 0 ? ` ${s} second${s !== 1 ? "s" : ""}` : ""} remaining`;
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
  const toast = useToast();
  const [phase, setPhase] = useState<Phase>("booting");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [modeId, setModeId] = useState<ModeId>("exam");
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [answer, setAnswer] = useState("");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const endedAtRef = useRef<number | null>(null);

  const startSession = useCallback(
    async (t: string, n: string, m: ModeId) => {
      setPhase("starting");
      setErrMsg(null);
      try {
        const ctx = browserCallCtx();
        const data = ctx
          ? await runStart({ topic: t, notes: n, modeId: m }, ctx)
          : await fetchJson<SessionStartResponse>("/api/session/start", {
              topic: t,
              notes: n,
              modeId: m,
            });
        setConcepts(data.concepts);
        setRounds([data.firstRound]);
        setPhase("answering");
      } catch (e) {
        setErrMsg(e instanceof Error ? e.message : "Unknown error");
        setPhase("error");
      }
    },
    []
  );

  const retryStart = useCallback(() => {
    if (topic || notes) {
      void startSession(topic, notes, modeId);
    } else {
      router.replace("/");
    }
  }, [topic, notes, modeId, startSession, router]);

  useEffect(() => {
    const raw = sessionStorage.getItem("cl:pending");
    if (!raw) {
      const persisted = localStorage.getItem("cl:session");
      if (persisted) {
        try {
          const s = JSON.parse(persisted);
          setTopic(s.topic);
          setNotes(s.notes);
          setModeId(s.modeId ?? "exam");
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
    const parsed = JSON.parse(raw) as {
      topic: string;
      notes: string;
      modeId?: ModeId;
    };
    setTopic(parsed.topic);
    setNotes(parsed.notes);
    const m = parsed.modeId ?? "exam";
    setModeId(m);
    void startSession(parsed.topic, parsed.notes, m);
  }, [router, startSession]);

  useEffect(() => {
    if (phase === "answering" || phase === "evaluating") {
      localStorage.setItem(
        "cl:session",
        JSON.stringify({ topic, notes, modeId, concepts, rounds, phase })
      );
    }
  }, [topic, notes, modeId, concepts, rounds, phase]);

  useEffect(() => {
    if (phase === "answering" && taRef.current) {
      taRef.current.focus();
    }
  }, [phase, rounds.length]);

  useAutoExpand(taRef, answer, 400);

  const handleTranscript = useCallback((t: string) => setAnswer(t), []);

  useEffect(() => {
    if (phase !== "starting" && phase !== "evaluating" && phase !== "ending") {
      setHintIndex(0);
      return;
    }
    setHintIndex(0);
    const id = window.setInterval(() => setHintIndex((i) => i + 1), 2400);
    return () => window.clearInterval(id);
  }, [phase]);

  const lastRoundIdForDraft = rounds.length > 0 ? rounds[rounds.length - 1].id : 0;
  const draftKey = `cl:draft:${lastRoundIdForDraft}`;

  useEffect(() => {
    if (phase !== "answering") return;
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved && answer === "") setAnswer(saved);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, lastRoundIdForDraft]);

  useEffect(() => {
    if (phase !== "answering") return;
    const id = window.setTimeout(() => {
      try {
        if (answer.trim()) localStorage.setItem(draftKey, answer);
        else localStorage.removeItem(draftKey);
      } catch {}
    }, 600);
    return () => window.clearTimeout(id);
  }, [answer, phase, draftKey]);

  const mode = getMode(modeId);

  useEffect(() => {
    if (!topic) return;
    document.title = `${topic} · Cogniloop`;
    return () => { document.title = "Study · Cogniloop"; };
  }, [topic]);

  useEffect(() => {
    if (phase !== "answering" || !mode.timerSec) {
      setTimer(null);
      return;
    }
    setTimer(mode.timerSec);
    const id = window.setInterval(() => {
      setTimer((t) => (t == null ? null : Math.max(t - 1, 0)));
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase, rounds.length, mode.timerSec]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (isInTextField(e.target)) return;
      if (e.key === "e" || e.key === "E") {
        if (phase === "answering" && rounds.length >= 2) {
          void endSession();
        }
      }
      if (e.key === "n" || e.key === "N") {
        if (phase === "report") newSession();
      }
      if ((e.key === "r" || e.key === "R") && phase === "error") {
        rounds.length === 0 ? retryStart() : location.reload();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
      const ctx = browserCallCtx();
      const data = ctx
        ? await runTurn(
            { topic, notes, modeId, concepts, rounds: updatedRounds, answer: answer.trim() },
            ctx
          )
        : await fetchJson<SessionTurnResponse>("/api/session/turn", {
            topic,
            notes,
            modeId,
            concepts,
            rounds: updatedRounds,
            answer: answer.trim(),
          });

      const evaluatedRounds = updatedRounds.map((r, i) =>
        i === lastIdx ? { ...r, evaluation: data.evaluation } : r
      );
      const finalRounds = data.nextRound
        ? [...evaluatedRounds, data.nextRound]
        : evaluatedRounds;

      setRounds(finalRounds);
      setConcepts(data.updatedConcepts);
      setAnswer("");

      for (const c of data.updatedConcepts) {
        if (c.strength === "mastered" && concepts.find((p) => p.id === c.id)?.strength !== "mastered") {
          toast.push({ kind: "success", text: `"${c.name}" mastered — one fewer gap to close.`, durationMs: 3500 });
        }
      }

      if (data.shouldEnd || !data.nextRound) {
        await endSession(finalRounds, data.updatedConcepts);
      } else {
        setPhase("answering");
        try {
          localStorage.removeItem(draftKey);
        } catch {}
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Turn failed";
      const restoredRounds = updatedRounds.map((r, i) =>
        i === lastIdx ? { ...r, answer: undefined } : r
      );
      setRounds(restoredRounds);
      setAnswer((a) => a || updatedRounds[lastIdx].answer || "");
      setPhase("answering");
      toast.push({
        kind: "error",
        text: `Couldn't grade that round — ${humanizeError(msg)}`,
        actionLabel: "Retry",
        onAction: () => {
          void submitAnswer();
        },
        durationMs: 7000,
      });
    }
  }

  async function endSession(rs?: Round[], cs?: Concept[]) {
    if (!endedAtRef.current) endedAtRef.current = Date.now();
    setPhase("ending");
    const finalRounds = rs ?? rounds;
    const finalConcepts = cs ?? concepts;
    try {
      const ctx = browserCallCtx();
      const data = ctx
        ? await runReport({ topic, concepts: finalConcepts, rounds: finalRounds }, ctx)
        : await fetchJson<ReportData>("/api/session/report", {
            topic,
            concepts: finalConcepts,
            rounds: finalRounds,
          });
      setReport(data);
      setPhase("report");
      localStorage.removeItem("cl:session");

      const evald = finalRounds.filter((r) => r.evaluation);
      const avgScore =
        evald.length > 0
          ? evald.reduce((s, r) => s + (r.evaluation?.score ?? 0), 0) / evald.length
          : 0;
      pushHistory({
        id: crypto.randomUUID(),
        topic,
        modeId,
        concepts: finalConcepts,
        rounds: finalRounds,
        createdAt: finalRounds[0]?.createdAt ?? Date.now(),
        endedAt: Date.now(),
        avgScore,
        mastered: finalConcepts.filter((c) => c.strength === "mastered").length,
      });
      bumpStreak();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Report failed";
      setPhase("answering");
      toast.push({
        kind: "error",
        text: `Couldn't generate the report — ${humanizeError(msg)}`,
        actionLabel: "Retry",
        onAction: () => {
          void endSession(finalRounds, finalConcepts);
        },
        durationMs: 7000,
      });
    }
  }

  function newSession() {
    localStorage.removeItem("cl:session");
    router.push("/");
  }

  function reDrill(conceptName: string) {
    localStorage.removeItem("cl:session");
    sessionStorage.setItem("cl:pending", JSON.stringify({ topic: conceptName, notes: "", modeId }));
    router.push("/study");
  }

  if (phase === "booting" || phase === "starting") {
    return (
      <SessionShell>
        <PhaseLoader
          hint={phase === "starting" ? pickHint(STARTING_HINTS, hintIndex) : "Loading session…"}
          hintKey={hintIndex}
        />
      </SessionShell>
    );
  }

  if (phase === "error") {
    return (
      <SessionShell>
        <div className="flex flex-col items-center justify-center flex-1 text-center px-6 fade-up">
          <div className="card p-6 max-w-md" role="alert" aria-atomic="true">
            <div className="text-[var(--bad)] text-sm font-medium mb-2">
              Something snapped
            </div>
            <div className="text-[13px] text-[var(--fg-muted)] mb-4">
              {humanizeError(errMsg)}
            </div>
            <div className="text-[11px] text-[var(--fg-dim)] mb-5 leading-relaxed">
              {errorTip(errMsg)}
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={rounds.length === 0 ? retryStart : () => location.reload()}
                className="btn-primary px-4 py-2 rounded-lg text-sm"
                aria-keyshortcuts="r"
              >
                Retry
              </button>
              <button onClick={newSession} className="btn-ghost px-4 py-2 rounded-lg text-sm">
                Start over
              </button>
            </div>
            <div className="text-[10px] text-[var(--fg-dim)] mt-3">
              Press <kbd className="font-mono bg-[var(--bg-elev)] border border-[var(--line)] px-1.5 py-0.5 rounded">R</kbd> to retry
            </div>
          </div>
        </div>
      </SessionShell>
    );
  }

  if (phase === "ending") {
    return (
      <SessionShell>
        <PhaseLoader hint={pickHint(ENDING_HINTS, hintIndex)} hintKey={hintIndex} />
      </SessionShell>
    );
  }

  if (phase === "report" && report) {
    return (
      <SessionShell>
        <ReportView
          report={report}
          topic={topic}
          rounds={rounds}
          concepts={concepts}
          modeId={modeId}
          onNew={newSession}
          onReDrill={reDrill}
          endedAt={endedAtRef.current ?? undefined}
        />
      </SessionShell>
    );
  }

  const lastRound = rounds[rounds.length - 1];
  const prevRound = rounds.length >= 2 ? rounds[rounds.length - 2] : null;
  const lastEval: Evaluation | undefined = prevRound?.evaluation;

  return (
    <SessionShell
      progress={rounds.length > 0 ? Math.min(rounds.length / 8, 1) : 0}
      roundNum={rounds.length}
      onEnd={() => endSession()}
      canEnd={rounds.length >= 2 && phase === "answering"}
      timer={timer}
    >
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 px-6 sm:px-10 py-6 max-w-[1180px] w-full mx-auto">
        <div className="flex flex-col gap-5 min-w-0">
          {lastEval && <EvalCard evaluation={lastEval} key={`eval-${rounds.length}`} />}

          <div className="card p-5 round-in" key={`q-${rounds.length}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="tag">Round {lastRound.id}</span>
                <span
                  className="tag"
                  title={QTYPE_DESC[lastRound.questionType]}
                >
                  {lastRound.questionType.charAt(0).toUpperCase() + lastRound.questionType.slice(1)}
                </span>
                <span className="tag" title={`Difficulty: ${lastRound.difficulty} / 5`}>
                  <DiffDots level={lastRound.difficulty} />
                </span>
                <span className="tag" style={{ color: "var(--accent)" }}>
                  {mode.name} mode
                </span>
              </div>
              <ReadAloud text={lastRound.question} autoPlayKey={lastRound.id} />
            </div>
            <div className="text-[18px] sm:text-[19px] leading-relaxed font-medium tracking-tight">
              <Tex text={lastRound.question} />
            </div>
          </div>

          <div className="field p-4">
            <textarea
              ref={taRef}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={phase !== "answering"}
              aria-label="Your answer"
              placeholder={QTYPE_PLACEHOLDER[lastRound.questionType]}
              className="w-full bg-transparent outline-none text-[15px] min-h-[140px] leading-relaxed disabled:opacity-60"
              maxLength={6000}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  submitAnswer();
                }
              }}
            />
            <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
              <div className="text-[11px] text-[var(--fg-dim)]">
                {(() => {
                  const wc = answer.trim() ? answer.trim().split(/\s+/).filter(Boolean).length : 0;
                  const wcColor = wc === 0 ? undefined : wc < 20 ? "var(--warn)" : wc < 50 ? "var(--accent)" : "var(--good)";
                  return (
                    <>
                      {wc > 0 && <span style={{ color: wcColor }}>{wc} words · </span>}
                      {answer.length}/6000 · ⌘/Ctrl + Enter to submit
                    </>
                  );
                })()}
              </div>
              <div className="flex gap-2 items-center">
                <VoiceInput
                  onTranscript={handleTranscript}
                  disabled={phase !== "answering"}
                />
                <button
                  onClick={() => setShowHints((v) => !v)}
                  className="btn-ghost text-xs px-2.5 py-1 rounded-md"
                  title="Math syntax help"
                  aria-label="Toggle math syntax help"
                >
                  ƒ
                </button>
                <button
                  onClick={() => setAnswer(STUCK_STARTERS[lastRound.questionType])}
                  disabled={phase !== "answering"}
                  className="btn-ghost text-xs px-2.5 py-1 rounded-md"
                  aria-label="Fill in a question-type-aware starting phrase to get unstuck"
                  title={`Click when stuck — seeds a "${lastRound.questionType}"-style opening so you can start thinking out loud`}
                >
                  Stuck?
                </button>
                <button
                  onClick={submitAnswer}
                  disabled={phase !== "answering" || !answer.trim()}
                  className="btn-primary text-sm px-4 py-2 rounded-lg"
                  aria-label="Submit answer"
                >
                  {phase === "evaluating" ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden />
                      Grading…
                    </span>
                  ) : (
                    "Submit  ↵"
                  )}
                </button>
              </div>
            </div>
            {showHints && (
              <div className="mt-3 pt-3 border-t border-[var(--line-soft)] text-[11.5px] text-[var(--fg-muted)] leading-relaxed">
                <div className="text-[10px] uppercase tracking-wider text-[var(--fg-dim)] mb-1">
                  Math syntax
                </div>
                <div className="font-mono text-[11px]">
                  {'$x^2 + y^2$ · $\\frac{a}{b}$ · $\\int_0^1 f(x) dx$ · $\\sum_{i=1}^n$'}
                </div>
                <div className="mt-2">Wrap in <code>$…$</code> inline or <code>$$…$$</code> for display.</div>
              </div>
            )}
            {phase === "evaluating" && (
              <div
                className="mt-3 pt-3 border-t border-[var(--line-soft)] text-[12px] text-[var(--fg-muted)] text-center"
                aria-live="polite"
                aria-atomic="true"
              >
                <span key={hintIndex} className="hint-rotate inline-block">
                  {pickHint(GRADING_HINTS, hintIndex)}
                </span>
              </div>
            )}
            {answer.trim() && /\$/.test(answer) && (
              <div className="mt-3 pt-3 border-t border-[var(--line-soft)]">
                <div className="text-[10px] uppercase tracking-wider text-[var(--fg-dim)] mb-1">
                  Preview
                </div>
                <div className="text-[13px] leading-relaxed">
                  <Tex text={answer} />
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-4 lg:self-start flex flex-col gap-3">
          <ConceptPanel concepts={concepts} />
          <ModeSwitcher value={modeId} onChange={setModeId} />
        </aside>
      </div>
    </SessionShell>
  );
}

const ModeSwitcher = memo(function ModeSwitcher({
  value,
  onChange,
}: {
  value: ModeId;
  onChange: (m: ModeId) => void;
}) {
  return (
    <div className="card p-3">
      <div className="text-[10px] uppercase tracking-wider text-[var(--fg-dim)] mb-2">
        Mode (next question)
      </div>
      <ModePicker value={value} onChange={onChange} compact />
    </div>
  );
});

function PhaseLoader({ hint, hintKey }: { hint: string; hintKey: number }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center fade-up">
      <span className="dot-pulse mb-4" aria-hidden>
        <span /><span /><span />
      </span>
      <div
        className="text-[var(--fg-muted)] text-sm min-h-[1.4em]"
        aria-live="polite"
        aria-atomic="true"
      >
        <span key={hintKey} className="hint-rotate inline-block">
          {hint}
        </span>
      </div>
    </div>
  );
}

function SessionShell({
  children,
  progress,
  roundNum,
  onEnd,
  canEnd,
  timer,
}: {
  children: React.ReactNode;
  progress?: number;
  roundNum?: number;
  onEnd?: () => void;
  canEnd?: boolean;
  timer?: number | null;
}) {
  return (
    <main id="main" className="min-h-screen flex flex-col">
      <header className="px-6 sm:px-10 py-4 flex items-center justify-between border-b border-[var(--line-soft)]">
        <Link href="/" aria-label="Home">
          <Logo />
        </Link>
        <div className="flex items-center gap-3">
          {timer != null && (
            <span
              role="timer"
              className={`text-[11px] font-mono tabular-nums${timer < 10 ? " timer-urgent" : ""}`}
              style={{
                color: timer < 15 ? "var(--bad)" : "var(--fg-muted)",
              }}
              aria-live={timer < 10 ? "assertive" : "off"}
            >
              <span aria-hidden="true">⏱ {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}</span>
              <span className="sr-only">{fmtTimeLabel(timer)}</span>
            </span>
          )}
          {typeof roundNum === "number" && roundNum > 0 && (
            <span className="hidden sm:block text-[10px] text-[var(--fg-dim)] tabular-nums whitespace-nowrap">
              Round {roundNum} / 8
            </span>
          )}
          {typeof progress === "number" && (
            <div className="hidden sm:block w-32">
              <div
                className="bar-track"
                role="progressbar"
                aria-label="Session progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
              >
                <div
                  className="bar-fill"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          )}
          {onEnd && (
            <button
              onClick={onEnd}
              disabled={!canEnd}
              aria-keyshortcuts="e"
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

const ConceptPanel = memo(function ConceptPanel({ concepts }: { concepts: Concept[] }) {
  const masteredCount = concepts.filter((c) => c.strength === "mastered").length;
  const allMastered = concepts.length > 0 && masteredCount === concepts.length;
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[12px] font-medium tracking-tight text-[var(--fg)]">
          Concept tracker
        </div>
        <div
          className="text-[10px] uppercase tracking-wider"
          style={{ color: allMastered ? "var(--accent)" : "var(--fg-dim)" }}
        >
          {masteredCount > 0
            ? `${masteredCount} / ${concepts.length} mastered`
            : `${concepts.length} concepts`}
        </div>
      </div>
      <ul className="flex flex-col gap-3" aria-label="Concept tracker">
        {concepts.map((c, idx) => (
          <li key={c.id} className="flex flex-col gap-1.5 fade-up" style={{ animationDelay: `${idx * 55}ms` }}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] tracking-tight truncate">{c.name}</span>
              <span
                key={c.strength}
                className="text-[10px] uppercase tracking-wider font-medium pop-in"
                style={{ color: STRENGTH_COLOR[c.strength] }}
                title={STRENGTH_DESC[c.strength]}
              >
                {c.strength}
              </span>
            </div>
            <div
              className="bar-track"
              role="progressbar"
              aria-label={`${c.name} mastery`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={STRENGTH_PCT[c.strength]}
              aria-valuetext={STRENGTH_DESC[c.strength]}
            >
              <div
                className="bar-fill"
                style={{
                  width: `${STRENGTH_PCT[c.strength]}%`,
                  background: STRENGTH_COLOR[c.strength],
                }}
              />
            </div>
            {c.attempts > 0 && (
              <div className="text-[10px] text-[var(--fg-dim)]">
                drilled {c.attempts}×
              </div>
            )}
          </li>
        ))}
      </ul>
      {allMastered && (
        <p className="mt-3 pt-3 border-t border-[var(--line-soft)] text-[11px] text-[var(--accent)] text-center leading-snug fade-up">
          All {concepts.length} concept{concepts.length !== 1 ? "s" : ""} mastered — no gaps left on this topic.
        </p>
      )}
    </div>
  );
});

const SCORE_BG: Record<0 | 1 | 2 | 3, string> = {
  0: "var(--bad)",
  1: "var(--warn)",
  2: "var(--good)",
  3: "var(--accent)",
};

const TONE_BY_SCORE: Record<0 | 1 | 2 | 3, { label: string; color: string; encourager: string }> = {
  3: { label: "Nailed it", color: "var(--good)", encourager: "That's mastery. Keep the bar this high." },
  2: { label: "Solid", color: "var(--good)", encourager: "Strong. Tighten the gaps below to push to 3/3." },
  1: { label: "Partial", color: "var(--warn)", encourager: "You're on the path. The gaps are the lesson." },
  0: { label: "Off the mark", color: "var(--bad)", encourager: "This is the start, not the end. Re-explain after seeing the gaps." },
};

const EvalCard = memo(function EvalCard({ evaluation }: { evaluation: Evaluation }) {
  const score = (Math.max(0, Math.min(3, evaluation.score)) as 0 | 1 | 2 | 3);
  const tone = TONE_BY_SCORE[score];
  const [barW, setBarW] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setBarW(Math.round((score / 3) * 100)));
    return () => cancelAnimationFrame(id);
  }, [score]);

  return (
    <div className="card p-4 fade-up">
      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <span
          className="text-[11px] uppercase tracking-wider font-semibold"
          style={{ color: tone.color }}
        >
          {tone.label} · {evaluation.score}/3
        </span>
        <span className="text-[11px] text-[var(--fg-muted)] italic">
          {tone.encourager}
        </span>
      </div>
      <div
        className="bar-track mb-3"
        role="meter"
        aria-label={`Score ${evaluation.score} out of 3`}
        aria-valuenow={evaluation.score}
        aria-valuemin={0}
        aria-valuemax={3}
      >
        <div className="bar-fill" style={{ width: `${barW}%`, background: tone.color }} />
      </div>
      <div className="text-[14px] tracking-tight mb-3 text-[var(--fg)]">
        <Tex text={evaluation.verdict} />
      </div>
      {evaluation.strengths.length > 0 && (
        <Block label="What you got" items={evaluation.strengths} color="var(--good)" />
      )}
      {evaluation.gaps.length > 0 && (
        <Block label="Still missing" items={evaluation.gaps} color="var(--bad)" />
      )}
    </div>
  );
});

const Block = memo(function Block({
  label,
  items,
  color,
}: {
  label: string;
  items: string[];
  color: string;
}) {
  return (
    <div className="mt-2">
      <div className="text-[10px] uppercase tracking-wider text-[var(--fg-dim)] mb-1">
        {label}
      </div>
      <ul className="flex flex-col gap-1">
        {items.map((it, i) => (
          <li
            key={i}
            className="text-[12.5px] text-[var(--fg-muted)] leading-relaxed flex gap-2 item-in"
            style={{ animationDelay: `${100 + i * 55}ms` }}
          >
            <span style={{ color }}>•</span>
            <span><Tex text={it} /></span>
          </li>
        ))}
      </ul>
    </div>
  );
});

const DiffDots = memo(function DiffDots({ level }: { level: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`Difficulty ${level} of 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          aria-hidden="true"
          className="w-1 h-1 rounded-full"
          style={{
            background: n <= level ? "var(--accent)" : "var(--line)",
          }}
        />
      ))}
    </span>
  );
});

function ReportView({
  report,
  topic,
  rounds,
  concepts,
  modeId,
  onNew,
  onReDrill,
  endedAt,
}: {
  report: ReportData;
  topic: string;
  rounds: Round[];
  concepts: Concept[];
  modeId: string;
  onNew: () => void;
  onReDrill: (concept: string) => void;
  endedAt?: number;
}) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedJournal, setCopiedJournal] = useState(false);
  const [showRounds, setShowRounds] = useState(false);

  const evald = useMemo(() => rounds.filter((r) => r.evaluation), [rounds]);
  const avg = useMemo(
    () =>
      evald.length > 0
        ? evald.reduce((s, r) => s + (r.evaluation?.score ?? 0), 0) / evald.length
        : 0,
    [evald]
  );
  const totalMins = useMemo(
    () => report.studyPlan.reduce((s, p) => s + p.minutes, 0),
    [report.studyPlan]
  );
  const reDrillTarget = report.weak[0] ?? report.shaky[0] ?? null;
  const reDrillDisplay = reDrillTarget && reDrillTarget.length > 28
    ? reDrillTarget.slice(0, 28) + "…"
    : reDrillTarget;
  const durationMin = endedAt && rounds[0]?.createdAt
    ? Math.max(1, Math.round((endedAt - rounds[0].createdAt) / 60000))
    : null;

  function downloadMd() {
    const lines: string[] = [];
    lines.push(`# Cogniloop session — ${topic || "untitled"}`);
    lines.push("");
    lines.push(`**Headline:** ${report.headline}`);
    lines.push(`**Mode:** ${getMode(modeId).name} · **Avg score:** ${avg.toFixed(2)} / 3${durationMin ? ` · **Duration:** ${durationMin} min` : ""}`);
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
        if (r.evaluation.strengths.length > 0) {
          lines.push("**Strengths:**");
          r.evaluation.strengths.forEach((s) => lines.push(`- ${s}`));
        }
        if (r.evaluation.gaps.length > 0) {
          lines.push("**Gaps:**");
          r.evaluation.gaps.forEach((g) => lines.push(`- ${g}`));
        }
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

  const reportKbdRef = useRef({ downloadMd, makeShareUrl, onReDrill, reDrillTarget });
  reportKbdRef.current = { downloadMd, makeShareUrl, onReDrill, reDrillTarget };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isInTextField(e.target)) return;
      const k = e.key.toLowerCase();
      const { downloadMd, makeShareUrl, onReDrill, reDrillTarget } = reportKbdRef.current;
      if (k === "d") downloadMd();
      else if (k === "r" && reDrillTarget) onReDrill(reDrillTarget);
      else if (k === "s") makeShareUrl();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function copyJournal() {
    navigator.clipboard.writeText(report.feynmanPrompt).catch(() => {});
    setCopiedJournal(true);
    setTimeout(() => setCopiedJournal(false), 2000);
  }

  function makeShareUrl() {
    const token = encodeShare({
      v: 1,
      topic,
      modeId,
      concepts,
      rounds,
    });
    const url = `${window.location.origin}/shared/${token}`;
    setShareUrl(url);
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex-1 max-w-[800px] w-full mx-auto px-6 py-10">
      <div className="fade-up">
        <div className="tag mb-4">Coaching report</div>
        <h2 className="text-3xl font-semibold tracking-tight leading-tight">
          {report.headline}
        </h2>
        <div className="text-[var(--fg-muted)] text-sm mt-2">
          {topic ? `${topic} · ` : ""}
          {rounds.length} rounds{durationMin ? ` · ${durationMin} min` : ""} · avg {avg.toFixed(2)}/3 · {getMode(modeId).name} mode
        </div>

        {evald.length > 1 && (
          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            <span className="text-[10px] text-[var(--fg-dim)] uppercase tracking-wider mr-0.5">
              Score trend
            </span>
            {evald.map((r, i) => {
              const sc = Math.max(0, Math.min(3, r.evaluation!.score)) as 0 | 1 | 2 | 3;
              return (
                <span
                  key={i}
                  className="w-[22px] h-[22px] rounded flex items-center justify-center text-[10px] font-bold leading-none"
                  style={{ background: SCORE_BG[sc], color: "var(--bg)" }}
                  title={`Round ${r.id}: ${sc}/3 — ${r.evaluation!.verdict.slice(0, 80)}`}
                  aria-label={`Round ${r.id} score: ${sc} out of 3`}
                >
                  {sc}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 fade-up" style={{ animationDelay: "80ms" }}>
          <BucketCard label="Mastered" items={report.mastered} color="var(--accent)" emptyMsg="None yet — keep drilling." />
          <BucketCard label="Shaky" items={report.shaky} color="var(--warn)" emptyMsg="None flagged." />
          <BucketCard label="Weak" items={report.weak} color="var(--bad)" emptyMsg="None — solid session." />
        </div>

        <div className="card p-5 mt-6 fade-up" style={{ animationDelay: "160ms" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-[12px] uppercase tracking-wider text-[var(--fg-dim)]">
              Study plan
            </div>
            {totalMins > 0 && (
              <div className="text-[11px] text-[var(--fg-dim)]">
                {report.studyPlan.length} topic{report.studyPlan.length !== 1 ? "s" : ""} · {totalMins} min
              </div>
            )}
          </div>
          {report.studyPlan.length === 0 ? (
            <p className="text-[13px] text-[var(--fg-dim)] italic leading-relaxed">
              Nothing to revisit — all concepts held up under pressure.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {report.studyPlan.map((s, i) => (
                <li key={i} className="flex gap-3 item-in" style={{ animationDelay: `${i * 70}ms` }}>
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
          )}
        </div>

        <div className="card p-5 mt-4 fade-up" style={{ animationDelay: "240ms" }}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[12px] uppercase tracking-wider text-[var(--fg-dim)]">
              Feynman journal (5 min)
            </div>
            <button
              onClick={copyJournal}
              aria-label="Copy Feynman journal prompt to clipboard"
              className="text-[11px] text-[var(--fg-dim)] hover:text-[var(--fg)] transition-colors px-2 py-0.5 rounded hover:bg-[var(--bg-soft)]"
            >
              {copiedJournal ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <div className="text-[14px] leading-relaxed italic text-[var(--fg)]">
            &quot;{report.feynmanPrompt}&quot;
          </div>
        </div>

        <div className="flex gap-3 mt-8 flex-wrap fade-up" style={{ animationDelay: "300ms" }}>
          <button onClick={onNew} aria-keyshortcuts="n" className="btn-primary px-5 py-2.5 rounded-lg text-sm">
            New session
          </button>
          {reDrillTarget && (
            <button
              onClick={() => onReDrill(reDrillTarget)}
              aria-keyshortcuts="r"
              className="btn-ghost px-5 py-2.5 rounded-lg text-sm"
              title={`Re-drill "${reDrillTarget}" in a focused session (press R)`}
            >
              Re-drill &ldquo;{reDrillDisplay}&rdquo;
            </button>
          )}
          <button onClick={downloadMd} aria-keyshortcuts="d" className="btn-ghost px-5 py-2.5 rounded-lg text-sm">
            Export markdown
          </button>
          <button
            onClick={makeShareUrl}
            aria-keyshortcuts="s"
            title="Copy share link (press S)"
            className="btn-ghost px-5 py-2.5 rounded-lg text-sm"
          >
            {copied ? "Link copied ✓" : "Copy share link"}
          </button>
        </div>
        {shareUrl && (
          <a
            href={shareUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block text-[11px] text-[var(--fg-dim)] hover:text-[var(--fg)] break-all font-mono transition-colors"
          >
            {shareUrl}
          </a>
        )}

        <div className="mt-6 border-t border-[var(--line-soft)] pt-4">
          <button
            onClick={() => setShowRounds((v) => !v)}
            className="text-[11px] text-[var(--fg-dim)] hover:text-[var(--fg)] transition-colors flex items-center gap-1"
            aria-expanded={showRounds}
          >
            <span>{showRounds ? "▲" : "▼"}</span>
            <span>Review all {rounds.length} round{rounds.length !== 1 ? "s" : ""}</span>
          </button>
          {showRounds && (
            <div className="mt-4 flex flex-col gap-3">
              {rounds.map((r, i) => {
                const sc = r.evaluation
                  ? (Math.max(0, Math.min(3, r.evaluation.score)) as 0 | 1 | 2 | 3)
                  : null;
                return (
                  <div key={r.id} className="card p-4 item-in" style={{ animationDelay: `${i * 40}ms` }}>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="tag">Round {r.id}</span>
                      <span className="tag">
                        {r.questionType.charAt(0).toUpperCase() + r.questionType.slice(1)}
                      </span>
                      <span className="tag"><DiffDots level={r.difficulty} /></span>
                      {sc !== null && (
                        <span
                          className="text-[11px] font-semibold ml-auto"
                          style={{ color: SCORE_BG[sc] }}
                        >
                          {sc}/3
                        </span>
                      )}
                    </div>
                    <div className="text-[13px] leading-relaxed text-[var(--fg)] mb-2">
                      <Tex text={r.question} />
                    </div>
                    {r.answer && (
                      <div className="text-[12px] text-[var(--fg-muted)] leading-relaxed border-l-2 border-[var(--line)] pl-3 mt-1">
                        <Tex text={r.answer} />
                      </div>
                    )}
                    {r.evaluation?.verdict && (
                      <div className="text-[11px] text-[var(--fg-dim)] mt-2 italic">
                        <Tex text={r.evaluation.verdict} />
                      </div>
                    )}
                    {r.evaluation?.strengths && r.evaluation.strengths.length > 0 && (
                      <Block label="What you got" items={r.evaluation.strengths} color="var(--good)" />
                    )}
                    {r.evaluation?.gaps && r.evaluation.gaps.length > 0 && (
                      <Block label="Still missing" items={r.evaluation.gaps} color="var(--bad)" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
    </div>
  );
}

const BucketCard = memo(function BucketCard({
  label,
  items,
  color,
  emptyMsg = "—",
}: {
  label: string;
  items: string[];
  color: string;
  emptyMsg?: string;
}) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
        <span className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)]">
          {label}
        </span>
        {items.length > 0 && (
          <span className="text-[11px] text-[var(--fg-dim)] ml-auto">
            {items.length}
          </span>
        )}
      </div>
      {items.length === 0 ? (
        <div className="text-[12px] text-[var(--fg-dim)] italic">{emptyMsg}</div>
      ) : (
        <ul className="flex flex-col gap-1">
          {items.map((it, i) => (
            <li key={i} className="text-[13px] tracking-tight item-in" style={{ animationDelay: `${i * 55}ms` }}>
              <Tex text={it} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
