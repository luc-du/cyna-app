import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const PersonalInfoForm = ({ userData, onSave, onCancel }) => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (userData) {
      setForm({
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.firstname || !form.lastname || !form.email) {
      alert("Tous les champs obligatoires doivent être remplis.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert("Adresse email invalide.");
      return;
    }

    if (form.phone && !/^0[1-9][0-9]{8}$/.test(form.phone)) {
      alert("Numéro de téléphone invalide (format attendu : 0X XX XX XX XX).");
      return;
    }

    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="firstname"
        placeholder="Prénom"
        value={form.firstname}
        onChange={handleChange}
        required
        className="input-style"
      />
      <input
        type="text"
        name="lastname"
        placeholder="Nom"
        value={form.lastname}
        onChange={handleChange}
        required
        className="input-style"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="input-style"
      />
      <input
        type="text"
        name="phone"
        placeholder="Téléphone"
        value={form.phone}
        onChange={handleChange}
        pattern="^0[1-9][0-9]{8}$"
        className="input-style"
      />

      <div className="w-full flex items-center justify-end">
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Sauvegarder
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition"
          >
            Annuler
          </button>
        </div>
      </div>
    </form>
  );
};

PersonalInfoForm.propTypes = {
  userData: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PersonalInfoForm;
