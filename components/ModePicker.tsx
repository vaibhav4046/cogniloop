"use client";

import { memo } from "react";
import { MODES, type ModeId } from "@/lib/modes";

interface Props {
  value: ModeId;
  onChange: (id: ModeId) => void;
  compact?: boolean;
}

export const ModePicker = memo(function ModePicker({ value, onChange, compact }: Props) {
  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(MODES[(idx + 1) % MODES.length].id);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(MODES[(idx - 1 + MODES.length) % MODES.length].id);
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Study mode"
      className={compact ? "flex gap-1.5" : "grid grid-cols-3 gap-2"}
    >
      {MODES.map((m, i) => {
        const active = m.id === value;
        return (
          <button
            key={m.id}
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(m.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            style={compact ? undefined : { animationDelay: `${i * 65}ms` }}
            className={`text-left rounded-lg border transition-all ${
              compact ? "px-3 py-1.5 text-xs" : "p-3 item-in"
            } ${
              active
                ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--fg)]"
                : "border-[var(--line)] bg-[var(--bg-soft)] text-[var(--fg-muted)] hover:border-[#2a2e34] hover:text-[var(--fg)]"
            }`}
          >
            <div className={`font-medium tracking-tight ${compact ? "" : "text-[13px]"}`}>
              {m.name}
            </div>
            {!compact && (
              <div className="text-[11.5px] text-[var(--fg-muted)] mt-1 leading-snug">
                {m.blurb}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
});
