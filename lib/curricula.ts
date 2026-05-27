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
          "Complex numbers and quadratic equations — Argand plane, modulus-argument, cube roots of unity, quadratic discriminant",
          "Matrices and determinants — operations, rank, inverse, Cramer's rule, eigenvalues",
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
    blurb: "Physics, Chemistry, Biology — Class 11–12 NCERT. Magnetism, semiconductor electronics, and electrochemistry added for complete NEET coverage.",
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
          "Magnetic effects of current and magnetism — Biot-Savart law, Ampere's law, solenoid, cyclotron, magnetic materials, Earth's magnetic field",
          "Semiconductor electronics and communication systems — energy bands, p-n junction, rectifiers, transistors, logic gates, modulation",
          "Optics",
          "Modern physics",
        ],
      },
      {
        name: "Chemistry",
        topics: [
          "Physical chemistry — thermodynamics, kinetics, equilibrium",
          "Electrochemistry — electrode potentials, Nernst equation, Faraday's laws, galvanic cells, corrosion",
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
    blurb: "Data structures, algorithms, OS, DBMS, computer networks, compiler theory, and engineering math — 7 standalone subjects for GATE prep.",
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
        name: "Database Management Systems",
        topics: [
          "ER model — entities, attributes, relationships, cardinality, ER-to-relational mapping",
          "Relational model and SQL — DDL, DML, joins, aggregation, subqueries, views",
          "Functional dependencies and normalization — 1NF, 2NF, 3NF, BCNF, lossless decomposition",
          "Transaction management — ACID properties, serializability, 2-phase locking, deadlock handling",
          "Indexing and query processing — B+ tree, hash index, query cost estimation, join algorithms",
        ],
      },
      {
        name: "Operating Systems",
        topics: [
          "Process management — PCB, process states, fork/exec, context switching, IPC (pipes, shared memory, message queues)",
          "CPU scheduling — FCFS, SJF, Round Robin, priority scheduling, multilevel feedback queues, scheduling metrics",
          "Synchronization and deadlocks — race conditions, mutex, semaphores, monitors, deadlock detection, Banker's algorithm",
          "Memory management — contiguous allocation, paging, segmentation, virtual memory, TLB, page replacement (LRU, FIFO, Optimal)",
          "File systems — directory structure, FAT vs inode allocation, free space management, journaling, RAID levels",
        ],
      },
      {
        name: "Computer Networks",
        topics: [
          "Data link layer — framing, error detection (CRC, checksum), MAC protocols (CSMA/CD, ALOHA, token ring), sliding window, Go-Back-N, selective repeat",
          "Network layer — IPv4 addressing, subnetting, CIDR, ARP, ICMP, routing algorithms (Dijkstra, Bellman-Ford), distance vector vs link-state, NAT",
          "Transport layer — TCP vs UDP, 3-way handshake, flow control, congestion control (slow start, AIMD, fast retransmit), TCP timers and state machine",
          "Application layer — DNS resolution, HTTP/HTTPS methods, FTP, SMTP, socket programming, CDN and proxy concepts",
          "Network security — symmetric vs asymmetric encryption, SSL/TLS handshake, digital certificates, firewalls, VPN, wireless security (WPA2), common attacks",
        ],
      },
      {
        name: "Algorithms",
        topics: [
          "Algorithm analysis — Big-O, Omega, Theta, Master theorem, recurrences",
          "Greedy algorithms — activity selection, Huffman coding, Kruskal's and Prim's MST",
          "Divide and conquer — merge sort, quick sort, binary search, Strassen matrix multiplication",
          "Dynamic programming — memoization vs tabulation, LCS, LIS, 0/1 knapsack, matrix chain",
          "Graph algorithms — BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, topological sort",
        ],
      },
      {
        name: "Theory & Compilers",
        topics: [
          "Theory of computation — DFA, NFA, PDA, Turing machines, pumping lemma, decidability, complexity classes",
          "Compiler design — lexical analysis, LL(1) and LR parsing, syntax-directed translation, intermediate code, optimization",
          "Computer organization — pipelining, data/control hazards, cache hierarchy, memory mapping, RISC vs CISC ISA",
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
          "Cell biology and metabolism — cell organelles, glycolysis, citric acid cycle, oxidative phosphorylation, ATP yield",
          "Enzyme kinetics — Michaelis-Menten, Km, Vmax, competitive vs non-competitive inhibition, allosteric regulation",
          "Genetics — Mendelian inheritance, dominance, linkage, molecular genetics (replication, transcription, translation, mutations)",
          "Amino acids and protein structure — 20 standard amino acids, peptide bonds, primary/secondary/tertiary/quaternary structure, protein folding and denaturation",
          "Cardiovascular and respiratory physiology — cardiac cycle, Frank-Starling law, blood pressure regulation, gas exchange, O₂-CO₂ transport, ventilation-perfusion",
          "Endocrine and nervous systems — hormone classes, receptor mechanisms, action potential, synaptic transmission, homeostatic feedback",
        ],
      },
      {
        name: "Chemical & Physical Foundations",
        topics: [
          "General chemistry — kinetics, thermodynamics, acid-base equilibria, buffers, solubility",
          "Organic chemistry — functional groups, nucleophilic substitution, elimination, addition, carbonyl reactions",
          "Electrochemistry — galvanic vs electrolytic cells, standard reduction potentials, Nernst equation, Faraday's laws",
          "Physics — fluids (Bernoulli, Pascal), electricity, optics (lenses, mirrors), thermodynamics, wave phenomena",
        ],
      },
      {
        name: "Psychological, Social, Biological Foundations of Behavior",
        topics: [
          "Sensation and perception",
          "Learning and memory",
          "Biological bases of behavior — brain structures, neurotransmitters, sleep stages, theories of emotion, psychological disorders and their neurological correlates",
          "Identity, attitudes, and group behavior — self-concept, stereotypes, prejudice, conformity, obedience, group dynamics, social influence, bystander effect",
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
          "Searching and sorting — linear search, binary search, selection sort, insertion sort, merge sort; sequential vs binary comparison, sort stability, iterative vs recursive implementations",
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
    blurb: "Linear algebra, probability, optimization, neural nets, unsupervised learning, transformers, generative AI, and reinforcement learning.",
    subjects: [
      {
        name: "Math & Stats",
        topics: [
          "Linear algebra — vectors, matrices, eigenvalues",
          "Probability — Bayes, distributions, MLE vs MAP",
          "Calculus — gradients, chain rule",
          "Information theory — entropy, KL divergence",
          "Optimization algorithms — SGD, momentum, RMSprop, Adam, AdaGrad, warm-up and cosine decay schedules, learning rate finders",
        ],
      },
      {
        name: "Models",
        topics: [
          "Linear and logistic regression",
          "Decision trees and ensembles",
          "Neural networks — backpropagation",
          "Convolutional networks",
          "Recurrent networks and sequence models — RNN, vanishing gradients, LSTM gates, GRU, bidirectional RNN, seq2seq encoder-decoder",
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
        name: "Unsupervised Learning",
        topics: [
          "Clustering — k-means, k-means++, hierarchical clustering, DBSCAN, silhouette score, elbow method",
          "Dimensionality reduction — PCA via SVD, kernel PCA, t-SNE, UMAP; autoencoder as encoder-decoder compressor",
          "Self-supervised and contrastive learning — masked autoencoders, SimCLR, BYOL, momentum encoder, contrastive loss",
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
    blurb: "Distributed systems, databases, APIs, scaling, and microservices — interview-ready.",
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
      {
        name: "Microservices & Cloud-Native",
        topics: [
          "Service decomposition — bounded contexts, domain-driven design, strangler-fig migration from monolith",
          "Inter-service communication — synchronous REST/gRPC vs async events, service discovery, circuit breaker, bulkhead",
          "Data patterns — database-per-service, CQRS, event sourcing, saga pattern for distributed transactions",
          "API gateway and BFF — authentication, rate limiting, request aggregation, backend-for-frontend pattern",
          "Container orchestration — Kubernetes pods/deployments/services, HPA, rolling vs blue-green vs canary deploys",
        ],
      },
    ],
  },
  {
    id: "economics",
    name: "Economics",
    region: "Self-study · AP · College",
    blurb: "Micro, macro, behavioral economics, and financial markets — AP, college-level, and CFA Level 1 ready.",
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
      {
        name: "Financial Markets & Instruments",
        topics: [
          "Bond pricing and duration — coupon bonds, YTM, duration, convexity, interest rate risk",
          "Equity valuation — dividend discount model, P/E ratio, EV/EBITDA, free cash flow, DCF",
          "Portfolio theory — risk-return tradeoff, diversification, efficient frontier, CAPM, Sharpe ratio",
          "Derivatives — call/put options, Black-Scholes intuition, futures, forwards, hedging strategies",
          "Market efficiency — EMH weak/semi-strong/strong forms, anomalies, technical vs fundamental analysis",
        ],
      },
    ],
  },
];

export function getCurriculum(id: string): Curriculum | undefined {
  return CURRICULA.find((c) => c.id === id);
}
