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
          "Semiconductor electronics and logic gates — energy bands: conductors (overlapping valence and conduction bands), insulators (Eg > 3 eV), semiconductors (small Eg — Si 1.1 eV, Ge 0.7 eV); intrinsic semiconductors: thermally generated electron-hole pairs, equal carrier concentrations, conductivity increases with temperature; extrinsic semiconductors: n-type (pentavalent donor impurity e.g. P, As — majority carriers: electrons, minority: holes) and p-type (trivalent acceptor impurity e.g. B, In — majority carriers: holes, minority: electrons); p-n junction: depletion region formed by diffusion, built-in contact potential (~0.7 V Si, ~0.3 V Ge); forward bias: positive terminal to p-side, narrows depletion region, exponential I-V curve I = I₀(e^(eV/kT)−1), threshold ~0.7 V Si; reverse bias: widens depletion region, only small reverse saturation current; rectification: half-wave (one diode, efficiency 40.6%, ripple factor 1.21) and full-wave bridge rectifier (four diodes, efficiency 81.2%, ripple factor 0.48); Zener diode: reverse breakdown at V_Z (typically 3–15 V), used for voltage regulation — maintains constant V_out = V_Z across a load, requires series resistor R_S = (V_in − V_Z)/I_Z; transistor (BJT): npn and pnp types; three regions: emitter (heavily doped), base (thin, lightly doped ~μm), collector (moderately doped); transistor action: emitter injects minority carriers into base, most diffuse to collector; current relationships: I_E = I_C + I_B; current gain α = I_C/I_E ≈ 0.95–0.99 (CB configuration); common-emitter β = I_C/I_B = α/(1−α) ≈ 50–300; CE configuration: input between base-emitter, output between collector-emitter — used as switch (saturation: V_CE ≈ 0 V, 'ON'; cut-off: I_B = 0, 'OFF') and amplifier (active region, voltage gain A_V = −β×R_C/r_i, phase inversion); logic gates from JEE perspective: AND (Y = A·B — output HIGH only when both inputs HIGH), OR (Y = A+B — output HIGH when at least one input HIGH), NOT/inverter (Y = Ā — single input, output flips); NAND (universal gate — combination of AND+NOT, can implement any Boolean function) and NOR (also universal — combination of OR+NOT); XOR (Y = A⊕B = AĀ+ĀB — output HIGH when inputs differ, used in half-adder); De Morgan's theorems: (A·B)‾ = Ā+B̄ and (A+B)‾ = Ā·B̄; truth tables and Boolean algebra simplification; a 2–4 question JEE Main chapter (NCERT Class 12 Ch 14) previously absent from the JEE Physics pack",
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
          "Alcohols, phenols and ethers — alcohol classification: primary (−CH₂OH), secondary (>CHOH), tertiary (>C(OH)<) based on degree of carbon bearing −OH; IUPAC nomenclature (alkan-1-ol, propan-2-ol); physical properties: intermolecular H-bonding raises boiling point well above parent alkanes, water solubility decreases with chain length; preparation: acid-catalyzed hydration of alkenes (Markovnikov → 2°/3° alcohols), reduction of aldehydes/ketones with NaBH₄ (mild) or LiAlH₄ (strong), Grignard reaction with aldehyde/ketone/CO₂; reactions of alcohols: (i) dehydration — H₂SO₄/170°C gives alkene (Zaitsev rule), 140°C gives ether; (ii) oxidation — primary alcohol → aldehyde (PCC/mild) then → carboxylic acid (KMnO₄/K₂Cr₂O₇); secondary → ketone; tertiary — no oxidation; (iii) Lucas test: ZnCl₂/conc. HCl — tertiary reacts immediately (cloudy), secondary in ~5 min, primary no reaction at RT; (iv) esterification with carboxylic acid + H⁺ catalyst (Fischer, reversible, equilibrium-driven); (v) reaction with Na metal → alkoxide + H₂↑ (confirms acidic O−H); phenol acidity: phenoxide ion is resonance-stabilized (6 structures), pKa ≈ 10 — more acidic than alcohols (pKa ≈ 16) but less than carboxylic acids (pKa ≈ 5); reactions of phenol: −OH is strongly activating ortho/para-director for EAS; bromination with Br₂ water → 2,4,6-tribromophenol (precipitate, confirmatory test); nitration gives o-/p-nitrophenol; Kolbe-Schmitt reaction (NaOH, CO₂, pressure → sodium salicylate → salicylic acid); Reimer-Tiemann reaction (CHCl₃/NaOH → o-hydroxybenzaldehyde); picric acid (2,4,6-trinitrophenol) formation; ethers: Williamson synthesis — R-O⁻Na⁺ + R′-X → R-O-R′ (SN2 mechanism, must use primary alkyl halide to avoid elimination); cleavage of ethers: HI/HBr at high temperature splits C−O bond (1° → SN2 gives alcohol + alkyl iodide; 3° → SN1); epoxides (cyclic ethers): ring-opening under acid catalysis (nucleophile attacks more substituted carbon — Markovnikov) vs base/nucleophile (attacks less hindered carbon — anti-Markovnikov, with inversion of configuration); a 3–5 question JEE Main chapter (NCERT Class 12 Ch 11) covering most of the functional-group organic chemistry tested in JEE Main",
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
          "Statistics — measures of central tendency: arithmetic mean for raw data and grouped data (direct method, assumed mean/step-deviation method), combined mean of two groups; median for raw data (middle value) and grouped data (l + ((n/2 − cf)/f)·h formula, where l = lower class boundary, cf = cumulative frequency before median class, f = median-class frequency, h = class width); mode for raw data (most frequent value) and grouped data (l + ((f₁ − f₀)/(2f₁ − f₀ − f₂))·h, where f₁ = modal-class freq, f₀/f₂ = adjacent-class freqs); empirical relation: mode ≈ 3 median − 2 mean; measures of dispersion: range, mean deviation about mean (Σ|xᵢ − x̄|/n) and about median (Σ|xᵢ − M|/n) for both ungrouped and grouped data; variance σ² = Σfᵢ(xᵢ − x̄)²/N with shortcut formula σ² = Σfᵢxᵢ²/N − (Σfᵢxᵢ/N)² and step-deviation form σ² = h²(Σfᵢdᵢ²/N − (Σfᵢdᵢ/N)²) where dᵢ = (xᵢ − A)/h; standard deviation σ = √variance; effect of shift and scale: if y = a + bx then σ_y = |b|·σ_x; coefficient of variation CV = (σ/x̄)·100 — used to compare consistency/variability of two frequency distributions; a lower CV indicates greater consistency; a 1–2 question JEE Main chapter (NCERT Class 11 Ch 15) completing the JEE Math syllabus",
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
          "Gravitation and properties of bulk matter — universal law of gravitation: F = Gm₁m₂/r², G = 6.67×10⁻¹¹ N·m²/kg²; gravitational field g = GM/R² at surface; variation of g with altitude: g' = g(1 − 2h/R) for h << R, exact formula g_h = gR²/(R+h)²; variation with depth: g' = g(1 − d/R); variation with latitude: g_equator < g_poles (Earth's rotation and oblateness); gravitational potential energy U = −GMm/r (negative, zero at infinity); escape velocity: v_e = √(2GM/R) = √(2gR) ≈ 11.2 km/s for Earth; orbital velocity: v₀ = √(GM/r) = √(gR²/r), for near-Earth orbit v₀ ≈ 7.9 km/s; geostationary satellite: T = 24 h, altitude ≈ 36000 km, v ≈ 3.1 km/s, orbit must be equatorial; Kepler's laws — 1st: elliptical orbit, Sun at focus; 2nd: equal areas in equal times (angular momentum conservation); 3rd: T² ∝ r³ (T²/r³ = 4π²/GM); elastic properties: stress = F/A (Pa), strain = ΔL/L (dimensionless), Young's modulus Y = stress/strain = FL/(AΔL) (steel > copper > rubber), bulk modulus B = −VΔP/ΔV, shear modulus G = shear stress/shear strain, Poisson's ratio σ = −lateral strain/longitudinal strain (0 < σ < 0.5); elastic potential energy U = ½ × stress × strain × volume = F²L/(2AY); fluid statics: pressure P = P₀ + ρgh, Pascal's law (pressure transmitted equally), buoyancy: Archimedes' principle — upthrust = weight of fluid displaced = ρ_fluid·V_submerged·g; floatation condition (ρ_body = ρ_fluid for neutral, < for floating); surface tension T: force per unit length (N/m), surface energy per unit area; excess pressure inside drop ΔP = 2T/r, inside soap bubble ΔP = 4T/r (two surfaces); capillary rise h = 2T cos θ/(ρrg) — mercury shows capillary depression (θ > 90°); fluid dynamics: equation of continuity A₁v₁ = A₂v₂ (conservation of mass, incompressible flow); Bernoulli's equation P + ½ρv² + ρgh = const (conservation of energy per unit volume); applications: Torricelli's theorem v_efflux = √(2gh), lift on aerofoil, venturimeter; viscosity η (Pa·s): Newton's law of viscosity F = ηA(dv/dy); Stokes' law F = 6πηrv for sphere; terminal velocity v_t = 2r²(ρ − ρ_f)g/(9η); Reynolds number Re = ρvd/η (< 2000 laminar, > 3000 turbulent); a 8–12 question NEET Physics combination of NCERT Class 11 Ch 8 (Gravitation) and Ch 9–10 (Mechanical Properties) covering a major NEET section previously absent from the pack",
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
          "Haloalkanes and haloarenes — classification and nomenclature (alkyl halides: methyl, primary, secondary, tertiary); effect of halogen on reactivity; nucleophilic substitution: SN1 (carbocation intermediate, first-order kinetics, racemization, favoured by 3° substrate and polar protic solvents like ethanol/water) vs SN2 (concerted backside attack, second-order kinetics, Walden inversion of configuration, favoured by 1° substrate/polar aprotic solvent/strong nucleophile like NaI in acetone); factors affecting rate: substrate structure, leaving group ability (I⁻ > Br⁻ > Cl⁻ > F⁻), solvent polarity, nucleophile strength; elimination reactions: E1 (unimolecular, carbocation, Zaitsev product — more substituted alkene) vs E2 (bimolecular, anti-periplanar geometry, Hofmann product with bulky base); competition between substitution and elimination; haloarenes: sp² C–X bond with partial double-bond character (shorter, stronger than alkyl C–X), ipso substitution only, activating ortho/para directors on ring; Grignard reagent preparation (RMgX in dry ether, moisture-free) and reactions with aldehydes, ketones, CO₂ (→ carboxylic acid), water; polyhalogen compounds: CHCl₃ (chloroform, anaesthetic), CCl₄ (solvent, fire extinguisher), iodoform (CHI₃, antiseptic, iodoform test for CH₃CO–), DDT (insecticide, biomagnification), freons/CFCs (refrigerants, ozone-layer depletion via Cl· radical chain); a 3–5 question NEET Chemistry chapter (NCERT Class 12 Ch 10) previously absent from the pack",
          "Amines and diazonium salts — classification: amines as N-substituted derivatives of NH₃; 1° (one H replaced, RNH₂), 2° (R₂NH), 3° (R₃N) based on number of alkyl/aryl groups on N; aromatic amine: aniline (C₆H₅NH₂), N-methyl and N,N-dimethylaniline; nomenclature: alkanamines (IUPAC) vs trivial names (methylamine, dimethylamine, trimethylamine); physical properties: inter-molecular H-bonding in 1°/2° amines (b.p. higher than alkanes of similar mass, but lower than alcohols because N−H⋯N bond weaker than O−H⋯O); water solubility via H-bonding with water; basicity of amines: lone pair on N accepts H⁺; Kb order in solution — 2° aliphatic > 1° aliphatic > NH₃ > 3° aliphatic (steric hindrance at N reduces solvation of 3° ammonium ion despite inductive effect); aromatic amines much weaker bases than aliphatic (aniline pKb ≈ 9.4 vs methylamine pKb ≈ 3.4) because lone pair delocalised into ring (4 resonance structures show partial π-bond character on C−N bond, reducing availability for H⁺); electron-withdrawing groups on ring (−NO₂ at para/ortho) further decrease basicity; −CH₃ and −OCH₃ at para increase basicity slightly; preparation of amines: (i) reduction of nitro compounds: Ar−NO₂ + Fe/HCl (or Sn/HCl or H₂/Ni) → Ar−NH₂ (industrial route to aniline from nitrobenzene); (ii) reduction of nitriles: R−C≡N + LiAlH₄ → R−CH₂−NH₂ (gives 1° amine with one extra C); (iii) reduction of amides: RCONH₂ + LiAlH₄ → R−CH₂−NH₂; (iv) Hofmann degradation: primary amide + Br₂/NaOH → 1° amine with one fewer carbon (RCONH₂ → RNH₂ + CO₂; the carbonyl C is lost as CO₂); (v) Gabriel phthalimide synthesis: phthalimide + KOH → potassium phthalimide → + RX (alkyl halide, SN2) → N-alkylphthalimide → + N₂H₄ (hydrazinolysis) → pure 1° amine + phthalhydrazide; advantage: avoids over-alkylation (gives exclusively 1° amine, aromatic amines cannot be made by this method); reactions of amines: (i) acylation: R−NH₂ + RCOCl → RCONHR + HCl (Schotten-Baumann uses NaOH to neutralise HCl); product is an amide, used to protect −NH₂ group; (ii) carbylamine (isocyanide) test for 1° amines only: R−NH₂ + CHCl₃ + 3 KOH → R−N≡C: (isocyanide, foul smell) + 3 KCl + 3 H₂O; 2° and 3° amines give negative test — used to distinguish primary amines; (iii) Hinsberg test using benzene sulfonyl chloride (C₆H₅SO₂Cl): 1° amine → C₆H₅SO₂NHR (N−H acidic) → soluble in NaOH as salt; 2° amine → C₆H₅SO₂NR₂ (no acidic N−H) → insoluble in NaOH; 3° amine → no reaction (no N−H); (iv) reaction with HNO₂ (generated in situ: NaNO₂ + HCl): 1° aliphatic amine at RT → unstable diazonium salt → N₂↑ + R⁺ → alcohol/alkene (N₂ evolution confirms 1° aliphatic amine); 1° aromatic amine at 0–5°C → stable arenediazonium salt ArN₂⁺Cl⁻; 2° amine → N-nitrosoamine (yellow oil, R₂N−N=O); 3° amine → C-nitroso compound (ring nitrosation for ArNR₂); diazonium salts (Ar−N₂⁺X⁻): must be kept at 0–5°C — unstable above 5°C; Sandmeyer reaction: ArN₂⁺ + CuCl/HCl → ArCl; + CuBr/HBr → ArBr; + CuCN/KCN → ArCN; Gattermann reaction (Cu powder, not cuprous salt): ArN₂⁺ → ArCl or ArBr; Balz-Schiemann reaction: ArN₂⁺BF₄⁻ (formed with HBF₄) → heat → ArF + N₂ + BF₃ (only route to aryl fluorides via diazonium); reduction: ArN₂⁺ + H₃PO₂ → ArH (deamination — introduces H in place of −NH₂); coupling reactions (electrophilic substitution on activated ring): ArN₂⁺ + phenol in alkaline medium → p-hydroxyazo compound (orange-red dye); ArN₂⁺ + aniline in slightly acidic medium → p-aminoazo compound; azo dyes are para-coupled preferentially; biological importance of diazonium chemistry in dye synthesis and pharmaceutical synthesis; a 3–5 question NEET Chemistry chapter (NCERT Class 12 Ch 13) — frequently tested via carbylamine test, Hinsberg test, Sandmeyer reaction, and basicity comparisons — previously absent from the pack",
          "Inorganic chemistry — coordination, p-block, d-block",
          "Biomolecules (NCERT Class 12 Ch 14) — carbohydrates: reducing sugars (free anomeric −OH: glucose, fructose, maltose, lactose — give positive Benedict's/Fehling's test) vs non-reducing (sucrose — anomeric C of both glucose and fructose locked in α-1,2-glycosidic bond); D-glucose open-chain (aldohexose, 4 chiral carbons, CHO at C1, −CH₂OH at C6) and cyclic Haworth projection (α-D-glucopyranose: −OH axial at C1; β: equatorial), mutarotation between α/β forms in aqueous solution; polysaccharides: amylose (α-1,4 linkage, unbranched helix, stains blue-black with I₂), amylopectin (α-1,4 main chain + α-1,6 branch points every ~24–30 glucose units), cellulose (β-1,4 linkage, structural, not hydrolysable by human digestive enzymes); amino acids: 20 standard in L-configuration; amphoteric character (zwitterionic form at physiological pH — both +NH₃ and −COO⁻ groups); 9 essential amino acids (His, Ile, Leu, Lys, Met, Phe, Thr, Trp, Val — not synthesised by body); peptide bond (−CO−NH−) formed by condensation of α-carboxyl and α-amino groups; protein denaturation: disrupts 2°, 3°, 4° structure but primary sequence (peptide bonds) remains intact — agents: heat, extreme pH, organic solvents, heavy metal ions, urea; enzymes: holoenzyme = apoenzyme (protein) + cofactor — cofactors are metallic ions (Fe²⁺, Mg²⁺, Zn²⁺, Cu²⁺) or coenzymes (organic, often derived from B-vitamins: NAD⁺/NADH from niacin B3, FAD/FADH₂ from riboflavin B2); vitamins: fat-soluble A, D, E, K (stored in adipose/liver, excess accumulates — toxic) vs water-soluble B-complex and C (excess excreted in urine); deficiency diseases — A: night blindness and xerophthalmia; B1 (thiamine): beriberi; B2 (riboflavin): ariboflavinosis (cracked lips, inflamed tongue); B3 (niacin): pellagra (3 Ds — dermatitis, diarrhoea, dementia); B9 (folic acid): neural tube defects in foetus, megaloblastic anaemia; B12 (cyanocobalamin): pernicious anaemia, neurological degeneration; C (ascorbic acid): scurvy (bleeding gums, impaired collagen synthesis); D (calciferol): rickets in children, osteomalacia in adults; K (phylloquinone): impaired blood clotting (prothrombin synthesis requires K); nucleic acids: phosphodiester backbone linking 3'−OH of one nucleotide to 5'−phosphate of next; DNA double helix — antiparallel strands (5'→3' paired with 3'→5'), deoxyribose sugar, base pairing A=T (2 H-bonds), G≡C (3 H-bonds), Chargaff's rules: [A]=[T], [G]=[C]; RNA: single-stranded, ribose, uracil replaces thymine; a 3–5 question NEET Chemistry chapter (NCERT Class 12 Ch 14) tested alongside the Biology Biomolecules chapter for overlapping but distinct chemical-structure questions",
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
          "Research methods and statistics — experimental design: independent variable (IV, manipulated), dependent variable (DV, measured), control group, confounds, and operational definitions; within-subjects vs between-subjects designs; single-blind and double-blind studies; placebo effect; research types: case studies (in-depth, n=1), naturalistic observation (no manipulation), surveys (self-report bias), correlational studies (r coefficient, direction, strength — correlation ≠ causation), experimental studies (only type that establishes causation), longitudinal vs cross-sectional vs cohort designs; descriptive statistics: mean/median/mode, range, standard deviation (spread around mean), z-scores and normal distribution (68-95-99.7 rule), positive vs negative skew; inferential statistics: null hypothesis (H₀), alternative hypothesis (H₁), Type I error (α — false positive, reject true H₀), Type II error (β — false negative, fail to reject false H₀), p-value (probability of results if H₀ is true), statistical significance (p < 0.05 convention), statistical power (1−β); validity: internal validity (study measures what it intends to — threats: history effect, maturation, selection bias), external validity (generalizability), construct validity (does the measure actually capture the abstract concept), ecological validity (real-world applicability); reliability: test-retest (same results over time), inter-rater reliability (observer agreement), Cronbach's alpha; sampling: random sampling, stratified sampling, convenience sampling, sampling bias, selection bias; APA ethical guidelines: informed consent, right to withdraw, debriefing, confidentiality, minimal harm, IRB oversight",
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
          "Strings and string manipulation — String class and immutability (every operation returns a new String object, original is unchanged); reference vs value equality: == compares object references, equals() compares character content, equalsIgnoreCase() for case-insensitive comparison; key String methods: length() returns character count, charAt(i) returns char at index i (0-based), substring(begin, end) extracts characters from begin up to but not including end, substring(begin) from begin to end, indexOf(str) returns first occurrence or -1 if not found, compareTo(other) returns negative/zero/positive (lexicographic order), trim() strips leading and trailing whitespace, toLowerCase()/toUpperCase() case conversion; concatenation with + operator and type coercion rules: String + int produces String (\"score: \" + 3 → \"score: 3\"), int + int + String requires parentheses to avoid left-to-right int addition; Integer wrapper class: Integer.parseInt(str) converts String → int (throws NumberFormatException on invalid input), Integer.toString(n) or String.valueOf(n) converts int → String, auto-boxing (int ↔ Integer interchangeably in context expecting an object); iterating over characters with a standard for loop using charAt(i) from 0 to s.length()-1; common patterns: building a result String by concatenation inside a loop, counting or finding characters, reversing a String, checking for palindromes; null vs empty string — null means no object (NullPointerException if you call methods on it), \"\" is a valid String with length 0",
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
          "Parallel and distributed computing — sequential vs parallel processing: a sequential program executes one instruction at a time; parallel computing divides a problem into sub-tasks that run simultaneously on multiple processors or cores, reducing wall-clock time when tasks are independent; parallelism requires tasks that do not depend on each other's output (data independence); speedup formula: speedup = time_sequential / time_parallel; Amdahl's Law: speedup is bounded by the fraction of the program that must run sequentially — if 20% must be sequential, maximum speedup is 1/0.2 = 5× regardless of how many processors are added; diminishing returns as more processors are added; parallel computing hardware: multi-core CPUs (multiple processing units on one chip sharing memory), GPUs (thousands of smaller cores for data-parallel workloads like graphics and ML training), distributed memory systems (separate machines connected by a network); parallel algorithms: divide problem into chunks, assign to workers (threads/processes), collect and combine results (map-reduce pattern — map applies a function in parallel, reduce aggregates results); race conditions occur when parallel tasks read/write shared data without coordination — lead to unpredictable results; solutions require synchronization (locks, mutexes) but synchronization can create bottlenecks; distributed computing: multiple networked computers work together on a single computational problem; each node has its own memory and communicates via message passing; examples: SETI@home (volunteer computing), Hadoop/MapReduce, modern cloud batch jobs; advantages: scalability (add more machines), fault tolerance (if one node fails, others continue); challenges: network latency (slower than shared memory), data partitioning, partial failures; real-world applications: scientific simulation (weather modeling, protein folding), big data processing (log analysis, training ML models), real-time systems (financial trading, stream processing); AP CSP exam focus: identify tasks that are parallelizable vs sequential, calculate speedup given parallel/sequential fractions, recognize parallel vs distributed computing trade-offs, describe benefits and limitations of parallel solutions; a core Big Idea 4 topic (Computing Systems and Networks) that appears in AP CSP multiple-choice and free-response — previously absent from the AP CSP pack",
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
          "Anomaly detection and density estimation — statistical methods: z-score, IQR-based outlier flagging, Gaussian (parametric) density estimation; kernel density estimation (KDE): bandwidth h, Gaussian kernel, bias-variance tradeoff; Gaussian mixture models (GMMs): EM algorithm (E-step computes responsibilities, M-step updates μ/Σ/π), BIC for selecting K; one-class SVM (RBF kernel, ν-hyperparameter controls fraction of outliers); Isolation Forest: average path length through random trees, shorter path = anomaly, insensitive to dimensionality; autoencoder-based anomaly detection: high reconstruction error flags unseen patterns; LOF (Local Outlier Factor): compares local reachability density to k-nearest-neighbor densities; evaluation: AUROC, precision-recall on imbalanced positive class; applications — fraud detection, network intrusion detection, predictive maintenance, medical image quality control; distinguishing novelty detection (training on clean data) vs outlier detection (train/test may both contain anomalies)",
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
          "CI/CD for ML pipelines and responsible AI — automated model testing: unit tests (input/output shape, null/edge-case handling), behavioral tests (invariance tests, directional expectation tests, minimum-functionality slice tests), integration tests (end-to-end pipeline); data validation gates: schema enforcement (Great Expectations, Deequ), distribution shift alerts before training, referential integrity checks; automated retraining pipelines: trigger strategies (schedule, drift threshold breach, performance SLO breach), full vs warm-start retraining, evaluation gates before model promotion; champion-challenger A/B routing with statistical significance stopping rules; model documentation: model cards (intended use, out-of-scope uses, evaluation datasets, quantitative results, limitations, ethical considerations), datasheets for datasets; responsible AI and fairness metrics: group fairness — demographic parity (P(Ŷ=1|A=0) = P(Ŷ=1|A=1)), equalized odds (equal TPR and FPR across groups), calibration (predicted probabilities match empirical frequencies per group); impossibility theorem (cannot satisfy all three simultaneously when base rates differ); bias sources: historical bias (labels encode past discrimination), representation bias (undersampled groups), aggregation bias (one model for heterogeneous populations); auditing tools: Fairlearn, AI Fairness 360, Google What-If Tool; privacy-preserving ML: differential privacy (ε-δ guarantee, Laplace/Gaussian mechanism, DP-SGD — clip gradients, add calibrated noise, privacy budget accounting), federated learning (FedAvg: local SGD steps then aggregate weighted gradients, no raw data leaves device, communication cost and non-IID data challenges); regulatory context: EU AI Act risk tiers (unacceptable → limited → high → minimal), NIST AI RMF, model risk management (SR 11-7), audit trails and explainability requirements; tools: SHAP (Shapley values for global/local attribution), LIME (local linear approximation), counterfactual explanations",
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
          "Authentication and authorization patterns — session-based auth (server-side session store, cookie + CSRF token) vs token-based auth (stateless JWT: header.payload.signature, RS256 vs HS256, short-lived access tokens ~15 min + long-lived refresh tokens ~7 d, rotation and revocation challenge); OAuth 2.0 flows: Authorization Code + PKCE (browser/mobile apps), Client Credentials (service-to-service M2M), Implicit flow (deprecated — PKCE supersedes it); OpenID Connect (OIDC) identity layer on top of OAuth (id_token carries user claims); API key authentication (scoped keys, rotation policy, per-key rate limits); RBAC (roles assigned to users, O(1) permission check) vs ABAC (policy engine evaluates user + resource + environment attributes, enables fine-grained access like department == resource.owner) vs ReBAC (relationship graph — Google Zanzibar); SSO and federation: SAML 2.0 SP-initiated and IdP-initiated flows, enterprise IdP integration (Okta, Azure AD); password storage: bcrypt/scrypt/Argon2id with per-user salt — never MD5/SHA; multi-factor auth: TOTP (RFC 6238, 30-second window, HMAC-SHA1 — Google Authenticator), FIDO2/WebAuthn passkeys (asymmetric key pair, no shared secret, phishing-resistant); distributed session management: Redis-backed session store, sticky sessions trade-off vs stateless JWT; common pitfalls: JWT without expiry check on revocation, IDOR (insecure direct object reference), privilege escalation, confused deputy problem in microservices (service A impersonating service B without audience validation in the token)",
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
          "Environmental and resource economics — natural resource economics: exhaustible resources, Hotelling's rule (resource price rises at the interest rate along the optimal extraction path); renewable resources and maximum sustainable yield; negative externalities (pollution): marginal social cost > marginal private cost, welfare loss triangle; Coase theorem (private bargaining reaches efficient outcome when property rights are clear and transaction costs are low, but breaks down at scale); Pigouvian tax set equal to marginal external damage to internalize the externality; market-based instruments: carbon tax (predictable cost, uncertain abatement quantity) vs cap-and-trade / emissions trading scheme (certain quantity via permit cap, price discovered in market — EU ETS, California AB32); tradeable permit allocation (grandfathering vs auctioning); common-pool resources: tragedy of the commons (non-excludable but rival goods lead to overuse — fisheries, groundwater), Elinor Ostrom's polycentric governance as third way (community rules, monitoring, graduated sanctions — Nobel Prize 2009); public goods (non-rival + non-excludable) and free-rider problem; environmental policy evaluation: cost-benefit analysis with discounting (present value of future environmental costs), intergenerational equity, discount rate controversy (Stern vs Nordhaus), precautionary principle; sustainability: weak sustainability (manufactured capital substitutes for natural capital), strong sustainability (critical natural capital is irreplaceable), circular economy and material-flow accounting; environmental Kuznets curve (inverted-U relationship between income and pollution — EKC hypothesis and its critiques); a 3–5 question topic for AP Environmental Science, AP Macro, college environmental economics, and CFA Level 1 ESG investing",
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
