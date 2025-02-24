import edr from "../assets/images/edr.jpg";
import soc from "../assets/images/soc.jpg";
import xdr from "../assets/images/xdr.jpg";

export const MOCK_Services = [
  {
    id: 0,
    image: soc,
    name: "SOC as a Service",
    description:
      "Votre centre opérationnel de sécurité, assurant une surveillance continue et une réponse proactive aux incidents.",
    link: "/categories/00",
  },
  {
    id: 1,
    image: edr,
    name: "EDR (Endpoint Detection & Response)",
    description:
      "Détection avancée et réponse automatisée sur l'ensemble de vos endpoints pour une protection optimale.",
    link: "/categories/01",
  },
  {
    id: 2,
    image: xdr,
    name: "XDR (Extended Detection & Response)",
    description:
      "Intégrez et corrélez les données de sécurité de toute votre infrastructure pour une vision globale des menaces.",
    link: "/categories/02",
  },
];
