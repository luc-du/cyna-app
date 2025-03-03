import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const ProductCarousel = ({ images, delayTransitionImage }) => {
  // 1. States :
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Functions:
  // 2.1 next :
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
    });
  }, [images.length]);

  // 2.2: prev
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
    });
  };

  // 3.Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, delayTransitionImage);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, delayTransitionImage, nextSlide]);

  // Render
  return (
    <div className="relative  w-full flex items-center justify-center h-96 overflow-hidden rounded-lg shadow-md">
      {/* Container des images avec Flex et transition */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-center flex-shrink-0"
          />
        ))}
      </div>

      {/* Bouton Précédent */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 hover:bg-primary hover:scale-110 text-white rounded-full p-2"
      >
        <FaArrowAltCircleLeft />
      </button>

      {/* Bouton Suivant */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 hover:bg-primary hover:scale-110 text-white rounded-full p-2"
      >
        <FaArrowAltCircleRight />
      </button>
    </div>
  );
};
ProductCarousel.propTypes = {
  images: PropTypes.array.isRequired,
  delayTransitionImage: PropTypes.number.isRequired,
};

export default ProductCarousel;
