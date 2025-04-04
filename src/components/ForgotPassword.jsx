import { useState } from "react";
import cynaLogo from "../assets/logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email envoyé à :", email);
    // TODO: appeler le backend ici pour envoyer le mail de réinitialisation
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md bg-white rounded-xl shadow-md px-10 py-8 flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center">
          <img src={cynaLogo} alt="Cyna Logo" className="h-14" />
        </div>

        <h1 className="text-center text-2xl font-bold text-gray-900">
          Réinitialisez votre mot de passe
        </h1>

        <p className="text-sm text-gray-600 text-center">
          Entrez votre adresse e-mail et nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </p>

        <input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={email}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition"
        >
          Envoyer le lien de réinitialisation
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
