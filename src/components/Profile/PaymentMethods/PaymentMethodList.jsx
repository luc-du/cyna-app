import DataStatus from "@shared/DataStatus";
import PropTypes from "prop-types";
import PaymentMethodListItem from "./PaymentMethodListItem";

/**
 * Liste les méthodes de paiement utilisateur.
 *
 * Affiche un loader, un message d'erreur ou un message "vide" selon le statut,
 * puis la liste des cartes.
 *
 * @param {Object[]} methods – Méthodes de paiement (tableau).
 * @param {boolean} loading – Indique si les données sont en cours de chargement.
 * @param {string|object|null} error – Message d'erreur ou objet Error.
 * @param {Function} onDelete – Supprime une carte par son ID.
 * @param {Function} onSetDefault – Définit la carte par défaut par son ID.
 */
const PaymentMethodList = ({
  methods,
  loading,
  error,
  onDelete,
  onSetDefault,
}) => {
  return (
    <div aria-live="polite" aria-busy={loading}>
      <DataStatus
        loading={loading}
        error={error}
        dataLength={methods}
        loadingMessage="Chargement des moyens de paiement…"
        emptyMessage="Aucune carte enregistrée."
      />

      {!loading && !error && Array.isArray(methods) && methods.length > 0 && (
        <ul role="list" className="space-y-4" aria-label="Liste des cartes">
          {methods.map((pm) => (
            <PaymentMethodListItem
              key={pm.id}
              method={pm}
              onDelete={() => onDelete(pm.id)}
              onSetDefault={() => onSetDefault(pm.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

PaymentMethodList.propTypes = {
  methods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      cardholderName: PropTypes.string,
      last4: PropTypes.string.isRequired,
      expiryMonth: PropTypes.number.isRequired,
      expiryYear: PropTypes.number.isRequired,
      type: PropTypes.string,
      isDefault: PropTypes.bool,
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Error),
    PropTypes.object,
  ]),
  onDelete: PropTypes.func.isRequired,
  onSetDefault: PropTypes.func.isRequired,
};

export default PaymentMethodList;
