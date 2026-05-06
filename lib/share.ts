import type { Concept, Round } from "./types";

export interface SharePayload {
  topic: string;
  concepts: Concept[];
  rounds: Round[];
  modeId: string;
  v: 1;
}

function utf8ToBase64(s: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(s, "utf-8").toString("base64");
  }
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

function base64ToUtf8(b64: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(b64, "base64").toString("utf-8");
  }
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function urlSafe(b64: string): string {
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function fromUrlSafe(b64: string): string {
  const padLen = (4 - (b64.length % 4)) % 4;
  return b64.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(padLen);
}

export function encodeShare(payload: SharePayload): string {
  const json = JSON.stringify(payload);
  return urlSafe(utf8ToBase64(json));
}

export function decodeShare(token: string): SharePayload | null {
  try {
    const json = base64ToUtf8(fromUrlSafe(token));
    const obj = JSON.parse(json) as SharePayload;
    if (obj.v !== 1) return null;
    return obj;
  } catch {
    return null;
  }
}
