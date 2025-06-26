import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PASSWORD_INPUTTED_ERROR, REGISTER_ERROR } from "../lib/errorMessages";
import { REGISTER_SUCCESS } from "../lib/successMessages";
import { registerUser } from "../redux/slice/authSlice";
import { fetchUserProfile } from "../redux/slice/userSlice";
import { logoPng as cynaLogo } from "../utils/indexImages";
import { useGlobalToast } from "./GlobalToastProvider";
import CTAButton from "./shared/buttons/CTAButton";
import { checkPasswordStrength, getColorStrength } from "./utils/passwordUtils";

/**
 * Formulaire d'inscription d'un nouvel utilisateur.
 * Gère la saisie des champs, la validation, la force du mot de passe et les notifications.
 * @component
 * @returns {JSX.Element}
 */
const Register = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const [passwordError, setPasswordError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("Faible");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);
  const { showToast } = useGlobalToast();

  /**
   * Gère la mise à jour des champs du formulaire.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      setPasswordStrength(checkPasswordStrength(e.target.value));
    }
  };

  /**
   * Gère la soumission du formulaire.
   * Vérifie la validité des mots de passe, tente l'inscription et affiche un retour utilisateur.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setPasswordError("Les mots de passe saisis ne correspondent pas.");
      return;
    }

    if (passwordStrength === "Faible") {
      showToast(
        "Le mot de passe est trop faible. Il doit contenir au moins 6 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial.",
        "error"
      );
      return;
    }

    setPasswordError(null);

    try {
      await dispatch(registerUser(form)).unwrap();
      await dispatch(fetchUserProfile()).unwrap();
      showToast(REGISTER_SUCCESS, "success");
      navigate("/profile");
    } catch (err) {
      console.error(REGISTER_ERROR, err);
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.message || "Échec de l'inscription.";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md px-10 py-8 flex flex-col gap-6"
        aria-label="Formulaire d'inscription"
      >
        {/* Logo */}
        <div className="flex justify-center" aria-hidden="true">
          <img src={cynaLogo} alt="Logo de Cyna" className="h-14" />
        </div>

        <h1
          className="text-center text-2xl font-bold text-gray-900 dark:text-white"
          tabIndex={0}
        >
          Créez votre compte
        </h1>

        {/* Prénom */}
        <label htmlFor="firstname" className="sr-only">
          Prénom
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Prénom"
          className="input dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          onChange={handleChange}
          required
          autoComplete="given-name"
        />

        {/* Nom */}
        <label htmlFor="lastname" className="sr-only">
          Nom
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Nom"
          className="input dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          onChange={handleChange}
          required
          autoComplete="family-name"
        />

        {/* Email */}
        <label htmlFor="email" className="sr-only">
          Adresse e-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Adresse e-mail"
          className="input dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          onChange={handleChange}
          required
          autoComplete="email"
        />

        {/* Mot de passe */}
        <div>
          <label
            htmlFor="password"
            className="block font-medium text-gray-700 dark:text-gray-300"
          >
            Mot de passe
          </label>
          <p
            id="passwordHelp"
            className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-2"
          >
            {PASSWORD_INPUTTED_ERROR}
          </p>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            className="input dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            required
            aria-describedby="passwordHelp passwordStrength"
            autoComplete="new-password"
          />
          <p
            id="passwordStrength"
            className={`text-sm ${getColorStrength(passwordStrength)} mt-2`}
            aria-live="polite"
          >
            Force du mot de passe : {passwordStrength}
          </p>
        </div>

        {/* Confirmation du mot de passe */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block font-medium text-gray-700 dark:text-gray-300"
          >
            Confirmez le mot de passe
          </label>
          <input
            className="input dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirmez le mot de passe"
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        {/* Erreur de confirmation */}
        {passwordError && (
          <p className="text-red-500 text-sm -mt-2" role="alert">
            {passwordError}
          </p>
        )}

        {/* Soumission */}
        <CTAButton
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition"
          disabled={loading}
          aria-busy={loading}
          label={loading ? "Inscription..." : "S'inscrire"}
        />
      </form>
    </div>
  );
};

export default Register;
