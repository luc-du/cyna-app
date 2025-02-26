import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ProductCarousel = ({ images, delayTransitionImage }) => {
  // 1. States :
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Functions:
  // 2.1 next :
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
    });
  };

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
  }, [currentIndex]); // Dépendance : currentIndex, nextSlide

  // Render
  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-md">
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
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Bouton Précédent */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2"
      >
        ⬅️
      </button>

      {/* Bouton Suivant */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2"
      >
        ▶️
      </button>
    </div>
  );
};
ProductCarousel.propTypes = {
  images: PropTypes.array.isRequired,
  delayTransitionImage: PropTypes.number.isRequired,
};

export default ProductCarousel;
