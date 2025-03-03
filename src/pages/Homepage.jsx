import { Link } from "react-router";
import Carousel from "../components/Carousel";
import Grid from "../components/Grid";
import ServiceCard from "../components/ServiceCard";
import { MOCK_Categories, MOCK_TopProducts } from "../mock/MOCKS_DATA";

const servicesData = MOCK_Categories;

// Données pour la grille des catégories
const categoriesData = MOCK_Categories;

// Données pour la grille des Top Produits
const topProductsData = MOCK_TopProducts;

// Fonctions de rendu pour la grille
const renderCategory = (category) => (
  <Link
    to={`/categories/${category.url}`}
    className="block bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
  >
    <div className="relative overflow-hidden rounded-t-lg">
      <img
        src={category.imageUrl}
        alt={category.name}
        className="w-full h-40 object-cover object-center transition-transform duration-300 hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
        <h3 className="text-xl font-semibold text-white">{category.name}</h3>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
    </div>
  </Link>
);

const renderProduct = (product) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
    <div className="relative overflow-hidden rounded-t-lg">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover object-center transition-transform duration-300 hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-md font-semibold text-gray-800">{product.name}</h3>
      <Link
        to={product.link}
        className="mt-2 inline-block text-blue-500 font-semibold hover:underline hover:text-blue-700 transition"
      >
        Voir le produit
      </Link>
    </div>
  </div>
);

const Homepage = () => {
  return (
    <div className="w-full homepage-content">
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
            <Link to={"/categories"}>Découvrir nos produits</Link>
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
