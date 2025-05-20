import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API_ROUTES } from "../../api/apiRoutes";
import CTAButton from "../ui/buttons/CTAButton";

const PromoSection = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchPresentation = async () => {
      try {
        const response = await axios.get(API_ROUTES.CAROUSEL.GET);
        setSlides(response.data);
      } catch {
        setSlides([
          {
            title: "Pure player en cybersécurité pour PME et MSP",
            text: "Cyna est spécialisée dans la vente de solutions de sécurité SaaS innovantes telles que SOC, EDR et XDR. Notre plateforme e-commerce internationale permet aux entreprises d’accéder à des services de protection avancée.",
          },
        ]);
      }
    };

    fetchPresentation();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => clearInterval(intervalRef.current);
  }, [slides]);

  const currentSlide = slides[current] || { title: "", text: "" };

  return (
    <section className="w-full bg-gray-100 py-10 px-6 rounded-lg md:px-20 text-center ">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primaryBackground">
        {currentSlide.title}
      </h1>
      <p className="mt-4 text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
        {currentSlide.text}
      </p>
      <div
        id="containerCTA"
        className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 mt-6"
      >
        <CTAButton link="/categories" label="Découvrir nos produits" />
        <CTAButton
          className={
            "px-6 py-3 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
          }
          link="/contact"
          label="Contacter un expert"
        />
      </div>
      {slides.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === current ? "bg-primaryBackground" : "bg-gray-400"
              } inline-block`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PromoSection;
