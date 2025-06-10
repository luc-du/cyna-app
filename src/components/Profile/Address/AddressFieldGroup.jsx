import PropTypes from "prop-types";

const AddressFieldGroup = ({ form, handleChange }) => (
  <>
    <input
      type="text"
      name="name"
      placeholder="Nom de l'adresse"
      value={form.name}
      onChange={handleChange}
      required
      className="input"
    />
    <input
      type="text"
      name="postcode"
      placeholder="Code postal"
      value={form.postcode}
      onChange={handleChange}
      required
      className="input"
    />
    <input
      type="text"
      name="city"
      placeholder="Ville"
      value={form.city}
      onChange={handleChange}
      required
      className="input"
    />
    <input
      type="text"
      name="country"
      placeholder="Pays"
      value={form.country}
      onChange={handleChange}
      required
      className="input"
    />
    <input
      type="url"
      name="url"
      placeholder="Lien Google Maps (optionnel)"
      value={form.url}
      onChange={handleChange}
      className="input"
    />
  </>
);

AddressFieldGroup.propTypes = {
  form: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AddressFieldGroup;
