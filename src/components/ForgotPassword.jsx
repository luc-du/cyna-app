import { resetPassword } from "@services/authServices";
import CTAButton from "@shared/buttons/CTAButton";
import { logoPng as cynaLogo } from "@utils/indexImages";
import { useState } from "react";
import { useGlobalToast } from "./GlobalToastProvider";

/**
 * Composant ForgotPassword
 * Gère la réinitialisation du mot de passe via un email sécurisé.
 * @component
 */
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useGlobalToast();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      showToast(
        "Un e-mail de réinitialisation a été envoyé. Vérifiez votre boîte de réception.",
        "success"
      );
    } catch (error) {
      console.error("Erreur lors de la réinitialisation :", error);
      showToast(
        error?.response?.data?.message ||
          "Impossible d'envoyer l'e-mail de réinitialisation.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md px-10 py-8 flex flex-col gap-6"
        onSubmit={handleSubmit}
        aria-label="Formulaire de réinitialisation de mot de passe"
      >
        <div className="flex justify-center" aria-hidden="true">
          <img src={cynaLogo} alt="Logo de Cyna" className="h-14" />
        </div>

        <h1
          className="text-center text-2xl font-bold text-gray-900 dark:text-white"
          tabIndex={0}
        >
          Réinitialisez votre mot de passe
        </h1>

        <p className="text-sm text-left text-gray-600 dark:text-gray-300">
          Entrez votre adresse e-mail ci-dessous. Nous vous enverrons un lien
          sécurisé pour définir un nouveau mot de passe.
        </p>

        <label htmlFor="email" className="sr-only">
          Adresse e-mail
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          className="input dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          value={email}
          onChange={handleChange}
          required
          autoComplete="email"
          aria-required="true"
        />

        <CTAButton
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition"
          disabled={loading}
          aria-busy={loading}
          aria-label="Envoyer le lien de réinitialisation"
          label={
            loading
              ? "Envoi en cours..."
              : "Envoyer le lien de réinitialisation"
          }
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
