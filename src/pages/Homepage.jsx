import React from "react";
import Carousel from "../components/Carousel";
import ServiceCard from "../components/ServiceCard";
import Grid from "../components/Grid";

import soc from "../assets/images/soc.jpg";
import edr from "../assets/images/edr.jpg";
import xdr from "../assets/images/xdr.jpg";
import siem from "../assets/images/siem.jpg";
import identity from "../assets/images/identity.jpg";
import technology from "../assets/images/technology.jpg";
import socPremium from "../assets/images/socPremium.jpg";
import edrPremium from "../assets/images/edrPremium.jpg";
import xdrPremium from "../assets/images/xdrPremium.png";

const servicesData = [
  {
    image: soc,
    title: "SOC as a Service",
    description:
      "Votre centre opérationnel de sécurité, assurant une surveillance continue et une réponse proactive aux incidents.",
    link: "#",
  },
  {
    image: edr,
    title: "EDR (Endpoint Detection & Response)",
    description:
      "Détection avancée et réponse automatisée sur l'ensemble de vos endpoints pour une protection optimale.",
    link: "#",
  },
  {
    image: xdr,
    title: "XDR (Extended Detection & Response)",
    description:
      "Intégrez et corrélez les données de sécurité de toute votre infrastructure pour une vision globale des menaces.",
    link: "#",
  },
];

// Données pour la grille des catégories
const categoriesData = [
  {
    id: 1,
    image: siem,
    name: "SOC & SIEM",
    link: "/categories/soc-siem",
  },
  {
    id: 2,
    image: technology,
    name: "EDR & XDR",
    link: "/categories/edr-xdr",
  },
  {
    id: 3,
    image: identity,
    name: "Gestion d'Identité",
    link: "/categories/iam-dlp",
  },
];

// Données pour la grille des Top Produits
const topProductsData = [
  {
    id: 1,
    image: socPremium,
    name: "SOC Premium",
    link: "/product/soc-premium",
  },
  {
    id: 2,
    image: edrPremium,
    name: "EDR Avancé",
    link: "/product/edr-avance",
  },
  {
    id: 3,
    image: xdrPremium,
    name: "XDR Pro",
    link: "/product/xdr-pro",
  },
];

// Fonctions de rendu pour la grille
const renderCategory = (category) => (
  <a
    href={category.link}
    className="block text-center hover:shadow-lg transition-shadow"
  >
    <img
      src={category.image}
      alt={category.name}
      className="w-full h-40 object-cover rounded-lg"
    />
    <h3 className="mt-2 text-lg font-semibold">{category.name}</h3>
  </a>
);

const renderProduct = (product) => (
  <div className="bg-white shadow-lg rounded-xl p-4 text-center">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-40 object-cover rounded-t-xl"
    />
    <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
    <a
      href={product.link}
      className="mt-2 inline-block text-blue-500 font-semibold hover:underline"
    >
      Voir le produit
    </a>
  </div>
);

const Homepage = () => {
  return (
    <div className="homepage-content">
      <div className="w-full flex items-center justify-center bg-primaryBackground overflow-hidden p-10">
        <Carousel>
          {servicesData.map((service, index) => (
            <div key={index} className="px-2">
              <ServiceCard {...service} />
            </div>
          ))}
        </Carousel>
      </div>

      <section className="fixed-text my-8 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-primaryBackground">
          Pure player en cybersécurité pour PME et MSP
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Cyna est spécialisée dans la vente de solutions de sécurité SaaS
          innovantes, telles que SOC, EDR et XDR. <br /> Notre plateforme
          e-commerce internationale permet aux entreprises d'accéder facilement
          à des services de protection avancée et à une surveillance en temps
          réel. <br /> Passez à l'ère du numérique pour sécuriser efficacement
          votre infrastructure.
        </p>
        <div className="mt-6 space-x-4">
          <button className="px-6 py-3 bg-primaryBackground text-white rounded-md hover:bg-primaryHover transition">
            Découvrir nos produits
          </button>
          <button className="px-6 py-3 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition">
            Contacter un expert
          </button>
        </div>
      </section>
      <div className="m-20 bg-grey-100">
        <Grid
          items={categoriesData}
          renderItem={renderCategory}
          title="Nos Catégories"
          text=""
        />
      </div>
      <div className="m-20">
        <Grid
          items={topProductsData}
          renderItem={renderProduct}
          title="Les Top Produits du moment"
          text=""
        />
      </div>
    </div>
  );
};

export default Homepage;
