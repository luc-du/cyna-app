import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import cynaLogo from "../assets/logo.png";
import { loginUser } from "../redux/slice/authSlice";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(resultAction)) {
      console.log(`Token reçu : ${resultAction.payload.token}`);
      navigate("/profile");
    }
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
          Connectez-vous à votre compte
        </h1>

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

        {error && (
          <p className="text-red-600 text-sm mt-2">
            {typeof error === "string"
              ? error
              : error.message || "Erreur inconnue"}
          </p>
        )}

        <button
          type="submit"
          className="bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition"
          disabled={loading}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Vous n&apos;avez pas de compte ?{" "}
          <Link to="/register" className="text-purple-600 hover:underline">
            Inscrivez-vous
          </Link>
        </p>
        <p className="text-center text-sm text-gray-600">
          Mot de passe oublié ?{" "}
          <Link
            to="/forgot_password"
            className="text-purple-600 hover:underline"
          >
            Récupérez-votre mot de passe
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
