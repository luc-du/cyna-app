import placeholder3 from "../assets/images/identity.jpg";
import placeholder from "../assets/images/siem.jpg";
import placeholder2 from "../assets/images/technology.jpg";

const MOCK_Categories = [
  {
    id: 1,
    name: "SOC & SIEM",
    url: "1",
    imageUrl: placeholder,
    description:
      "Le SOC (Security Operations Center) fonctionne en synergie avec le SIEM (Security Information and Event Management) pour surveiller, détecter et répondre aux incidents de sécurité. Grâce à une analyse approfondie des logs et des événements, cette solution permet de corréler les données pour identifier des menaces complexes et de répondre aux incidents de manière rapide et efficace.",
    products: [
      {
        id: 1,
        name: "Produit A",
        price: 99.99,
        available: true,
        img: placeholder2,
        imageUrl: placeholder,
      },
      {
        id: 2,
        name: "Produit B",
        price: 99.99,
        available: true,
        img: placeholder2,
        imageUrl: placeholder,
      },
    ],
  },
  {
    id: 2,
    name: "EDR & XDR",
    url: "2",
    imageUrl: placeholder2,
    description:
      "Les solutions EDR (Endpoint Detection and Response) et XDR (Extended Detection and Response) offrent une protection proactive contre les menaces avancées. L'EDR surveille en temps réel les endpoints pour détecter les comportements anormaux, tandis que le XDR étend cette surveillance à l'ensemble de l'écosystème IT, offrant ainsi une visibilité accrue et une réponse automatisée aux incidents.",
    products: [
      {
        id: 1,
        name: "Produit D",
        price: 99.99,
        img: placeholder2,
        available: false,
        imageUrl: placeholder,
      },
      {
        id: 2,
        name: "Produit E",
        price: 99.99,
        img: placeholder2,
        available: true,
        imageUrl: placeholder,
      },
    ],
  },
  {
    id: 3,
    name: "CYNA SOC",
    url: "3",
    imageUrl: placeholder3,
    description:
      "Le CYNA SOC est une solution de sécurité de nouvelle génération basée sur une architecture cloud-native. Utilisant l'intelligence artificielle et le machine learning, il détecte les menaces en temps réel et orchestre des réponses automatisées pour minimiser l'impact des incidents. Son approche adaptative offre une protection avancée contre les cyberattaques sophistiquées.",
    products: [
      {
        id: 1,
        name: "Produit D",
        price: 99.99,
        available: true,
        img: placeholder2,
        imageUrl: placeholder,
      },
      {
        id: 2,
        name: "Produit E",
        price: 99.99,
        available: true,
        img: placeholder2,
        imageUrl: placeholder,
      },
    ],
  },
];

export default MOCK_Categories;
