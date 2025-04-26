import PropTypes from "prop-types";

const AddressFormActions = ({ error, isEditing }) => (
  <>
    {error && <p className="text-red-500 text-sm">{error}</p>}
    <button
      type="submit"
      className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
    >
      {isEditing ? "Mettre à jour" : "Ajouter l’adresse"}
    </button>
  </>
);

AddressFormActions.propTypes = {
  error: PropTypes.string,
  isEditing: PropTypes.bool,
};

export default AddressFormActions;
