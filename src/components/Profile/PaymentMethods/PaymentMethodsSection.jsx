import PropTypes from "prop-types";
import { useState } from "react";
import CTAButton from "../../shared/buttons/CTAButton";
import ModalOverlay from "../../ui/ModalOverlay";
import PaymentMethodForm from "./PaymentMethodForm";
import PaymentMethodList from "./PaymentMethodList";

/**
 * Affiche la section Paiement dans le profil.
 * @param {Array} methods – tableau des méthodes de paiement.
 * @param {Function} onAdd – callback ajouté.
 * @param {Function} onDelete
 * @param {Function} onSetDefault
 */
const PaymentMethodsSection = ({ methods, onAdd, onDelete, onSetDefault }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <section aria-labelledby="payment-heading">
      <h2 id="payment-heading" className="text-xl font-semibold mb-4">
        Méthodes de paiement
      </h2>

      <CTAButton onClick={() => setModalOpen(true)}>
        Ajouter une carte
      </CTAButton>

      <PaymentMethodList
        methods={methods}
        onDelete={onDelete}
        onSetDefault={onSetDefault}
      />

      {isModalOpen && (
        <ModalOverlay onClose={() => setModalOpen(false)}>
          <PaymentMethodForm
            onSubmit={(data) => {
              onAdd(data);
              setModalOpen(false);
            }}
            onCancel={() => setModalOpen(false)}
          />
        </ModalOverlay>
      )}
    </section>
  );
};

PaymentMethodsSection.propTypes = {
  methods: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSetDefault: PropTypes.func.isRequired,
};

export default PaymentMethodsSection;
