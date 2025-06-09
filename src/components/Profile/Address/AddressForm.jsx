// AddressForm.jsx
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CTAButton from "../../shared/buttons/CTAButton";
import AddressFieldGroup from "./AddressFieldGroup";

/**
 * Formulaire pour ajouter ou modifier une adresse.
 * @param {{ initialData?: object, userId: string|number, onSubmit: function, onCancel: function }} props
 */
const AddressForm = ({ initialData = {}, userId, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: "",
    postcode: "",
    city: "",
    country: "",
    url: "",
    userId,
    ...initialData,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    setForm((prev) => ({ ...prev, ...initialData, userId }));
  }, [initialData, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message || "Erreur lors de la soumission.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="address-form-title"
    >
      <form
        onSubmit={submitForm}
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 flex flex-col gap-4"
      >
        <h2
          id="address-form-title"
          className="text-xl font-semibold text-center"
        >
          {initialData.id ? "Modifier l'adresse" : "Ajouter une adresse"}
        </h2>

        {error && (
          <p role="alert" className="text-red-500">
            {error}
          </p>
        )}

        <AddressFieldGroup form={form} onChange={handleChange} />

        <div className="flex justify-end gap-4 mt-4">
          <button type="submit" className="cta-action">
            {initialData.id ? "Modifier" : "Ajouter"}
          </button>
          <CTAButton
            type="button"
            label="Annuler"
            onClick={onCancel}
            className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
          />
        </div>
      </form>
    </div>
  );
};

AddressForm.propTypes = {
  initialData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    postcode: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    url: PropTypes.string,
  }),
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AddressForm;
