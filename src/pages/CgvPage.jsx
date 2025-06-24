import CGV from "@components/Legal/CGV";
import { Helmet } from "react-helmet-async";

const CGVPage = () => {
  return (
    <>
      <Helmet>
        <title>Conditions Générales de Vente | CYNA</title>
        <meta
          name="description"
          content="Consultez les conditions générales de vente de CYNA pour nos services et abonnements cybersécurité."
        />
      </Helmet>
      <CGV />
    </>
  );
};

export default CGVPage;
