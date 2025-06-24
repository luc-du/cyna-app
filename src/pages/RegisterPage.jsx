import Register from "@components/Register";
import { Helmet } from "react-helmet-async";

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Inscription | CYNA</title>
        <meta
          name="description"
          content="Créez votre compte CYNA pour accéder à nos services de cybersécurité et gérer vos abonnements en toute simplicité."
        />
      </Helmet>
      <Register />
    </>
  );
};

export default RegisterPage;
