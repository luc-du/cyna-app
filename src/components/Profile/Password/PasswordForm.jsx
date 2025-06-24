import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  checkPasswordStrength,
  getColorStrength,
} from "../../utils/passwordUtils";

/**
 * Formulaire de changement de mot de passe.
 * Gère :
 * - la validation de la confirmation,
 * - l’indicateur de force,
 * - le renvoi du payload { userId, oldPassword, newPassword }.
 *
 * @component
 * @param {Object} props
 * @param {number|string} props.userId
 * @param {Function} props.onChangePassword
 * @param {Function} props.showToast
 */
const PasswordForm = ({ userId, onChangePassword, showToast, onCancel }) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirm: "",
  });

  const [strength, setStrength] = useState("Faible");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "newPassword") {
      setStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirm) {
      showToast("Les mots de passe ne correspondent pas.", "error");
      return;
    }

    if (strength === "Faible") {
      showToast(
        "Le nouveau mot de passe est trop faible (6 + majuscule, chiffre, spécial).",
        "error"
      );
      return;
    }

    onChangePassword({
      userId,
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="password-modal-title"
      className="space-y-4"
    >
      {/* Ancien mot de passe */}
      <div>
        <label
          htmlFor="oldPassword"
          className="block font-medium text-gray-700 dark:text-gray-300"
        >
          Ancien mot de passe
        </label>
        <input
          id="oldPassword"
          name="oldPassword"
          type="password"
          value={form.oldPassword}
          onChange={handleChange}
          required
          className="input dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      {/* Nouveau mot de passe */}
      <div>
        <label
          htmlFor="newPassword"
          className="block font-medium text-gray-700 dark:text-gray-300"
        >
          Nouveau mot de passe
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          required
          aria-describedby="passwordHelp passwordStrength"
          className="input dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        <p
          id="passwordHelp"
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          Doit contenir au moins 6 car., 1 majuscule, 1 chiffre, 1 car. spécial.
        </p>
      </div>

      {/* Indicateur de force */}
      <p
        id="passwordStrength"
        aria-live="polite"
        className={`text-sm ${getColorStrength(strength)}`}
      >
        Force du mot de passe : {strength}
      </p>

      {/* Confirmation */}
      <div>
        <label
          htmlFor="confirm"
          className="block font-medium text-gray-700 dark:text-gray-300"
        >
          Confirmer le nouveau mot de passe
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          value={form.confirm}
          onChange={handleChange}
          required
          className="input dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      {/* Bouton de soumission */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="submit"
          className="cta-success"
          aria-label="Sauvegarder nouveau mot de passe"
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
    </form>
  );
};

PasswordForm.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChangePassword: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default PasswordForm;
