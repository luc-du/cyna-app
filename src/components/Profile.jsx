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
  // 1.State
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 2.Functions

  /* UseEffect Zone */
  // Auth
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, dispatch, navigate]);

  // Fetch profile
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [user?.id, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // 3.Others

  // 4.Render
  return (
    // main grid
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {loading ? (
        <p>Chargement des informations...</p>
      ) : user ? (
        /* profile content */
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-4">
            Profil utilisateur
          </h1>
          {/* Avatar */}
          <ProfileHeader data={user} />
          {/* Informations utilisateur */}
          <ProfileSection data={user} />

          {/* Container details */}
          <div id="container-details-section" className="mt-4 py-4 text-left">
            {/* Adresses */}
            <AddressSection data={user} />
            {/* Méthode de paiement*/}
            <PaymentMethodsSection data={user} />
            {/* Statut du compte */}
            <AccountStatus data={user} />
            {/* LogoutButton */}
            <LogoutButton handleClick={handleLogout} />
          </div>
        </div>
      ) : (
        <p>Impossible de récupérer les informations de l`&apos`utilisateur.</p>
      )}
    </div>
  );
};

export default Profile;
