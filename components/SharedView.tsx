"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decodeShare, type SharePayload } from "@/lib/share";
import { NavBar } from "./NavBar";
import { Tex } from "./Math";

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
      setErr("This share link couldn't be decoded.");
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
        <div className="flex-1 flex items-center justify-center px-6 fade-up">
          <div className="card p-6 max-w-md text-center">
            <div className="text-[var(--bad)] text-sm font-medium">
              {err}
            </div>
            <button
              onClick={() => router.push("/")}
              className="btn-primary mt-4 px-4 py-2 rounded-lg text-sm"
            >
              Home
            </button>
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

  return (
    <main id="main" className="min-h-screen flex flex-col">
      <NavBar />
      <section className="flex-1 max-w-[800px] w-full mx-auto px-6 py-8 fade-up">
        <span className="tag mb-4">Shared session (read-only)</span>
        <h1 className="text-3xl font-semibold tracking-tight">
          {payload.topic || "Untitled session"}
        </h1>
        <p className="text-[var(--fg-muted)] text-sm mt-2">
          {payload.rounds.length} rounds · mode: {payload.modeId} · {payload.concepts.length} concepts
        </p>

        <button
          onClick={startCopy}
          className="btn-primary mt-5 px-5 py-2.5 rounded-lg text-sm"
        >
          Try this topic yourself  →
        </button>

        <h2 className="text-[15px] font-medium tracking-tight mt-10 mb-3">
          Concepts
        </h2>
        <div className="flex flex-wrap gap-2">
          {payload.concepts.map((c) => (
            <span
              key={c.id}
              className="tag"
              style={{
                color:
                  c.strength === "mastered"
                    ? "var(--accent)"
                    : c.strength === "solid"
                    ? "var(--good)"
                    : c.strength === "shaky"
                    ? "var(--warn)"
                    : "var(--bad)",
              }}
            >
              {c.name} · {c.strength}
            </span>
          ))}
        </div>

        <h2 className="text-[15px] font-medium tracking-tight mt-8 mb-3">
          Rounds
        </h2>
        <div className="flex flex-col gap-3">
          {payload.rounds.map((r) => (
            <article key={r.id} className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="tag">Round {r.id}</span>
                <span className="tag">{r.questionType}</span>
                <span className="tag">diff {r.difficulty}</span>
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
              )}
            </article>
          ))}
        </div>
      </section>
      <footer className="px-6 sm:px-10 py-6 text-[11px] text-[var(--fg-dim)] border-t border-[var(--line-soft)]">
        Shared via URL-encoded payload. No backend, no logs.
      </footer>
    </main>
  );
}
