import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenDefaultAvatar from "../assets/avatars/default-men.png";
import { fetchUserProfile, logout } from "../redux/slice/authSlice";

const Profile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Profil utilisateur</h1>

      {loading ? (
        <p>Chargement des informations...</p>
      ) : user ? (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-4">
            <img
              src={user.urlProfile || MenDefaultAvatar}
              alt="Profil"
              className="w-24 h-24 rounded-full border"
            />
          </div>

          {/* Informations utilisateur */}
          <div className="text-left">
            <p>
              <strong>Nom :</strong> {user.firstname} {user.lastname}
            </p>
            <p>
              <strong>Email :</strong> {user.email}
            </p>
            <p>
              <strong>Téléphone :</strong> {user.phone || "Non renseigné"}
            </p>
            <p>
              <strong>Rôle :</strong> {user.roles}
            </p>

            {/* Statuts du compte */}
            <div className="mt-4">
              <p
                className={`font-semibold ${
                  user.enabled ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.enabled ? "✔ Compte actif" : "❌ Compte désactivé"}
              </p>
              <p
                className={`font-semibold ${
                  user.emailVerified ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.emailVerified
                  ? "✔ Email vérifié"
                  : "❌ Email non vérifié"}
              </p>
              <p
                className={`font-semibold ${
                  user.accountNonLocked ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.accountNonLocked
                  ? "✔ Compte non verrouillé"
                  : "❌ Compte verrouillé"}
              </p>
            </div>

            <div className="w-full flex items-center justify-center">
              <button
                className="btn mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
                onClick={handleLogout}
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Impossible de récupérer les informations de l'utilisateur.</p>
      )}
    </div>
  );
};

export default Profile;
