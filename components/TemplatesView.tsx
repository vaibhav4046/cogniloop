"use client";

import { useRouter } from "next/navigation";
import { CURRICULA } from "@/lib/curricula";
import { NavBar } from "./NavBar";
import { useEffect, useRef, useState } from "react";
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

  const filtered = CURRICULA.filter((c) => {
    const q = filter.trim().toLowerCase();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.blurb.toLowerCase().includes(q) ||
      c.subjects.some((s) =>
        s.topics.some((t) => t.toLowerCase().includes(q))
      )
    );
  });

  function startWith(topic: string, modeId: string = "exam") {
    sessionStorage.setItem(
      "cl:pending",
      JSON.stringify({ topic, notes: "", modeId })
    );
    router.push("/study");
  }

  return (
    <main id="main" className="min-h-screen flex flex-col">
      <NavBar />
      <section className="flex-1 max-w-[920px] w-full mx-auto px-6 py-8">
        <div className="fade-up">
          <span className="tag mb-4">Curriculum templates</span>
          <h1 className="text-3xl font-semibold tracking-tight">
            Pre-loaded concept maps.
          </h1>
          <p className="text-[var(--fg-muted)] text-sm mt-2 leading-relaxed max-w-[560px]">
            Skip the cold start. Pick a topic from your real syllabus — Cogniloop drills you on it like an exam.
          </p>

          <div className="field px-4 py-2.5 mt-6 max-w-[420px]">
            <input
              ref={inputRef}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by exam, subject, or topic… (press / to focus)"
              aria-label="Filter curriculum templates"
              className="w-full bg-transparent outline-none text-[14px] placeholder:text-[var(--fg-dim)]"
            />
          </div>

          <div className="mt-8 flex flex-col gap-8">
            {filtered.length === 0 && (
              <div className="card p-8 text-center fade-up max-w-[480px] mx-auto">
                <div className="text-sm font-medium mb-1.5">
                  No matches for &ldquo;{filter}&rdquo;
                </div>
                <p className="text-[13px] text-[var(--fg-muted)] mb-5 leading-relaxed">
                  Try searching by exam name, subject, or a specific topic keyword.
                </p>
                <button
                  onClick={() => setFilter("")}
                  className="btn-ghost text-xs px-3 py-1.5 rounded-md"
                >
                  Clear filter
                </button>
              </div>
            )}
            {filtered.map((c) => (
              <section key={c.id} id={c.id} className="card p-5">
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
                      <div className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-2">
                        {s.name}
                      </div>
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
        Pick any topic — Cogniloop asks the first question in under 10 seconds. No setup, no cold start.
      </footer>
    </main>
  );
}
