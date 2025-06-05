import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarouselSlides } from "../../redux/slice/carouselSlice";
import Carousel from "./Carousel";

const CarouselContainer = () => {
  const dispatch = useDispatch();

  // On lit depuis le state Redux
  const slides = useSelector((state) => state.carousel.slides);
  const loading = useSelector((state) => state.carousel.loading);
  const error = useSelector((state) => state.carousel.error);

  useEffect(() => {
    dispatch(fetchCarouselSlides());
  }, [dispatch]);

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
