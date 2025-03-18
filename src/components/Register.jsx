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
    role: "USER",
  });

  // 2.Functions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(registerUser(form));

    if (resultAction.fulfilled.match(resultAction)) {
      console.log(`Utilisateur créé: ${resultAction.payload}`);
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
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Inscription" : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};

export default Register;
