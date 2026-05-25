import type { Concept, Round } from "./types";

const HISTORY_KEY = "cl:history";
const STREAK_KEY = "cl:streak";

export interface SessionRecord {
  id: string;
  topic: string;
  modeId: string;
  curriculumId?: string;
  concepts: Concept[];
  rounds: Round[];
  createdAt: number;
  endedAt?: number;
  avgScore: number;
  mastered: number;
}

export interface StreakData {
  current: number;
  longest: number;
  lastActiveDay: string;
  daysActive: string[];
}

export function dayKey(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getHistory(): SessionRecord[] {
  if (typeof window === "undefined") return [];
  return safeParse<SessionRecord[]>(localStorage.getItem(HISTORY_KEY), []);
}

export function pushHistory(rec: SessionRecord) {
  if (typeof window === "undefined") return;
  const list = getHistory();
  list.unshift(rec);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 100)));
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

export function getStreak(): StreakData {
  if (typeof window === "undefined") {
    return { current: 0, longest: 0, lastActiveDay: "", daysActive: [] };
  }
  return safeParse<StreakData>(localStorage.getItem(STREAK_KEY), {
    current: 0,
    longest: 0,
    lastActiveDay: "",
    daysActive: [],
  });
}

export function bumpStreak(): StreakData {
  if (typeof window === "undefined") {
    return { current: 0, longest: 0, lastActiveDay: "", daysActive: [] };
  }
  const today = dayKey(Date.now());
  const data = getStreak();

  if (data.lastActiveDay === today) {
    return data;
  }

  const yesterday = dayKey(Date.now() - 24 * 60 * 60 * 1000);
  const consecutive = data.lastActiveDay === yesterday;
  const next: StreakData = {
    current: consecutive ? data.current + 1 : 1,
    longest: Math.max(data.longest, consecutive ? data.current + 1 : 1),
    lastActiveDay: today,
    daysActive: data.daysActive.includes(today)
      ? data.daysActive
      : [...data.daysActive.slice(-89), today],
  };
  localStorage.setItem(STREAK_KEY, JSON.stringify(next));
  return next;
}

export function lifetimeStats() {
  const history = getHistory();
  const totalSessions = history.length;
  const totalRounds = history.reduce((s, r) => s + r.rounds.length, 0);
  const totalMastered = history.reduce((s, r) => s + r.mastered, 0);
  const avgScore =
    history.length > 0
      ? history.reduce((s, r) => s + r.avgScore, 0) / history.length
      : 0;
  return { totalSessions, totalRounds, totalMastered, avgScore };
}
