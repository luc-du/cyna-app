import { useAuthEffect } from "@hooks/useAuthEffect";
import { useAutoLogout } from "@hooks/useAutoLogout";
import {
  AUTH_PROFILE_UPDATE_ERROR,
  AVATAR_UPLOAD_ERROR,
  PAYMENT_ADDED_ERROR,
  PAYMENT_DELETION_ERROR,
  PAYMENT_SET_DEFAULT_ERROR,
  USER_DELETE_ERROR,
} from "@lib/errorMessages";
import {
  AVATAR_UPLOAD_SUCCESS,
  PAYMENT_ADDED_SUCCESS,
  PAYMENT_DELETION_SUCCESS,
  PAYMENT_SET_DEFAULT_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS,
} from "@lib/successMessages";
import { deleteUserProfile, uploadProfileImage } from "@services/userService";
import DataStatus from "@shared/DataStatus";
import {
  createAddress,
  deleteAddress,
  getUserAddresses,
  updateAddress,
} from "@slices/addressSlice";
import { changeUserPassword, logout } from "@slices/authSlice";
import {
  addPaymentMethod,
  deletePaymentMethod,
  fetchPaymentMethods,
  setDefaultPaymentMethod,
} from "@slices/paymentSlice";
import {
  createStripeCustomer,
  fetchUserProfile,
  updateUserProfile,
} from "@slices/userSlice";
import DarkModeToggle from "@ui/buttons/DarkModeToggle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGlobalToast } from "../GlobalToastProvider";
import AccountSettingsSection from "./AccountSettings/AccountSettingsSection";
import AddressSection from "./Address/AddressSection";
import DeleteAccountButton from "./DeletAccountButton";
import LogoutButton from "./LogoutButton";
import PasswordSection from "./Password/PasswordSection";
import PaymentMethodsSection from "./PaymentMethods/PaymentMethodsSection";
import ProfileHeader from "./ProfileHeader";
import ProfileSection from "./ProfileSection";
import { profileTabs } from "./ProfileTabs/ProfileTabs";
import SubscriptionsSection from "./Subscriptions/SubscriptionsSection";

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

  const { list: paymentMethods } = useSelector((state) => state.payment);

  const loading = userLoading || (!user && !userError);

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
    if (!user.customerId) {
      dispatch(createStripeCustomer())
        .unwrap()
        .then(() => console.log("Customer créé, reload profil"))
        .catch((e) => console.error("Erreur createStripeCustomer:", e));
      return;
    }
    dispatch(fetchPaymentMethods(user.customerId));
  }, [activeTab, user, dispatch]);

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
      dispatch(fetchPaymentMethods(user.customerId));
      showToast(PAYMENT_SET_DEFAULT_SUCCESS, "success");
    } catch {
      showToast(PAYMENT_SET_DEFAULT_ERROR, "error");
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.id) return;
    try {
      await deleteUserProfile(user.id);
      showToast(USER_DELETE_SUCCESS, "success");
      await fetchUserProfile();
      navigate("/");
    } catch (error) {
      showToast(USER_DELETE_ERROR, "error");
      console.log(error);
    }
  };

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
      case "subscriptions":
        return <SubscriptionsSection />;
      case "settings":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Paramètres du compte
            </h3>
            <AccountSettingsSection title="Mode sombre">
              <DarkModeToggle variant={"switch"} />
            </AccountSettingsSection>
            <AccountSettingsSection title="Suppression du compte">
              <DeleteAccountButton onConfirm={handleDeleteAccount} />
            </AccountSettingsSection>
            <AccountSettingsSection title="Changer de langue">
              <p className="text-gray-500 dark:text-gray-400">@ venir</p>
            </AccountSettingsSection>
            <AccountSettingsSection title="Newsletter">
              <p className="text-gray-500 dark:text-gray-400">@ venir</p>
            </AccountSettingsSection>
            <AccountSettingsSection title="Déconnexion">
              <div className="flex justify-center">
                <LogoutButton style={"cta-danger"} handleClick={handleLogout} />
              </div>
            </AccountSettingsSection>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading || userError || !user) {
    return (
      <main className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
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
      className="w-full min-h-screen bg-gray-100 dark:bg-gray-900"
      aria-label="Page de profil utilisateur"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div className="lg:col-span-1">
            <nav
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
              role="tablist"
              aria-label="Navigation du profil"
            >
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
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                      }
                    `}
                  >
                    <p>
                      <span className="text-lg">{tab.icon}</span>{" "}
                      <span>{tab.label}</span>
                    </p>
                  </button>
                ))}
              </div>
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
                          : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
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
          <div className="lg:col-span-3">
            <div
              id={`panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
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
