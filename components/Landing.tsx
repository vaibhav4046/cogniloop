"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

const EXAMPLES = [
  "Backpropagation in neural networks",
  "How TCP handshake works",
  "Bayes' theorem with a real example",
  "What actually happens during meiosis",
  "Greedy vs dynamic programming, when to use which",
];

export function Landing() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (taRef.current) {
      taRef.current.style.height = "auto";
      taRef.current.style.height = Math.min(taRef.current.scrollHeight, 220) + "px";
    }
  }, [notes]);

  function pickExample(s: string) {
    setTopic(s);
    setErr(null);
  }

  async function start() {
    if (submitting) return;
    if (!topic.trim() && !notes.trim()) {
      setErr("Type a topic or paste your notes.");
      return;
    }
    setSubmitting(true);
    setErr(null);

    sessionStorage.setItem(
      "cl:pending",
      JSON.stringify({ topic: topic.trim(), notes: notes.trim() })
    );
    router.push("/study");
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 sm:px-10 py-5 flex items-center justify-between">
        <Logo />
        <a
          href="https://github.com/vaibhav4046/cogniloop"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
        >
          GitHub →
        </a>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-[680px] fade-up">
          <div className="flex justify-center mb-6">
            <span className="tag">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              Free · No signup · No API keys
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-center leading-[1.05]">
            The AI tutor that <span className="text-[var(--accent)]">refuses</span> to give you the answer.
          </h1>

          <p className="text-[var(--fg-muted)] text-center mt-5 text-[15px] leading-relaxed max-w-[560px] mx-auto">
            Most AI study tools summarize for you. Cogniloop drills you. Paste a topic, explain it back in your words, and let the loop find your blind spots — round by round.
          </p>

          <div className="mt-10">
            <div className="field px-4 py-3">
              <label className="block text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-1.5">
                Topic
              </label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. backpropagation, photosynthesis, monetary policy…"
                className="w-full bg-transparent outline-none text-[15px] placeholder:text-[var(--fg-dim)]"
                maxLength={400}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) start();
                }}
              />
            </div>

            <details className="mt-3 group">
              <summary className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] cursor-pointer select-none list-none flex items-center gap-2">
                <span className="inline-block transition-transform group-open:rotate-90">›</span>
                Optional: paste your notes / lecture transcript / textbook excerpt
              </summary>
              <div className="field px-4 py-3 mt-3">
                <textarea
                  ref={taRef}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Paste here. The AI will use this as the source of truth instead of guessing."
                  className="w-full bg-transparent outline-none text-[14px] min-h-[100px]"
                  maxLength={12000}
                />
                <div className="text-[11px] text-[var(--fg-dim)] mt-2 text-right">
                  {notes.length}/12000
                </div>
              </div>
            </details>

            {err && (
              <div className="mt-3 text-sm text-[var(--bad)]">{err}</div>
            )}

            <button
              onClick={start}
              disabled={submitting}
              className="btn-primary mt-5 w-full py-3 rounded-xl text-[15px]"
            >
              {submitting ? "Starting the loop…" : "Begin the loop  ↵"}
            </button>
            <div className="text-[11px] text-[var(--fg-dim)] text-center mt-2">
              ⌘/Ctrl + Enter to start
            </div>
          </div>

          <div className="mt-10">
            <div className="text-[11px] uppercase tracking-wider text-[var(--fg-dim)] mb-3">
              Or try an example
            </div>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => pickExample(ex)}
                  className="btn-ghost px-3 py-1.5 text-xs rounded-lg"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Tile
              title="Socratic, not summary"
              body="Asks questions designed to expose gaps. You explain — it grades — it adapts."
            />
            <Tile
              title="Concept tracker"
              body="Each round updates a live map of what you've mastered and what's still shaky."
            />
            <Tile
              title="Stays on your machine"
              body="Sessions live in your browser. No account, no logs, no upsells."
            />
          </div>
        </div>
      </section>

      <footer className="px-6 sm:px-10 py-6 text-[11px] text-[var(--fg-dim)] flex items-center justify-between border-t border-[var(--line-soft)]">
        <span>Built by Vaibhav Lalwani</span>
        <span className="hidden sm:inline">Powered by an open free LLM endpoint. Be patient with rate limits.</span>
      </footer>
    </main>
  );
}

function Tile({ title, body }: { title: string; body: string }) {
  return (
    <div className="card p-4">
      <div className="text-[13px] font-medium tracking-tight">{title}</div>
      <div className="text-[12.5px] text-[var(--fg-muted)] mt-1.5 leading-relaxed">
        {body}
      </div>
    </div>
  );
}
