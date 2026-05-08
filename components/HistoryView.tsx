"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { NavBar } from "./NavBar";
import { StatsPanel } from "./StatsPanel";
import {
  getHistory,
  getStreak,
  clearHistory,
  type SessionRecord,
  type StreakData,
} from "@/lib/storage";
import { getMode } from "@/lib/modes";

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
  const [loaded, setLoaded] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [importErr, setImportErr] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRecords(getHistory());
    setStreak(getStreak());
    setLoaded(true);
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

  function exportAll() {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            v: 1,
            exportedAt: Date.now(),
            history: getHistory(),
            streak: getStreak(),
          },
          null,
          2
        ),
      ],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cogniloop-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function onImportClick() {
    setImportErr(null);
    fileRef.current?.click();
  }

  async function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (data?.v !== 1) throw new Error("Wrong file version");
      if (!Array.isArray(data.history)) throw new Error("Missing history");
      localStorage.setItem("cl:history", JSON.stringify(data.history));
      if (data.streak) localStorage.setItem("cl:streak", JSON.stringify(data.streak));
      setRecords(data.history);
      setStreak(data.streak ?? null);
    } catch (err) {
      setImportErr(err instanceof Error ? err.message : "Import failed");
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const days = useMemo(() => buildHeatmap(streak?.daysActive ?? []), [streak]);
  const q = useMemo(() => search.trim().toLowerCase(), [search]);
  const filtered = useMemo(
    () => (q ? records.filter((r) => r.topic.toLowerCase().includes(q)) : records),
    [records, q]
  );

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
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h2 className="text-[15px] font-medium tracking-tight">
              Sessions ({records.length}{q && filtered.length !== records.length ? ` · ${filtered.length} shown` : ""})
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              {records.length > 0 && (
                <input
                  type="search"
                  aria-label="Search sessions by topic"
                  placeholder="Search topics…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-xs px-3 py-1.5 rounded-md bg-[var(--bg-elev)] border border-[var(--line-soft)] text-[var(--fg)] placeholder:text-[var(--fg-dim)] focus:outline-none focus:border-[var(--accent)] transition-colors w-44"
                />
              )}
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={onImportFile}
              />
              <button
                onClick={onImportClick}
                className="btn-ghost text-xs px-3 py-1.5 rounded-md"
              >
                Import backup
              </button>
              {records.length > 0 && (
                <button onClick={exportAll} className="btn-ghost text-xs px-3 py-1.5 rounded-md">
                  Export backup
                </button>
              )}
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
          </div>
          {importErr && (
            <div className="text-[12px] text-[var(--bad)] mb-3">{importErr}</div>
          )}
          {!loaded ? (
            <div className="flex flex-col gap-2" aria-busy="true" aria-label="Loading sessions">
              {[0, 1, 2].map((i) => (
                <div key={i} className="card p-4">
                  <div className="skeleton h-[14px] w-2/3 mb-2.5" />
                  <div className="skeleton h-[11px] w-1/2" />
                </div>
              ))}
            </div>
          ) : records.length === 0 ? (
            <div className="card p-8 text-center">
              <div className="text-[34px] mb-3" aria-hidden>↻</div>
              <div className="text-[15px] font-medium tracking-tight mb-1">
                No sessions yet
              </div>
              <div className="text-[13px] text-[var(--fg-muted)] max-w-[420px] mx-auto leading-relaxed mb-5">
                Run your first loop. It takes ~3 minutes. The AI will extract the concepts, drill you on each, and ship a coaching report at the end.
              </div>
              <a
                href="/"
                className="btn-primary inline-block px-5 py-2.5 rounded-lg text-sm"
              >
                Start your first session →
              </a>
            </div>
          ) : filtered.length === 0 ? (
            <div className="card p-6 text-center">
              <div className="text-[14px] font-medium tracking-tight mb-1">No matching sessions</div>
              <div className="text-[12px] text-[var(--fg-muted)] mb-3">No sessions match &ldquo;{search}&rdquo;</div>
              <button onClick={() => setSearch("")} className="btn-ghost text-xs px-3 py-1.5 rounded-md">
                Clear search
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {filtered.map((r) => (
                <article key={r.id} className="card p-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <div className="text-[14px] font-medium tracking-tight truncate">
                        {r.topic || "(untitled)"}
                      </div>
                      <div className="text-[11px] text-[var(--fg-muted)] mt-1 flex items-center gap-2 flex-wrap">
                        <span>{fmtDate(r.createdAt)}</span>
                        <span>·</span>
                        <span>{getMode(r.modeId).name}</span>
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
