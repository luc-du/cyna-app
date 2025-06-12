import PropTypes from "prop-types";
import { useState } from "react";
import CTAButton from "../../shared/buttons/CTAButton";
import ModalOverlay from "../../ui/ModalOverlay";
import PaymentMethodForm from "./PaymentMethodForm";
import PaymentMethodList from "./PaymentMethodList";

/**
 * Section « Méthodes de paiement » du profil utilisateur.
 *
 * @param {Object[]} methods – tableau des méthodes de paiement.
 * @param {Function} onAdd – callback appelé avec les données de la nouvelle carte.
 * @param {Function} onDelete – callback appelé avec l’ID de la carte à supprimer.
 * @param {Function} onSetDefault – callback appelé avec l’ID de la carte à définir par défaut.
 */
const PaymentMethodsSection = ({ methods, onAdd, onDelete, onSetDefault }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section aria-labelledby="payment-heading">
      <h2 id="payment-heading" className="text-xl font-semibold mb-4">
        Méthodes de paiement
      </h2>

      <div className="flex items-center justify-end mb-4">
        <CTAButton
          handleClick={() => setIsModalOpen(true)}
          className="cta-success"
          label="Ajouter une carte"
        />
      </div>

      <PaymentMethodList
        methods={methods}
        onDelete={onDelete}
        onSetDefault={onSetDefault}
      />

      {isModalOpen && (
        <ModalOverlay onClose={() => setIsModalOpen(false)}>
          <PaymentMethodForm
            onSubmit={(data) => {
              onAdd(data);
              setIsModalOpen(false);
            }}
            onCancel={() => setIsModalOpen(false)}
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
