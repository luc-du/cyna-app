import CarouselContainer from "./CarouselContainer";

const HeroSection = () => {
  return (
    <section
      id="heroSection"
      aria-label="Hero section with featured content"
      className="w-full flex flex-col items-center justify-center p-10"
    >
      <div
        className="w-full flex flex-col items-center justify-center bg-primaryBackground rounded-md overflow-hidden"
        role="region"
        aria-label="Featured carousel"
      >
        <CarouselContainer />
      </div>
    </section>
  );
};

export default HeroSection;
