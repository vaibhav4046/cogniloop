"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getSettings } from "@/lib/settings";

interface Props {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult:
    | ((e: { results: ArrayLike<{ 0: { transcript: string }; isFinal?: boolean }> }) => void)
    | null;
  onerror: ((e: { error: string; message?: string }) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort?: () => void;
}

const ERR_TEXT: Record<string, string> = {
  "not-allowed": "Mic blocked. Click the lock in URL bar → allow microphone.",
  "service-not-allowed": "Browser blocked mic. Allow in site settings.",
  "no-speech": "Didn't hear anything. Try again.",
  "audio-capture": "No microphone detected.",
  "network": "Network error. Try again.",
  "aborted": "",
  "language-not-supported": "Language not supported. Switch in /settings.",
};

export function VoiceInput({ onTranscript, disabled }: Props) {
  const [supported, setSupported] = useState(false);
  const [active, setActive] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const finalRef = useRef<string>("");
  const transcriptCallback = useRef(onTranscript);
  const userStoppedRef = useRef(false);

  useEffect(() => {
    transcriptCallback.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (Ctor) setSupported(true);
  }, []);

  useEffect(() => {
    return () => {
      try {
        recRef.current?.abort?.();
      } catch {}
    };
  }, []);

  const stop = useCallback(() => {
    userStoppedRef.current = true;
    try {
      recRef.current?.stop();
    } catch {}
    setActive(false);
  }, []);

  const start = useCallback(async () => {
    if (!supported || disabled) return;
    setErr(null);
    finalRef.current = "";
    userStoppedRef.current = false;

    if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((t) => t.stop());
      } catch (e) {
        const msg = e instanceof Error ? e.message : "permission denied";
        setErr(msg.toLowerCase().includes("denied") || msg.toLowerCase().includes("not allowed")
          ? "Mic blocked. Allow microphone in browser settings."
          : `Mic init failed: ${msg}`);
        return;
      }
    }

    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) return;

    try {
      recRef.current?.abort?.();
    } catch {}

    const rec = new Ctor();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = getSettings().voiceLang ?? "en-US";

    rec.onstart = () => setActive(true);

    rec.onresult = (e) => {
      let interim = "";
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalRef.current += r[0].transcript;
        else interim += r[0].transcript;
      }
      transcriptCallback.current(finalRef.current + interim);
    };

    rec.onerror = (e) => {
      const code = e.error || "unknown";
      const friendly = ERR_TEXT[code] ?? `Error: ${code}`;
      if (friendly) setErr(friendly);
      if (code === "not-allowed" || code === "service-not-allowed" || code === "audio-capture") {
        userStoppedRef.current = true;
        setActive(false);
      }
    };

    rec.onend = () => {
      if (!userStoppedRef.current) {
        try {
          rec.start();
          return;
        } catch {}
      }
      setActive(false);
    };

    try {
      rec.start();
      recRef.current = rec;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not start microphone");
      setActive(false);
    }
  }, [supported, disabled]);

  function toggle() {
    if (active) stop();
    else void start();
  }

  if (!supported) {
    return (
      <button
        disabled
        title="Voice input not supported. Use Chrome or Edge."
        aria-label="Voice input unsupported in this browser"
        className="btn-ghost text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 opacity-50"
      >
        <MicIcon /> Voice
      </button>
    );
  }

  return (
    <div className="inline-flex flex-col items-end gap-1">
      <button
        onClick={toggle}
        disabled={disabled}
        title={active ? "Stop recording" : "Speak your answer"}
        aria-label={active ? "Stop voice input" : "Start voice input"}
        aria-pressed={active}
        className={`btn-ghost text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
          active ? "!border-[var(--bad)] !text-[var(--bad)] mic-pulse" : ""
        }`}
      >
        <MicIcon active={active} />
        {active ? "Stop" : "Speak"}
      </button>
      {err && (
        <span
          className="text-[10px] text-[var(--bad)] max-w-[260px] text-right leading-tight"
          role="alert"
        >
          {err}
        </span>
      )}
    </div>
  );
}

function MicIcon({ active }: { active?: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="18" x2="12" y2="22" />
      {active && <circle cx="12" cy="9" r="1.5" fill="currentColor" />}
    </svg>
  );
}
