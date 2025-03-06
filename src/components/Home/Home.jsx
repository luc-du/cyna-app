import CategoriesGrid from "./CategoriesGrid";
import HeroSection from "./HeroSection";
import TopProductsGrid from "./TopProductsGrid";

const Home = () => {
  return (
    <div id="homepageContent" className="max-w-6xl mx-auto px-4">
      <HeroSection />
      <CategoriesGrid />
      <TopProductsGrid />
    </div>
  );
};

export default Home;
