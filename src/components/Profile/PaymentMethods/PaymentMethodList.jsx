import PropTypes from "prop-types";
import { MOCK_PAYMENT_METHODS } from "../../../mock/MOCKS_DATA";
import PaymentMethodListItem from "./PaymentMethodListItem";

/**
 * Liste les cartes.
 */
const PaymentMethodList = ({ methods, onDelete, onSetDefault }) => {
  if (!Array.isArray(methods) || methods.length === 0) {
    methods = MOCK_PAYMENT_METHODS;
  }
  return (
    <ul role="list" className="space-y-4 mt-6">
      {methods.map((pm) => (
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
