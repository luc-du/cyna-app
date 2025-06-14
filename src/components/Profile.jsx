import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaymentMethodsSection from "../components/Profile/PaymentMethods/PaymentMethodsSection";
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
import {
  addPaymentMethod,
  deletePaymentMethod,
  fetchPaymentMethods,
  setDefaultPaymentMethod,
} from "../redux/slice/paymentSlice";
import {
  createStripeCustomer,
  fetchUserProfile,
  updateUserProfile,
} from "../redux/slice/userSlice";
import { uploadProfileImage } from "../services/userService";
import { useGlobalToast } from "./GlobalToastProvider";
import AddressSection from "./Profile/Address/AddressSection";
import LogoutButton from "./Profile/LogoutButton";
import PasswordSection from "./Profile/Password/PasswordSection";
import { profileTabs } from "./Profile/ProfileTabs/ProfileTabs";
import {
  AUTH_PROFILE_UPDATE_ERROR,
  AVATAR_UPLOAD_ERROR,
  PAYMENT_ADDED_ERROR,
  PAYMENT_DELETION_ERROR,
  PAYMENT_SET_DEFAULT_ERROR,
} from "./utils/errorMessages";
import {
  AVATAR_UPLOAD_SUCCESS,
  PAYMENT_ADDED_SUCCESS,
  PAYMENT_DELETION_SUCCESS,
  PAYMENT_SET_DEFAULT_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
} from "./utils/successMessages";

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

  // Profil utilisateur
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);

  // Adresses
  const {
    list: addresses,
    loading: addressesLoading,
    error: addressesError,
  } = useSelector((state) => state.address);

  // Moyens de paiement
  const {
    list: paymentMethods,
    loading: paymentLoading,
    error: paymentError,
  } = useSelector((state) => state.payment);

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

  useEffect(() => {
    if (activeTab !== "payment" || !user) return;

    // 1) Si pas encore de customerId, on le crée
    if (!user.customerId) {
      console.log("Création Stripe Customer…");
      dispatch(createStripeCustomer())
        .unwrap()
        .then(() => console.log("Customer créé, reload profil"))
        .catch((e) => console.error("Erreur createStripeCustomer:", e));
      return; // on sort, on attend la mise à jour de user.customerId
    }

    // 2) Dès qu’on a le customerId, on fetch les méthodes
    console.log("FetchPaymentMethods pour", user.customerId);
    dispatch(fetchPaymentMethods(user.customerId));
  }, [activeTab, user, dispatch]);

  // Handlers
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAvatarUpload = async (file) => {
    if (!user?.id) return;
    try {
      await uploadProfileImage(user.id, file);
      dispatch(fetchUserProfile());
      showToast(AVATAR_UPLOAD_SUCCESS, "success");
    } catch {
      showToast(AVATAR_UPLOAD_ERROR, "error");
    }
  };

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

  const handleDeleteAddress = async (addressId) => {
    try {
      await dispatch(deleteAddress(addressId)).unwrap();
      dispatch(getUserAddresses(user.id));
      showToast("Adresse supprimée avec succès", "success");
    } catch {
      showToast("Erreur lors de la suppression de l'adresse", "error");
    }
  };

  const handleAddPaymentMethod = async (paymentMethodId) => {
    try {
      await dispatch(
        addPaymentMethod({ customerId: user.customerId, paymentMethodId })
      ).unwrap();
      dispatch(fetchPaymentMethods(user.customerId));
      showToast(PAYMENT_ADDED_SUCCESS, "success");
    } catch {
      showToast(PAYMENT_ADDED_ERROR, "error");
    }
  };

  const handleDeletePaymentMethod = async (id) => {
    try {
      await dispatch(deletePaymentMethod(id)).unwrap();
      dispatch(fetchPaymentMethods(user.customerId));
      showToast(PAYMENT_DELETION_SUCCESS, "success");
    } catch {
      showToast(PAYMENT_DELETION_ERROR, "error");
    }
  };

  const handleSetDefaultPaymentMethod = async (id) => {
    try {
      await dispatch(
        setDefaultPaymentMethod({ id, customerId: user.customerId })
      ).unwrap();
      // dispatch(fetchPaymentMethods(user.customerId));//mise à jour géré par l'extraReducer
      showToast(PAYMENT_SET_DEFAULT_SUCCESS, "success");
      console.log("Set default");
    } catch {
      showToast(PAYMENT_SET_DEFAULT_ERROR, "error");
      console.log("Set default");
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
        return (
          <PaymentMethodsSection
            methods={paymentMethods}
            onAdd={handleAddPaymentMethod}
            onDelete={handleDeletePaymentMethod}
            onSetDefault={handleSetDefaultPaymentMethod}
          />
        );
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
            {user
              ? `Bienvenue ${user.lastname} ${user.firstname}`
              : "Profil utilisateur"}
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
