import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressSection from "../components/Profile/AddressSection";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileSection from "../components/Profile/ProfileSection";
import DataStatus from "../components/shared/DataStatus";
import { useAuthEffect } from "../hooks/useAuthEffect";
import { useAutoLogout } from "../hooks/useAutoLogout";
import { logout } from "../redux/slice/authSlice";
import { fetchUserProfile, updateUserProfile } from "../redux/slice/userSlice";
import { uploadProfileImage } from "../services/userService";
import { useGlobalToast } from "./GlobalToastProvider";
import { AUTH_PROFILE_UPDATE_ERROR } from "./utils/errorMessages";
import { PROFILE_UPDATE_SUCCESS } from "./utils/successMessages";

/**
 * Page de profil utilisateur
 * @component
 */
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useGlobalToast();

  useAuthEffect();
  useAutoLogout();

  const {
    user,
    loading: isLoading,
    error,
  } = useSelector((state) => state.user);
  const loading = isLoading || (!user && !error);

  // Chargement du profil
  useEffect(() => {
    if (!user) dispatch(fetchUserProfile());
  }, [dispatch, user]);

  // Déconnexion
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Mise à jour de l'avatar
  const handleAvatarUpload = async (file) => {
    if (!user?.id) return;
    try {
      await uploadProfileImage(user.id, file);
      await dispatch(fetchUserProfile());
      showToast("Avatar mis à jour avec succès !", "success");
    } catch {
      showToast("Erreur lors de la mise à jour de l'avatar", "error");
    }
  };

  // Mise à jour des informations personnelles
  const handleUpdateProfile = async (updates) => {
    if (!user?.id) return;
    try {
      await dispatch(updateUserProfile({ userId: user.id, updates })).unwrap();
      await dispatch(fetchUserProfile());
      showToast(PROFILE_UPDATE_SUCCESS, "success");
    } catch {
      showToast(AUTH_PROFILE_UPDATE_ERROR, "error");
    }
  };

  return (
    <main
      className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6"
      aria-label="Page de profil utilisateur"
      tabIndex={-1}
    >
      <DataStatus
        dataLength={user}
        loading={loading}
        loadingMessage="Chargement des données utilisateur en cours..."
        error={error}
        emptyMessage="Aucune information pour cet utilisateur."
      />

      {!loading && !error && user && (
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

          <ProfileHeader user={user} onAvatarUpload={handleAvatarUpload} />
          <ProfileSection
            userData={user}
            onUpdateProfile={handleUpdateProfile}
            showToast={showToast}
          />

          {/* Section mot de passe à créer */}
          <div role="region" aria-label="Mot de passe"></div>

          <div
            id="container-details-section"
            className="mt-4 py-4 text-left"
            aria-label="Détails du profil"
          >
            <div
              id="password-section"
              className="container-profile-section border border-slate-200 rounded-2xl gap-4 p-4"
            >
              <h2>PASSWORD SECTION</h2>
              <p>à développer</p>
            </div>
            <AddressSection
              user={user}
              // onUpdateAddress={/* à implémenter */}
              showToast={showToast}
            />
            {/* <PaymentMethodsSection user={user} /> */}
            {/* <AccountStatus user={user} /> */}
            {/* <LogoutButton onClick={handleLogout} /> */}
          </div>
        </section>
      )}
    </main>
  );
};

export default Profile;
