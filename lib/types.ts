export type ConceptStrength = "weak" | "shaky" | "solid" | "mastered";

export interface Concept {
  id: string;
  name: string;
  strength: ConceptStrength;
  attempts: number;
  lastScore: number;
}

export interface Evaluation {
  score: 0 | 1 | 2 | 3;
  verdict: string;
  gaps: string[];
  strengths: string[];
  conceptsTested: string[];
}

export interface Round {
  id: number;
  question: string;
  questionType: "explain" | "apply" | "contrast" | "predict" | "trace";
  difficulty: 1 | 2 | 3 | 4 | 5;
  answer?: string;
  evaluation?: Evaluation;
  createdAt: number;
}

export interface SessionState {
  id: string;
  topic: string;
  notes: string;
  concepts: Concept[];
  rounds: Round[];
  createdAt: number;
  status: "idle" | "thinking" | "awaiting" | "evaluating" | "ended";
}

export interface SessionStartResponse {
  concepts: Concept[];
  firstRound: Round;
}

export interface SessionTurnResponse {
  evaluation: Evaluation;
  updatedConcepts: Concept[];
  nextRound: Round | null;
  shouldEnd: boolean;
  endRationale?: string;
}
