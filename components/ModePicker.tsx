"use client";

import { memo } from "react";
import { MODES, type ModeId } from "@/lib/modes";

interface Props {
  value: ModeId;
  onChange: (id: ModeId) => void;
  compact?: boolean;
}

export const ModePicker = memo(function ModePicker({ value, onChange, compact }: Props) {
  return (
    <div
      role="group"
      aria-label="Study mode"
      className={compact ? "flex gap-1.5" : "grid grid-cols-3 gap-2"}
    >
      {MODES.map((m, i) => {
        const active = m.id === value;
        return (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            aria-pressed={active}
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
