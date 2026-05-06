export const STARTING_HINTS = [
  "Building your concept map…",
  "Reading your notes…",
  "Picking the foundational concept…",
  "Crafting the first question…",
  "Choosing question type and difficulty…",
];

export const GRADING_HINTS = [
  "Reading your answer…",
  "Checking against the concept…",
  "Surfacing what you got and what's missing…",
  "Updating the concept tracker…",
  "Picking the next question for your weakest spot…",
];

export const ENDING_HINTS = [
  "Compiling your report…",
  "Sorting concepts into mastered, shaky, weak…",
  "Building your study plan…",
  "Writing your Feynman journal prompt…",
];

export function pickHint(list: string[], index: number): string {
  return list[index % list.length];
}
