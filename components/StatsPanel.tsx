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

  if (!streak || !stats) {
    if (compact) return null;
    return (
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5" aria-busy="true" aria-label="Loading stats">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="card px-3 py-2.5">
            <div className="skeleton h-[10px] w-10 rounded mb-2" />
            <div className="skeleton h-[22px] w-8 rounded" />
          </div>
        ))}
      </div>
    );
  }
  if (stats.totalSessions === 0 && streak.current === 0) {
    if (compact) return null;
    return (
      <div className="card px-4 py-3 text-center">
        <div className="text-[12px] text-[var(--fg-muted)] leading-relaxed">
          Streak, rounds drilled, and mastered concepts appear here — finish your first session to start tracking.
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? "flex flex-wrap gap-2" : "grid grid-cols-2 sm:grid-cols-5 gap-2.5"}>
      <Stat label="Streak" value={`${streak.current}d`} hint={`Best ${streak.longest}d`} index={0} />
      <Stat label="Sessions" value={stats.totalSessions.toString()} index={1} />
      <Stat label="Rounds" value={stats.totalRounds.toString()} index={2} />
      <Stat label="Mastered" value={stats.totalMastered.toString()} hint="concepts" index={3} />
      <Stat
        label="Avg score"
        value={stats.totalSessions > 0 ? stats.avgScore.toFixed(2) : "—"}
        hint="of 3"
        index={4}
      />
    </div>
  );
}

function useCountUp(value: string, delay = 0): string {
  const initDisplayed = (): string => {
    const n = parseInt(value, 10);
    return !isNaN(n) && value === String(n) && n > 0 ? "0" : value;
  };
  const [displayed, setDisplayed] = useState<string>(initDisplayed);

  useEffect(() => {
    const num = parseInt(value, 10);
    const isInt = !isNaN(num) && value === String(num) && num > 0;
    if (!isInt || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(value);
      return;
    }
    const duration = Math.min(900, Math.max(350, num * 12));
    const startTime = performance.now() + delay;
    let raf: number;
    function tick(now: number) {
      if (now < startTime) { raf = requestAnimationFrame(tick); return; }
      const t = Math.min((now - startTime) / duration, 1);
      setDisplayed(String(Math.round((1 - (1 - t) ** 2) * num)));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, delay]);

  return displayed;
}

function Stat({ label, value, hint, index = 0 }: { label: string; value: string; hint?: string; index?: number }) {
  const displayed = useCountUp(value, index * 55);
  return (
    <div className="card px-3 py-2.5 fade-up" style={{ animationDelay: `${index * 55}ms` }}>
      <div className="text-[10px] uppercase tracking-wider text-[var(--fg-dim)]">
        {label}
      </div>
      <div className="text-[18px] font-semibold tracking-tight mt-0.5">{displayed}</div>
      {hint && <div className="text-[10px] text-[var(--fg-dim)] mt-0.5">{hint}</div>}
    </div>
  );
}
