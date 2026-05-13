"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { ModePicker } from "./ModePicker";
import { StatsPanel } from "./StatsPanel";
import { CURRICULA } from "@/lib/curricula";
import type { ModeId } from "@/lib/modes";

const EXAMPLES = [
  "Backpropagation in neural networks",
  "How TCP handshake works",
  "Bayes' theorem with a real example",
  "What actually happens during meiosis",
  "Greedy vs dynamic programming",
];

const FEATURES = [
  { t: "Socratic, not summary", b: "Locked system prompt refuses to give answers. Forces explanation." },
  { t: "Concept tracker", b: "Live concept map: weak → shaky → solid → mastered." },
  { t: "Adaptive difficulty", b: "Each question targets your weakest concept, scales 1–5." },
  { t: "Voice input + read-aloud", b: "Speak answers, hear questions. Web Speech API. Free." },
  { t: "LaTeX rendering", b: "Native math support. Greek, equations, integrals — all renderable." },
  { t: "8 curriculum packs", b: "JEE, NEET, GATE-CSE, MCAT, AP-CS, ML Fundamentals, System Design, Economics — pre-loaded." },
  { t: "3 modes", b: "Chill (gentle), Exam (timed, strict), Expert (first-principles)." },
  { t: "Streaks + history", b: "Daily streak, lifetime stats, full session history." },
  { t: "Shareable session links", b: "URL-encoded session state. No backend, no leaks." },
  { t: "Coaching report", b: "Final report with study plan, journal prompt, markdown export." },
  { t: "Keyboard-first", b: "Hit ? for the shortcuts panel. g+h/t/w/s to navigate; ⌘+Enter to submit; m, l, e in session." },
  { t: "100% client-side", b: "Sessions live in your browser. No accounts, no logs, no upsells." },
];