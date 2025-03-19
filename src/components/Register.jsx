import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser } from "../redux/slice/authSlice";

const Register = () => {
  // 1.State
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  /* Error confirmPassword*/
  const [passwordError, setPasswordError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("Faible");

  // 2.Functions
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

    /* Vérification du mot de passe */
    if (form.password !== form.confirmPassword) {
      setPasswordError(`Les mots de passe saisis ne correspondent pas`);
      return;
    }

    setPasswordError(null);

    const { confirmPassword, ...userData } = form;

    const resultAction = await dispatch(registerUser(form));

    if (registerUser.fulfilled.match(resultAction)) {
      console.log(`Utilisateur créé: ${resultAction.payload.token}`);
      navigate("/profile");
    }
  };

  // 3.Others
  // 4.Render
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1>Créer votre compte</h1>
      <form
        className="flex flex-col gap-6 p-6 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="firstname"
          id="firstname"
          className="input"
          placeholder="Prénom"
          onChange={handleChange}
        />{" "}
        <input
          type="text"
          name="lastname"
          id="lastname"
          className="input"
          placeholder="Nom"
          onChange={handleChange}
        />{" "}
        <input
          type="email"
          name="email"
          id="email"
          className="input"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          className="input"
          placeholder="Mot de passe"
          onChange={handleChange}
        />
        <p className="text-sm text-gray-500">
          Le mot de passe doit contenir au moins 6 caractères, une majuscule, un
          chiffre et un caractère spécial.
        </p>
        <p
          className={`text-sm ${
            passwordStrength === "Fort"
              ? "text-green-500"
              : passwordStrength === "Moyen"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          Force du mot de passe : {passwordStrength}
        </p>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="input"
          placeholder="Confirmer mot de passe"
          onChange={handleChange}
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        {error && (
          <p className="text-red-500">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}{" "}
        <div className="w-full flex items-center justify-center">
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Inscription" : "S'inscrire"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
