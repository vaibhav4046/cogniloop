"use client";

import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import {
  getSettings,
  setSettings,
  clearSettings,
  type UserSettings,
} from "@/lib/settings";

const VOICE_LANGS = [
  { v: "en-US", l: "English (US)" },
  { v: "en-GB", l: "English (UK)" },
  { v: "en-IN", l: "English (India)" },
  { v: "hi-IN", l: "हिन्दी (India)" },
  { v: "es-ES", l: "Español (Spain)" },
  { v: "fr-FR", l: "Français" },
  { v: "de-DE", l: "Deutsch" },
  { v: "ja-JP", l: "日本語" },
  { v: "zh-CN", l: "中文 (普通话)" },
];

export function SettingsView() {
  const [s, setS] = useState<UserSettings | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [keyTest, setKeyTest] = useState<{ status: "idle" | "testing" | "ok" | "err"; msg?: string }>({ status: "idle" });
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setS(getSettings());
  }, []);

  function update<K extends keyof UserSettings>(k: K, v: UserSettings[K]) {
    if (!s) return;
    const next = setSettings({ [k]: v });
    setS(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  async function testGroqKey() {
    if (!s?.groqKey?.trim()) {
      setKeyTest({ status: "err", msg: "Enter a key first" });
      return;
    }
    setKeyTest({ status: "testing" });
    try {
      const res = await fetch("https://api.groq.com/openai/v1/models", {
        headers: { Authorization: `Bearer ${s.groqKey.trim()}` },
      });
      if (res.ok) {
        const data = await res.json();
        const count = Array.isArray(data?.data) ? data.data.length : 0;
        setKeyTest({ status: "ok", msg: `Valid · ${count} models available` });
      } else if (res.status === 401) {
        setKeyTest({ status: "err", msg: "Invalid key — copy the full key from console.groq.com/keys" });
      } else {
        setKeyTest({ status: "err", msg: `Groq returned HTTP ${res.status} — try again in a moment` });
      }
    } catch (e) {
      setKeyTest({ status: "err", msg: e instanceof Error ? e.message : "Can't reach Groq — check your internet connection" });
    }
  }

  function clearAll() {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 4000);
      return;
    }
    clearSettings();
    setS(getSettings());
    setKeyTest({ status: "idle" });
    setConfirmClear(false);
  }

  function testTts() {
    if (!s) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(
      "If you can hear this, your text-to-speech setup works."
    );
    u.lang = s.voiceLang ?? "en-US";
    u.rate = s.voiceRate ?? 1;
    u.pitch = s.voicePitch ?? 1;
    synth.speak(u);
  }

  if (!s) {
    return (
      <main id="main" className="min-h-screen flex flex-col">
        <NavBar />
        <section className="flex-1 max-w-[760px] w-full mx-auto px-6 py-8">
          <div className="skeleton h-[22px] w-20 mb-4 rounded-full" />
          <div className="skeleton h-[36px] w-2/3 mb-3" />
          <div className="skeleton h-[13px] w-full max-w-[440px]" />
          <div className="skeleton h-[15px] w-44 mt-10 mb-3" />
          <div className="skeleton h-[180px] w-full rounded-xl" />
          <div className="skeleton h-[15px] w-36 mt-8 mb-3" />
          <div className="skeleton h-[140px] w-full rounded-xl" />
          <div className="skeleton h-[15px] w-20 mt-8 mb-3" />
          <div className="skeleton h-[72px] w-full rounded-xl" />
        </section>
      </main>
    );
  }

  const voiceSupported =
    typeof window !== "undefined" &&
    !!(
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .webkitSpeechRecognition
    );
  const ttsSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  return (
    <main id="main" className="min-h-screen flex flex-col">
      <NavBar />
      <section className="flex-1 max-w-[760px] w-full mx-auto px-6 py-8 fade-up">
        <span className="tag mb-4">Settings</span>
        <h1 className="text-3xl font-semibold tracking-tight">
          Make Cogniloop yours.
        </h1>
        <p className="text-[var(--fg-muted)] text-sm mt-2 leading-relaxed max-w-[560px]">
          No account, no cloud. Your API key lives only in your browser. Paste a free Groq key for sharper, faster questions — or start drilling right now with zero setup on Pollinations.
        </p>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`fixed top-20 right-6 text-[12px] tag transition-opacity duration-200 pointer-events-none${saved ? "" : " opacity-0"}`}
          style={{ color: "var(--good)" }}
        >
          {saved ? "Saved ✓" : ""}
        </div>

        <h2 className="text-[15px] font-medium tracking-tight mt-10 mb-3">
          Bring your own API key
        </h2>
        <div className="card p-5">
          <label htmlFor="groq-key" className="block text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-2">
            Groq API key (free at console.groq.com)
          </label>
          <div className="field px-4 py-2.5 flex items-center gap-2">
            <input
              id="groq-key"
              type={showKey ? "text" : "password"}
              value={s.groqKey ?? ""}
              onChange={(e) => update("groqKey", e.target.value)}
              placeholder="gsk_…"
              autoComplete="off"
              spellCheck={false}
              className="flex-1 bg-transparent outline-none text-[14px] font-mono placeholder:text-[var(--fg-dim)]"
            />
            <button
              onClick={() => setShowKey((v) => !v)}
              aria-label={showKey ? "Hide Groq API key" : "Show Groq API key"}
              aria-controls="groq-key"
              className="text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg)]"
            >
              {showKey ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <button onClick={testGroqKey} className="btn-ghost text-xs px-3 py-1.5 rounded-md">
              {keyTest.status === "testing" ? "Testing…" : "Test key"}
            </button>
            <span aria-live="polite" aria-atomic="true">
              {keyTest.status === "ok" && (
                <span className="text-[12px]" style={{ color: "var(--good)" }}>
                  ✓ {keyTest.msg}
                </span>
              )}
              {keyTest.status === "err" && (
                <span className="text-[12px]" style={{ color: "var(--bad)" }}>
                  ✗ {keyTest.msg}
                </span>
              )}
            </span>
          </div>

          <div className="text-[11.5px] text-[var(--fg-muted)] leading-relaxed mt-4">
            <strong className="text-[var(--fg)]">How to get a key (free, 60 sec):</strong>
            <ol className="list-decimal list-inside mt-1.5 flex flex-col gap-1">
              <li>Visit{" "}
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-[var(--fg)]"
                >
                  console.groq.com/keys
                </a>
              </li>
              <li>Sign in (Google/GitHub OAuth, no card required)</li>
              <li>Create a key, copy, paste above</li>
              <li>Click <em>Test key</em> to verify</li>
            </ol>
          </div>

          <div className="mt-5 pt-4 border-t border-[var(--line-soft)]">
            <div id="provider-pref-label" className="block text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-2">
              Provider preference
            </div>
            <div role="radiogroup" aria-labelledby="provider-pref-label" className="flex gap-2 flex-wrap">
              {([
                { id: "auto", label: "Auto", hint: "Groq → Pollinations fallback" },
                { id: "groq", label: "Groq only", hint: "Higher quality, requires key" },
                { id: "pollinations", label: "Pollinations only", hint: "Free, no key" },
              ] as const).map((p) => {
                const active = (s.preferredProvider ?? "auto") === p.id;
                return (
                  <button
                    key={p.id}
                    role="radio"
                    aria-checked={active}
                    onClick={() => update("preferredProvider", p.id)}
                    className={`px-3 py-2 rounded-lg text-[12.5px] text-left border transition-all ${
                      active
                        ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--fg)]"
                        : "border-[var(--line)] bg-[var(--bg-soft)] text-[var(--fg-muted)] hover:text-[var(--fg)]"
                    }`}
                  >
                    <div className="font-medium">{p.label}</div>
                    <div className="text-[11px] text-[var(--fg-muted)] mt-0.5">{p.hint}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <h2 className="text-[15px] font-medium tracking-tight mt-8 mb-3">
          Voice + read-aloud
        </h2>
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="tag" style={{ color: voiceSupported ? "var(--good)" : "var(--bad)" }}>
              Mic {voiceSupported ? "ready" : "unavailable — Chrome/Edge only"}
            </span>
            <span className="tag" style={{ color: ttsSupported ? "var(--good)" : "var(--bad)" }}>
              Read-aloud {ttsSupported ? "ready" : "unavailable"}
            </span>
          </div>

          <label htmlFor="voice-lang" className="block text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-2">
            Language
          </label>
          <div className="field px-3 py-2">
            <select
              id="voice-lang"
              value={s.voiceLang ?? "en-US"}
              onChange={(e) => update("voiceLang", e.target.value)}
              className="w-full bg-transparent outline-none text-[14px]"
            >
              {VOICE_LANGS.map((l) => (
                <option key={l.v} value={l.v} style={{ background: "var(--bg-soft)" }}>
                  {l.l}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="voice-rate" className="block text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-2">
                Read-aloud rate ({(s.voiceRate ?? 1).toFixed(2)}×)
              </label>
              <input
                id="voice-rate"
                type="range"
                min={0.5}
                max={2}
                step={0.05}
                value={s.voiceRate ?? 1}
                onChange={(e) => update("voiceRate", Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
            </div>
            <div>
              <label htmlFor="voice-pitch" className="block text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-2">
                Pitch ({(s.voicePitch ?? 1).toFixed(2)})
              </label>
              <input
                id="voice-pitch"
                type="range"
                min={0.5}
                max={2}
                step={0.05}
                value={s.voicePitch ?? 1}
                onChange={(e) => update("voicePitch", Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 mt-4 text-[13px] text-[var(--fg)] cursor-pointer">
            <input
              type="checkbox"
              checked={!!s.ttsAuto}
              onChange={(e) => update("ttsAuto", e.target.checked)}
              className="accent-[var(--accent)]"
            />
            Auto-read each new question aloud
          </label>

          <button onClick={testTts} className="btn-ghost mt-4 px-4 py-2 rounded-lg text-xs">
            🔊 Test read-aloud
          </button>
        </div>

        <h2 className="text-[15px] font-medium tracking-tight mt-8 mb-3">
          Reset
        </h2>
        <div className="card p-5 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="text-[14px] tracking-tight font-medium">Clear all settings</div>
            <div className="text-[12px] text-[var(--fg-muted)] mt-1">
              Removes your saved API key and voice preferences. Sessions/history untouched.
            </div>
          </div>
          <button
            onClick={clearAll}
            className={`btn-ghost text-xs px-4 py-2 rounded-md !border-[var(--bad)] !text-[var(--bad)]${confirmClear ? " opacity-100" : ""}`}
          >
            {confirmClear ? "Click again to confirm" : "Clear settings"}
          </button>
        </div>
      </section>
      <footer className="px-6 sm:px-10 py-6 text-[11px] text-[var(--fg-dim)] border-t border-[var(--line-soft)]">
        Your key, your device. Nothing leaves your browser except the topic you drill.
      </footer>
    </main>
  );
}
