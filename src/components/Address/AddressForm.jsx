import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAddress } from "../../redux/slice/addressSlice";

const AddAddressForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    postcode: "",
    city: "",
    country: "",
    url: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentification requise.");
      return;
    }

    const addressData = {
      ...form,
      user_id: user?.id,
    };

    try {
      await dispatch(createAddress(addressData)).unwrap();
      setForm({
        name: "",
        postcode: "",
        city: "",
        country: "",
        url: "",
      });
      setError(null);
      onSuccess?.();
    } catch (err) {
      setError(err?.message || "Erreur lors de l'ajout de l'adresse.");
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
        type="number"
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

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
      >
        Ajouter l’adresse
      </button>
    </form>
  );
};

AddAddressForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default AddAddressForm;
