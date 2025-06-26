import FAQ from "@components/FAQ/Faq";
import { Helmet } from "react-helmet-async";

const FAQPage = () => {
  return (
    <>
      <Helmet>
        <title>FAQ | CYNA</title>
        <meta
          name="description"
          content="Trouvez les réponses aux questions fréquentes sur les services, abonnements et paiements CYNA."
        />
      </Helmet>
      <FAQ />
    </>
  );
};

export default FAQPage;
