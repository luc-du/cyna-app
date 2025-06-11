import PropTypes from "prop-types";
import { useState } from "react";
import { MOCK_PAYMENT_METHODS } from "../../../mock/MOCKS_DATA";
import CTAButton from "../../shared/buttons/CTAButton";
import ModalOverlay from "../../ui/ModalOverlay";
import PaymentMethodForm from "./PaymentMethodForm";
import PaymentMethodList from "./PaymentMethodList";

/**
 * PaymentMethodsSection
 *
 * Onglet "Paiement" dans la section Profil.
 * Affiche la liste des méthodes de paiement et gère l'ajout d'une nouvelle carte.
 *
 * Props :
 * - data : array des méthodes de paiement (utilisé en prod avec le slice Redux)
 */
const PaymentMethodsSection = ({ data }) => {
  const [method, setMethods] = useState(data || MOCK_PAYMENT_METHODS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /**
   * Handler d'ajout de carte (simulé en mock)
   * @param {object} newMethod
   */
  const handleAdd = (newMethod) => {
    setMethods((prev) => [
      ...prev.map((m) => ({ ...m, isDefault: false })),
      { ...newMethod, isDefault: true },
    ]);
    closeModal();
  };

  /**
   * Handler suppression et mise à jour
   * @param {string} id
   */
  const handleDelete = (id) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
  };

  /**
   * Handler mise par défaut
   * @param {string} id
   */
  const handleSetDefault = (id) => {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Méthodes de paiement</h2>
        <CTAButton
          handleClick={openModal}
          className={"cta-success"}
          label="Ajouter une carte"
        />
      </div>

      <PaymentMethodList
        // methods = [],
        // onDelete,
        // onSetDefault,
        // loading = false,
        // error = null,
        methods={"methods"}
        onDelete={handleDelete}
        onSetDefault={handleSetDefault}
      />

      {isModalOpen && (
        <ModalOverlay onClose={closeModal}>
          <PaymentMethodForm onSubmit={handleAdd} onCancel={closeModal} />
        </ModalOverlay>
      )}
    </div>
  );
};

PaymentMethodsSection.propTypes = {
  /** Données des méthodes de paiement (slice Redux) */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      brand: PropTypes.string,
      last4: PropTypes.string,
      expMonth: PropTypes.number,
      expYear: PropTypes.number,
      cardholderName: PropTypes.string,
      isDefault: PropTypes.bool,
    })
  ),
};

export default PaymentMethodsSection;
