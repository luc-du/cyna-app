import CarouselContainer from "./CarouselContainer";

const HeroSection = () => {
  return (
    <section
      id="heroSection"
      className="w-full flex flex-col items-center justify-center   p-10"
    >
      <div className="w-full flex flex-col items-center justify-center bg-primaryBackground rounded-md overflow-hidden">
        <CarouselContainer />
      </div>
    </section>
  );
};

export default HeroSection;
