import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AddressFieldGroup from "./AddressFieldGroup";
import AddressFormActions from "./AddressFormActions";

const AddressForm = ({ onSubmit, initialData = {}, onSuccess, showForm }) => {
  const [form, setForm] = useState({
    name: "",
    postcode: "",
    city: "",
    country: "",
    url: "",
    ...initialData,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    setForm((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(form);
      setForm({ name: "", postcode: "", city: "", country: "", url: "" });
      onSuccess?.();
    } catch (err) {
      setError(err?.message || "Erreur lors de la soumission.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <AddressFieldGroup form={form} handleChange={handleChange} />
      <div className="w-full flex items-center justify-end">
        <button
          type="button"
          onClick={showForm}
          className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition"
        >
          Annuler
        </button>
      </div>
      <AddressFormActions error={error} isEditing={!!initialData?.id} />
    </form>
  );
};
AddressForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  initialData: PropTypes.object,
  showForm: PropTypes.func.isRequired,
};

export default AddressForm;
