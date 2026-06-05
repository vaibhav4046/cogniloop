import Link from "next/link";
import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";

export const metadata: Metadata = {
  title: "404 · Cogniloop",
};

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="card p-8 max-w-sm w-full text-center fade-up">
          <div className="text-[10px] uppercase tracking-widest text-[var(--fg-dim)] mb-3">
            404
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mb-3">
            Page not found
          </h1>
          <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed mb-6">
            Dead link — but your weak concepts are still waiting to be drilled.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <Link href="/" className="btn-primary px-5 py-2.5 rounded-lg text-sm w-full sm:w-auto">
              Begin the loop →
            </Link>
            <Link href="/templates" className="btn-ghost px-5 py-2.5 rounded-lg text-sm w-full sm:w-auto">
              Browse templates
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
