import Login from "@components/Login";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Connexion | CYNA</title>
        <meta
          name="description"
          content="Connectez-vous à votre espace personnel pour gérer vos abonnements, adresses et préférences chez CYNA."
        />
      </Helmet>
      <Login />
    </>
  );
};

export default LoginPage;
