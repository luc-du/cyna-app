import PropTypes from "prop-types";
import { useState } from "react";
import CTAButton from "../../shared/buttons/CTAButton";
/**
 * Formulaire d’ajout de carte.
 * @param {Function} onSubmit – reçoit { customerId, type, number, month, year, cvc }.
 * @param {Function} onCancel
 */
const PaymentMethodForm = ({ onSubmit, onCancel }) => {
  const [cardholderName, setCardholderName] = useState("");
  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!cardholderName) errs.cardholderName = "Requis";
    if (!/^\d{16}$/.test(number)) errs.number = "16 chiffres requis";
    if (!/^(0[1-9]|1[0-2])$/.test(month)) errs.month = "MM";
    if (!/^\d{4}$/.test(year)) errs.year = "YYYY";
    if (!/^\d{3,4}$/.test(cvc)) errs.cvc = "3 ou 4 chiffres";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ cardholderName, number, month, year, cvc });
  };

  return (
    <form onSubmit={handleSubmit} aria-describedby="pm-form-instructions">
      <p id="pm-form-instructions" className="text-sm text-gray-600 mb-4">
        Saisissez les détails de votre carte. Tous les champs sont requis.
      </p>

      <label className="block mb-2">
        Titulaire
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="mt-1 block w-full"
          aria-invalid={!!errors.cardholderName}
          aria-describedby={errors.cardholderName ? "err-name" : undefined}
        />
        {errors.cardholderName && (
          <span id="err-name" className="text-red-600 text-sm">
            {errors.cardholderName}
          </span>
        )}
      </label>

      {/* Champs numéro, expiry, cvc similaires… */}

      <div className="flex justify-end space-x-2 mt-6">
        <CTAButton variant="outline" onClick={onCancel}>
          Annuler
        </CTAButton>
        <CTAButton type="submit">Enregistrer</CTAButton>
      </div>
    </form>
  );
};

PaymentMethodForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PaymentMethodForm;
