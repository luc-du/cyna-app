import CTAButton from "../ui/buttons/CTAButton";

const PresentationSection = () => {
  return (
    <section className="w-full bg-gray-100 py-10 px-6 rounded-lg md:px-20 text-center ">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primaryBackground">
        Pure player en cybersécurité pour PME et MSP
      </h1>
      <p className="mt-4 text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
        Cyna est spécialisée dans la vente de solutions de sécurité SaaS
        innovantes telles que SOC, EDR et XDR. Notre plateforme e-commerce
        internationale permet aux entreprises d’accéder à des services de
        protection avancée.
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
    </section>
  );
};

export default PresentationSection;
