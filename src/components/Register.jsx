import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cynaLogo from "../assets/logo.png";
import { fetchUserProfile, registerUser } from "../redux/slice/authSlice";
import { useGlobalToast } from "./GlobalToastProvider";

/**
 * Composant d'inscription utilisateur.
 * Permet à un nouvel utilisateur de créer un compte en remplissant un formulaire.
 * Affiche également la force du mot de passe et gère les erreurs de validation.
 */
const Register = () => {
  // État local pour stocker les valeurs du formulaire
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  // État pour gérer les erreurs de mot de passe et la force du mot de passe
  const [passwordError, setPasswordError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("Faible");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Récupération de l'état d'authentification depuis Redux
  const { error, loading } = useSelector((state) => state.auth);
  // Hook personnalisé pour afficher des notifications globales
  const { showToast } = useGlobalToast();

  /**
   * Gère les changements dans les champs du formulaire.
   * Met à jour l'état local et vérifie la force du mot de passe si nécessaire.
   * @param {Object} e - Événement de changement de champ
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      setPasswordStrength(checkPasswordStrength(e.target.value));
    }
  };

  /**
   * Vérifie la force du mot de passe selon des critères définis.
   * @param {string} password - Mot de passe à vérifier
   * @returns {string} - Niveau de force ("Faible", "Moyen", "Fort")
   */
  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Faible";
    if (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[^a-zA-Z0-9]/.test(password)
    )
      return "Fort";
    return "Moyen";
  };

  /**
   * Gère la soumission du formulaire d'inscription.
   * Vérifie la correspondance des mots de passe, effectue l'inscription et récupère le profil utilisateur.
   * Affiche des notifications en cas de succès ou d'erreur.
   * @param {Object} e - Événement de soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setPasswordError("Les mots de passe saisis ne correspondent pas");
      return;
    }

    setPasswordError(null);

    try {
      // 1. Enregistrement de l'utilisateur
      await dispatch(
        registerUser({
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          password: form.password,
          role: form.role,
        })
      ).unwrap();

      // 2. Récupération du profil utilisateur après enregistrement
      await dispatch(fetchUserProfile()).unwrap();

      showToast("Inscription réussie", "success");
      navigate("/profile");
    } catch (err) {
      console.error("Erreur d'inscription :", err);
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.message || "Échec de l'inscription";
      showToast(errorMessage, "error");
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

        <h1 className="text-center text-2xl font-bold text-gray-900">
          Créez votre compte
        </h1>

        {/* Champ Prénom */}
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />
        {/* Champ Nom */}
        <input
          type="text"
          name="lastname"
          placeholder="Nom"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />
        {/* Champ Email */}
        <input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />
        {/* Champ Mot de passe */}
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />
        {/* Indications sur le mot de passe */}
        <p className="text-sm text-gray-500">
          Le mot de passe doit contenir au moins 6 caractères, une majuscule, un
          chiffre et un caractère spécial.
        </p>
        {/* Affichage de la force du mot de passe */}
        <p
          className={`text-sm ${
            passwordStrength === "Fort"
              ? "text-green-600"
              : passwordStrength === "Moyen"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          Force du mot de passe : {passwordStrength}
        </p>
        {/* Champ Confirmation du mot de passe */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmez le mot de passe"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />

        {/* Affichage des erreurs de mot de passe */}
        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}
        {/* Affichage des erreurs globales */}
        {error && (
          <p className="text-red-500 text-sm">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition"
          disabled={loading}
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};

export default Register;
