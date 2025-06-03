import CategoriesGrid from "../Home/CategoriesGrid";
import HeroSection from "./HeroSection";
import TopProductsGrid from "./TopProductsGrid";
const Home = () => {
  return (
    <main
      id="homepageContent"
      className="max-w-6xl mx-auto my-4 px-4"
      tabIndex={-1}
      aria-label="Homepage main content"
    >
      <HeroSection />
      <section aria-label="Categories">
        <CategoriesGrid />
      </section>
      <section aria-label="Top Products">
        <TopProductsGrid />
      </section>
    </main>
  );
};

export default Home;
