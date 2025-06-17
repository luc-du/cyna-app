import PropTypes from "prop-types";
import DataStatus from "../shared/DataStatus";

/**
 * Permet à l'utilisateur de choisir une adresse pour l'abonnement.
 * @param {object[]} addresses – Liste des adresses.
 * @param {string|number|null} selectedId – Adresse sélectionnée.
 * @param {function} onSelect – Callback (id) quand l'utilisateur change de choix.
 */
export default function AddressSelector({
  addresses,
  selectedId,
  onSelect,
  loading,
  error,
}) {
  <DataStatus
    loading={loading}
    error={error}
    dataLength={addresses}
    loadingMessage="Chargement des adresses..."
    emptyMessage="Aucune adresse enregistrée"
  />;
  return (
    <section
      className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-6"
      aria-labelledby="address-selector-title"
    >
      <h2
        id="address-selector-title"
        className="text-xl font-semibold mb-4 text-gray-800 dark:text-white"
      >
        Choisissez une adresse de facturation
      </h2>

      <ul className="space-y-4">
        {addresses.map((address) => (
          <li key={address.id} className="flex items-start">
            <input
              type="radio"
              id={`address-${address.id}`}
              name="address"
              checked={selectedId === address.id}
              onChange={() => onSelect(address.id)}
              className="mt-1 accent-blue-600"
            />
            <label
              htmlFor={`address-${address.id}`}
              className="ml-3 text-gray-700 dark:text-gray-200"
            >
              <p className="font-medium">{address.name}</p>
              <p className="text-sm">
                {address.postcode}, {address.city}, {address.country}
              </p>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

AddressSelector.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      postcode: PropTypes.number,
      city: PropTypes.string,
      country: PropTypes.string,
    })
  ).isRequired,
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};
