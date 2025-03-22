import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenDefaultAvatar from "../assets/avatars/default-men.png";
import { fetchUserProfile, logout } from "../redux/slice/authSlice";
import CTAButton from "./ui/buttons/CTAButton";

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
              alt={`Photo de profil de ${user.firstname}${user.lastname}`}
              title={`Photo de profil de ${user.firstname}${user.lastname}`}
              className="w-24 h-24 rounded-full border"
            />

            <CTAButton
              label="Modifier"
              className={
                "mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
              }
            />
          </div>

          {/* Informations utilisateur */}
          <div id="personal-informations" className="mt-4 py-4 text-left">
            <div className="py-4 border-b-2">
              <h2 className="text-xl">Informations personnelles</h2>
              <p>
                <strong>Nom :</strong> {user.firstname} {""} {user.lastname}
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
              <div className="w-full flex items-center justify-end">
                <CTAButton
                  label="Modifier"
                  className={
                    "mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
                  }
                />
              </div>
            </div>

            {/* Adresses */}
            <div id="address" className="py-4 border-b-2">
              <h2 className="text-xl">Adresses</h2>
              <p>
                <strong>Adresse principale : </strong>
                {user.addresses?.length > 0
                  ? user.addresses[0]
                  : "Non renseigné"}
              </p>
              <p>
                <strong>Adresse secondaire : </strong>
                {user.addresses?.length > 0
                  ? user.addresses[1]
                  : "Non renseigné"}
              </p>
              <div className="w-full flex items-center justify-end">
                <CTAButton
                  label="Modifier"
                  className={
                    "mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
                  }
                />
              </div>
            </div>

            {/* Méthode de paiement*/}
            <div id="payment_methods" className="py-4 border-b-2">
              <h2 className="text-xl">Méthodes de paiement</h2>
              <p>
                <strong>Méthode de paiement principale : </strong>
                {user.cards?.length > 0 ? user.cards[0] : "Non renseigné"}
              </p>
              <strong>Méthode de paiement secondaire : </strong>
              {user.cards?.length > 0 ? user.cards[1] : "Non renseigné"}
              <div className="w-full flex items-center justify-end">
                <CTAButton
                  label="Modifier"
                  className={
                    "mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
                  }
                />
              </div>
            </div>

            {/* Statut du compte */}
            <div id="account-status" className="mt-4 py-4 border-b-2">
              <h2 className="text-xl">État du compte</h2>

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
              <div className="w-full flex items-center justify-end">
                <CTAButton
                  label="Vérifier"
                  className={
                    "mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
                  }
                />
              </div>
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
        <p>Impossible de récupérer les informations de l`&apos`utilisateur.</p>
      )}
    </div>
  );
};

export default Profile;
