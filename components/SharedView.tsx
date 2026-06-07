"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { decodeShare, type SharePayload } from "@/lib/share";
import { getMode } from "@/lib/modes";
import { NavBar } from "./NavBar";
import { Tex } from "./Math";
import { QTYPE_DESC, STRENGTH_DESC, STRENGTH_COLOR } from "@/lib/labels";

interface Props {
  token: string;
}

export function SharedView({ token }: Props) {
  const router = useRouter();
  const [payload, setPayload] = useState<SharePayload | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const p = decodeShare(token);
    if (!p) {
      setErr("This link looks broken — it may have been cut off when shared. Ask for a fresh link from the original session.");
      return;
    }
    setPayload(p);
  }, [token]);

  function startCopy() {
    if (!payload) return;
    sessionStorage.setItem(
      "cl:pending",
      JSON.stringify({
        topic: payload.topic,
        notes: "",
        modeId: payload.modeId,
      })
    );
    router.push("/study");
  }

  if (err) {
    return (
      <main id="main" className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="card p-8 max-w-sm w-full text-center fade-up">
            <div className="text-[10px] uppercase tracking-widest text-[var(--fg-dim)] mb-3">
              Shared session
            </div>
            <h1 className="text-2xl font-semibold tracking-tight mb-3">
              Broken link
            </h1>
            <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed mb-6">
              {err}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <Link href="/" className="btn-primary px-5 py-2.5 rounded-lg text-sm w-full sm:w-auto">
                Begin the loop →
              </Link>
              <Link href="/templates" className="btn-ghost px-5 py-2.5 rounded-lg text-sm w-full sm:w-auto">
                Browse templates
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!payload) {
    return (
      <main id="main" className="min-h-screen flex flex-col">
        <NavBar />
        <section className="flex-1 max-w-[800px] w-full mx-auto px-6 py-8" aria-busy="true" aria-label="Loading shared session">
          <div className="skeleton h-[14px] w-20 mb-5 rounded" />
          <div className="skeleton h-[32px] w-2/3 mb-3" />
          <div className="skeleton h-[13px] w-1/3" />
          <div className="skeleton h-[38px] w-36 rounded-lg mt-5" />
          <div className="skeleton h-[14px] w-20 mt-10 mb-3" />
          <div className="flex gap-2">
            <div className="skeleton h-[24px] w-24 rounded-full" />
            <div className="skeleton h-[24px] w-20 rounded-full" />
            <div className="skeleton h-[24px] w-28 rounded-full" />
          </div>
          <div className="skeleton h-[14px] w-16 mt-8 mb-3" />
          <div className="flex flex-col gap-3">
            <div className="skeleton h-[88px] w-full" />
            <div className="skeleton h-[88px] w-full" />
            <div className="skeleton h-[88px] w-full" />
          </div>
        </section>
      </main>
    );
  }

  const evald = payload.rounds.filter((r) => r.evaluation !== undefined);
  const avgScore =
    evald.length > 0
      ? (evald.reduce((s, r) => s + (r.evaluation?.score ?? 0), 0) / evald.length).toFixed(2)
      : null;

  return (
    <main id="main" className="min-h-screen flex flex-col">
      <NavBar />
      <section className="flex-1 max-w-[800px] w-full mx-auto px-6 py-8 fade-up">
        <span className="tag mb-4">Shared session (read-only)</span>
        <h1 className="text-3xl font-semibold tracking-tight">
          {payload.topic || "Untitled session"}
        </h1>
        <p className="text-[var(--fg-muted)] text-sm mt-2">
          {payload.rounds.length} round{payload.rounds.length !== 1 ? "s" : ""} · {getMode(payload.modeId).name} mode{avgScore ? ` · avg ${avgScore}/3` : ""} · {payload.concepts.length} concept{payload.concepts.length !== 1 ? "s" : ""}
        </p>

        <button
          onClick={startCopy}
          className="btn-primary mt-5 px-5 py-2.5 rounded-lg text-sm"
        >
          Drill this topic yourself →
        </button>

        <h2 className="text-[15px] font-medium tracking-tight mt-10 mb-3">
          Concepts
        </h2>
        <div className="flex flex-wrap gap-2">
          {payload.concepts.map((c, i) => (
            <span
              key={c.id}
              className="tag item-in"
              title={STRENGTH_DESC[c.strength]}
              style={{ color: STRENGTH_COLOR[c.strength], animationDelay: `${Math.min(i, 12) * 40}ms` }}
            >
              {c.name} · {c.strength}
            </span>
          ))}
        </div>

        <h2 className="text-[15px] font-medium tracking-tight mt-8 mb-3">
          Rounds
        </h2>
        <div className="flex flex-col gap-3">
          {payload.rounds.map((r, i) => (
            <article key={r.id} className="card p-4 round-in" style={{ animationDelay: `${i * 65}ms` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="tag">Round {r.id}</span>
                <span className="tag" title={QTYPE_DESC[r.questionType]}>
                  {r.questionType.charAt(0).toUpperCase() + r.questionType.slice(1)}
                </span>
                <span className="tag" title={`Difficulty ${r.difficulty} / 5`}>
                  {"●".repeat(r.difficulty)}{"○".repeat(5 - r.difficulty)}
                </span>
              </div>
              <div className="text-[14.5px] font-medium tracking-tight">
                <Tex text={r.question} />
              </div>
              {r.answer && (
                <div className="mt-3 text-[13px] text-[var(--fg-muted)] leading-relaxed">
                  <span className="text-[var(--fg-dim)]">A: </span>
                  <Tex text={r.answer} />
                </div>
              )}
              {r.evaluation && (
                <>
                  <div className="mt-3 text-[12px] flex items-center gap-2">
                    <span className="text-[var(--fg-dim)]">Score</span>
                    <span
                      style={{
                        color:
                          r.evaluation.score >= 2
                            ? "var(--good)"
                            : r.evaluation.score === 1
                            ? "var(--warn)"
                            : "var(--bad)",
                      }}
                    >
                      {r.evaluation.score}/3
                    </span>
                    <span className="text-[var(--fg-muted)]">— {r.evaluation.verdict}</span>
                  </div>
                  {r.evaluation.strengths.length > 0 && (
                    <div className="mt-2">
                      <div className="text-[10px] uppercase tracking-wider text-[var(--fg-dim)] mb-1">What you got</div>
                      <ul className="flex flex-col gap-0.5" aria-label="What you got">
                        {r.evaluation.strengths.map((s, i) => (
                          <li key={i} className="text-[12px] text-[var(--fg-muted)] leading-relaxed flex gap-2">
                            <span style={{ color: "var(--good)" }} aria-hidden="true">•</span>
                            <span><Tex text={s} /></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {r.evaluation.gaps.length > 0 && (
                    <div className="mt-2">
                      <div className="text-[10px] uppercase tracking-wider text-[var(--fg-dim)] mb-1">Still missing</div>
                      <ul className="flex flex-col gap-0.5" aria-label="Still missing">
                        {r.evaluation.gaps.map((g, i) => (
                          <li key={i} className="text-[12px] text-[var(--fg-muted)] leading-relaxed flex gap-2">
                            <span style={{ color: "var(--bad)" }} aria-hidden="true">•</span>
                            <span><Tex text={g} /></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      </section>
      <footer className="px-6 sm:px-10 py-6 text-[11px] text-[var(--fg-dim)] border-t border-[var(--line-soft)]">
        Shared via URL — no backend, no accounts, no logs. Your session, your browser.
      </footer>
    </main>
  );
}
