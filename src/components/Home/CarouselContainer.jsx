import axios from "axios";
import { useEffect, useState } from "react";
import { API_ROUTES } from "../../api/apiRoutes";
import Carousel from "./Carousel";

const CarouselContainer = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(API_ROUTES.CAROUSEL.GET);

        const formattedSlides = response.data.map((item, index) => ({
          id: item.id,
          imageUrl: item.imageUrl, // fallback temporaire
          title: item.title,
          description: item.text,
          ctaText: item.ctaText || "Voir nos produits",
          ctaLink: item.ctaLink || "/categories",
        }));

        setSlides(formattedSlides);
      } catch (err) {
        console.error("Erreur récupération carrousel :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
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
