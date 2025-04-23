import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const AddAddressForm = ({
  onSubmit,
  initialData = {},
  onSuccess,
  showForm,
}) => {
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
    setForm((prevForm) => ({
      ...prevForm,
      ...initialData,
    }));
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await onSubmit(form);
      setForm({
        name: "",
        postcode: "",
        city: "",
        country: "",
        url: "",
      });
      onSuccess?.();
    } catch (err) {
      setError(err?.message || "Erreur lors de la soumission.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <input
        type="text"
        name="name"
        placeholder="Nom de l'adresse"
        value={form.name}
        onChange={handleChange}
        required
        className="input-style"
      />
      <input
        type="text"
        name="postcode"
        placeholder="Code postal"
        value={form.postcode}
        onChange={handleChange}
        required
        className="input-style"
      />
      <input
        type="text"
        name="city"
        placeholder="Ville"
        value={form.city}
        onChange={handleChange}
        required
        className="input-style"
      />
      <input
        type="text"
        name="country"
        placeholder="Pays"
        value={form.country}
        onChange={handleChange}
        required
        className="input-style"
      />
      <input
        type="url"
        name="url"
        placeholder="Lien Google Maps (optionnel)"
        value={form.url}
        onChange={handleChange}
        className="input-style"
      />

      <button
        onClick={showForm}
        className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
      >
        Annuler
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
      >
        {initialData?.id ? "Mettre à jour" : "Ajouter l’adresse"}
      </button>
    </form>
  );
};

AddAddressForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  initialData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    postcode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    city: PropTypes.string,
    country: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default AddAddressForm;
