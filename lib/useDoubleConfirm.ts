import { useEffect, useRef, useState } from "react";

/**
 * Two-click confirmation pattern: first call arms the confirmation state for `ms`
 * milliseconds; a second call within that window fires the actual action.
 * Cleans up the pending timer on unmount to avoid state updates on dead components.
 */
export function useDoubleConfirm(ms = 4000) {
  const [confirming, setConfirming] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function arm() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setConfirming(true);
    timerRef.current = setTimeout(() => setConfirming(false), ms);
  }

  function disarm() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setConfirming(false);
  }

  return { confirming, arm, disarm };
}
