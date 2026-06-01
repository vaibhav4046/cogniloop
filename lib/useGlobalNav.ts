import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isInTextField } from "./kbd";

const NAV_SHORTCUTS: Record<string, string> = {
  t: "/templates",
  h: "/history",
  w: "/why",
  s: "/settings",
};

export function useGlobalNav() {
  const router = useRouter();
  useEffect(() => {
    let buf = "";
    let timer: ReturnType<typeof setTimeout> | null = null;
    function onKey(e: KeyboardEvent) {
      if (isInTextField(e.target)) return;
      if (e.key === "g" || e.key === "G") {
        if (buf === "g") {
          buf = "";
          if (timer) { clearTimeout(timer); timer = null; }
          e.preventDefault();
          router.push("/");
        } else {
          buf = "g";
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => (buf = ""), 1500);
        }
        return;
      }
      if (buf === "g") {
        const href = NAV_SHORTCUTS[e.key.toLowerCase()];
        if (href) {
          e.preventDefault();
          router.push(href);
        }
        buf = "";
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);
}
