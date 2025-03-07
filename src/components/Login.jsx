import { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  // 1.State
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  // 2.Function
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.name,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch("loginUser(form)"); //modif apres le slice
  };
  // 3.Others
  // 4.Render
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1>Connexion</h1>
      <form
        className="flex flex-col gap-6 p-6 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
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
        <button type="submit" className="btn">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
