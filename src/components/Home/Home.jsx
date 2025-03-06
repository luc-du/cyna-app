import CategoriesGrid from "./CategoriesGrid";
import HeroSection from "./Herosection";
import TopProductsGrid from "./TopProductsGrid";

const Home = () => {
  return (
    <div id="homepageContent" className="max-w-full mx-auto px-4">
      <HeroSection />
      <CategoriesGrid />
      <TopProductsGrid />
    </div>
  );
};

export default Home;
