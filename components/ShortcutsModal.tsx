"use client";

import { useEffect, useRef, useState } from "react";
import { isInTextField } from "@/lib/kbd";

const SHORTCUT_SECTIONS: { section: string; items: { keys: string; label: string }[] }[] = [
  {
    section: "Global",
    items: [
      { keys: "?", label: "Open this panel" },
      { keys: "⌘/Ctrl + Enter", label: "Submit answer · Begin loop" },
      { keys: "Esc", label: "Close panel · Clear filter / search · Cancel voice" },
      { keys: "/", label: "Focus topic / filter / search" },
      { keys: "1 / 2 / 3", label: "Chill / Exam / Expert mode (home)" },
    ],
  },
  {
    section: "Navigate",
    items: [
      { keys: "G then G", label: "Home" },
      { keys: "G then H", label: "History" },
      { keys: "G then T", label: "Templates" },
      { keys: "G then W", label: "Why" },
      { keys: "G then S", label: "Settings" },
    ],
  },
  {
    section: "Session",
    items: [
      { keys: "M", label: "Toggle voice input" },
      { keys: "L", label: "Toggle read-aloud" },
      { keys: "E", label: "End session & generate report" },
      { keys: "R", label: "Retry after an error" },
    ],
  },
  {
    section: "Report",
    items: [
      { keys: "N", label: "New session" },
      { keys: "D", label: "Export markdown" },
      { keys: "S", label: "Copy share link" },
      { keys: "J", label: "Copy Feynman journal prompt" },
      { keys: "R", label: "Re-drill first weak concept" },
    ],
  },
];

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function ShortcutsModal() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "?" && !isInTextField(e.target)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Move focus into dialog on open; return it to trigger on close.
  useEffect(() => {
    if (open) {
      dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  function trapFocus(e: React.KeyboardEvent) {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const nodes = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
    );
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (!open) {
    return (
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-label="Open keyboard shortcuts panel"
        aria-keyshortcuts="?"
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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
        className="card p-6 w-[min(440px,90vw)]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={trapFocus}
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
        <div className="flex flex-col gap-4">
          {SHORTCUT_SECTIONS.map((sec) => (
            <div key={sec.section}>
              <div className="text-[10px] uppercase tracking-wider text-[var(--fg-dim)] mb-2">
                {sec.section}
              </div>
              <ul className="flex flex-col gap-2">
                {sec.items.map((s) => (
                  <li key={s.keys} className="flex items-center justify-between gap-4">
                    <span className="text-[13px] text-[var(--fg-muted)]">{s.label}</span>
                    <kbd className="text-[11px] font-mono bg-[var(--bg-elev)] border border-[var(--line)] px-2 py-0.5 rounded shrink-0">
                      {s.keys}
                    </kbd>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
