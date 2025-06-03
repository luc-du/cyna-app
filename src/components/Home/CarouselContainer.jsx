// src/components/Home/CarouselContainer.jsx
import { useEffect, useState } from "react";
import { fetchCarouselSlides } from "../../services/homeService";
import Carousel from "./Carousel";

const CarouselContainer = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarouselSlides()
      .then((data) => {
        // on reformate si besoin
        const formatted = data.map((item) => ({
          id: item.id,
          imageUrl: item.imageUrl,
          title: item.title,
          description: item.text,
          ctaText: item.ctaText || "Voir nos produits",
          ctaLink: item.ctaLink || "/categories",
        }));
        setSlides(formatted);
      })
      .catch((err) => {
        console.error("Erreur récup carrousel :", err);
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

  return <Carousel slides={slides} delayTransitionImage={5000} />;
};

export default CarouselContainer;
