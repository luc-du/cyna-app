import Home from "@components/Home/Home";
import { Helmet } from "react-helmet-async";

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>Accueil | CYNA</title>
        <meta
          name="description"
          content="Bienvenue sur CYNA, votre solution cybersécurité tout-en-un : SOC, SIEM, EDR, XDR, et plus encore. Découvrez nos offres dès maintenant."
        />
      </Helmet>
      <Home />
    </>
  );
};

export default Homepage;
