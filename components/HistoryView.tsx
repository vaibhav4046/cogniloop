"use client";

import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { StatsPanel } from "./StatsPanel";
import {
  getHistory,
  getStreak,
  clearHistory,
  type SessionRecord,
  type StreakData,
} from "@/lib/storage";

function fmtDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function dayKey(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function HistoryView() {
  const [records, setRecords] = useState<SessionRecord[]>([]);
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setRecords(getHistory());
    setStreak(getStreak());
  }, []);

  function onClear() {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 4000);
      return;
    }
    clearHistory();
    setRecords([]);
    setConfirmClear(false);
  }

  const days = buildHeatmap(streak?.daysActive ?? []);

  return (
    <main className="min-h-screen flex flex-col">
      <NavBar />
      <section className="flex-1 max-w-[920px] w-full mx-auto px-6 py-8 fade-up">
        <span className="tag mb-4">History</span>
        <h1 className="text-3xl font-semibold tracking-tight">
          Your loop, over time.
        </h1>
        <p className="text-[var(--fg-muted)] text-sm mt-2 leading-relaxed max-w-[560px]">
          Sessions, streaks, and concept progress live in your browser. Clear anytime.
        </p>

        <div className="mt-6">
          <StatsPanel />
        </div>

        <div className="card p-5 mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)]">
              Activity (last 90 days)
            </div>
            {streak && (
              <div className="text-[11px] text-[var(--fg-muted)]">
                Streak {streak.current}d · best {streak.longest}d
              </div>
            )}
          </div>
          <div className="grid grid-cols-[repeat(15,1fr)] gap-1">
            {days.map((d, i) => (
              <div
                key={i}
                className="aspect-square rounded-[3px]"
                title={d.key + (d.active ? " · active" : "")}
                style={{
                  background: d.active
                    ? "var(--accent)"
                    : "var(--bg-elev)",
                  opacity: d.active ? 0.85 : 1,
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-medium tracking-tight">
              Sessions ({records.length})
            </h2>
            {records.length > 0 && (
              <button
                onClick={onClear}
                className={`btn-ghost text-xs px-3 py-1.5 rounded-md ${
                  confirmClear ? "!border-[var(--bad)] !text-[var(--bad)]" : ""
                }`}
              >
                {confirmClear ? "Click again to confirm" : "Clear all"}
              </button>
            )}
          </div>
          {records.length === 0 ? (
            <div className="card p-6 text-center">
              <div className="text-[var(--fg-muted)] text-sm">
                No sessions yet. Start your first loop on the home page.
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {records.map((r) => (
                <article key={r.id} className="card p-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <div className="text-[14px] font-medium tracking-tight truncate">
                        {r.topic || "(untitled)"}
                      </div>
                      <div className="text-[11px] text-[var(--fg-muted)] mt-1 flex items-center gap-2 flex-wrap">
                        <span>{fmtDate(r.createdAt)}</span>
                        <span>·</span>
                        <span>Mode: {r.modeId}</span>
                        <span>·</span>
                        <span>{r.rounds.length} rounds</span>
                        <span>·</span>
                        <span>avg {r.avgScore.toFixed(2)}/3</span>
                        <span>·</span>
                        <span>{r.mastered} mastered</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ScoreBadge score={r.avgScore} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <footer className="px-6 sm:px-10 py-6 text-[11px] text-[var(--fg-dim)] border-t border-[var(--line-soft)]">
        100% client-side. Data lives in your browser only.
      </footer>
    </main>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 2.5 ? "var(--good)" : score >= 1.5 ? "var(--warn)" : "var(--bad)";
  return (
    <span
      className="text-[11px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md"
      style={{ color, border: `1px solid ${color}` }}
    >
      {score.toFixed(2)}
    </span>
  );
}

function buildHeatmap(daysActive: string[]) {
  const set = new Set(daysActive);
  const out: { key: string; active: boolean }[] = [];
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const key = dayKey(d.getTime());
    out.push({ key, active: set.has(key) });
  }
  return out;
}
