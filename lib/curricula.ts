export interface CurriculumTopic {
  name: string;
  topics: string[];
}

export interface Curriculum {
  id: string;
  name: string;
  region: string;
  blurb: string;
  subjects: CurriculumTopic[];
}

export const CURRICULA: Curriculum[] = [
  {
    id: "jee",
    name: "JEE Main",
    region: "India · Engineering",
    blurb: "Class 11–12 Physics, Chemistry, Math (NCERT-aligned).",
    subjects: [
      {
        name: "Physics",
        topics: [
          "Mechanics — kinematics, Newton's laws, work-energy",
          "Rotational motion and moment of inertia",
          "Thermodynamics and kinetic theory of gases",
          "Electrostatics and current electricity",
          "Magnetism and electromagnetic induction",
          "Ray and wave optics",
          "Modern physics — atoms, nuclei, photoelectric effect",
        ],
      },
      {
        name: "Chemistry",
        topics: [
          "Atomic structure and quantum numbers",
          "Chemical bonding and molecular structure",
          "Chemical thermodynamics and equilibrium",
          "Coordination compounds",
          "Hydrocarbons — alkanes, alkenes, aromatics",
          "GOC — inductive, resonance, hyperconjugation",
          "Biomolecules and polymers",
        ],
      },
      {
        name: "Mathematics",
        topics: [
          "Sets, relations, functions",
          "Limits, continuity, differentiability",
          "Definite and indefinite integration",
          "Differential equations",
          "Coordinate geometry — straight lines, circles, conics",
          "Vectors and 3D geometry",
          "Probability and combinatorics",
        ],
      },
    ],
  },
  {
    id: "neet",
    name: "NEET UG",
    region: "India · Medical",
    blurb: "Physics, Chemistry, Biology — Class 11–12 NCERT.",
    subjects: [
      {
        name: "Biology",
        topics: [
          "Cell structure and function",
          "Genetics and molecular biology — DNA replication, transcription",
          "Human physiology — circulation, respiration, digestion",
          "Plant physiology — photosynthesis, respiration",
          "Reproduction in flowering plants and humans",
          "Evolution and biotechnology",
          "Ecology and environment",
        ],
      },
      {
        name: "Physics",
        topics: [
          "Mechanics and rotational dynamics",
          "Thermodynamics",
          "Electrostatics and current electricity",
          "Optics",
          "Modern physics",
        ],
      },
      {
        name: "Chemistry",
        topics: [
          "Physical chemistry — thermodynamics, kinetics, equilibrium",
          "Organic chemistry — reaction mechanisms",
          "Inorganic chemistry — coordination, p-block, d-block",
          "Biomolecules",
        ],
      },
    ],
  },
  {
    id: "gate-cs",
    name: "GATE CSE",
    region: "India · CS Postgrad",
    blurb: "Computer Science core — algorithms, OS, networks, ML.",
    subjects: [
      {
        name: "Core CS",
        topics: [
          "Algorithm analysis — asymptotic notation, recurrences",
          "Greedy, divide-and-conquer, dynamic programming",
          "Graph algorithms — BFS, DFS, shortest paths, MST",
          "Operating systems — processes, threads, deadlocks, scheduling",
          "Memory management — paging, virtual memory",
          "Databases — normalization, transactions, indexing",
          "Computer networks — TCP/IP, routing, OSI layers",
          "Theory of computation — automata, regular and context-free languages",
          "Compiler design — lexical, parsing, code generation",
          "Computer organization — pipelining, caching, ISA",
        ],
      },
    ],
  },
  {
    id: "mcat",
    name: "MCAT",
    region: "USA · Medical",
    blurb: "Bio/Biochem, Chem/Phys, Psych/Soc, CARS.",
    subjects: [
      {
        name: "Biological & Biochemical Foundations",
        topics: [
          "Cell biology and metabolism",
          "Enzyme kinetics — Michaelis-Menten",
          "Genetics — Mendelian, molecular",
          "Endocrine and nervous systems",
        ],
      },
      {
        name: "Chemical & Physical Foundations",
        topics: [
          "General chemistry — kinetics, thermodynamics, acid-base",
          "Organic chemistry — functional groups, reaction mechanisms",
          "Physics — fluids, electricity, optics, thermodynamics",
        ],
      },
      {
        name: "Psychological, Social, Biological Foundations of Behavior",
        topics: [
          "Sensation and perception",
          "Learning and memory",
          "Social structures and demographics",
          "Stress and emotion",
        ],
      },
    ],
  },
  {
    id: "ap-cs",
    name: "AP Computer Science",
    region: "USA · High School",
    blurb: "AP CSA + CSP — Java, algorithms, computing principles.",
    subjects: [
      {
        name: "AP CSA",
        topics: [
          "Primitive types and using objects",
          "Boolean expressions and if statements",
          "Iteration — for, while loops",
          "Writing classes and inheritance",
          "Array and ArrayList",
          "2D arrays",
          "Recursion",
        ],
      },
    ],
  },
  {
    id: "ml-fundamentals",
    name: "ML Fundamentals",
    region: "Self-study · CS",
    blurb: "Linear algebra, probability, neural net basics, transformers.",
    subjects: [
      {
        name: "Math & Stats",
        topics: [
          "Linear algebra — vectors, matrices, eigenvalues",
          "Probability — Bayes, distributions, MLE vs MAP",
          "Calculus — gradients, chain rule",
          "Information theory — entropy, KL divergence",
        ],
      },
      {
        name: "Models",
        topics: [
          "Linear and logistic regression",
          "Decision trees and ensembles",
          "Neural networks — backpropagation",
          "Convolutional networks",
          "Attention and transformers",
          "Regularization — L1, L2, dropout",
        ],
      },
    ],
  },
];

export function getCurriculum(id: string): Curriculum | undefined {
  return CURRICULA.find((c) => c.id === id);
}
