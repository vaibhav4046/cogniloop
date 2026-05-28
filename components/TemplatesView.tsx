"use client";

import { useRouter } from "next/navigation";
import { CURRICULA } from "@/lib/curricula";
import { NavBar } from "./NavBar";
import { ScrollProgress } from "./ScrollProgress";
import { useEffect, useMemo, useRef, useState } from "react";
import { isInTextField } from "@/lib/kbd";

export function TemplatesView() {
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/" && !isInTextField(e.target)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return CURRICULA;
    return CURRICULA.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.blurb.toLowerCase().includes(q) ||
        c.subjects.some((s) => s.name.toLowerCase().includes(q) || s.topics.some((t) => t.toLowerCase().includes(q)))
    );
  }, [filter]);

  function startWith(topic: string, modeId: string = "exam") {
    sessionStorage.setItem(
      "cl:pending",
      JSON.stringify({ topic, notes: "", modeId })
    );
    router.push("/study");
  }

  return (
    <main id="main" className="min-h-screen flex flex-col">
      <ScrollProgress />
      <NavBar />
      <section className="flex-1 max-w-[920px] w-full mx-auto px-6 py-8">
        <div className="fade-up">
          <span className="tag mb-4">Curriculum templates</span>
          <h1 className="text-3xl font-semibold tracking-tight">
            Pre-loaded concept maps.
          </h1>
          <p className="text-[var(--fg-muted)] text-sm mt-2 leading-relaxed max-w-[560px]">
            Skip the cold start. Pick any concept from your actual syllabus and go straight into the loop.
          </p>

          <div className="field px-4 py-2.5 mt-6 max-w-[420px] flex items-center gap-2">
            <input
              ref={inputRef}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") { setFilter(""); inputRef.current?.blur(); }
              }}
              placeholder="Filter by exam, subject, or topic… (press / to focus)"
              aria-label="Filter curriculum templates"
              className="flex-1 min-w-0 bg-transparent outline-none text-[14px] placeholder:text-[var(--fg-dim)]"
            />
            {filter && (
              <button
                onClick={() => { setFilter(""); inputRef.current?.focus(); }}
                aria-label="Clear filter"
                className="shrink-0 text-[var(--fg-dim)] hover:text-[var(--fg)] text-xs leading-none"
              >
                ✕
              </button>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-8">
            {filtered.length === 0 && (
              <div className="card p-8 text-center fade-up max-w-[480px] mx-auto">
                <div className="text-sm font-medium mb-1.5">
                  No matches for &ldquo;{filter}&rdquo;
                </div>
                <p className="text-[13px] text-[var(--fg-muted)] mb-5 leading-relaxed">
                  No curriculum covers this — but you can drill it directly.
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <button
                    onClick={() => setFilter("")}
                    className="btn-ghost text-xs px-3 py-1.5 rounded-md"
                  >
                    Clear filter
                  </button>
                  <button
                    onClick={() => startWith(filter.trim())}
                    className="btn-primary text-xs px-3 py-1.5 rounded-md"
                  >
                    Drill &ldquo;{filter.length > 38 ? filter.slice(0, 38) + "…" : filter}&rdquo; →
                  </button>
                </div>
              </div>
            )}
            {filtered.map((c, idx) => (
              <section key={c.id} id={c.id} className="card p-5 item-in" style={{ animationDelay: `${idx * 60}ms` }}>
                <header className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
                  <h2 className="text-[17px] font-semibold tracking-tight">
                    {c.name}
                  </h2>
                  <span className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)]">
                    {c.region}
                  </span>
                </header>
                <p className="text-[13px] text-[var(--fg-muted)] mb-4">
                  {c.blurb}
                </p>
                <div className="flex flex-col gap-4">
                  {c.subjects.map((s) => (
                    <div key={s.name}>
                      <h3 className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-2">
                        {s.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {s.topics.map((t) => (
                          <button
                            key={t}
                            onClick={() => startWith(t)}
                            className="btn-ghost text-[12px] px-3 py-1.5 rounded-md text-left"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
      <footer className="px-6 sm:px-10 py-6 text-[11px] text-[var(--fg-dim)] border-t border-[var(--line-soft)]">
        Every concept here is a live drill. Pick one — the first question lands in under 10 seconds.
      </footer>
    </main>
  );
}
