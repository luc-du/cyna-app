import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthEffect } from "../hooks/useAuthEffect";
import { useAutoLogout } from "../hooks/useAutoLogout";
import { fetchUserProfile, logout } from "../redux/slice/authSlice";
import { AuthService } from "../services/authServices";
import AccountStatus from "./Profile/AccountStatus";
import AddressSection from "./Profile/AddressSection";
import LogoutButton from "./Profile/LogoutButton";
import PaymentMethodsSection from "./Profile/PaymentMethodsSection";
import ProfileHeader from "./Profile/ProfileHeader";
import ProfileSection from "./Profile/ProfileSection";
import { useGlobalToast } from "./GlobalToastProvider";

/**
 * Composant de page de profil utilisateur.
 *
 * @component
 * @description
 * Affiche les informations du profil utilisateur, y compris l'avatar, les détails personnels,
 * l'adresse, les méthodes de paiement et le statut du compte. Permet également la déconnexion
 * et le changement d'avatar. Ce composant gère l'accessibilité via des rôles ARIA, des labels,
 * et la gestion du focus pour une meilleure expérience utilisateur.
 *
 * @accessibilité
 * - Utilise des rôles ARIA (`role="status"`, `role="alert"`) pour informer les technologies d'assistance.
 * - Utilise des labels ARIA (`aria-label`, `aria-labelledby`) pour décrire les sections.
 * - Gère le focus avec `tabIndex` pour permettre la navigation clavier.
 *
 * @returns {JSX.Element} La page de profil utilisateur.
 */
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast = useGlobalToast();

  useAuthEffect(); // vérifie le token et redirige sinon
  useAutoLogout(); // auto-déconnexion à expiration

  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) dispatch(fetchUserProfile());
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAvatarUpload = async (file) => {
    if (!user?.id) {
      console.warn("Utilisateur non chargé, annulation de l'upload avatar.");
      return;
    }

    try {
      await AuthService.uploadAvatar(user.id, file); // FormData géré dans le service
      await dispatch(fetchUserProfile());
      showToast("Avatar mis à jour avec succès !", "success");
    } catch (error) {
      console.error("Erreur upload avatar :", error);
      showToast("Erreur lors de la mise à jour de l'avatar", "error");
    }
  };
  return (
    <main
      className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6"
      aria-label="Page de profil utilisateur"
      tabIndex={-1}
    >
      {loading ? (
        <p role="status" aria-live="polite">
          Chargement des informations...
        </p>
      ) : user ? (
        <section
          className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md"
          aria-labelledby="profile-title"
        >
          <h1
            id="profile-title"
            className="text-3xl font-bold text-center mb-4"
            tabIndex={0}
          >
            Profil utilisateur
          </h1>

          <ProfileHeader data={user} onUpload={handleAvatarUpload} />
          <ProfileSection data={user} />

          <div
            id="container-details-section"
            className="mt-4 py-4 text-left"
            aria-label="Détails du profil"
          >
            <AddressSection data={user} />
            <PaymentMethodsSection data={user} />
            <AccountStatus data={user} />
            <LogoutButton handleClick={handleLogout} />
          </div>
        </section>
      ) : (
        <p role="alert">
          Impossible de récupérer les informations utilisateur.
        </p>
      )}
    </main>
  );
};

// PropTypes pour tous les composants enfants
ProfileHeader.propTypes = {
  data: PropTypes.object.isRequired,
  onUpload: PropTypes.func.isRequired,
};
ProfileSection.propTypes = { data: PropTypes.object.isRequired };
AddressSection.propTypes = { data: PropTypes.object.isRequired };
PaymentMethodsSection.propTypes = { data: PropTypes.object.isRequired };
AccountStatus.propTypes = { data: PropTypes.object.isRequired };
LogoutButton.propTypes = { handleClick: PropTypes.func.isRequired };

export default Profile;
