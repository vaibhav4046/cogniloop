export type ModeId = "chill" | "exam" | "expert";

export interface Mode {
  id: ModeId;
  name: string;
  blurb: string;
  promptOverlay: string;
  startingDifficulty: 1 | 2 | 3;
  timerSec?: number;
}

export const MODES: Mode[] = [
  {
    id: "chill",
    name: "Chill",
    blurb: "Patient. Hints generously. Lower starting difficulty.",
    promptOverlay:
      "Mode: CHILL. Be encouraging. Tolerate vague answers and ask gently probing follow-ups. Difficulty creeps up slowly. Add micro-hints inside questions when concepts are weak.",
    startingDifficulty: 1,
  },
  {
    id: "exam",
    name: "Exam",
    blurb: "Time-pressured. Strict grading. Mid-range difficulty.",
    promptOverlay:
      "Mode: EXAM. Mimic real exam pressure. Be terse. Grade strictly. Reject vague phrasing. Keep difficulty at 2-4. No hints. Answer expected to be precise and self-contained.",
    startingDifficulty: 2,
    timerSec: 90,
  },
  {
    id: "expert",
    name: "Expert",
    blurb: "Adversarial. Pushes for first-principles reasoning.",
    promptOverlay:
      "Mode: EXPERT. Treat the learner as a peer. Ask layered questions that demand reasoning from first principles. Penalize memorized phrases. Difficulty starts at 3, escalates to 5. Use contrast/predict question types preferentially.",
    startingDifficulty: 3,
  },
];

export function getMode(id: string): Mode {
  return MODES.find((m) => m.id === id) ?? MODES[1];
}
