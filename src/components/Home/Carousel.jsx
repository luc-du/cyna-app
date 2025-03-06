import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import edr from "../../assets/images/edr.jpg";
import xdr from "../../assets/images/xdr.jpg";

// En attendant - backend => Simulation des données du back-office (remplacé par un fetch API)
const mockSlides = [
  {
    id: 1,
    imageUrl: edr,
    title: "Protection avancée pour vos PME",
    description: "Découvrez nos solutions EDR, SOC et XDR.",
    ctaText: "Voir nos produits",
    ctaLink: "/categories",
  },
  {
    id: 2,
    imageUrl: xdr,
    title: "Cybersécurité de nouvelle génération",
    description:
      "Protégez votre infrastructure avec des outils SaaS performants.",
    ctaText: "En savoir plus",
    ctaLink: "/about",
  },
  {
    id: 3,
    imageUrl: xdr,
    title: "Cybersécurité de nouvelle génération",
    description:
      "Protégez votre infrastructure avec des outils SaaS performants.",
    ctaText: "En savoir plus",
    ctaLink: "/about",
  },
];

const Carousel = ({ slides, delayTransitionImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Gestion de la transition automatique
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, delayTransitionImage);

    return () => clearInterval(interval);
  }, [currentIndex, delayTransitionImage, nextSlide]);

  // 2. Gestion de la navigation
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // 3. Rendu du carrousel
  return (
    <div className="relative w-full flex items-center justify-center h-96  rounded-lg shadow-md overflow-hidden">
      {/* Container des slides avec transition */}
      <div
        className="flex items-center transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative w-full flex-shrink-0">
            <img
              src={slide.imageUrl}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-fill"
            />

            {/* Overlay Texte */}
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
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 hover:bg-primary text-white rounded-full p-2 hidden sm:flex"
      >
        <FaArrowAltCircleLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 hover:bg-primary text-white rounded-full p-2 hidden sm:flex"
      >
        <FaArrowAltCircleRight />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-primary" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  slides: PropTypes.array,
  delayTransitionImage: PropTypes.number.isRequired,
};

//Exemple Récupération des données du back-office
const CarouselContainer = () => {
  // Prévoir à remplacer par un appel API fetch vers le back-office
  return <Carousel slides={mockSlides} delayTransitionImage={5000} />;
};

export default CarouselContainer;
