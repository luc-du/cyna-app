import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import cynaLogo from "../assets/logo.png";
import { fetchUserProfile, loginUser } from "../redux/slice/authSlice";
import { useGlobalToast } from "./GlobalToastProvider";

/**
 * Composant de connexion utilisateur.
 * Permet à un utilisateur existant de se connecter avec ses identifiants.
 * Affiche un formulaire de connexion, gère la soumission et affiche les erreurs éventuelles.
 */
const Login = () => {
  // État local pour stocker les valeurs du formulaire
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Récupère l'état d'authentification depuis le store Redux
  const { loading } = useSelector((state) => state.auth);
  // Hook personnalisé pour afficher des notifications
  const { showToast } = useGlobalToast();

  /**
   * Gère la modification des champs du formulaire.
   * @param {Object} e - Événement de changement d'input
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Gère la soumission du formulaire de connexion.
   * Tente de connecter l'utilisateur et de récupérer son profil.
   * Affiche une notification en cas de succès ou d'erreur.
   * @param {Object} e - Événement de soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(form)).unwrap();
      await dispatch(fetchUserProfile()).unwrap();
      showToast("Connexion réussie", "success");
      navigate("/profile");
    } catch (err) {
      console.error("Erreur de connexion :", err); //01062025 mise à jour du message d'erreur
      showToast(err, "error");
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-md px-10 py-8 flex flex-col gap-6"
      >
        {/* Logo de l'application */}
        <div className="flex justify-center">
          <img src={cynaLogo} alt="Cyna Logo" className="h-14" />
        </div>

        {/* Titre du formulaire */}
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Connexion à votre compte
        </h1>

        {/* Champ email */}
        <input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />

        {/* Champ mot de passe */}
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition"
          disabled={loading}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        {/* Lien vers la page d'inscription */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-purple-600 hover:underline">
            Inscrivez-vous ici
          </Link>
        </p>
        <p className="text-sm text-gray-600 text-center mt-4">
          Mot de passe oublié ?{" "}
          <Link
            to="/forgot_password"
            className="text-purple-600 hover:underline"
          >
            Récupérer mon mot de passe
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
