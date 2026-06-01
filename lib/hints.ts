export const STARTING_HINTS = [
  "Mapping your knowledge gaps…",
  "Finding the concept you'll be forced to articulate…",
  "Picking the foundational weak spot to drill first…",
  "No shortcuts — building your first question…",
  "Calibrating starting difficulty…",
  "Identifying the concept that holds everything else together…",
  "Looking for the place where your explanation will break down…",
  "Zeroing in on your first question…",
];

export const GRADING_HINTS = [
  "Reading your explanation…",
  "Finding the gap between what you said and what's true…",
  "Surfacing strengths and blind spots…",
  "Updating your concept map…",
  "Choosing the next concept you need to face…",
  "Tracing exactly where your explanation starts to drift…",
  "Checking what you said against what's actually true…",
  "Pinpointing the concept that needs one more pass…",
];

export const ENDING_HINTS = [
  "Tallying your blind spots…",
  "Sorting: mastered, shaky, still hiding…",
  "Building a targeted study plan…",
  "Writing tonight's Feynman journal prompt…",
  "Separating what you understand from what you only recognise…",
  "Assembling your personalized study plan…",
  "Checking what you can retrieve cold versus what you only recognised…",
  "Ranking the gaps most likely to trip you in the next session…",
];

export function pickHint(list: string[], index: number): string {
  return list[index % list.length];
}
