import { Warning } from "postcss";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useGlobalToast } from "../../GlobalToastProvider";

/**
 * Formulaire de mise à jour des informations personnelles.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.userData - Données initiales de l'utilisateur.
 * @param {Function} props.onSave - Fonction appelée à la soumission du formulaire.
 * @param {Function} props.onCancel - Fonction appelée en cas d'annulation.
 */
const PersonalInfoForm = ({ userData, onSave, onCancel }) => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  // Remplissage du formulaire à partir des données utilisateur
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

  const { showToast } = useGlobalToast();

  /**
   * Gère la mise à jour des champs du formulaire.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Gère la soumission du formulaire.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.firstname || !form.lastname || !form.email) {
      alert("Tous les champs obligatoires doivent être remplis.");
      showToast("Tous les champs obligatoires doivent être remplis.", Warning);

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

    const payload = {
      ...form,
      phone: form.phone ? parseInt(form.phone, 10) : undefined,
    };
    onSave(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      aria-label="Formulaire d'informations personnelles"
    >
      {/* Prénom */}
      <label htmlFor="firstname" className="sr-only">
        Prénom
      </label>
      <input
        id="firstname"
        type="text"
        name="firstname"
        placeholder="Prénom"
        value={form.firstname}
        onChange={handleChange}
        required
        className="input-style"
      />

      {/* Nom */}
      <label htmlFor="lastname" className="sr-only">
        Nom
      </label>
      <input
        id="lastname"
        type="text"
        name="lastname"
        placeholder="Nom"
        value={form.lastname}
        onChange={handleChange}
        required
        className="input-style"
      />

      {/* Email */}
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="input-style"
      />

      {/* Téléphone */}
      <label htmlFor="phone" className="sr-only">
        Téléphone
      </label>
      <input
        id="phone"
        type="text"
        name="phone"
        placeholder="Téléphone (ex: 0601020304)"
        value={form.phone}
        onChange={handleChange}
        pattern="^0[1-9][0-9]{8}$"
        inputMode="numeric"
        className="input-style"
        aria-describedby="phoneFormat"
      />
      <span id="phoneFormat" className="sr-only">
        Format attendu : 0X XX XX XX XX
      </span>

      {/* Boutons */}
      <div className="w-full flex items-center justify-end">
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            aria-label="Sauvegarder les informations personnelles"
          >
            Sauvegarder
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition"
            aria-label="Annuler la modification"
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
