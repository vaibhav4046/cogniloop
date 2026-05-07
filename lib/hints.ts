export const STARTING_HINTS = [
  "Mapping your knowledge gaps…",
  "Finding the concept you'll be forced to articulate…",
  "Picking the foundational weak spot to drill first…",
  "No shortcuts — building your first question…",
  "Calibrating starting difficulty…",
];

export const GRADING_HINTS = [
  "Reading your explanation…",
  "Finding the gap between what you said and what's true…",
  "Surfacing strengths and blind spots…",
  "Updating your concept map…",
  "Choosing the next concept you need to face…",
];

export const ENDING_HINTS = [
  "Tallying your blind spots…",
  "Sorting: mastered, shaky, still hiding…",
  "Building a targeted study plan…",
  "Writing tonight's Feynman journal prompt…",
];

export function pickHint(list: string[], index: number): string {
  return list[index % list.length];
}
