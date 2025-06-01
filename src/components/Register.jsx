import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cynaLogo from "../assets/logo.png";
import { registerUser } from "../redux/slice/authSlice";
import { useGlobalToast } from "./GlobalToastProvider";

/**
 * Composant d'inscription utilisateur.
 * Permet à un nouvel utilisateur de créer un compte en remplissant un formulaire.
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

  // État pour la gestion des erreurs de mot de passe
  const [passwordError, setPasswordError] = useState(null);
  // État pour la force du mot de passe
  const [passwordStrength, setPasswordStrength] = useState("Faible");

  // Hooks Redux et navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);
  const { showToast } = useGlobalToast();

  /**
   * Gère le changement des champs du formulaire.
   * Met à jour l'état local et vérifie la force du mot de passe si nécessaire.
   * @param {object} e - Événement de changement
   */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // Vérifie la force du mot de passe lors de la saisie
    if (e.target.name === "password") {
      setPasswordStrength(checkPasswordStrength(e.target.value));
    }
  };

  /**
   * Vérifie la force du mot de passe selon certains critères.
   * @param {string} password - Le mot de passe à vérifier
   * @returns {string} - "Faible", "Moyen" ou "Fort"
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
   * Vérifie la correspondance des mots de passe et envoie les données à l'API.
   * @param {object} e - Événement de soumission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifie si les mots de passe correspondent
    if (form.password !== form.confirmPassword) {
      setPasswordError("Les mots de passe saisis ne correspondent pas");
      return;
    }

    setPasswordError(null);
    // Exclut confirmPassword avant l'envoi
    const { confirmPassword, ...userData } = form;

    // Envoie la requête d'inscription
    const resultAction = await dispatch(registerUser(userData));
    if (registerUser.fulfilled.match(resultAction)) {
      showToast("Inscription réussie", "success");
      navigate("/profile");
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
        {/* Affichage des erreurs générales */}
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
