"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface Props {
  text: string;
  className?: string;
}

export function Tex({ text, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = renderMath(text);
  }, [text]);

  return <span ref={ref} className={className} />;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderMath(input: string): string {
  const parts: string[] = [];
  let i = 0;
  while (i < input.length) {
    if (input[i] === "$" && input[i + 1] === "$") {
      const end = input.indexOf("$$", i + 2);
      if (end !== -1) {
        const tex = input.slice(i + 2, end);
        parts.push(safeKatex(tex, true));
        i = end + 2;
        continue;
      }
    }
    if (input[i] === "$") {
      const end = input.indexOf("$", i + 1);
      if (end !== -1 && !/\s/.test(input[i + 1] ?? "")) {
        const tex = input.slice(i + 1, end);
        parts.push(safeKatex(tex, false));
        i = end + 1;
        continue;
      }
    }
    if (input[i] === "\\" && input[i + 1] === "(") {
      const end = input.indexOf("\\)", i + 2);
      if (end !== -1) {
        const tex = input.slice(i + 2, end);
        parts.push(safeKatex(tex, false));
        i = end + 2;
        continue;
      }
    }
    if (input[i] === "\\" && input[i + 1] === "[") {
      const end = input.indexOf("\\]", i + 2);
      if (end !== -1) {
        const tex = input.slice(i + 2, end);
        parts.push(safeKatex(tex, true));
        i = end + 2;
        continue;
      }
    }
    parts.push(escapeHtml(input[i]));
    i++;
  }
  return parts.join("");
}

function safeKatex(tex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      output: "html",
    });
  } catch {
    return escapeHtml(displayMode ? `$$${tex}$$` : `$${tex}$`);
  }
}
