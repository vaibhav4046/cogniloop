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
          "Solid state chemistry — classification of solids (ionic, covalent, molecular, metallic); crystal lattice and unit cells (simple cubic, BCC, FCC); packing efficiency and coordination number (12 for FCC/HCP); radius ratios for ionic solids; point defects: Schottky (cation-anion pair missing, lowers density), Frenkel (cation displaced to interstitial, common in AgCl); interstitial and impurity defects; band theory: valence vs conduction band, conductors/semiconductors/insulators; n-type vs p-type semiconductors (doping); ferromagnetism, paramagnetism, ferrimagnetism",
          "Chemical kinetics — rate of reaction, rate laws (differential and integrated), order and molecularity, zero/first/second-order half-lives, Arrhenius equation (activation energy Ea, frequency factor A, k = Ae^(−Ea/RT)), collision theory vs transition-state theory, pseudo-first-order reactions, mechanisms and rate-determining step",
          "Electrochemistry — electrolytic cells, Faraday's laws, electrode potentials, Nernst equation",
          "p-block elements — Group 13 (boron: covalent bonding, anomalous behavior vs Al, BF₃ as Lewis acid, borax and boric acid structure); Group 14 (carbon allotropes: diamond cubic lattice, graphite layers, fullerenes; silica and silicate structures; inert-pair effect: +2 vs +4 stability in Sn/Pb); Group 15 (nitrogen: dinitrogen inertness, Haber process for NH₃, Ostwald process for HNO₃, phosphorus allotropes, oxoacids of P and their basicity: H₃PO₄ triprotic vs H₃PO₃ diprotic vs H₃PO₂ monoprotic); Group 16 (oxygen allotropes, ozone structure — bent with resonance, ozone layer depletion; sulfur allotropes — rhombic vs monoclinic, contact process for H₂SO₄, oleum/pyrosulfuric acid); Group 17 halogens (trends: bond dissociation energy, electron affinity, oxidizing power; HF anomaly — H-bonding, high boiling point; oxoacids of Cl: HOCl, HClO₂, HClO₃, HClO₄ — acidity order; interhalogen compounds ClF₃, IF₅, IF₇); Group 18 noble gases (full-shell electronic stability, xenon compounds: XeF₂ linear, XeF₄ square planar, XeF₆ distorted octahedral, XeOF₂); periodic trends across p-block: decreasing metallic character left-to-right, inert-pair effect down groups, anomalous behavior of first member in each group",
          "Surface chemistry — adsorption: physisorption (van der Waals, reversible, multilayer) vs chemisorption (covalent, irreversible, monolayer, higher Ea); Freundlich isotherm: x/m = Kp^(1/n), log(x/m) = log K + (1/n)log p; Langmuir isotherm: monolayer assumption, saturation at high p; catalysis: heterogeneous (adsorption → surface reaction → desorption, promoters/poisons, shape selectivity in zeolites), homogeneous, enzyme catalysis (lock-and-key specificity); colloids: lyophilic (stable, reversible — gels, starch) vs lyophobic (unstable, irreversible — gold sol, AgCl sol); particle size 1–1000 nm; preparation via peptization and condensation; purification by dialysis, electrodialysis, ultrafiltration; properties: Tyndall effect (light scattering), Brownian motion, electrophoresis, coagulation (Hardy-Schulze rule: Al³⁺ > Ca²⁺ > Na⁺ for negative sol; gold number: lower = better protective colloid); emulsions: O/W (milk) vs W/O (butter), emulsifying agents, demulsification; micelles — CMC, soaps/detergents cleansing action",
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
          "Sequences and series — arithmetic progression (nth term, Sn), geometric progression (sum, infinite GP), arithmetic-geometric series, binomial theorem (general term, middle term, coefficients), sum of special series (Σn, Σn², Σn³)",
          "Trigonometry and inverse trigonometric functions — trigonometric ratios and identities (Pythagorean, reciprocal), compound angle formulas (sin/cos/tan of A±B), double-angle and half-angle formulas, product-to-sum and sum-to-product identities, general solutions of trigonometric equations (sin θ = k → θ = nπ + (−1)ⁿ arcsin k; cos θ = k, tan θ = k), inverse functions: domain and range of arcsin/arccos/arctan, principal values, key identities (arcsin x + arccos x = π/2, arctan x + arccot x = π/2, arctan x + arctan y), properties of triangles — sine rule, cosine rule, area = ½ ab sin C, heights and distances applications",
        ],
      },
    ],
  },
  {
    id: "neet",
    name: "NEET UG",
    region: "India · Medical",
    blurb: "Class 11–12 Physics, Chemistry, and Biology (NCERT-aligned) — full chapter coverage for the actual NEET exam.",
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
          "Biological classification and diversity of life — 5-kingdom system (Monera, Protista, Fungi, Plantae, Animalia), kingdom characteristics and distinguishing features, major animal phyla (Porifera, Coelenterata, Platyhelminthes, Nematoda, Annelida, Arthropoda, Mollusca, Echinodermata, Chordata — body plans, symmetry, coelom, notochord), plant kingdom divisions (algae, bryophytes, pteridophytes, gymnosperms, angiosperms — alternation of generations, reproductive structures), viruses, viroids, and lichens",
          "Biomolecules — carbohydrates: monosaccharides (glucose, fructose, galactose), disaccharides (maltose, sucrose, lactose — reducing vs non-reducing), polysaccharides (starch, cellulose, glycogen — structure and function); amino acids (20 standard, R-group classification, essential vs non-essential, zwitterion form at physiological pH), peptide bonds (condensation, hydrolysis), protein levels: 1° aa sequence, 2° α-helix and β-pleated sheet (H-bonds), 3° tertiary fold (disulfide bridges, hydrophobic interactions), 4° quaternary aggregation (e.g. haemoglobin); lipids: saturated vs unsaturated fatty acids, triglycerides (glycerol + 3 FA, energy storage), phospholipids (amphipathic — membrane bilayer formation), steroids (cholesterol, testosterone, cortisol — no FA, fused ring), waxes; nucleic acids: DNA double helix (Watson-Crick B-form, antiparallel strands: 5′→3′ paired with 3′→5′; A-T 2 H-bonds, G-C 3 H-bonds; Chargaff's rules: A=T, G=C), RNA types: mRNA (genetic code, codons), tRNA (anticodon loop, charged by aminoacyl-tRNA synthetase), rRNA (ribosome component); enzymes: holoenzyme = apoenzyme + cofactor (coenzyme organic e.g. NAD⁺/FAD, metal-ion inorganic e.g. Mg²⁺/Zn²⁺), active site, lock-and-key vs induced-fit model, Michaelis-Menten kinetics: Km = substrate concentration at half Vmax (low Km = high affinity), competitive inhibition (↑Km, Vmax unchanged — overcome by excess substrate), non-competitive inhibition (↓Vmax, Km unchanged — not overcome), allosteric regulation (effector binds away from active site) and feedback inhibition in metabolic pathways",
        ],
      },
      {
        name: "Physics",
        topics: [
          "Mechanics and rotational dynamics",
          "Thermodynamics",
          "Waves, oscillations and SHM — simple harmonic motion: equation x = A sin(ωt + φ), period T = 2π/ω, velocity v = ±ω√(A²−x²), acceleration a = −ω²x; energy in SHM (total = ½mω²A², KE and PE alternate); spring-mass system (ω = √(k/m)), simple pendulum (ω = √(g/L), small-angle approximation, time period independent of amplitude); wave motion: transverse vs longitudinal, wave equation y = A sin(kx−ωt), wave speed v = λf; speed of sound in medium (v = √(B/ρ)), speed in string (v = √(T/μ)); principle of superposition, standing waves, nodes and antinodes, harmonics and overtones, resonance; beats (f_beat = |f₁−f₂|) and their applications; Doppler effect (f_obs = f_src·(v ± v_obs)/(v ∓ v_src)), applications to SONAR and speed radars",
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
          "Solutions and colligative properties — vapour pressure and Raoult's law (ideal solutions, positive/negative deviations, azeotropes), colligative properties: relative lowering of vapour pressure (ΔP/P° = x_solute), elevation of boiling point (ΔTb = Kb·m), depression of freezing point (ΔTf = Kf·m), osmotic pressure (π = iMRT), Van't Hoff factor i for electrolytes (degree of dissociation α, association), abnormal molar masses, Henry's law for gas solubility in liquids",
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
    blurb: "Data structures, algorithms, OS, DBMS, computer networks, compiler theory, digital logic, and engineering math — 8 standalone subjects for GATE prep.",
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
          "Calculus and numerical methods — limits, continuity, partial derivatives, maxima/minima and saddle points, Lagrange multipliers; definite integrals, integration by parts, Green's/Stokes'/Gauss' theorems; first-order ODEs (separable, exact, integrating factor), second-order linear ODEs with constant coefficients; numerical methods: bisection method, Newton-Raphson root-finding, Gaussian elimination and LU decomposition, Euler's and Runge-Kutta methods for ODEs, numerical integration (trapezoidal and Simpson's rule)",
        ],
      },
      {
        name: "Digital Logic Design",
        topics: [
          "Boolean algebra and minimization — Boolean identities, SOP/POS canonical forms, K-map simplification (2–5 variables), Quine-McCluskey method",
          "Number systems and binary arithmetic — base conversions, 1's/2's complement, signed overflow, BCD encoding, IEEE 754 floating-point basics",
          "Combinational circuits — half/full adder/subtractor, multiplexers, demultiplexers, encoders, priority encoders, decoders, ROM and PLA implementations",
          "Sequential circuits — SR, JK, D, T flip-flops; setup/hold time, race conditions; shift registers (SISO/SIPO/PISO/PIPO); ripple and synchronous counters; ring and Johnson counters",
          "Finite state machines — Mealy vs Moore models, state diagrams, state transition tables, state minimization, hazards in combinational and sequential logic",
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
          "Backtracking and string algorithms — N-Queens, Hamiltonian path, graph coloring via systematic backtracking with pruning; KMP failure function construction, Rabin-Karp rolling hash, Z-algorithm for pattern matching; amortized analysis (aggregate, accounting, potential methods)",
        ],
      },
      {
        name: "Theory & Compilers",
        topics: [
          "Theory of computation — DFA, NFA, PDA, Turing machines, pumping lemma, decidability, complexity classes",
          "Compiler design — lexical analysis, LL(1) and LR parsing, syntax-directed translation, intermediate code, optimization",
          "Computer organization — pipelining, data/control hazards, cache hierarchy, memory mapping, RISC vs CISC ISA",
          "NP-completeness and reductions — P vs NP, Cook-Levin theorem, polynomial-time reductions, canonical NP-complete problems (SAT, 3-SAT, vertex cover, clique, subset sum, Hamiltonian cycle), NP-hard vs NP-complete distinction, approximation strategies",
          "Formal grammars and automata — regular expression to NFA/DFA construction, DFA minimization, CFL pumping lemma, Chomsky normal form, CYK parsing algorithm, closure properties of regular and context-free languages, non-regular and non-CFL proof techniques",
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
          "Immunology and the immune response — innate vs adaptive immunity, B-cell activation and antibody isotypes (IgM/IgG/IgA/IgE/IgD), T-cell classes (CD4⁺ helper, CD8⁺ cytotoxic, Treg), MHC class I vs II antigen presentation, complement system (classical, lectin, alternative pathways), clonal selection, active vs passive immunity, and vaccine types (live-attenuated, inactivated, subunit, mRNA)",
        ],
      },
      {
        name: "Chemical & Physical Foundations",
        topics: [
          "General chemistry — kinetics, thermodynamics, acid-base equilibria, buffers, solubility",
          "Organic chemistry — functional groups, nucleophilic substitution, elimination, addition, carbonyl reactions",
          "Stereochemistry and spectroscopy — R/S and E/Z configuration, optical activity, enantiomers, diastereomers, meso compounds, IR (carbonyl, O–H stretches), ¹H NMR (chemical shift, coupling, integration), mass spectrometry fragmentation patterns",
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
    blurb: "Linear algebra, probability, optimization, neural nets, unsupervised learning, transformers, generative AI, reinforcement learning, and production MLOps.",
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
          "Model evaluation and validation — k-fold and stratified cross-validation, bias-variance tradeoff (underfitting vs overfitting), evaluation metrics (precision, recall, F1-score, ROC-AUC, confusion matrix), hyperparameter tuning (grid search, random search, Bayesian optimization), data leakage, and train/validation/test split discipline",
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
      {
        name: "MLOps & Production ML",
        topics: [
          "Model serving and deployment — REST vs gRPC inference APIs, online vs batch inference, model registry and versioning (MLflow Model Registry), ONNX portability, containerization, blue-green and canary deploys, rollback strategies",
          "Feature engineering and stores — numeric/categorical encoding, imputation, feature scaling; feature store concepts (Feast, Tecton): point-in-time correctness, training-serving skew, real-time vs batch feature pipelines",
          "ML monitoring and drift detection — data drift (distribution shift, PSI, KS test, MMD), concept drift (label shift, covariate shift), model performance degradation, alerting thresholds, feedback loops for retraining triggers",
          "Experiment tracking and reproducibility — MLflow Tracking (runs, parameters, metrics, artifacts), Weights & Biases, DVC for data versioning, containerized training environments, seed management, model lineage and governance",
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
          "Design a real-time collaborative editor (Google Docs / Figma) — operational transforms vs CRDTs, cursor and presence broadcasting, WebSocket rooms, conflict resolution, and offline reconciliation",
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
          "Business cycles and economic indicators — cycle phases (expansion, peak, recession, trough), NBER dating, leading indicators (yield curve inversion, building permits, stock prices, new orders), lagging indicators (unemployment, CPI, prime rate), coincident indicators (GDP, payroll employment, personal income)",
          "Economic growth — Solow model, human capital, technological progress",
        ],
      },
      {
        name: "Behavioral & International",
        topics: [
          "Behavioral economics — biases, heuristics, prospect theory, nudges",
          "International trade — comparative advantage, trade policy, tariffs, WTO",
          "Exchange rates — purchasing power parity, balance of payments, forex markets",
          "Development economics — Sen's capability approach and Human Development Index (HDI), poverty traps (geographic, institutional, behavioral), inequality measures: Gini coefficient and Lorenz curve, Kuznets curve, Lewis dual-economy model and structural transformation, conditional vs absolute convergence, effectiveness of foreign aid (Sachs vs Easterly debate), randomized controlled trials in development research (Banerjee & Duflo, J-PAL), microfinance",
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
