import DataStatus from "@shared/DataStatus";
import { fetchCarouselSlides } from "@slices/carouselSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "./Carousel";

/**
 * CarouselContainer
 * Composant conteneur pour le carrousel d'accueil.
 * Gère la récupération des slides via Redux et l'affichage conditionnel.
 *
 * @returns {JSX.Element}
 */
const CarouselContainer = () => {
  const dispatch = useDispatch();
  const { slides, loading, error } = useSelector((state) => state.carousel);

  useEffect(() => {
    dispatch(fetchCarouselSlides());
  }, [dispatch]);

  return (
    <section
      aria-label="Carrousel de promotions"
      className="w-full"
      tabIndex={-1}
    >
      <DataStatus
        loading={loading}
        error={error}
        dataLength={slides.length}
        loadingMessage="Chargement des promotions..."
        emptyMessage="Aucune diapositive à afficher pour le moment"
      />

      {error && (
        <div className="w-full flex justify-center items-center h-12 mb-4">
          <p className="text-red-600 text-md" role="alert">
            {error}
          </p>
        </div>
      )}

      {slides.length > 0 && (
        <Carousel slides={slides} delayTransitionImage={5000} />
      )}
    </section>
  );
};

export default CarouselContainer;
