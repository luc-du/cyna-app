import NotFound from "@components/NotFound";
import { Helmet } from "react-helmet-async";

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page introuvable | CYNA</title>
        <meta
          name="description"
          content="La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil CYNA."
        />
      </Helmet>
      <NotFound />
    </>
  );
};

export default PageNotFound;
