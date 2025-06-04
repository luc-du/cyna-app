import { useEffect, useState } from "react";
import { fetchCarouselSlides } from "../../services/homeService";
import Carousel from "./Carousel";

const CarouselContainer = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCarouselSlides()
      .then((data) => {
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
        setError(
          "Impossible de charger les contenus du carrousel. Veuillez réessayer ultérieurement."
        );
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

  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return <Carousel slides={slides} delayTransitionImage={5000} />;
};

export default CarouselContainer;
