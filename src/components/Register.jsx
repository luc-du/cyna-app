import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cynaLogo from "../assets/logo.png";
import { registerUser } from "../redux/slice/authSlice";

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password") {
      setPasswordStrength(checkPasswordStrength(e.target.value));
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setPasswordError("Les mots de passe saisis ne correspondent pas");
      return;
    }

    setPasswordError(null);
    const { confirmPassword, ...userData } = form;

    const resultAction = await dispatch(registerUser(userData));
    if (registerUser.fulfilled.match(resultAction)) {
      console.log(`Utilisateur créé: ${resultAction.payload.token}`);
      navigate("/profile");
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-md px-10 py-8 flex flex-col gap-6"
      >
        <div className="flex justify-center">
          <img src={cynaLogo} alt="Cyna Logo" className="h-14" />
        </div>

        <h1 className="text-center text-2xl font-bold text-gray-900">
          Créez votre compte
        </h1>

        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Nom"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />

        <p className="text-sm text-gray-500">
          Le mot de passe doit contenir au moins 6 caractères, une majuscule, un
          chiffre et un caractère spécial.
        </p>
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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmez le mot de passe"
          className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          required
        />

        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}

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
