import PropTypes from "prop-types";
import { useState } from "react";
import CTAButton from "../shared/buttons/CTAButton";
import DataStatus from "../shared/DataStatus";
import ModalOverlay from "../ui/ModalOverlay"; // Keep this import
import AddressForm from "./Address/AddressForm";
import AddressList from "./Address/AddressList";

/**
 * AddressSection
 * Affiche et gère les adresses utilisateur (liste, ajout, modification, suppression).
 * Accessible : gestion ARIA et focus.
 *
 * @component
 * @param {Object[]} props.addresses - Liste des adresses de l'utilisateur.
 * @param {boolean} props.loading - État de chargement des adresses.
 * @param {string} [props.error] - Message d'erreur.
 * @param {Function} props.onSaveAddress - Callback création ou modification d'une adresse.
 * @param {Function} props.onDeleteAddress - Callback suppression d'une adresse.
 * @param {Function} props.showToast - Fonction pour afficher les notifications toast.
 * @returns {JSX.Element}
 */
const AddressSection = ({
  addresses,
  loading,
  error,
  onSaveAddress,
  onDeleteAddress,
  showToast,
  user,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  // The `openModal` and `closeModal` functions are already correctly defined
  // and handle the `isOpen` state for the ModalOverlay.
  // const openModal = () => setIsOpen(true); // Redundant, handleAddClick and handleEdit already do this
  const closeModal = () => setIsOpen(false);

  // Ouvre le formulaire en mode création
  const handleAddClick = () => {
    setCurrentAddress(null);
    setIsOpen(true);
  };

  // Ouvre le formulaire en mode édition
  const handleEdit = (address) => {
    setCurrentAddress(address);
    setIsOpen(true);
  };

  // Supprime une adresse via le callback parent
  const handleDelete = async (addressId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette adresse ?"))
      return;
    try {
      await onDeleteAddress(addressId);
      showToast("Adresse supprimée avec succès", "success");
    } catch (err) {
      console.error(err);
      showToast("Erreur lors de la suppression de l'adresse", "error");
    }
  };

  // Soumet (création ou mise à jour) via le callback parent
  const handleSave = async (addressData) => {
    try {
      await onSaveAddress(addressData);
      showToast(
        addressData.id ? "Adresse modifiée" : "Adresse ajoutée",
        "success"
      );
      setIsOpen(false); // Close modal on successful save
    } catch (err) {
      console.error(err);
      showToast("Erreur lors de l'enregistrement de l'adresse", "error");
    }
  };

  return (
    <section
      aria-labelledby="address-section-title"
      className="container-profile-section border border-slate-200 rounded-2xl gap-4 p-4"
      tabIndex={-1}
    >
      <h2 id="address-section-title" tabIndex={0}>
        Adresses
      </h2>
      <DataStatus
        loading={loading}
        error={error}
        dataLength={addresses}
        loadingMessage="Chargement des addresses en cours"
        emptyMessage="Aucune adresse enregistrée pour le moment"
      />
      <div>
        {!loading && !error && addresses.length > 0 && (
          <AddressList
            addresses={addresses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      <div className="flex justify-end mt-4">
        <CTAButton
          label="Ajouter une adresse"
          className="cta-success"
          handleClick={handleAddClick}
          aria-label="Ajouter une nouvelle adresse"
        />
      </div>

      {isOpen && (
        <ModalOverlay
          onClose={closeModal} // ModalOverlay's onClose will now trigger `closeModal`
          // Any ARIA attributes on ModalOverlay itself are sufficient.
          // No need to pass className="max-w-md" here, as that applies to the inner content div.
          // The ModalOverlay handles its own fixed, full-screen sizing.
        >
          {/* AddressForm is now the child of ModalOverlay */}
          <AddressForm
            addressData={currentAddress}
            userId={user}
            onSaveAddress={handleSave}
            onCancel={closeModal} // Use closeModal to consistently close the modal
          />
        </ModalOverlay>
      )}
    </section>
  );
};

AddressSection.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      postcode: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      url: PropTypes.string,
      userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onSaveAddress: PropTypes.func.isRequired,
  onDeleteAddress: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default AddressSection;
