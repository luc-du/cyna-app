import PropTypes from "prop-types";
import PaymentMethodListItem from "./PaymentMethodListItem";
/**
 * Liste les méthodes de paiement.
 *
 * Si `methods` est vide, affiche les mocks.
 */
const PaymentMethodList = ({ methods, onDelete, onSetDefault }) => {
  const list =
    // Array.isArray(methods) && methods.length > 0
    //   ? methods
    //   : MOCK_PAYMENT_METHODS;
    Array.isArray(methods) && methods.length > 0 ? methods : [];

  return (
    <ul role="list" className="space-y-4">
      {list.map((pm) => (
        <PaymentMethodListItem
          key={pm.id}
          method={pm}
          onDelete={() => onDelete(pm.id)}
          onSetDefault={() => onSetDefault(pm.id)}
        />
      ))}
    </ul>
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
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSetDefault: PropTypes.func.isRequired,
};

export default PaymentMethodList;
