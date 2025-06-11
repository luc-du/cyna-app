import PropTypes from "prop-types";
import DataStatus from "../../shared/DataStatus";
import PaymentMethodListItem from "./PaymentMethodListItem";

/**
 * PaymentMethodList
 *
 * Affiche une liste de méthodes de paiement.
 *
 * Props :
 * - methods : tableau d'objets paymentMethod
 * - onDelete : fonction appelée avec l'id pour suppression
 * - onSetDefault : fonction appelée avec l'id pour définir par défaut
 * - loading : état de chargement (optionnel)
 * - error : erreur éventuelle (optionnel)
 */
const PaymentMethodList = ({
  methods = [],
  onDelete,
  onSetDefault,
  loading = false,
  error = null,
}) => {
  const statusComponent = (
    <DataStatus
      loading={loading}
      loadingMessage="Chargement des méthodes de paiement..."
      error={error}
      dataLength={methods}
      emptyMessage="Aucune méthode de paiement enregistrée."
    />
  );

  // Si on a un état à afficher (loading, error, ou empty), on l'affiche
  if (statusComponent) return statusComponent;

  // Sinon on affiche la liste normale
  return (
    <ul role="list" className="space-y-3">
      {methods.map((method) => (
        <li key={method.id}>
          <PaymentMethodListItem
            id={method.id}
            brand={method.brand}
            last4={method.last4}
            expMonth={method.expMonth}
            expYear={method.expYear}
            cardholderName={method.cardholderName}
            isDefault={method.isDefault}
            onDelete={() => onDelete(method.id)}
            onSetDefault={() => onSetDefault(method.id)}
          />
        </li>
      ))}
    </ul>
  );
};

PaymentMethodList.propTypes = {
  methods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      last4: PropTypes.string.isRequired,
      expMonth: PropTypes.number.isRequired,
      expYear: PropTypes.number.isRequired,
      cardholderName: PropTypes.string,
      isDefault: PropTypes.bool,
    })
  ),
  onDelete: PropTypes.func.isRequired,
  onSetDefault: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Error)]),
};

export default PaymentMethodList;
