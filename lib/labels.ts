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
