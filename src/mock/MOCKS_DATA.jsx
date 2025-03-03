// src/data/mocks.js

import edr from "../assets/images/edr.jpg";
import placeholder3 from "../assets/images/identity.jpg";
import placeholder from "../assets/images/siem.jpg";
import soc from "../assets/images/soc.jpg";
import socPremium from "../assets/images/socPremium.jpg";
import placeholder2 from "../assets/images/technology.jpg";
import xdr from "../assets/images/xdr.jpg";

export const MOCK_Categories = [
  {
    id: 1,
    name: "SOC & SIEM",
    url: "1",
    imageUrl: placeholder,
    description:
      "Le SOC (Security Operations Center) fonctionne en synergie avec le SIEM (Security Information and Event Management) pour surveiller, détecter et répondre aux incidents de sécurité.",
    services: [1, 2], // Référence vers les services
  },
  {
    id: 2,
    name: "EDR & XDR",
    url: "2",
    imageUrl: placeholder2,
    description:
      "Les solutions EDR (Endpoint Detection and Response) et XDR (Extended Detection and Response) offrent une protection proactive contre les menaces avancées.",
    services: [3, 4],
  },
  {
    id: 3,
    name: "CYNA SOC",
    url: "3",
    imageUrl: placeholder3,
    description:
      "Le CYNA SOC est une solution de sécurité de nouvelle génération basée sur une architecture cloud-native.",
    services: [5, 6],
  },
];

export const MOCK_Services = [
  {
    id: 1,
    name: "SOC Standard",
    categoryId: 1,
    imageUrl: soc,
    description:
      "Service de surveillance continue et de réponse aux incidents en temps réel.",
    available: true,
    pricingIds: [1, 2, 3], // Référence vers les modèles de pricing
  },
  {
    id: 2,
    name: "SOC Premium",
    categoryId: 1,
    imageUrl: socPremium,
    description:
      "Version avancée du SOC avec des analyses approfondies et réponse automatisée.",
    available: true,
    pricingIds: [1, 2, 5],
  },
  {
    id: 3,
    name: "EDR Protection",
    categoryId: 2,
    imageUrl: edr,
    description: "Détection et réponse aux menaces ciblant les terminaux.",
    available: true,
    pricingIds: [1, 2, 3],
  },
  {
    id: 4,
    name: "XDR Advanced",
    categoryId: 2,
    imageUrl: xdr,
    description:
      "Gestion centralisée des menaces sur l’ensemble des environnements.",
    available: true,
    pricingIds: [1, 2, 4, 5],
  },
  {
    id: 5,
    name: "CYNA SOC Standard",
    categoryId: 3,
    imageUrl: placeholder2,
    description: "Surveillance de sécurité cloud-native avec support 24/7.",
    available: true,
    pricingIds: [1, 2],
  },
  {
    id: 6,
    name: "CYNA SOC Entreprise",
    categoryId: 3,
    imageUrl: placeholder3,
    description:
      "Solution SOC dédiée aux grandes entreprises, avec personnalisation avancée.",
    available: true,
    pricingIds: [5], // Uniquement sur devis
  },
];

export const MOCK_PricingOptions = [
  {
    id: 1,
    type: "Mensuel",
    price: 29.99,
    available: true,
    description: "Paiement mensuel pour une flexibilité maximale.",
  },
  {
    id: 2,
    type: "Annuel",
    price: 299.99,
    available: true,
    description: "Économisez 20% en payant annuellement.",
  },
  {
    id: 3,
    type: "Par utilisateur",
    price: 9.99,
    available: true,
    description: "Tarification adaptée aux équipes de toutes tailles.",
  },
  {
    id: 4,
    type: "Par appareil",
    price: 14.99,
    available: false,
    description: "Tarification par appareil utilisé.",
  },
  {
    id: 5,
    type: "Entreprise",
    price: "Sur demande",
    available: true,
    description: "Tarification flexible pour les grandes entreprises.",
  },
];
