import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";
import { useState } from "react";

/**
 * Formulaire d’ajout d’une carte.
 * MOCKED OFFLINE
 * @param {Function} onSubmit – reçoit { customerId, type, number, month, year, cvc }.
 * @param {Function} onCancel
 */
const PaymentMethodForm = ({ onSubmit, onCancel }) => {
  const [cardholderName, setCardholderName] = useState("");
  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!cardholderName) errs.cardholderName = "Requis";
    if (!/^\d{16}$/.test(number)) errs.number = "16 chiffres requis";
    if (!/^(0[1-9]|1[0-2])$/.test(month)) errs.month = "MM";
    if (!/^\d{4}$/.test(year)) errs.year = "YYYY";
    if (!/^\d{3,4}$/.test(cvc)) errs.cvc = "3 ou 4 chiffres";
    if (!type) errs.type = "Requis";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ cardholderName, type: "CARD", number, month, year, cvc });
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-describedby="bg-white pm-form-instructions"
    >
      <p id="pm-form-instructions" className="text-sm text-gray-600 mb-4">
        Saisissez les détails de votre carte. Tous les champs sont requis.
      </p>

      <label className="block mb-2">
        Titulaire
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="input"
          aria-invalid={!!errors.cardholderName}
          aria-describedby={errors.cardholderName ? "err-name" : undefined}
        />
        {errors.cardholderName && (
          <span id="err-name" className="text-red-600 text-sm">
            {errors.cardholderName}
          </span>
        )}
      </label>

      <label className="block mb-2">
        Type de carte
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input"
          aria-invalid={!!errors.type}
          aria-describedby={errors.type ? "err-type" : undefined}
        />
        {errors.type && (
          <span id="err-type" className="text-red-600 text-sm">
            {errors.type}
          </span>
        )}
      </label>

      <label className="block mb-2">
        Numéro de carte
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="input"
          maxLength={16}
          aria-invalid={!!errors.number}
          aria-describedby={errors.number ? "err-number" : undefined}
        />
        {errors.number && (
          <span id="err-number" className="text-red-600 text-sm">
            {errors.number}
          </span>
        )}
      </label>

      <div className="flex space-x-4 mb-2">
        <label className="flex-1">
          Mois (MM)
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input"
            maxLength={2}
            aria-invalid={!!errors.month}
            aria-describedby={errors.month ? "err-month" : undefined}
          />
          {errors.month && (
            <span id="err-month" className="text-red-600 text-sm">
              {errors.month}
            </span>
          )}
        </label>

        <label className="flex-1">
          Année (YYYY)
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="input"
            maxLength={4}
            aria-invalid={!!errors.year}
            aria-describedby={errors.year ? "err-year" : undefined}
          />
          {errors.year && (
            <span id="err-year" className="text-red-600 text-sm">
              {errors.year}
            </span>
          )}
        </label>
      </div>

      <label className="block mb-4">
        CVV
        <input
          type="text"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          className="input"
          maxLength={4}
          aria-invalid={!!errors.cvc}
          aria-describedby={errors.cvc ? "err-cvc" : undefined}
        />
        {errors.cvc && (
          <span id="err-cvc" className="text-red-600 text-sm">
            {errors.cvc}
          </span>
        )}
      </label>

      <div className="mt-6 flex justify-end space-x-4">
        <CTAButton
          type="button"
          handleClick={onCancel}
          label="Annuler"
          variant="secondary"
          className="underline"
        />
        <CTAButton type="submit" label="Valider" className="cta-success" />
      </div>
    </form>
  );
};

PaymentMethodForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PaymentMethodForm;
