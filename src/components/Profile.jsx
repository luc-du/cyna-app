import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressSection from "../components/Profile/AddressSection";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileSection from "../components/Profile/ProfileSection";
import DataStatus from "../components/shared/DataStatus";
import { useAuthEffect } from "../hooks/useAuthEffect";
import { useAutoLogout } from "../hooks/useAutoLogout";
import {
  createAddress,
  deleteAddress,
  getUserAddresses,
  updateAddress,
} from "../redux/slice/addressSlice";
import { changeUserPassword, logout } from "../redux/slice/authSlice";
import { fetchUserProfile, updateUserProfile } from "../redux/slice/userSlice";
import { uploadProfileImage } from "../services/userService";
import { useGlobalToast } from "./GlobalToastProvider";
import LogoutButton from "./Profile/LogoutButton";
import PasswordSection from "./Profile/Password/PasswordSection";
import PaymentMethodsSection from "./Profile/PaymentMethodsSection";
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
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);
  const {
    list: addresses,
    loading: addressesLoading,
    error: addressesError,
  } = useSelector((state) => state.address);

  const loading = userLoading || (!user && !userError);

  // Chargement du profil et des adresses
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
    if (user?.id) {
      dispatch(getUserAddresses(user.id));
    }
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
      dispatch(fetchUserProfile());
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
      dispatch(fetchUserProfile());
      showToast(PROFILE_UPDATE_SUCCESS, "success");
    } catch {
      showToast(AUTH_PROFILE_UPDATE_ERROR, "error");
    }
  };

  // Création ou modification d'une adresse
  const handleSaveAddress = async (addressData) => {
    if (!user?.id) return;
    try {
      if (addressData.id) {
        await dispatch(
          updateAddress({ addressId: addressData.id, updatedData: addressData })
        ).unwrap();
      } else {
        await dispatch(
          createAddress({ ...addressData, userId: user.id })
        ).unwrap();
      }
      dispatch(getUserAddresses(user.id));
      showToast(
        addressData.id
          ? "Adresse modifiée avec succès"
          : "Adresse ajoutée avec succès",
        "success"
      );
    } catch {
      showToast("Erreur lors de l'enregistrement de l'adresse", "error");
    }
  };

  // Suppression d'une adresse
  const handleDeleteAddress = async (addressId) => {
    try {
      await dispatch(deleteAddress(addressId)).unwrap();
      dispatch(getUserAddresses(user.id));
      showToast("Adresse supprimée avec succès", "success");
    } catch {
      showToast("Erreur lors de la suppression de l'adresse", "error");
    }
  };

  // Mise à jour du mot de passe
  const handleChangePassword = async (payload) => {
    try {
      await dispatch(changeUserPassword(payload)).unwrap();
      showToast("Mot de passe modifié avec succès", "success");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Erreur complète:", error);
      showToast(
        error.message || "Erreur lors de la mise à jour du mot de passe",
        "error"
      );
    }
  };

  return (
    <main
      className="w-full flex flex-col items-center justify-center min-h-screen  bg-gray-100 p-6"
      aria-label="Page de profil utilisateur"
      tabIndex={-1}
    >
      <DataStatus
        dataLength={user}
        loading={loading}
        loadingMessage="Chargement des données utilisateur en cours..."
        error={userError}
        emptyMessage="Aucune information pour cet utilisateur."
      />

      {!loading && !userError && user && (
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

          <div
            id="container-details-section"
            className="mt-4 py-4 text-left"
            aria-label="Détails du profil"
          >
            <ProfileHeader user={user} onAvatarUpload={handleAvatarUpload} />

            <ProfileSection
              userData={user}
              onUpdateProfile={handleUpdateProfile}
              showToast={showToast}
            />

            {/* Section mot de passe à implémenter */}
            <PasswordSection
              userId={user.id}
              onChangePassword={handleChangePassword}
              showToast={showToast}
            />

            <AddressSection
              addresses={addresses}
              loading={addressesLoading}
              error={addressesError}
              user={user}
              onSaveAddress={handleSaveAddress}
              onDeleteAddress={handleDeleteAddress}
              showToast={showToast}
            />

            {/** Voir CDC */}
            <PaymentMethodsSection data={user} />

            {/* <LogoutButton handleClick={"/logout"} style={"cta-danger"} /> */}
            <LogoutButton style={"cta-danger"} />
          </div>
        </section>
      )}
    </main>
  );
};

export default Profile;
