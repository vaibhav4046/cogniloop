"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type ToastKind = "info" | "success" | "warn" | "error";

export interface Toast {
  id: string;
  kind: ToastKind;
  text: string;
  actionLabel?: string;
  onAction?: () => void;
  durationMs?: number;
}

interface ToastApi {
  push: (t: Omit<Toast, "id">) => string;
  dismiss: (id: string) => void;
}

const ToastCtx = createContext<ToastApi | null>(null);

export function useToast(): ToastApi {
  const ctx = useContext(ToastCtx);
  if (!ctx) {
    return {
      push: () => "",
      dismiss: () => undefined,
    };
  }
  return ctx;
}

export function ToastHost({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }
  }, []);

  const push = useCallback(
    (t: Omit<Toast, "id">) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `t-${Date.now()}-${Math.random()}`;
      const full: Toast = { id, durationMs: 4500, ...t };
      setToasts((list) => [...list, full]);
      if (full.durationMs && full.durationMs > 0) {
        const handle = setTimeout(() => dismiss(id), full.durationMs);
        timers.current.set(id, handle);
      }
      return id;
    },
    [dismiss]
  );

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((h) => clearTimeout(h));
      map.clear();
    };
  }, []);

  const api: ToastApi = { push, dismiss };

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 items-center pointer-events-none"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <ToastView key={t.id} toast={t} onClose={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

function ToastView({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const color =
    toast.kind === "error"
      ? "var(--bad)"
      : toast.kind === "success"
      ? "var(--good)"
      : toast.kind === "warn"
      ? "var(--warn)"
      : "var(--accent)";
  const urgent = toast.kind === "error" || toast.kind === "warn";
  return (
    <div
      role={urgent ? "alert" : "status"}
      aria-live={urgent ? "assertive" : "polite"}
      aria-atomic="true"
      className="card px-4 py-3 pointer-events-auto flex items-center gap-3 toast-pop max-w-[min(92vw,520px)] relative overflow-hidden"
      style={{ borderColor: color }}
    >
      {toast.durationMs && toast.durationMs > 0 && (
        <div
          className="toast-timer absolute bottom-0 left-0 h-[2px] opacity-40"
          style={{ background: color, animationDuration: `${toast.durationMs}ms` }}
        />
      )}
      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
      <span className="text-[13px] text-[var(--fg)] flex-1 leading-snug">{toast.text}</span>
      {toast.actionLabel && toast.onAction && (
        <button
          onClick={() => {
            toast.onAction?.();
            onClose();
          }}
          className="text-[12px] font-medium px-2 py-1 rounded-md hover:bg-[var(--bg-elev)]"
          style={{ color }}
        >
          {toast.actionLabel}
        </button>
      )}
      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        className="text-[var(--fg-dim)] hover:text-[var(--fg)] text-[16px] leading-none px-1"
      >
        ×
      </button>
    </div>
  );
}
