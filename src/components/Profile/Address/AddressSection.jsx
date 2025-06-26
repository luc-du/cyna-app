import CTAButton from "@shared/buttons/CTAButton";
import DataStatus from "@shared/DataStatus";
import PropTypes from "prop-types";
import { useState } from "react";
import ConfirmModal from "../../ui/ConfirmModal";
import ModalOverlay from "../../ui/ModalOverlay";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";

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
  userId,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false); // Renommé pour plus de clarté
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Nouvel état pour la modale de confirmation
  const [addressToDeleteId, setAddressToDeleteId] = useState(null); // Pour stocker l'ID de l'adresse à supprimer
  const [currentAddress, setCurrentAddress] = useState(null);

  const closeFormModal = () => setIsFormOpen(false); // Renommé pour plus de clarté
  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setAddressToDeleteId(null);
  };

  // Ouvre le formulaire en mode création
  const handleAddClick = () => {
    setCurrentAddress(null);
    setIsFormOpen(true);
  };

  // Ouvre le formulaire en mode édition
  const handleEdit = (address) => {
    setCurrentAddress(address);
    setIsFormOpen(true);
  };

  // Prépare la suppression d'une adresse en ouvrant la modale de confirmation
  const handleDeleteClick = (addressId) => {
    setAddressToDeleteId(addressId);
    setIsConfirmModalOpen(true);
  };

  // Exécute la suppression après confirmation
  const handleDeleteConfirm = async () => {
    if (!addressToDeleteId) return;

    try {
      await onDeleteAddress(addressToDeleteId);
      showToast("Adresse supprimée avec succès", "success");
    } catch (err) {
      console.error(err);
      showToast("Erreur lors de la suppression de l'adresse", "error");
    } finally {
      closeConfirmModal(); // Ferme la modale de confirmation
    }
  };

  // Soumettre (création ou mise à jour)
  const handleSave = async (addressData) => {
    await onSaveAddress(addressData);
    setIsFormOpen(false);
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
            onDelete={handleDeleteClick}
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

      {isFormOpen && (
        <ModalOverlay onClose={closeFormModal}>
          <AddressForm
            addressData={currentAddress}
            userId={userId}
            onSaveAddress={handleSave}
            onCancel={closeFormModal}
          />
        </ModalOverlay>
      )}

      {isConfirmModalOpen && (
        <ConfirmModal
          title="Confirmer la suppression"
          message="Voulez-vous vraiment supprimer cette adresse ? Cette action est irréversible."
          onConfirm={handleDeleteConfirm}
          onCancel={closeConfirmModal}
        />
      )}
    </section>
  );
};

AddressSection.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      postcode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      url: PropTypes.string,
      user: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onSaveAddress: PropTypes.func.isRequired,
  onDeleteAddress: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default AddressSection;
