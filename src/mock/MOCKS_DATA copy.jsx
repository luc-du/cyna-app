// src/data/mocks.js

import edr from "../assets/images/edr.jpg";
import edrPremium from "../assets/images/edrPremium.jpg";
import placeholder3 from "../assets/images/security.jpg";
import placeholder from "../assets/images/siem.jpg";
import soc from "../assets/images/soc.jpg";
import socPremium from "../assets/images/socPremium.jpg";
import placeholder2 from "../assets/images/technology.jpg";
import xdr from "../assets/images/xdr.jpg";
import xdrPremium from "../assets/images/xdrPremium.png";

export const MOCK_Categories = [
  {
    id: 1,
    name: "SOC & SIEM",
    url: "1",
    imageUrl: placeholder,
    description:
      "Le SOC (Security Operations Center) fonctionne en synergie avec le SIEM (Security Information and Event Management) pour surveiller, détecter et répondre aux incidents de sécurité.",
    products: [
      {
        id: 1,
        name: "Produit A",
        imageUrl: placeholder2,
        available: true,
        pricingOptions: [
          { type: "Mensuel", price: 29.99, available: true },
          { type: "Annuel", price: 299.99, available: true },
          { type: "Par utilisateur", price: 9.99, available: true },
        ],
      },
      {
        id: 2,
        name: "Produit B",
        imageUrl: placeholder2,
        available: true,
        pricingOptions: [
          { type: "Mensuel", price: 19.99, available: true },
          { type: "Annuel", price: 199.99, available: true },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "EDR & XDR",
    url: "2",
    imageUrl: placeholder2,
    description:
      "Les solutions EDR (Endpoint Detection and Response) et XDR (Extended Detection and Response) offrent une protection proactive contre les menaces avancées.",
    products: [
      {
        id: 3,
        name: "Produit D",
        imageUrl: placeholder,
        available: false,
        pricingOptions: [
          { type: "Mensuel", price: 39.99, available: false },
          { type: "Annuel", price: 399.99, available: false },
        ],
      },
      {
        id: 4,
        name: "Produit E",
        imageUrl: placeholder,
        available: true,
        pricingOptions: [
          { type: "Mensuel", price: 24.99, available: true },
          { type: "Annuel", price: 249.99, available: true },
          { type: "Entreprise", price: "Sur demande", available: true },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "CYNA SOC",
    url: "3",
    imageUrl: placeholder3,
    description:
      "Le CYNA SOC est une solution de sécurité de nouvelle génération basée sur une architecture cloud-native.",
    products: [
      {
        id: 5,
        name: "Produit F",
        imageUrl: placeholder2,
        available: true,
        pricingOptions: [
          { type: "Mensuel", price: 49.99, available: true },
          { type: "Annuel", price: 499.99, available: true },
        ],
      },
      {
        id: 6,
        name: "Produit G",
        imageUrl: placeholder2,
        available: true,
        pricingOptions: [
          { type: "Mensuel", price: 34.99, available: true },
          { type: "Annuel", price: 349.99, available: true },
          { type: "Entreprise", price: "Sur demande", available: true },
        ],
      },
    ],
  },
];

export const MOCK_PricingOptions = [
  {
    id: 1,
    name: "Abonnement Mensuel",
    type: "Mensuel",
    price: 29.99,
    available: true,
    description:
      "Paiement récurrent tous les mois. Idéal pour une flexibilité maximale.",
  },
  {
    id: 2,
    name: "Abonnement Annuel",
    type: "Annuel",
    price: 299.99,
    available: true,
    description:
      "Économisez 20% en payant annuellement. Parfait pour un engagement sur le long terme.",
  },
  {
    id: 3,
    name: "Par Utilisateur",
    type: "Par utilisateur",
    price: 9.99,
    available: true,
    description:
      "Tarification par utilisateur. Adapté aux équipes de toutes tailles.",
  },
  {
    id: 4,
    name: "Par Appareil",
    type: "Par appareil",
    price: 14.99,
    available: false,
    description:
      "Tarification par appareil utilisé. Idéal pour les solutions multi-appareils.",
  },
  {
    id: 5,
    name: "Abonnement Entreprise",
    type: "Personnalisable",
    price: "Sur demande",
    available: true,
    description:
      "Tarification flexible pour les grandes entreprises. Contactez-nous pour un devis personnalisé.",
  },
];

export const MOCK_Services = [
  {
    id: 1,
    imageUrl: soc,
    name: "SOC as a Service",
    description:
      "Votre centre opérationnel de sécurité, assurant une surveillance continue et une réponse proactive aux incidents.",
    url: "/categories/00",
  },
  {
    id: 2,
    imageUrl: edr,
    name: "EDR (Endpoint Detection & Response)",
    description:
      "Détection avancée et réponse automatisée sur l'ensemble de vos endpoints pour une protection optimale.",
    url: "/categories/01",
  },
  {
    id: 3,
    imageUrl: xdr,
    name: "XDR (Extended Detection & Response)",
    description:
      "Intégrez et corrélez les données de sécurité de toute votre infrastructure pour une vision globale des menaces.",
    url: "/categories/02",
  },
];

export const MOCK_TopProducts = [
  {
    id: 1,
    name: "SOC Premium",
    description:
      "Solution de surveillance de sécurité en temps réel pour détecter et répondre aux menaces complexes.",
    imageUrl: socPremium,
    caracteristiques: {
      performances: "Haute",
      scalabilite: "Flexible",
      nvSupport: "Aucun",
    },
    price: 99.99,
    available: true,
    url: "/products/1",
  },
  {
    id: 2,
    name: "EDR Avancé",
    description:
      "Endpoint Detection and Response pour une protection proactive contre les menaces ciblant les terminaux.",
    imageUrl: edrPremium,
    caracteristiques: {
      performances: "Haute",
      scalabilite: "Flexible",
      nvSupport: "24/7",
    },
    price: 99.99,
    available: false,
    url: "/products/2",
  },
  {
    id: 3,
    name: "XDR Pro",
    description:
      "Extended Detection and Response pour une gestion centralisée des menaces sur l'ensemble des environnements.",
    imageUrl: xdrPremium,
    caracteristiques: {
      performances: "Haute",
      scalabilite: "Flexible",
      nvSupport: "24/7",
    },
    price: 99.99,
    available: true,
    url: "/products/3",
  },
];
