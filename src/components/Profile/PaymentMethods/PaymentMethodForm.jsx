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
      {/* Champs numéro, expiry, cvc similaires… */}
      <div className="mt-6 flex justify-end space-x-2">
        <CTAButton
          type="button"
          handleClick={onCancel}
          label="Annuler"
          variant="secondary"
          className={"underline"}
        />

        <CTAButton
          type="submit"
          label="Valider"
          aria-label="valider"
          className={"cta-success"}
        />
      </div>{" "}
    </form>
  );
};

PaymentMethodForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PaymentMethodForm;

// /**
//  * PaymentMethodForm
//  *
//  * Formulaire pour ajouter une méthode de paiement.
//  * Champs : cardholderName, number, expMonth, expYear, cvc
//  * Validation client et accessibilité.
//  *
//  * Props :
//  * - onSubmit(newMethod) : callback quand le formulaire est validé
//  * - onCancel() : annule et ferme le formulaire
//  */
// const PaymentMethodForm = ({ onSubmit, onCancel }) => {
//   const [values, setValues] = useState({
//     cardholderName: "",
//     number: "",
//     expMonth: "",
//     expYear: "",
//     cvc: "",
//   });
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const errs = {};
//     if (!values.cardholderName.trim())
//       errs.cardholderName = "Le nom est requis.";
//     if (!/^\d{16}$/.test(values.number))
//       errs.number = "Le numéro doit comporter 16 chiffres.";
//     if (!/^(0[1-9]|1[0-2])$/.test(values.expMonth))
//       errs.expMonth = "Mois invalide (MM).";
//     if (!/^\d{4}$/.test(values.expYear))
//       errs.expYear = "Année invalide (YYYY).";
//     if (!/^\d{3,4}$/.test(values.cvc))
//       errs.cvc = "CVC invalide (3 ou 4 chiffres).";
//     setErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     // Créer l'objet à passer à onSubmit
//     const newMethod = {
//       id: `pm_${Date.now()}`,
//       brand: "unknown",
//       last4: values.number.slice(-4),
//       expMonth: parseInt(values.expMonth, 10),
//       expYear: parseInt(values.expYear, 10),
//       cardholderName: values.cardholderName,
//       isDefault: false,
//     };
//     onSubmit(newMethod);
//   };

//   return (
//     <form onSubmit={handleSubmit} aria-labelledby="payment-form-title">
//       <h3 id="payment-form-title" className="text-lg font-medium mb-4">
//         Ajouter une carte
//       </h3>
//       <div className="space-y-4">
//         <div>
//           <label htmlFor="cardholderName" className="block text-sm font-medium">
//             Titulaire de la carte
//           </label>
//           <input
//             id="cardholderName"
//             name="cardholderName"
//             type="text"
//             value={values.cardholderName}
//             onChange={handleChange}
//             required
//             aria-describedby={
//               errors.cardholderName ? "error-cardholderName" : undefined
//             }
//             className="input"
//           />
//           {errors.cardholderName && (
//             <p id="error-cardholderName" className="text-sm text-red-600">
//               {errors.cardholderName}
//             </p>
//           )}
//         </div>
//         <div>
//           <label htmlFor="number" className="block text-sm font-medium">
//             Numéro de carte
//           </label>
//           <input
//             id="number"
//             name="number"
//             type="text"
//             inputMode="numeric"
//             pattern="\d{16}"
//             value={values.number}
//             onChange={handleChange}
//             required
//             aria-describedby={errors.number ? "error-number" : undefined}
//             className="input"
//           />
//           {errors.number && (
//             <p id="error-number" className="text-sm text-red-600">
//               {errors.number}
//             </p>
//           )}
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="expMonth" className="block text-sm font-medium">
//               Mois (MM)
//             </label>
//             <input
//               id="expMonth"
//               name="expMonth"
//               type="text"
//               inputMode="numeric"
//               pattern="^(0[1-9]|1[0-2])$"
//               value={values.expMonth}
//               onChange={handleChange}
//               required
//               aria-describedby={errors.expMonth ? "error-expMonth" : undefined}
//               className="input"
//             />
//             {errors.expMonth && (
//               <p id="error-expMonth" className="text-sm text-red-600">
//                 {errors.expMonth}
//               </p>
//             )}
//           </div>
//           <div>
//             <label htmlFor="expYear" className="block text-sm font-medium">
//               Année (YYYY)
//             </label>
//             <input
//               id="expYear"
//               name="expYear"
//               type="text"
//               inputMode="numeric"
//               pattern="\d{4}"
//               value={values.expYear}
//               onChange={handleChange}
//               required
//               aria-describedby={errors.expYear ? "error-expYear" : undefined}
//               className="input"
//             />
//             {errors.expYear && (
//               <p id="error-expYear" className="text-sm text-red-600">
//                 {errors.expYear}
//               </p>
//             )}
//           </div>
//         </div>
//         <div>
//           <label htmlFor="cvc" className="block text-sm font-medium">
//             CVC
//           </label>
//           <input
//             id="cvc"
//             name="cvc"
//             type="text"
//             inputMode="numeric"
//             pattern="\d{3,4}"
//             value={values.cvc}
//             onChange={handleChange}
//             required
//             aria-describedby={errors.cvc ? "error-cvc" : undefined}
//             className="input"
//           />
//           {errors.cvc && (
//             <p id="error-cvc" className="text-sm text-red-600">
//               {errors.cvc}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="mt-6 flex justify-end space-x-2">
//         <CTAButton
//           type="button"
//           handleClick={onCancel}
//           label="Annuler"
//           variant="secondary"
//           className={"underline"}
//         />

//         <CTAButton
//           type="submit"
//           label="Valider"
//           aria-label="valider"
//           className={"cta-success"}
//         />
//       </div>
//     </form>
//   );
// };

// PaymentMethodForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   onCancel: PropTypes.func.isRequired,
// };

// export default PaymentMethodForm;
