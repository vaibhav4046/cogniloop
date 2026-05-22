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
          "Waves and oscillations — SHM, wave equation, sound, Doppler effect, standing waves",
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
          "Electrochemistry — electrolytic cells, Faraday's laws, electrode potentials, Nernst equation",
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
    blurb: "Computer Science core — data structures, algorithms, OS, networks, discrete math.",
    subjects: [
      {
        name: "Data Structures",
        topics: [
          "Arrays and strings — prefix sums, sliding window, two-pointer technique",
          "Linked lists — reversal, cycle detection (Floyd's), merge, nth-from-end",
          "Stacks and queues — monotonic stack, deque, priority queue patterns",
          "Trees — BST operations, AVL rotations, B-tree, segment tree, trie",
          "Heaps — min/max-heap, heapify, heap sort, top-K problems",
          "Hashing — hash functions, collision resolution, open addressing, load factor",
        ],
      },
      {
        name: "Engineering Mathematics",
        topics: [
          "Propositional and first-order logic — predicates, quantifiers, inference rules",
          "Set theory — relations, functions, partial orders, lattices",
          "Graph theory — trees, paths, cycles, coloring, planarity",
          "Combinatorics — counting principles, pigeonhole, recurrences, generating functions",
          "Probability — random variables, Bayes' theorem, expectation, variance",
          "Linear algebra — rank, eigenvalues, system of linear equations",
        ],
      },
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
      {
        name: "CARS — Critical Analysis and Reasoning Skills",
        topics: [
          "Main idea, central argument, and thesis identification",
          "Author's purpose, tone, and rhetorical strategy",
          "Evidence and reasoning — strengthen, weaken, undermine arguments",
          "Inference, implication, and application questions",
          "Comparative passages and multi-perspective synthesis",
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
      {
        name: "AP CSP",
        topics: [
          "Binary, data representation and digital information",
          "The internet — packets, protocols, IP, DNS, HTTP",
          "Cybersecurity — encryption, public/private keys, phishing",
          "Algorithms and pseudocode — sequencing, selection, iteration",
          "Programming abstractions — procedures, lists, libraries",
          "Big data and privacy — crowdsourcing, data bias, legal/ethical issues",
          "Computing innovations and societal impact",
        ],
      },
    ],
  },
  {
    id: "ml-fundamentals",
    name: "ML Fundamentals",
    region: "Self-study · CS",
    blurb: "Linear algebra, probability, neural nets, transformers, generative AI, and reinforcement learning.",
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
      {
        name: "Generative AI & LLMs",
        topics: [
          "Tokenization and vocabulary — BPE, WordPiece, SentencePiece",
          "Pre-training objectives — causal LM, masked LM, next-sentence prediction",
          "Fine-tuning paradigms — SFT, instruction tuning, RLHF, DPO",
          "Prompt engineering — zero-shot, few-shot, chain-of-thought, RAG",
          "Diffusion models — DDPM, score matching, DALL-E, Stable Diffusion",
          "LLM evaluation — perplexity, BLEU, ROUGE, MMLU, human evaluation",
        ],
      },
      {
        name: "Reinforcement Learning",
        topics: [
          "Markov decision processes — states, actions, rewards, policies, value functions",
          "Dynamic programming — policy iteration, value iteration, Bellman equations",
          "Model-free methods — Q-learning, SARSA, temporal-difference learning",
          "Policy gradient methods — REINFORCE, actor-critic, PPO, advantage estimation",
          "Exploration vs exploitation — epsilon-greedy, UCB, Thompson sampling",
          "Deep RL — DQN, experience replay, target networks, distributional RL",
        ],
      },
    ],
  },
  {
    id: "system-design",
    name: "System Design",
    region: "Self-study · Engineering",
    blurb: "Distributed systems, databases, APIs, scaling — interview-ready.",
    subjects: [
      {
        name: "Core Concepts",
        topics: [
          "CAP theorem — consistency, availability, partition tolerance",
          "Load balancing — algorithms, health checks, sticky sessions",
          "Caching strategies — LRU, write-through, CDN, cache invalidation",
          "Database sharding and replication",
          "SQL vs NoSQL trade-offs",
          "Message queues and pub/sub — Kafka, RabbitMQ",
          "Consistent hashing and virtual nodes",
          "Rate limiting algorithms — token bucket, leaky bucket",
        ],
      },
      {
        name: "Design Problems",
        topics: [
          "Design a URL shortener (TinyURL)",
          "Design a social media news feed",
          "Design a distributed key-value store",
          "Design a notification service",
          "Design an API rate limiter",
          "Design a file storage system (Dropbox / S3)",
        ],
      },
      {
        name: "Observability & Reliability",
        topics: [
          "SLAs, SLOs, SLIs — defining and measuring reliability targets",
          "Distributed tracing — OpenTelemetry, Jaeger, trace context propagation",
          "Metrics and alerting — Prometheus, Grafana, on-call runbooks, alert fatigue",
          "Log aggregation — structured logging, ELK stack, correlation IDs",
          "Chaos engineering — fault injection, GameDay exercises, blast radius",
        ],
      },
    ],
  },
  {
    id: "economics",
    name: "Economics",
    region: "Self-study · AP · College",
    blurb: "Micro, macro, and behavioral economics — AP, college-level, and CFA Level 1 ready.",
    subjects: [
      {
        name: "Microeconomics",
        topics: [
          "Supply, demand, and equilibrium — shifts, price ceilings, floors, elasticity",
          "Consumer theory — utility maximization, indifference curves, budget constraints",
          "Production and costs — short-run vs long-run, economies of scale, cost curves",
          "Market structures — perfect competition, monopoly, oligopoly, monopolistic competition",
          "Game theory — Nash equilibrium, prisoner's dilemma, dominant strategies",
          "Market failures — externalities, public goods, information asymmetry",
        ],
      },
      {
        name: "Macroeconomics",
        topics: [
          "National income accounting — GDP, GNP, real vs nominal, price deflators",
          "Aggregate demand and supply — short-run vs long-run equilibrium, stagflation",
          "Fiscal policy — government spending, taxes, multiplier effect, crowding out",
          "Monetary policy — money supply, interest rates, central bank tools, QE",
          "Inflation and unemployment — Phillips curve, NAIRU, cost-push vs demand-pull",
          "Economic growth — Solow model, human capital, technological progress",
        ],
      },
      {
        name: "Behavioral & International",
        topics: [
          "Behavioral economics — biases, heuristics, prospect theory, nudges",
          "International trade — comparative advantage, trade policy, tariffs, WTO",
          "Exchange rates — purchasing power parity, balance of payments, forex markets",
        ],
      },
    ],
  },
];

export function getCurriculum(id: string): Curriculum | undefined {
  return CURRICULA.find((c) => c.id === id);
}
