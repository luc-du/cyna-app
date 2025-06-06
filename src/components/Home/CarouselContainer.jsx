import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarouselSlides } from "../../redux/slice/carouselSlice";
import DataStatus from "../shared/DataStatus";
import Carousel from "./Carousel";

const CarouselContainer = () => {
  const dispatch = useDispatch();
  // Récupération des données du carrousel depuis le store
  const { slides, loading, error } = useSelector((state) => state.carousel);

  // Effet pour charger les slides du carrousel au montage du composant
  useEffect(() => {
    dispatch(fetchCarouselSlides());
  }, [dispatch]);

  <DataStatus loading={loading} error={error} dataLength={slides.length} />;

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
