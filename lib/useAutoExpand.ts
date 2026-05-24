import { useEffect } from "react";

export function useAutoExpand(
  ref: { readonly current: HTMLTextAreaElement | null },
  value: string,
  maxPx = 300,
) {
  useEffect(() => {
    const ta = ref.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, maxPx)}px`;
  }, [value, maxPx]); // ref is a stable useRef object — omitted intentionally
}
