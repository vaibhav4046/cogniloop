"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/templates", label: "Templates", k: "t" },
  { href: "/history", label: "History", k: "h" },
  { href: "/why", label: "Why", k: "w" },
  { href: "/settings", label: "Settings", k: "s" },
];

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let buf = "";
    let timer: ReturnType<typeof setTimeout> | null = null;
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const inField =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (inField) return;
      if (e.key === "g" || e.key === "G") {
        buf = "g";
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => (buf = ""), 1500);
        return;
      }
      if (buf === "g") {
        const target = LINKS.find((l) => l.k === e.key.toLowerCase());
        if (target) {
          e.preventDefault();
          router.push(target.href);
        }
        buf = "";
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <header className="px-6 sm:px-10 py-4 flex items-center justify-between border-b border-[var(--line-soft)] sticky top-0 bg-[var(--bg)]/85 backdrop-blur-md z-20">
      <Link href="/" aria-label="Cogniloop home">
        <Logo />
      </Link>
      <nav className="flex items-center gap-1">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                active
                  ? "text-[var(--fg)] bg-[var(--bg-soft)]"
                  : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
        <a
          href="https://github.com/vaibhav4046/cogniloop"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] px-3 py-1.5"
        >
          GitHub →
        </a>
      </nav>
    </header>
  );
}
