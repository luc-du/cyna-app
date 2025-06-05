import { useEffect, useState } from "react";
import { MOCKSLIDES } from "../../mock/MOCKS_DATA";
import { fetchCarouselSlides } from "../../services/homeService";
import Carousel from "./Carousel";

const CarouselContainer = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCarouselSlides()
      .then((data) => {
        // Formatage des données reçues du backend
        const formattedSlides = data.map((item) => ({
          id: item.id,
          imageUrl: item.imageUrl,
          title: item.title,
          description: item.text,
          ctaText: item.ctaText || "Voir nos produits",
          ctaLink: item.ctaLink || "/categories",
        }));
        setSlides(formattedSlides);
      })
      .catch((err) => {
        console.error("Erreur récupération carrousel :", err);

        // 404 => mock + message d'erreur
        setSlides(MOCKSLIDES);

        // mais dans tous les cas on continue avec les mocks.
        if (err.response && err.response.status === 404) {
          setError("Aucun contenu de carrousel trouvé, affichage des mocks.");
        } else if (err.message === "Network Error") {
          setError("Connexion impossible, affichage des données locales.");
        } else {
          setError("Erreur inattendue, affichage des données locales.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        <p className="text-gray-600 text-lg">Chargement du carrousel...</p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="w-full flex justify-center items-center h-12 mb-4">
          <p className="text-red-600 text-md">{error}</p>
        </div>
      )}
      <Carousel slides={slides} delayTransitionImage={5000} />
    </div>
  );
};

export default CarouselContainer;
