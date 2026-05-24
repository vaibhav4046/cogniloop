"use client";
import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      const bar = barRef.current;
      if (!bar) return;
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      const pct = scrollable > 0 ? Math.round((el.scrollTop / scrollable) * 100) : 0;
      bar.style.width = `${pct}%`;
      bar.setAttribute("aria-valuenow", String(pct));
    }
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-[2px] bg-[var(--accent)] z-30 pointer-events-none"
      style={{ width: "0%" }}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
