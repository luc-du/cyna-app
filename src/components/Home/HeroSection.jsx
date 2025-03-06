import CTAButton from "../ui/buttons/CTAButton";
import Carousel from "./Carousel";

const HeroSection = () => {
  return (
    <section
      id="heroSection"
      className="w-full flex flex-col items-center justify-center   p-10"
    >
      <div className="w-full flex flex-col items-center justify-center bg-primaryBackground rounded-md overflow-hidden">
        <Carousel
          images={["Image1", "Image2", "Image3"]}
          delayTransitionImage={5000}
        />
      </div>
      <div className="text-center mt-6">
        <h1 className="text-4xl font-extrabold text-primaryBackground">
          Pure player en cybersécurité pour PME et MSP
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Cyna est spécialisée dans la vente de solutions de sécurité SaaS
          innovantes, telles que SOC, EDR et XDR. <br /> Notre plateforme
          e-commerce internationale permet aux entreprises d'accéder facilement
          à des services de protection avancée et à une surveillance en temps
          réel. <br /> Passez à l'ère du numérique pour sécuriser efficacement
          votre infrastructure.
        </p>
        <div
          id="containerCTA"
          className="w-full flex items-center justify-center gap-6 mt-6 space-x-4"
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
      </div>
    </section>
  );
};

export default HeroSection;
