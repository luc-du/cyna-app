import {
  default as edr,
  default as edrProtection,
} from "../assets/images/edr.jpg";
import {
  default as placeholder3,
  default as threatIntelligence,
} from "../assets/images/identity.jpg";
import placeholder from "../assets/images/siem.jpg";
import {
  default as cynaSocEntreprise,
  default as cynaSocStandard,
  default as soc,
  default as socStandard,
} from "../assets/images/soc.jpg";
import socPremium from "../assets/images/socPremium.jpg";
import {
  default as placeholder2,
  default as siemAnalytics,
} from "../assets/images/technology.jpg";
import {
  default as xdr,
  default as xdrAdvanced,
} from "../assets/images/xdr.jpg";

/**
 * MOCK_CATEGORIES
 * Structure attendue par CategoriesGrid :
 *  - id: number
 *  - name: string
 *  - url: string
 *  - images: [ { url: string } ]
 *  - description: string (optionnel, utilisé ailleurs)
 */
export const MOCK_CATEGORIES = [
  {
    id: 1,
    name: "SOC & SIEM",
    url: "1",
    images: [{ url: placeholder }],
    description:
      "Le SOC (Security Operations Center) fonctionne en synergie avec le SIEM (Security Information and Event Management) pour surveiller, détecter et répondre aux incidents de sécurité.",
    services: [1, 2], // Référence vers les services
  },
  {
    id: 2,
    name: "EDR & XDR",
    url: "2",
    images: [{ url: placeholder2 }],
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
 *  - link: string (facultatif, si on souhaite diriger vers une page produit)
 *
 * Ici, on récupère les mêmes objets que MOCK_SERVICES, on choisit certains services comme “top produits”.
 */
// src/data/mocks.js

export const MOCK_TOP_PRODUCTS = [
  {
    id: 1,
    name: "SOC Standard",
    amount: 199.99,
    promo: true,
    imageUrl: socStandard,
    link: "/products/1",
  },
  {
    id: 2,
    name: "SOC Premium",
    amount: 299.99,
    promo: true,
    imageUrl: socPremium,
    link: "/products/2",
  },
  {
    id: 3,
    name: "EDR Protection",
    amount: 149.99,
    promo: false,
    imageUrl: edrProtection,
    link: "/products/3",
  },
  {
    id: 4,
    name: "XDR Advanced",
    amount: 249.99,
    promo: true,
    imageUrl: xdrAdvanced,
    link: "/products/4",
  },
  {
    id: 5,
    name: "CYNA SOC Std",
    amount: 219.99,
    promo: true,
    imageUrl: cynaSocStandard,
    link: "/products/5",
  },
  {
    id: 6,
    name: "CYNA SOC Entreprise",
    amount: 499.99,
    promo: false,
    imageUrl: cynaSocEntreprise,
    link: "/products/6",
  },
  {
    id: 7,
    name: "SIEM Analytics",
    amount: 179.99,
    promo: true,
    imageUrl: siemAnalytics,
    link: "/products/7",
  },
  {
    id: 8,
    name: "Threat Intelligence",
    amount: 209.99,
    promo: false,
    imageUrl: threatIntelligence,
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
    images: [{ url: soc }],
    description:
      "Service de surveillance continue et de réponse aux incidents en temps réel.",
    available: false,
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
    available: true,
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
    price: 29.99,
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
