import edrPremium from "../assets/images/edrPremium.jpg";
import socPremium from "../assets/images/socPremium.jpg";
import xdrPremium from "../assets/images/xdrPremium.png";

export const MOCK_TopProductsData = [
  {
    id: 1,
    image: [socPremium, edrPremium, xdrPremium],
    name: "SOC Premium",
    description:
      "Solution de surveillance de sécurité en temps réel pour détecter et répondre aux menaces complexes. Idéal pour les entreprises cherchant une protection avancée et une visibilité complète sur leurs réseaux.",
    caracteristiques: {
      performances: "Haute",
      scalabilite: "Flexible",
      nvSupport: "Aucun",
    },
    price: 99.99,
    similar: [
      { id: 0, image: edrPremium, name: "EDR Avancé" },
      { id: 1, image: xdrPremium, name: "XDR Pro" },
      { id: 2, image: edrPremium, name: "EDR Avancé" },
      { id: 3, image: edrPremium, name: "EDR Avancé" },
    ],
    disponible: true,
    link: "/products/1",
  },
  {
    id: 2,
    image: [edrPremium, socPremium, xdrPremium],
    name: "EDR Avancé",
    description:
      "Endpoint Detection and Response pour une protection proactive contre les menaces ciblant les terminaux. Offre des capacités de détection, d'investigation et de réponse aux attaques.",
    caracteristiques: {
      performances: "Haute",
      scalabilite: "Flexible",
      nvSupport: "24/7",
    },
    price: 99.99,
    similar: [
      { id: 0, image: xdrPremium, name: "XDR Pro" },
      { id: 1, image: socPremium, name: "SOC Premium" },
      { id: 2, image: xdrPremium, name: "XDR Pro" },
    ],
    disponible: false,
    link: "/products/2",
  },
  {
    id: 3,
    image: [xdrPremium, socPremium, edrPremium],
    name: "XDR Pro",
    description:
      "Extended Detection and Response pour une gestion centralisée des menaces sur l'ensemble des environnements cloud, réseau et endpoints. Améliore la détection et la réponse aux menaces sophistiquées.",
    caracteristiques: {
      performances: "Haute",
      scalabilite: "Flexible",
      nvSupport: "24/7",
    },
    price: 99.99,
    similar: [
      { id: 0, image: socPremium, name: "SOC Premium" },
      { id: 1, image: edrPremium, name: "EDR Avancé" },
      { id: 2, image: socPremium, name: "SOC Premium" },
    ],
    disponible: true,
    link: "/products/3",
  },
];
