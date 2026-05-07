"use client";

import { useEffect, useState } from "react";
import { getStreak, lifetimeStats, type StreakData } from "@/lib/storage";

export function StatsPanel({ compact }: { compact?: boolean }) {
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [stats, setStats] = useState<ReturnType<typeof lifetimeStats> | null>(null);

  useEffect(() => {
    setStreak(getStreak());
    setStats(lifetimeStats());
  }, []);

  if (!streak || !stats) return null;
  if (stats.totalSessions === 0 && streak.current === 0) return null;

  return (
    <div className={compact ? "flex flex-wrap gap-2" : "grid grid-cols-2 sm:grid-cols-5 gap-2.5"}>
      <Stat label="Streak" value={`${streak.current}d`} hint={`Best ${streak.longest}d`} />
      <Stat label="Sessions" value={stats.totalSessions.toString()} />
      <Stat label="Rounds" value={stats.totalRounds.toString()} />
      <Stat label="Mastered" value={stats.totalMastered.toString()} hint="concepts" />
      <Stat
        label="Avg score"
        value={stats.totalSessions > 0 ? stats.avgScore.toFixed(2) : "—"}
        hint="of 3"
      />
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="card px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-wider text-[var(--fg-dim)]">
        {label}
      </div>
      <div className="text-[18px] font-semibold tracking-tight mt-0.5">{value}</div>
      {hint && <div className="text-[10px] text-[var(--fg-dim)] mt-0.5">{hint}</div>}
    </div>
  );
}
