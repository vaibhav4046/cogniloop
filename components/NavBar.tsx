"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useGlobalNav } from "@/lib/useGlobalNav";

const LINKS = [
  { href: "/templates", label: "Templates" },
  { href: "/history", label: "History" },
  { href: "/why", label: "Why" },
  { href: "/settings", label: "Settings" },
];

export function NavBar() {
  const pathname = usePathname();
  useGlobalNav();

  return (
    <header className="px-6 sm:px-10 py-4 flex items-center justify-between border-b border-[var(--line-soft)] sticky top-0 bg-[var(--bg)]/85 backdrop-blur-md z-20">
      <Link href="/" aria-label="Cogniloop home">
        <Logo />
      </Link>
      <nav aria-label="Site navigation" className="flex items-center gap-1">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
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
