"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: { results: ArrayLike<{ 0: { transcript: string }; isFinal?: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

export function VoiceInput({ onTranscript, disabled }: Props) {
  const [supported, setSupported] = useState(false);
  const [active, setActive] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const recRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (Ctor) setSupported(true);
  }, []);

  function toggle() {
    if (!supported || disabled) return;
    if (active) {
      recRef.current?.stop();
      return;
    }
    setErr(null);
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) return;
    const rec = new Ctor();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    let finalTranscript = "";
    rec.onresult = (e) => {
      let interim = "";
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalTranscript += r[0].transcript;
        else interim += r[0].transcript;
      }
      onTranscript(finalTranscript + interim);
    };
    rec.onerror = (e) => {
      setErr(e.error);
      setActive(false);
    };
    rec.onend = () => setActive(false);

    rec.start();
    recRef.current = rec;
    setActive(true);
  }

  if (!supported) {
    return (
      <button
        disabled
        title="Voice input not supported (Chrome/Edge only)"
        className="btn-ghost text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 opacity-50"
      >
        <MicIcon /> Voice
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      disabled={disabled}
      title={active ? "Stop recording" : "Speak your answer"}
      className={`btn-ghost text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 ${
        active ? "!border-[var(--bad)] !text-[var(--bad)]" : ""
      }`}
    >
      <MicIcon active={active} />
      {active ? "Stop" : "Speak"}
      {err && <span className="text-[var(--bad)]">· {err}</span>}
    </button>
  );
}

function MicIcon({ active }: { active?: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="18" x2="12" y2="22" />
      {active && <circle cx="12" cy="9" r="1.5" fill="currentColor" />}
    </svg>
  );
}
