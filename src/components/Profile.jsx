import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, logout } from "../redux/slice/authSlice";
import AccountStatus from "./Profile/AccountStatus";
import AddressSection from "./Profile/AddressSection";
import LogoutButton from "./Profile/LogoutButton";
import PaymentMethodsSection from "./Profile/PaymentMethodsSection";
import ProfileHeader from "./Profile/ProfileHeader";
import ProfileSection from "./Profile/ProfileSection";

const Profile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirection si pas authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, dispatch, navigate]);

  // Rechargement du profil complet (utile si user.id évolue)
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [user?.id, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAvatarUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      await axios.patch(`/api/v1/user/${user.id}/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(fetchUserProfile());
    } catch (error) {
      console.error("Erreur lors de l'upload d'avatar :", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {loading ? (
        <p>Chargement des informations...</p>
      ) : user ? (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-4">
            Profil utilisateur
          </h1>
          <ProfileHeader data={user} onUpload={handleAvatarUpload} />
          <ProfileSection data={user} />

          <div id="container-details-section" className="mt-4 py-4 text-left">
            <AddressSection data={user} />
            <PaymentMethodsSection data={user} />
            <AccountStatus data={user} />
            <LogoutButton handleClick={handleLogout} />
          </div>
        </div>
      ) : (
        <p>Impossible de récupérer les informations de l'utilisateur.</p>
      )}
    </div>
  );
};

export default Profile;
