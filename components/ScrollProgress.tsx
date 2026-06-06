"use client";
import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function update() {
      const bar = barRef.current;
      const btn = btnRef.current;
      if (!bar) return;
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      const pct = scrollable > 0 ? Math.round((el.scrollTop / scrollable) * 100) : 0;
      bar.style.width = `${pct}%`;
      bar.setAttribute("aria-valuenow", String(pct));
      if (btn) {
        const show = pct > 20;
        btn.style.opacity = show ? "1" : "0";
        btn.style.pointerEvents = show ? "auto" : "none";
      }
    }
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function scrollToTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
  }

  return (
    <>
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
      <button
        ref={btnRef}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        className="fixed bottom-16 right-4 btn-ghost w-9 h-9 rounded-full flex items-center justify-center text-sm z-30"
        style={{ opacity: 0, pointerEvents: "none", transition: "opacity 0.2s ease" }}
      >
        <span aria-hidden="true">↑</span>
      </button>
    </>
  );
}
