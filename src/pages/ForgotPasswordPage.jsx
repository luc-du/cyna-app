import ForgotPassword from "@components/ForgotPassword";
import { Helmet } from "react-helmet-async";

const ForgotPasswordPage = () => {
  return (
    <>
      <Helmet>
        <title>Réinitialisation du mot de passe | CYNA</title>
        <meta
          name="description"
          content="Réinitialisez votre mot de passe en toute sécurité pour accéder à votre compte CYNA."
        />
      </Helmet>
      <ForgotPassword />
    </>
  );
};

export default ForgotPasswordPage;
