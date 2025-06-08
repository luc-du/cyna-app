import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CTAButton from "../../shared/buttons/CTAButton";
import AddressFieldGroup from "./AddressFieldGroup";

/**
 * Formulaire d'adresse utilisateur affiché en modal.
 */
const AddressForm = ({ onSubmit, initialData = {}, onSuccess, showForm }) => {
  const { profile } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    name: "",
    postcode: "",
    city: "",
    country: "",
    url: "",
    userId: profile?.id || null,
    ...initialData,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentUserId = profile?.id;
    console.log("🔍 currentUserId détecté :", currentUserId);
    setForm((prev) => ({
      ...prev,
      ...initialData,
      userId: profile?.id ?? prev.userId,
    }));
  }, [initialData, profile?.id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("✅ Validation OK, données envoyées :", form);
    try {
      await onSubmit(form);
      setForm({
        name: "",
        postcode: "",
        city: "",
        country: "",
        url: "",
        user_id: profile?.id,
      });
      onSuccess?.();
    } catch (err) {
      setError(err?.message || "Erreur lors de la soumission.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-label={
        initialData?.id ? "Modifier une adresse" : "Ajouter une adresse"
      }
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-center">
          {initialData?.id ? "Modifier l'adresse" : "Ajouter une adresse"}
        </h2>

        <AddressFieldGroup form={form} handleChange={handleChange} />

        <div className="flex items-center justify-end gap-4 mt-4">
          <button type="submit" className="cta-action">
            {initialData?.id ? "Modifier" : "Ajouter"}
          </button>
          <CTAButton
            type="button"
            label="Annuler"
            handleClick={showForm}
            className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
          />
        </div>
      </form>
    </div>
  );
};

AddressForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  initialData: PropTypes.object,
  showForm: PropTypes.func.isRequired,
};

export default AddressForm;
