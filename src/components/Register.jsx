import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cynaLogo from "../assets/logo.png";
import { fetchUserProfile, registerUser } from "../redux/slice/authSlice";
import { useGlobalToast } from "./GlobalToastProvider";
import { PASSWORD_INPUTTED_ERROR, REGISTER_ERROR } from "./utils/errorMessages";
import { checkPasswordStrength, getColorStrength } from "./utils/passwordUtils";
import { REGISTER_SUCCESS } from "./utils/successMessages";

/**
 * Le composant Register permet à un nouvel utilisateur de créer un compte.
 * Il fournit un formulaire d'inscription, un indicateur de force du mot de passe et une gestion des erreurs.
 * @component
 */
const Register = () => {
  // État local pour les champs du formulaire
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  // État pour l'erreur de mot de passe et la force du mot de passe
  const [passwordError, setPasswordError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("Faible");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // État Redux pour l'authentification
  const { error, loading } = useSelector((state) => state.auth);
  // Hook personnalisé pour les notifications globales
  const { showToast } = useGlobalToast();

  /**
   * Gère les changements dans les champs du formulaire.
   * Met à jour l'état local et vérifie la force du mot de passe si nécessaire.
   * @param {Object} e
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      setPasswordStrength(checkPasswordStrength(e.target.value));
    }
  };

  /**
   * Gère la soumission du formulaire d'inscription.
   * Valide la correspondance des mots de passe, déclenche l'inscription et la récupération du profil, et affiche les notifications.
   * @param {Object} e - Événement de soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setPasswordError("Les mots de passe saisis ne correspondent pas."); // Changed for clearer message
      return;
    }

    // Add validation for password strength (should not be "Faible")
    if (passwordStrength === "Faible") {
      showToast(
        "Le mot de passe est trop faible. Il doit contenir au moins 6 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial.",
        "error"
      );
      return;
    }

    setPasswordError(null);

    try {
      // 1. Inscription de l'utilisateur
      await dispatch(
        registerUser({
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          password: form.password,
          role: form.role,
        })
      ).unwrap();

      // 2. Récupération du profil utilisateur après inscription
      await dispatch(fetchUserProfile()).unwrap();

      showToast(REGISTER_SUCCESS, "success");
      navigate("/profile");
    } catch (err) {
      console.error(REGISTER_ERROR, err);
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.message || "Échec de l'inscription."; // Added period for consistency
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-md px-10 py-8 flex flex-col gap-6"
        aria-label="Formulaire d'inscription"
      >
        {/* Logo de l'application */}
        <div className="flex justify-center">
          <img
            src={cynaLogo}
            alt="Logo de Cyna"
            className="h-14"
            aria-hidden="true"
          />
        </div>
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Créez votre compte
        </h1>
        {/* Champ prénom */}
        <label htmlFor="firstname" className="sr-only">
          Prénom
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Prénom"
          className="input"
          onChange={handleChange}
          required
          autoComplete="given-name"
        />
        {/* Champ nom */}
        <label htmlFor="lastname" className="sr-only">
          Nom
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Nom"
          className="input"
          onChange={handleChange}
          required
          autoComplete="family-name"
        />
        {/* Champ email */}
        <label htmlFor="email" className="sr-only">
          Adresse e-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Adresse e-mail"
          className="input"
          onChange={handleChange}
          required
          autoComplete="email"
        />
        {/* Champ mot de passe */}
        <div>
          {" "}
          {/* Added a div to group label, help text, input, and strength */}
          <label htmlFor="password" className="block font-medium text-gray-700">
            {" "}
            {/* Changed to block and removed sr-only */}
            Mot de passe
          </label>
          {/* Exigences du mot de passe - Proactive guidance */}
          <p id="passwordHelp" className="text-sm text-gray-500 mt-1 mb-2">
            {PASSWORD_INPUTTED_ERROR}
          </p>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            className="input"
            required
            aria-describedby="passwordHelp passwordStrength"
            autoComplete="new-password"
          />
          {/* Indicateur de force du mot de passe - Reactive feedback */}
          <p
            id="passwordStrength"
            className={`text-sm ${getColorStrength(passwordStrength)} mt-2`}
            aria-live="polite"
          >
            Force du mot de passe : {passwordStrength}
          </p>
        </div>

        {/* Champ confirmation du mot de passe */}
        <div>
          {" "}
          {/* Added a div to group label and input */}
          <label
            htmlFor="confirmPassword"
            className="block font-medium text-gray-700"
          >
            {" "}
            {/* Changed to block and removed sr-only */}
            Confirmez le mot de passe
          </label>
          <input
            className="input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirmez le mot de passe"
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        {/* Affichage de l'erreur de mot de passe */}
        {passwordError && (
          <p className="text-red-500 text-sm -mt-4" role="alert">
            {" "}
            {/* Adjusted negative margin for better spacing */}
            {passwordError}
          </p>
        )}
        {/* Bouton de soumission */}
        <button
          type="submit"
          className="bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};

export default Register;
