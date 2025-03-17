import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../redux/slice/authSlice";

const Login = () => {
  // 1. State
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);
  // 2.Functions
  const handleSubmit = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChange = async (e) => {
    e.preventDefault();
    const resultAction = dispatch(loginUser(form));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/profile");
    }
  };
  // 3.Others

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
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default Login;
