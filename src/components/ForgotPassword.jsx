import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email envoyé à :", email);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Réinitialisation du mot de passe</h1>
      <form
        className="flex flex-col gap-6 p-6 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <p className="text-gray-500 italic">
          Entrez votre email pour recevoir un lien de réinitialisation.
        </p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
