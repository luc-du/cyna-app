import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

/**
 * Carousel
 * Affiche un carrousel d’images avec texte, CTA, transition automatique et navigation.
 * Sans débordement horizontal.
 *
 * @param {Object[]} slides - Slides à afficher.
 * @param {number} delayTransitionImage - Délai en ms entre chaque slide.
 * @returns {JSX.Element}
 */
const Carousel = ({ slides, delayTransitionImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, delayTransitionImage);
    return () => clearInterval(interval);
  }, [nextSlide, delayTransitionImage]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="relative w-full h-96 rounded-lg shadow-md overflow-hidden"
      aria-label="Carrousel de services"
      role="region"
    >
      {/* Slide unique affiché */}
      {slides.map((slide, index) =>
        index === currentIndex ? (
          <div
            key={slide.id || index}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slide.imageUrl}
              alt={
                slide.title
                  ? `Illustration : ${slide.title}`
                  : `Slide ${index + 1}`
              }
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-3xl text-white font-bold">{slide.title}</h2>
              <p className="text-lg text-white mt-2">{slide.description}</p>
              <a
                href={slide.ctaLink}
                className="mt-4 px-6 py-3 bg-primary text-white rounded-md hover:bg-primaryHover transition"
              >
                {slide.ctaText}
              </a>
            </div>
          </div>
        ) : null
      )}

      {/* Flèches navigation */}
      <button
        onClick={prevSlide}
        aria-label="Slide précédente"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 hover:bg-primary text-white rounded-full p-2 hidden sm:flex"
      >
        <FaArrowAltCircleLeft />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Slide suivante"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 hover:bg-primary text-white rounded-full p-2 hidden sm:flex"
      >
        <FaArrowAltCircleRight />
      </button>

      {/* Indicateurs */}
      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-6"
        role="tablist"
        aria-label="Indicateurs de slides"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={currentIndex === index}
            aria-label={`Diapositive ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${
              currentIndex === index ? "bg-primary" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      ctaLink: PropTypes.string,
      ctaText: PropTypes.string,
    })
  ).isRequired,
  delayTransitionImage: PropTypes.number.isRequired,
};

export default Carousel;
