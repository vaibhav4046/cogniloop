"use client";

import dynamic from "next/dynamic";

// ssr:false is only legal in Client Components. This thin wrapper lets layout.tsx
// (a Server Component) include ShortcutsModal while still deferring its JS bundle.
const ShortcutsModal = dynamic(
  () => import("./ShortcutsModal").then((m) => m.ShortcutsModal),
  { ssr: false }
);

export function ShortcutsLoader() {
  return <ShortcutsModal />;
}
