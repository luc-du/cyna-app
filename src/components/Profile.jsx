import PropTypes from "prop-types";
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
    // Try using 'file' as the key, or the exact field name expected by your backend
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:8081/api/v1/user/${user.id}/profiles`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchUserProfile());
    } catch (error) {
      console.error("Erreur lors de l'upload d'avatar :", error);
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
          Impossible de récupérer les informations de l'utilisateur.
        </p>
      )}
    </main>
  );
};

// PropTypes for child components
ProfileHeader.propTypes = {
  data: PropTypes.object.isRequired,
  onUpload: PropTypes.func.isRequired,
};

ProfileSection.propTypes = {
  data: PropTypes.object.isRequired,
};

AddressSection.propTypes = {
  data: PropTypes.object.isRequired,
};

PaymentMethodsSection.propTypes = {
  data: PropTypes.object.isRequired,
};

AccountStatus.propTypes = {
  data: PropTypes.object.isRequired,
};

LogoutButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Profile;
