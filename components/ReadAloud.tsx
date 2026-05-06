"use client";

import { useEffect, useState } from "react";

interface Props {
  text: string;
}

export function ReadAloud({ text }: Props) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("speechSynthesis" in window) setSupported(true);
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function toggle() {
    if (!supported) return;
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const stripped = text.replace(/\$+[^$]+\$+/g, "math expression").slice(0, 800);
    const utter = new SpeechSynthesisUtterance(stripped);
    utter.rate = 1.05;
    utter.pitch = 1;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    synth.cancel();
    synth.speak(utter);
    setSpeaking(true);
  }

  if (!supported) return null;

  return (
    <button
      onClick={toggle}
      title={speaking ? "Stop" : "Read question aloud"}
      className="btn-ghost text-[10px] px-2 py-1 rounded-md flex items-center gap-1"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        {!speaking && <path d="M15 9 a4 4 0 0 1 0 6" />}
        {!speaking && <path d="M18 6 a8 8 0 0 1 0 12" />}
      </svg>
      {speaking ? "Stop" : "Listen"}
    </button>
  );
}
