import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom"; // Corrigé
import { loginUser } from "../redux/slice/authSlice";

const Login = () => {
  // 1. State
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  // 2.Functions
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

  // 4.Render
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        className="flex flex-col gap-6 p-6 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="input"
          onChange={handleChange}
          required
        />
        {error && <p className="text-red-500">{error}</p>}

        <Link to={"/register"}>
          <p className=" text-gray-500 italic underline text-center hover:text-gray-600">
            Créer un compte
          </p>
        </Link>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default Login;
