import Search from "@components/search/Search";
import { Helmet } from "react-helmet-async";

const SearchPage = () => {
  return (
    <>
      <Helmet>
        <title>Recherche de produits | CYNA</title>
        <meta
          name="description"
          content="Recherchez nos services et produits de cybersécurité par mots-clés, filtres et catégories sur la plateforme CYNA."
        />
      </Helmet>
      <Search />
    </>
  );
};

export default SearchPage;
