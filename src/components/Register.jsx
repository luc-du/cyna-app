import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser } from "../redux/slice/authSlice";

const Register = () => {
  // 1.State
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 2.Function
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.name,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
    navigate("/profile");
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
          name="name"
          id="name"
          className="input"
          placeholder="nom"
          onChange={handleChange}
        />{" "}
        {/* créer un composant*/}
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
        <button type="submit" className="btn">
          S&apos;inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;
