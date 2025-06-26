import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

/**
 * Formulaire de mise à jour des informations personnelles.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.userData - Données initiales de l'utilisateur.
 * @param {Function} props.onSave - Fonction appelée à la soumission du formulaire.
 * @param {Function} props.onCancel - Fonction appelée en cas d'annulation.
 */
const PersonalInfoForm = ({ userData, onSave, onCancel, showToast }) => {
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

  /**
   * Gère la mise à jour des champs du formulaire.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Ajoute un préfixe "0" si nécessaire lors de la perte de focus.
   */
  const handlePhoneBlur = () => {
    const { phone } = form;
    // Si 9 chiffres sans 0 en tête, préfixe automatiquement
    if (/^[1-9][0-9]{8}$/.test(phone)) {
      setForm((prev) => ({ ...prev, phone: `0${phone}` }));
    }
  };

  /**
   * Gère la soumission du formulaire.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des champs obligatoires
    if (!form.firstname || !form.lastname || !form.email) {
      onCancel();
      return;
    }

    // Vérification email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      showToast("Vérifier la saisie de l'input email", "warning");
      return;
    }

    // Vérification téléphone (doit commencer par 0 et être suivi de 9 chiffres)
    if (form.phone && !/^0[1-9][0-9]{8}$/.test(form.phone)) {
      showToast("Vérifier la saisie de l'input téléphone", "warning");
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
        className="input"
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
        className="input"
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
        className="input"
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
        onBlur={handlePhoneBlur}
        pattern="^0[1-9][0-9]{8}$"
        inputMode="numeric"
        className="input"
        aria-describedby="phoneFormat"
      />
      <span id="phoneFormat" className="sr-only">
        Format attendu : 0X XX XX XX XX
      </span>
      <div className="w-full flex items-center justify-end">
        <div className="flex gap-4">
          <button
            type="submit"
            className="cta-success"
            aria-label="Sauvegarder les informations personnelles"
          >
            Sauvegarder
          </button>

          <CTAButton
            label="Annuler"
            handleClick={onCancel}
            type="button"
            className="cta-cancel"
            aria-label="Annuler la modification"
          />
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
