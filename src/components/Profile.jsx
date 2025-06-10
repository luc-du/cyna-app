import { useEffect, useState } from "react";
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
import { profileTabs } from "./Profile/ProfileTabs";
import { AUTH_PROFILE_UPDATE_ERROR } from "./utils/errorMessages";
import { PROFILE_UPDATE_SUCCESS } from "./utils/successMessages";

/**
 * Page de profil utilisateur avec système de tabs
 * @component
 */
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useGlobalToast();
  const [activeTab, setActiveTab] = useState("profile");

  useAuthEffect();
  useAutoLogout();

  const tabs = profileTabs;

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

  // Rendu du contenu selon l'onglet actif
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <ProfileHeader user={user} onAvatarUpload={handleAvatarUpload} />
            <ProfileSection
              userData={user}
              onUpdateProfile={handleUpdateProfile}
              showToast={showToast}
            />
          </div>
        );
      case "password":
        return (
          <PasswordSection
            userId={user.id}
            onChangePassword={handleChangePassword}
            showToast={showToast}
          />
        );
      case "addresses":
        return (
          <AddressSection
            addresses={addresses}
            loading={addressesLoading}
            error={addressesError}
            userId={user?.id}
            onSaveAddress={handleSaveAddress}
            onDeleteAddress={handleDeleteAddress}
            showToast={showToast}
          />
        );
      case "payment":
        return <PaymentMethodsSection data={user} />;
      case "settings":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Paramètres du compte</h3>
            <LogoutButton style={"cta-danger"} handleClick={handleLogout} />
          </div>
        );
      default:
        return null;
    }
  };

  if (loading || userError || !user) {
    return (
      <main className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <DataStatus
          dataLength={user}
          loading={loading}
          loadingMessage="Chargement des données utilisateur en cours..."
          error={userError}
          emptyMessage="Aucune information pour cet utilisateur."
        />
      </main>
    );
  }

  return (
    <main
      className="w-full min-h-screen bg-gray-100"
      aria-label="Page de profil utilisateur"
    >
      <div className="container mx-auto px-4 py-6">
        {/* Header avec titre */}
        <div className="text-center mb-8">
          <h1
            id="profile-title"
            className="text-3xl font-bold text-gray-800"
            tabIndex={0}
          >
            Profil utilisateur
          </h1>
        </div>

        {/* Layout responsive avec tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Navigation tabs - Mobile: horizontal, Desktop: vertical */}
          <div className="lg:col-span-1">
            <nav
              className="bg-white rounded-lg shadow-md p-4"
              role="tablist"
              aria-label="Navigation du profil"
            >
              {/* Mobile: tabs horizontales avec scroll */}
              {/* <div className="flex overflow-x-auto lg:hidden space-x-2 pb-2"> */}
              <div className="flex flex-col items-center justify-evenly gap-2 lg:hidden space-x-2 pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap
                      transition-colors duration-200 font-medium text-sm
                      ${
                        activeTab === tab.id
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }
                    `}
                  >
                    <p>
                      <span className="text-lg">{tab.icon}</span>
                      {""}
                      <span>{tab.label}</span>
                    </p>
                  </button>
                ))}
              </div>

              {/* Desktop: tabs verticales */}
              <div className="hidden lg:flex flex-col space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg text-left
                      transition-colors duration-200 font-medium
                      ${
                        activeTab === tab.id
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <div
              id={`panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              className="bg-white rounded-lg shadow-md p-6"
            >
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
