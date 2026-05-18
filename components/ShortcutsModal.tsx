"use client";

import { useEffect, useState } from "react";

const SHORTCUTS: { keys: string; label: string }[] = [
  { keys: "?", label: "Open this panel" },
  { keys: "⌘/Ctrl + Enter", label: "Submit answer · Begin loop" },
  { keys: "Esc", label: "Close panel · Cancel voice" },
  { keys: "/", label: "Focus topic / filter input (landing & templates)" },
  { keys: "G then H", label: "Go to history" },
  { keys: "G then T", label: "Go to templates" },
  { keys: "G then W", label: "Go to /why" },
  { keys: "G then S", label: "Go to settings" },
  { keys: "M", label: "Toggle voice input (in session)" },
  { keys: "L", label: "Toggle read-aloud (in session)" },
  { keys: "E", label: "End session early" },
  { keys: "N", label: "New session (from report)" },
];

export function ShortcutsModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const inField =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (e.key === "?" && !inField) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open keyboard shortcuts panel"
        title="Keyboard shortcuts (?)"
        className="fixed bottom-4 right-4 btn-ghost w-9 h-9 rounded-full flex items-center justify-center text-sm z-30"
      >
        ?
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm fade-up"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
        className="card p-6 w-[min(440px,90vw)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div id="shortcuts-title" className="text-sm font-medium tracking-tight">Keyboard shortcuts</div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close keyboard shortcuts panel"
            className="text-[var(--fg-muted)] hover:text-[var(--fg)]"
          >
            ✕
          </button>
        </div>
        <ul className="flex flex-col gap-2.5">
          {SHORTCUTS.map((s) => (
            <li key={s.keys} className="flex items-center justify-between gap-4">
              <span className="text-[13px] text-[var(--fg-muted)]">{s.label}</span>
              <kbd className="text-[11px] font-mono bg-[var(--bg-elev)] border border-[var(--line)] px-2 py-0.5 rounded">
                {s.keys}
              </kbd>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
