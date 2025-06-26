import { indexImages } from "../utils/indexImages";

const [
  cert, // indexImages[0]
  cloud, // indexImages[1]
  edr, // indexImages[2]
  edrPremium, // indexImages[3]
  emptyBox, // indexImages[4]
  idImg, // indexImages[5]
  identity, // indexImages[6]
  security, // indexImages[7]
  siem, // indexImages[8]
  soc, // indexImages[9]
  socPremium, // indexImages[10]
  technology, // indexImages[11]
  xdr, // indexImages[12]
  xdrPremium, // indexImages[13]
  cynaItLogo, // indexImages[14]
  logoCynaWhite, // indexImages[15]
  logoPng, // indexImages[16]
] = indexImages;

/*
  3) Si vous aviez auparavant plusieurs alias pointant sur le même fichier,
     il suffit de réassigner les variables qui vous intéressent.
     Par exemple, on considérait autrefois :
     import edr from "./edr.jpg";
     import edrProtection from "./edr.jpg";
     → on veut maintenant que `edrProtection` pointe sur la même URL qu’`edr`
*/
const edrProtection = edr;
const placeholder3 = identity;
const threatIntelligence = identity;
const placeholder = siem;
const cynaSocEntreprise = soc;
const cynaSocStandard = soc;
const socStandard = soc;
const placeholder2 = technology;
const siemAnalytics = technology;
const xdrAdvanced = xdr;

/**
 * MOCK_CATEGORIES
 * Structure attendue par CategoriesGrid :
 *  - id: number
 *  - name: string
 *  - url: string
 *  - images: [ { url: string } ]
 *  - description: string (optionnel)
 */
export const MOCK_CATEGORIES = [
  {
    id: 1,
    name: "SOC & SIEM",
    url: "1",
    images: [{ url: placeholder }, { url: placeholder3 }],
    description:
      "Le SOC (Security Operations Center) fonctionne en synergie avec le SIEM (Security Information and Event Management) pour surveiller, détecter et répondre aux incidents de sécurité.",
    services: [1, 2],
  },
  {
    id: 2,
    name: "EDR & XDR",
    url: "2",
    images: [{ url: placeholder2 }, { url: placeholder }],
    description:
      "Les solutions EDR (Endpoint Detection and Response) et XDR (Extended Detection and Response) offrent une protection proactive contre les menaces avancées.",
    services: [3, 4],
  },
  {
    id: 3,
    name: "CYNA SOC",
    url: "3",
    images: [{ url: placeholder3 }],
    description:
      "Le CYNA SOC est une solution de sécurité de nouvelle génération basée sur une architecture cloud-native.",
    services: [5, 6],
  },
];

/**
 * MOCK_TOP_PRODUCTS
 * Structure minimale attendue par TopProductsGrid :
 *  - id: number
 *  - name: string
 *  - images: [ { url: string } ] ou imageUrl: string
 *  - link: string (facultatif)
 *
 *  */
export const MOCK_TOP_PRODUCTS = [
  {
    id: 1,
    name: "SOC Standard",
    brand: "CYNA",
    amount: 19999.99,
    active: true,
    promo: true,
    images: [{ url: socStandard }],
    link: "/products/1",
  },
  {
    id: 2,
    name: "SOC Premium",
    brand: "CYNA",
    amount: 29999.99,
    active: true,
    promo: false,
    images: [{ url: socPremium }],
    link: "/products/2",
  },
  {
    id: 3,
    name: "EDR Protection",
    brand: "CYNA",
    amount: 14999.99,
    active: true,
    promo: false,
    images: [{ url: edrProtection }],
    link: "/products/3",
  },
  {
    id: 4,
    name: "XDR Advanced",
    brand: "CYNA",
    amount: 24999.99,
    active: true,
    promo: true,
    images: [{ url: xdrAdvanced }],
    link: "/products/4",
  },
  {
    id: 5,
    name: "CYNA SOC Std",
    brand: "CYNA",
    amount: 21999.99,
    active: true,
    promo: true,
    images: [{ url: cynaSocStandard }],
    link: "/products/5",
  },
  {
    id: 6,
    name: "CYNA SOC Entreprise",
    brand: "CYNA",
    amount: 49999.99,
    active: true,
    promo: false,
    images: [{ url: cynaSocEntreprise }],
    link: "/products/6",
  },
  {
    id: 7,
    name: "SIEM Analytics",
    brand: "CYNA",
    amount: 17999.99,
    active: true,
    promo: true,
    images: [{ url: siemAnalytics }],
    link: "/products/7",
  },
  {
    id: 8,
    name: "Threat Intelligence",
    brand: "CYNA",
    amount: 20999.99,
    active: true,
    promo: false,
    images: [{ url: threatIntelligence }],
    link: "/products/8",
  },
];

/**
 * MOCK_SERVICES
 * Structure utilisée par les pages de détails de service (hors HomePage).
 * On garde l’ancien format, en veillant à exposer un tableau “images” pour uniformité.
 */
export const MOCK_SERVICES = [
  {
    id: 1,
    name: "SOC Standard",
    categoryId: 1,
    images: [{ url: soc }, { url: socPremium }],
    description:
      "Service de surveillance continue et de réponse aux incidents en temps réel.",
    active: true,
    promo: true,
    defaultPricing: 1,
    pricingIds: [1, 2, 3],
    keyCharacteristics: {
      performance: "Moyenne",
      scalability: "Standard",
      support: "24/7",
    },
    similar: [2, 5],
  },
  {
    id: 2,
    name: "SOC Premium",
    categoryId: 1,
    images: [{ url: socPremium }],
    description:
      "Version avancée du SOC avec des analyses approfondies et réponse automatisée.",
    available: false,
    defaultPricing: 1,
    pricingIds: [1, 2, 5],
    keyCharacteristics: {
      performance: "Élevée",
      scalability: "Haute",
      support: "Premium 24/7",
    },
    similar: [1, 6],
  },
  {
    id: 3,
    name: "EDR Protection",
    categoryId: 2,
    images: [{ url: edr }],
    description: "Détection et réponse aux menaces ciblant les terminaux.",
    available: false,
    defaultPricing: 1,
    pricingIds: [1, 2, 3],
    keyCharacteristics: {
      performance: "Élevée",
      scalability: "Standard",
      support: "Standard",
    },
    similar: [4, 5],
  },
  {
    id: 4,
    name: "XDR Advanced",
    categoryId: 2,
    images: [{ url: xdr }],
    description:
      "Gestion centralisée des menaces sur l’ensemble des environnements.",
    available: true,
    defaultPricing: 1,
    pricingIds: [1, 2, 4, 5],
    keyCharacteristics: {
      performance: "Très élevée",
      scalability: "Élastique",
      support: "Premium 24/7",
    },
    similar: [3, 6],
  },
  {
    id: 5,
    name: "CYNA SOC Standard",
    categoryId: 3,
    images: [{ url: placeholder2 }],
    description: "Surveillance de sécurité cloud-native avec support 24/7.",
    available: true,
    defaultPricing: 1,
    pricingIds: [1, 2],
    keyCharacteristics: {
      performance: "Élevée",
      scalability: "Cloud-native",
      support: "24/7",
    },
    similar: [1, 3],
  },
  {
    id: 6,
    name: "CYNA SOC Entreprise",
    categoryId: 3,
    images: [{ url: placeholder3 }],
    description:
      "Solution SOC dédiée aux grandes entreprises, avec personnalisation avancée.",
    available: true,
    defaultPricing: 5,
    pricingIds: [5],
    keyCharacteristics: {
      performance: "Optimisée pour les grandes entreprises",
      scalability: "Personnalisable",
      support: "Support dédié",
    },
    similar: [2, 4],
  },
];

/**
 * MOCK_PRICING_OPTIONS
 * Identique à l’ancien format.
 * Utilisé par les formulaires de tarification / checkout.
 */
export const MOCK_PRICING_OPTIONS = [
  {
    id: 1,
    name: "Mensuel",
    price: 30000,
    available: true,
    description: "Paiement mensuel pour une flexibilité maximale.",
  },
  {
    id: 2,
    name: "Annuel",
    price: 299.99,
    available: true,
    description: "Économisez 20% en payant annuellement.",
  },
  {
    id: 3,
    name: "Par utilisateur",
    price: 9.99,
    available: true,
    description: "Tarification adaptée aux équipes de toutes tailles.",
  },
  {
    id: 4,
    name: "Par appareil",
    price: 14.99,
    available: false,
    description: "Tarification par appareil utilisé.",
  },
  {
    id: 5,
    name: "Entreprise",
    price: "Sur demande",
    available: true,
    description: "Tarification flexible pour les grandes entreprises.",
  },
];

export const MOCKSLIDES = [
  {
    id: 1,
    imageUrl: edr,
    title: "Protection avancée pour vos PME",
    description: "Découvrez nos solutions EDR, SOC et XDR.",
    ctaText: "Voir nos produits",
    ctaLink: "/products",
  },
  {
    id: 2,
    imageUrl: xdr,
    title: "Cybersécurité de nouvelle génération",
    description:
      "Protégez votre infrastructure avec des outils SaaS performants.",
    ctaText: "En savoir plus",
    ctaLink: "/about",
  },
  {
    id: 3,
    imageUrl: xdr,
    title: "Cybersécurité de nouvelle génération",
    description:
      "Protégez votre infrastructure avec des outils SaaS performants.",
    ctaText: "En savoir plus",
    ctaLink: "/about",
  },
];

/**
 * Tableau simulant les méthodes de paiement de l'utilisateur.
 * Utilisé en dev pour afficher et tester la section Paiement.
 */

export const MOCK_PAYMENT_METHODS = [
  {
    id: "pm_1",
    cardholderName: "Jean Dupont",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2026,
    type: "Visa",
    isDefault: true,
  },
  {
    id: "pm_2",
    cardholderName: "Marie Martin",
    last4: "1881",
    expiryMonth: 5,
    expiryYear: 2024,
    type: "Mastercard",
    isDefault: false,
  },
];

export const MOCK_PRODUCT = {
  name: "Formule Découverte",
  description: "1 mois d'accès à notre plateforme",
  price: 19.99,
  image: "/img/demo.png",
};

export const MOCK_ITEM = {
  product: MOCK_PRODUCT,
  quantity: 1,
};
