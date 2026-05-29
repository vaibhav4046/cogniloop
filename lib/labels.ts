import type { ConceptStrength, Round } from "./types";

export const QTYPE_DESC: Record<Round["questionType"], string> = {
  explain: "Explain the concept in your own words",
  apply: "Apply it to a real or hypothetical example",
  contrast: "Compare or distinguish two related ideas",
  predict: "Predict an outcome or behavior from first principles",
  trace: "Walk through a process or algorithm step by step",
};

export const STRENGTH_DESC: Record<ConceptStrength, string> = {
  weak: "Not yet understood — needs drilling from scratch",
  shaky: "Partial recall — gaps remain, but the seed is there",
  solid: "Well understood — minor edge cases still possible",
  mastered: "Fully mastered — held under every question type",
};

export const QTYPE_PLACEHOLDER: Record<Round["questionType"], string> = {
  explain: "Explain it from scratch — as if you're teaching someone seeing it for the first time. Reasoning > recall. Use $…$ for math.",
  apply: "Pick a concrete scenario and trace through how this plays out step by step. Show your reasoning. Use $…$ for math.",
  contrast: "Focus on the mechanism that makes them behave differently — not just naming the difference. Use $…$ for math.",
  predict: "Walk the cause-and-effect chain from first principles. What has to be true for this outcome? Use $…$ for math.",
  trace: "Step through it one action at a time — what happens first, what follows, what's the end state? Use $…$ for math.",
};

export const STUCK_STARTERS: Record<Round["questionType"], string> = {
  explain: "Let me explain this from scratch — the core idea is that…",
  apply: "A concrete example of this would be… and here is how it plays out:",
  contrast: "The key difference between them is… because under the hood…",
  predict: "Following the cause-and-effect chain from first principles: if…, then…",
  trace: "Walking through it step by step — first…, then…, and finally…",
};
