import Profile from "@components/Profile/Profile";
import { Helmet } from "react-helmet-async";

const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>Profil utilisateur | CYNA</title>
        <meta
          name="description"
          content="Gérez vos informations personnelles, adresses, abonnements et paramètres de compte CYNA depuis votre espace sécurisé."
        />
      </Helmet>
      <Profile />
    </>
  );
};

export default ProfilePage;
