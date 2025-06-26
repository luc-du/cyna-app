import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AddressFieldGroup from "./AddressFieldGroup";

/**
 * AddressForm
 * Formulaire pour ajouter ou modifier une adresse utilisateur.
 * Accessible : gestion ARIA et focus.
 *
 * @component
 * @param {Object} props
 * @param {Object|null} props.addressData
 * @param {string|number} props.userId
 * @param {Function} props.onSaveAddress
 * @param {Function} props.onCancel
 * @returns {JSX.Element}
 */
const AddressForm = ({ addressData, userId, onSaveAddress, onCancel }) => {
  // Pour gérer null, on normalise addressData en objet vide
  const initialData = addressData || {};

  const [form, setForm] = useState({
    id: initialData.id,
    name: initialData.name || "",
    postcode: initialData.postcode || "",
    city: initialData.city || "",
    country: initialData.country || "",
    url: initialData.url || "",
    userId,
  });

  // Met à jour le formulaire à chaque changement de props
  useEffect(() => {
    const data = addressData || {};
    setForm({
      id: data.id,
      name: data.name || "",
      postcode: data.postcode || "",
      city: data.city || "",
      country: data.country || "",
      url: data.url || "",
      userId,
    });
  }, [addressData, userId]);

  /**
   * Met à jour les valeurs du formulaire.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Soumet le formulaire.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveAddress(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form m-auto"
      aria-labelledby="address-form-title"
    >
      <h2
        id="address-form-title"
        className="text-xl font-semibold text-center"
        tabIndex={0}
      >
        {form.id ? "Modifier l'adresse" : "Ajouter une adresse"}
      </h2>

      {/** Groupe de champs pour l'adresse */}
      <AddressFieldGroup form={form} handleChange={handleChange} />

      <div className="flex justify-end gap-4 mt-4">
        <button
          type="submit"
          className="cta-success"
          aria-label={form.id ? "Modifier l'adresse" : "Ajouter l'adresse"}
        >
          {form.id ? "Modifier" : "Ajouter"}
        </button>
        <CTAButton
          type="button"
          label="Annuler"
          handleClick={onCancel}
          className="cta-cancel"
          aria-label="Annuler"
        />
      </div>
    </form>
  );
};

AddressForm.propTypes = {
  addressData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    postcode: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    url: PropTypes.string,
  }),
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSaveAddress: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AddressForm;
