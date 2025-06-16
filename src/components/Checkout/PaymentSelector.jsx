import PropTypes from "prop-types";
import DataStatus from "../shared/DataStatus";

const PaymentSelector = ({
  methodsPaymentList,
  selectedId,
  onSelect,
  loading,
  error,
}) => {
  return (
    <section
      className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-6"
      aria-labelledby="card-selector-title"
    >
      <DataStatus
        dataLength={methodsPaymentList}
        loading={loading}
        error={error}
        emptyMessage="Aucun moyen de paiement enregistré pour le moment"
        loadingMessage="Chargement de la liste des moyens de paiement"
      />
      <h3>Moyens de paiement</h3>
      <p className="text-gray-400 dark:text-white my-2">
        Sélectionner une carte pour procéder au paiement
      </p>
      {Array.isArray(methodsPaymentList) && methodsPaymentList.length > 0 && (
        <ul role="list" className="space-y-4" aria-label="Liste des cartes">
          {methodsPaymentList.map((pm) => {
            const {
              id,
              cardholderName,
              expiryMonth,
              expiryYear,
              isDefault,
              last4,
            } = pm;
            return (
              <>
                <li
                  id={id}
                  className="flex flex-wrap items-center justify-between bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <input
                    type="radio"
                    id={`address-${id}`}
                    name="address"
                    checked={selectedId === id}
                    onChange={() => onSelect(id)}
                    className="mt-1 accent-blue-600"
                  />
                  <div className="flex items-center space-x-4">
                    {/* {BrandIcon && <BrandIcon className="w-8 h-8" />} */}
                    <div>
                      <p className="font-medium text-gray-800">
                        •••• <span className="font-mono">{last4}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Expiration{" "}
                        <span className="font-mono">{`${expiryMonth
                          ?.toString()
                          .padStart(2, "0")}/${expiryYear
                          ?.toString()
                          .slice(-2)}`}</span>
                      </p>
                      {cardholderName && (
                        <p className="text-sm text-gray-600 italic">
                          {cardholderName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full my-2">
                    {isDefault && (
                      <p className="text-green-500 ">Carte par défaut</p>
                    )}
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default PaymentSelector;

PaymentSelector.prototype = {
  methodsPaymentList: PropTypes.arrayOf(
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
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};
