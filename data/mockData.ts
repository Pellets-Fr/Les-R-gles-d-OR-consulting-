// ─────────────────────────────────────────────
//  H Courtage AI — Mock Data (100% statique)
// ─────────────────────────────────────────────

export const PHONE = "418-476-0666";
export const PHONE_HREF = "tel:4184760666";
export const AFFILIATE = "Affilié au Groupe Jetté Assurances inc.";

// ── Partners / Assureurs ────────────────────
export const partners = [
  "Intact Assurance",
  "Belair Direct",
  "Desjardins Assurances",
  "Promutuel",
  "SSQ Assurance",
  "Aviva Canada",
  "La Capitale",
  "Economical",
  "Wawanesa",
  "Co-operators",
  "AXA Canada",
  "Northbridge",
  "Intact Prêts",
  "Allstate",
  "RSA Canada",
  "Zurich Canada",
  "Optimum",
  "Groupe Assurance Abeille",
];

// ── Products ─────────────────────────────────
export const products = [
  {
    id: "auto",
    icon: "Car",
    title: "Assurance Auto",
    description:
      "Protection complète : responsabilité civile, collision, vol, bris de vitres. L'IA compare les 18 assureurs pour trouver votre taux optimal.",
    savings: "Économisez jusqu'à 1 240 $/an",
    badge: null,
    color: "blue",
    features: ["Responsabilité civile jusqu'à 2 M$", "Véhicule de remplacement inclus", "Assistance routière 24/7"],
  },
  {
    id: "hab",
    icon: "Home",
    title: "Assurance Habitation",
    description:
      "Propriétaires ou locataires : protégez vos biens, votre responsabilité et votre tranquillité d'esprit avec une couverture taillée sur mesure.",
    savings: "Couverture optimale, prime ajustée",
    badge: null,
    color: "blue",
    features: ["Valeur à neuf sur vos biens", "Responsabilité civile 1 M$", "Protection dégâts d'eau incluse"],
  },
  {
    id: "cyber",
    icon: "Shield",
    title: "Assurance Cybersécurité",
    description:
      "1 Québécois sur 7 victime de vol d'identité en 2024. Couvrez la fraude en ligne, la restauration d'identité, les frais juridiques et la protection de vos enfants.",
    savings: "Protégez votre identité numérique et celle de vos enfants",
    badge: "Nouveau",
    color: "gold",
    features: ["Couverture jusqu'à 50 000 $", "Restauration d'identité complète", "Protection enfants incluse"],
  },
  {
    id: "multi",
    icon: "Package",
    title: "Multi-produits",
    description:
      "Combinez auto + habitation + cyber dans un seul contrat intelligent. Les rabais se cumulent, la gestion se simplifie.",
    savings: "Bundle intelligent, rabais cumulés",
    badge: "Le + populaire",
    color: "gold",
    features: ["Rabais multi-produits jusqu'à 25 %", "Un seul interlocuteur", "Facturation unifiée mensuelle"],
  },
];

// ── How It Works ─────────────────────────────
export const steps = [
  {
    number: "01",
    icon: "MessageSquare",
    title: "Vous répondez à 5 questions simples",
    description:
      "Pas de formulaire interminable. On pose les bonnes questions pour cerner votre situation en moins de 3 minutes.",
  },
  {
    number: "02",
    icon: "Cpu",
    title: "Agent H analyse votre profil",
    description:
      "Notre moteur IA croise votre profil avec les grilles tarifaires de 18 assureurs et identifie vos opportunités de rabais.",
  },
  {
    number: "03",
    icon: "FileText",
    title: "3 soumissions personnalisées en 24 h",
    description:
      "Vous recevez 3 offres comparées, expliquées en clair. Houssem vous accompagne pour choisir la meilleure.",
  },
];

// ── Why H Courtage AI ─────────────────────────
export const pillars = [
  {
    icon: "User",
    title: "Humain + IA",
    description:
      "L'IA analyse, Houssem valide. Un vrai courtier certifié derrière chaque recommandation — jamais un algorithme livré à lui-même.",
  },
  {
    icon: "Scale",
    title: "Neutralité totale",
    description:
      "On ne travaille pas pour les assureurs. On travaille pour vous. Nos revenus ne changent pas selon l'assureur choisi.",
  },
  {
    icon: "Zap",
    title: "Vitesse réelle",
    description:
      "3 minutes d'analyse, 24 h pour recevoir vos soumissions. Fini d'attendre 5 jours pour avoir un rappel.",
  },
  {
    icon: "Eye",
    title: "Transparence totale",
    description:
      "Vous voyez exactement pourquoi on recommande chaque offre. Comparaison ligne par ligne, sans frais cachés.",
  },
];

// ── Testimonials ─────────────────────────────
export const testimonials = [
  {
    name: "Marc Lavigne",
    location: "Laval, QC",
    avatar: "ML",
    rating: 5,
    savings: "1 180 $",
    text: "J'avais magasiné mes assurances moi-même pendant des années. En 3 minutes avec H Courtage AI, j'ai trouvé une offre 1 180 $ moins chère par année. Houssem a tout expliqué clairement, sans pression.",
    product: "Auto + Habitation",
  },
  {
    name: "Sophie Tremblay",
    location: "Québec, QC",
    avatar: "ST",
    rating: 5,
    savings: "840 $",
    text: "Je ne savais même pas que l'assurance cybersécurité existait pour les particuliers. Après l'analyse, j'ai compris pourquoi c'était essentiel pour ma famille. Le processus était super rapide et Houssem a répondu à toutes mes questions.",
    product: "Habitation + Cyber",
  },
  {
    name: "Mathieu Bouchard",
    location: "Sherbrooke, QC",
    avatar: "MB",
    rating: 5,
    savings: "1 320 $",
    text: "Sceptique au départ — j'avais peur que ce soit une autre plateforme qui collecte mes données pour rien. Finalement, le devis est arrivé en moins de 24 h, c'était 22 % moins cher qu'Intact. Je recommande sans hésitation.",
    product: "Multi-produits",
  },
];

// ── FAQ ─────────────────────────────────────
export const faqs = [
  {
    question: "Est-ce vraiment gratuit ?",
    answer:
      "Oui, à 100 %. L'analyse et les soumissions sont gratuites pour vous. Comme tout courtier certifié, nous sommes rémunérés par les assureurs sous forme de commission — ce qui ne change jamais votre prime ni notre recommandation.",
  },
  {
    question: "L'IA remplace-t-elle mon courtier ?",
    answer:
      "Non. Agent H est un outil d'analyse — il traite les données rapidement et identifie les opportunités. Mais c'est Houssem, courtier certifié et affilié au Groupe Jetté, qui valide chaque recommandation et vous accompagne jusqu'à la signature. L'humain reste au centre.",
  },
  {
    question: "Mes données personnelles sont-elles protégées ?",
    answer:
      "Absolument. Vos informations sont chiffrées, jamais vendues à des tiers et traitées conformément à la Loi 25 (RGPQ) du Québec. Vous pouvez demander leur suppression à tout moment. Seuls vous et Houssem y avez accès.",
  },
  {
    question: "Quels assureurs comparez-vous ?",
    answer:
      "Nous travaillons avec 18 assureurs partenaires : Intact, Belair Direct, Desjardins, Promutuel, SSQ, Aviva, La Capitale, Economical, Wawanesa, Co-operators, AXA, et d'autres. Notre réseau couvre 95 % du marché québécois.",
  },
  {
    question: "Quelle est la différence avec le site hcourtage.ca ?",
    answer:
      "hcourtage.ca est notre ancien site — rempli d'un formulaire de contact et d'une attente de 48 h. H Courtage AI, c'est la version augmentée : analyse instantanée par IA, comparaison automatique des 18 assureurs, et soumissions personnalisées en 24 h. Même courtier, technologie nouvelle génération.",
  },
  {
    question: "Comment fonctionne l'assurance cybersécurité ?",
    answer:
      "C'est une protection concrète contre les risques numériques : vol d'identité (remboursement jusqu'à 50 000 $), fraude en ligne, ransomware personnel, frais juridiques liés à une usurpation d'identité, et même la cyberintimidation ou les fuites de données scolaires pour vos enfants. 1 Québécois sur 7 a été touché en 2024 — et la majorité n'était pas couverte.",
  },
];

// ── Wizard Steps Data ─────────────────────────
export const wizardInsuranceTypes = [
  { id: "auto", icon: "Car", label: "Auto", description: "Voiture, camion, moto" },
  { id: "hab", icon: "Home", label: "Habitation", description: "Proprio ou locataire" },
  { id: "cyber", icon: "Shield", label: "Cybersécurité", description: "Protection identité numérique" },
  { id: "multi", icon: "Package", label: "Multi-produits", description: "Combo auto + hab + cyber" },
];

export const wizardSituations = [
  { id: "insured_same", label: "Oui, je suis déjà assuré — mais je ne change pas", icon: "CheckCircle" },
  { id: "insured_looking", label: "Oui, mais je magasine quelque chose de mieux", icon: "Search" },
  { id: "new", label: "Non, c'est ma première assurance", icon: "Star" },
];

export const wizardFamilySituations = [
  { id: "single", label: "Célibataire" },
  { id: "couple", label: "En couple" },
  { id: "family", label: "Famille avec enfants" },
  { id: "senior", label: "55 ans et +" },
];

export const wizardAutoNeeds = [
  { id: "basic", label: "Couverture de base (responsabilité civile)" },
  { id: "full", label: "Tous risques (collision, vol, feu)" },
  { id: "premium", label: "Premium avec véhicule de remplacement" },
  { id: "electric", label: "Véhicule électrique ou hybride" },
];

export const wizardHabNeeds = [
  { id: "tenant", label: "Locataire — je protège mes biens" },
  { id: "owner_condo", label: "Copropriétaire (condo)" },
  { id: "owner_house", label: "Propriétaire maison unifamiliale" },
  { id: "owner_multi", label: "Propriétaire multilogement" },
];

export const wizardCyberNeeds = [
  { id: "identity", label: "Vol d'identité personnelle" },
  { id: "children", label: "Protection pour mes enfants aussi" },
  { id: "financial", label: "Fraude bancaire / carte de crédit" },
  { id: "full_cyber", label: "Protection complète (tout inclus)" },
];

// ── Analysis Result (page /result) ───────────
export const analysisResult = {
  score: 78,
  savings: 1240,
  scanSteps: [
    { label: "Intact Assurance", status: "done" },
    { label: "Belair Direct", status: "done" },
    { label: "Desjardins Assurances", status: "done" },
    { label: "Promutuel", status: "done" },
    { label: "SSQ Assurance", status: "done" },
    { label: "Aviva Canada", status: "done" },
    { label: "La Capitale", status: "done" },
    { label: "Economical", status: "done" },
    { label: "Wawanesa", status: "done" },
    { label: "Co-operators", status: "done" },
    { label: "AXA Canada", status: "done" },
    { label: "Northbridge", status: "done" },
    { label: "Allstate", status: "done" },
    { label: "RSA Canada", status: "done" },
    { label: "Zurich Canada", status: "done" },
    { label: "Optimum", status: "done" },
    { label: "Groupe Assurance Abeille", status: "done" },
    { label: "Promutuel Vie", status: "done" },
  ],
  risks: [
    "Couverture cyber absente — exposition élevée (1 Québécois/7 touché en 2024)",
    "Franchise actuelle trop haute pour votre profil de risque",
    "Protection vol d'identité non incluse dans votre contrat actuel",
  ],
  missing: [
    "Protection vol d'identité numérique",
    "Couverture dégâts d'eau améliorée (refoulement égout)",
    "Véhicule de remplacement en cas de sinistre",
  ],
  optimizations: [
    "Bundle auto + hab + cyber = économie supplémentaire de 22 %",
    "Passage à paiement annuel = −5 % sur la prime",
    "Télématique auto disponible : potentiel −8 % si bon comportement",
  ],
};

// ── Quote Offers (page /quote) ────────────────
export const quoteOffers = [
  {
    insurer: "Intact Assurance",
    logo: "IA",
    monthlyPremium: 127,
    annualPremium: 1524,
    deductible: 1000,
    recommended: false,
    clientRating: 4.1,
    coverages: [
      { label: "Responsabilité civile 2 M$", included: true },
      { label: "Collision et renversement", included: true },
      { label: "Vol et tentative de vol", included: true },
      { label: "Véhicule de remplacement", included: false },
      { label: "Protection cybersécurité", included: false },
      { label: "Assistance routière 24/7", included: true },
      { label: "Bris de vitres sans franchise", included: false },
    ],
  },
  {
    insurer: "Belair Direct",
    logo: "BD",
    monthlyPremium: 98,
    annualPremium: 1176,
    deductible: 750,
    recommended: true,
    clientRating: 4.4,
    coverages: [
      { label: "Responsabilité civile 2 M$", included: true },
      { label: "Collision et renversement", included: true },
      { label: "Vol et tentative de vol", included: true },
      { label: "Véhicule de remplacement", included: true },
      { label: "Protection cybersécurité", included: true },
      { label: "Assistance routière 24/7", included: true },
      { label: "Bris de vitres sans franchise", included: true },
    ],
  },
  {
    insurer: "Desjardins Assurances",
    logo: "DA",
    monthlyPremium: 112,
    annualPremium: 1344,
    deductible: 500,
    recommended: false,
    clientRating: 4.3,
    coverages: [
      { label: "Responsabilité civile 2 M$", included: true },
      { label: "Collision et renversement", included: true },
      { label: "Vol et tentative de vol", included: true },
      { label: "Véhicule de remplacement", included: true },
      { label: "Protection cybersécurité", included: false },
      { label: "Assistance routière 24/7", included: true },
      { label: "Bris de vitres sans franchise", included: false },
    ],
  },
];
