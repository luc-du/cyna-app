import { logoPng as cynaLogo } from "@utils/indexImages";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slice/authSlice";
import { fetchUserProfile } from "../redux/slice/userSlice";
import { useGlobalToast } from "./GlobalToastProvider";
import CTAButton from "./shared/buttons/CTAButton";

/**
 * Composant de connexion utilisateur.
 * Permet à un utilisateur de s’authentifier à partir de son e-mail et mot de passe.
 * Applique un thème clair/sombre automatiquement.
 *
 * @component
 * @returns {JSX.Element}
 */
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { showToast } = useGlobalToast();

  /**
   * Gère la saisie utilisateur dans les champs email / mot de passe.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Gère la soumission du formulaire.
   * En cas de succès, redirige vers le profil utilisateur.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(form)).unwrap();
      await dispatch(fetchUserProfile()).unwrap();
      showToast("Connexion réussie", "success");
      navigate("/profile");
    } catch (err) {
      console.error("Erreur de connexion :", err);
      showToast(err?.message || "Échec de connexion", "error");
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen  bg-gray-100 dark:bg-gray-900 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md px-10 py-8 flex flex-col gap-6"
        aria-label="Formulaire de connexion"
      >
        {/* Logo de l'application */}
        <div className="flex justify-center" aria-hidden="true">
          <img src={cynaLogo} alt="Cyna Logo" className="h-14" />
        </div>

        {/* Titre principal */}
        <h1
          className="text-center text-2xl font-bold text-gray-900 dark:text-white"
          tabIndex={0}
        >
          Connexion à votre compte
        </h1>

        {/* Champ email */}
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
          autoComplete="email"
          required
          aria-required="true"
        />

        {/* Champ mot de passe */}
        <label htmlFor="password" className="sr-only">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          className="input dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          onChange={handleChange}
          autoComplete="current-password"
          required
          aria-required="true"
        />

        {/* Bouton de soumission */}
        <CTAButton
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition"
          label={loading ? "Connexion..." : "Se connecter"}
          disabled={loading}
        />

        {/* Lien vers la page d'inscription */}
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-4">
          Pas encore de compte ?{" "}
          <Link
            to="/register"
            className="text-purple-600 hover:underline focus:outline-none focus:ring"
          >
            Inscrivez-vous ici
          </Link>
        </p>

        {/* Lien vers mot de passe oublié */}
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-4">
          Mot de passe oublié ?{" "}
          <Link
            to="/forgot_password"
            className="text-purple-600 hover:underline focus:outline-none focus:ring"
          >
            Récupérer mon mot de passe
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
