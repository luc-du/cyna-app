import CTAButton from "@shared/buttons/CTAButton";
import DataStatus from "@shared/DataStatus";
import PropTypes from "prop-types";
import setCardIcon from "../utils/setCardIcon";

/**
 * Sélecteur de moyen de paiement pour l’abonnement.
 * @param {object[]} methodsPaymentList – Liste des cartes disponibles
 * @param {string|number|null} selectedId – ID sélectionné
 * @param {function} onSelect – Callback pour mettre à jour la sélection
 */
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
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        Moyens de paiement
      </h3>
      <DataStatus
        dataLength={methodsPaymentList}
        loading={loading}
        error={error}
        emptyMessage="Aucun moyen de paiement enregistré pour le moment"
        loadingMessage="Chargement de la liste des moyens de paiement"
        ctaButton={
          <CTAButton
            type="button"
            label={"Ajouter une carte"}
            className={"underline hover:text-gray-400"}
            link={"/profile#payment"}
          />
        }
      />

      {Array.isArray(methodsPaymentList) && methodsPaymentList.length > 0 && (
        <>
          <p className="text-gray-500 dark:text-gray-300 mb-4 text-sm">
            Sélectionner une carte pour procéder au paiement
          </p>
          <ul role="list" className="space-y-4" aria-label="Liste des cartes">
            {methodsPaymentList.map((pm) => {
              const {
                id,
                cardholderName,
                expiryMonth,
                expiryYear,
                isDefault,
                last4,
                type,
              } = pm;

              // Composant d'icône
              const CardIcon = setCardIcon(type);

              return (
                <li
                  key={id}
                  className="flex flex-wrap items-center justify-between bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <input
                    type="radio"
                    id={`payment-${id}`}
                    name="payment"
                    checked={selectedId === id}
                    onChange={() => onSelect(id)}
                    className="mt-1 accent-blue-600"
                  />
                  <div className="flex items-center space-x-4 ml-4">
                    <CardIcon className="w-10 h-10 object-contain" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        •••• <span className="font-mono">{last4}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Expiration{" "}
                        <span className="font-mono">
                          {`${expiryMonth
                            ?.toString()
                            .padStart(2, "0")}/${expiryYear
                            ?.toString()
                            .slice(-2)}`}
                        </span>
                      </p>
                      {cardholderName && (
                        <p className="text-sm italic text-gray-500 dark:text-gray-400">
                          {cardholderName}
                        </p>
                      )}
                    </div>
                  </div>

                  {isDefault && (
                    <p className="w-full mt-2 text-sm text-green-500">
                      Carte par défaut
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};

PaymentSelector.propTypes = {
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

export default PaymentSelector;
