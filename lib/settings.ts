export interface UserSettings {
  groqKey?: string;
  voiceLang?: string;
  voiceRate?: number;
  voicePitch?: number;
  ttsAuto?: boolean;
  preferredProvider?: "auto" | "groq" | "pollinations";
}

const KEY = "cl:settings";

const DEFAULTS: UserSettings = {
  voiceLang: "en-US",
  voiceRate: 1.05,
  voicePitch: 1,
  ttsAuto: false,
  preferredProvider: "auto",
};

export function getSettings(): UserSettings {
  if (typeof window === "undefined") return { ...DEFAULTS };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...(JSON.parse(raw) as UserSettings) };
  } catch {
    return { ...DEFAULTS };
  }
}

export function setSettings(next: Partial<UserSettings>): UserSettings {
  if (typeof window === "undefined") return { ...DEFAULTS };
  const merged = { ...getSettings(), ...next };
  localStorage.setItem(KEY, JSON.stringify(merged));
  return merged;
}

export function clearSettings(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function authHeadersFor(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const s = getSettings();
  const headers: Record<string, string> = {};
  if (s.groqKey?.trim()) headers["x-cl-groq-key"] = s.groqKey.trim();
  if (s.preferredProvider && s.preferredProvider !== "auto") {
    headers["x-cl-provider"] = s.preferredProvider;
  }
  return headers;
}
