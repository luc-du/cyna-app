import CategoriesGrid from "./CategoriesGrid";
import HeroSection from "./HeroSection";
import PresentationSection from "./PresentationSection";
import TopProductsGrid from "./TopProductsGrid";

const Home = () => {
  return (
    <div id="homepageContent" className="max-w-6xl mx-auto my-4 px-4">
      <HeroSection />
      <PresentationSection />
      <CategoriesGrid />
      <TopProductsGrid />
    </div>
  );
};

export default Home;
