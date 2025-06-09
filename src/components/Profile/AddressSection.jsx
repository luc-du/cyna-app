// AddressSection.jsx
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAddress,
  deleteAddress,
  getUserAddresses,
  updateAddress,
} from "../../redux/slice/addressSlice";
import { useGlobalToast } from "../GlobalToastProvider";
import CTAButton from "../shared/buttons/CTAButton";
import AddressForm from "./Address/AddressForm";
import AddressList from "./Address/AddressList";

/**
 * Section de gestion des adresses utilisateur.
 * @param {{ user: object }} props
 * @returns JSX.Element
 */
const AddressSection = ({ user }) => {
  const dispatch = useDispatch();
  const {
    list: addresses,
    loading,
    error,
  } = useSelector((state) => state.address);
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const { showToast } = useGlobalToast();

  // Load addresses when user changes
  useEffect(() => {
    if (user?.id) dispatch(getUserAddresses(user.id));
  }, [dispatch, user?.id]);

  const handleToggleForm = () => {
    setCurrentAddress(null);
    setFormVisible((visible) => !visible);
  };

  const handleDelete = async (addressId) => {
    if (!window.confirm("Voulez-vous réellement supprimer cette adresse ?"))
      return;
    try {
      await dispatch(deleteAddress(addressId)).unwrap();
      await dispatch(getUserAddresses(user.id));
      showToast("Adresse supprimée", "success");
    } catch {
      showToast("Erreur lors de la suppression de l'adresse", "error");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (currentAddress) {
        await dispatch(
          updateAddress({ addressId: currentAddress.id, updatedData: formData })
        ).unwrap();
        showToast("Adresse modifiée avec succès", "success");
      } else {
        await dispatch(createAddress(formData)).unwrap();
        showToast("Adresse ajoutée avec succès", "success");
      }
      await dispatch(getUserAddresses(user.id));
      setFormVisible(false);
    } catch {
      showToast("Erreur lors de l'enregistrement de l'adresse", "error");
    }
  };

  return (
    <section
      aria-labelledby="address-section-title"
      className="relative w-full"
    >
      <h2 id="address-section-title" className="text-xl font-semibold mb-2">
        Adresses
      </h2>

      {loading && <p role="status">Chargement des adresses...</p>}
      {error && (
        <p role="alert" className="text-red-500">
          Erreur: {error}
        </p>
      )}

      <AddressList
        addresses={addresses}
        onEdit={(addr) => {
          setCurrentAddress(addr);
          setFormVisible(true);
        }}
        onDelete={handleDelete}
      />

      <div className="flex justify-end mt-2">
        <CTAButton
          label="Ajouter une adresse"
          className="cta-success"
          onClick={handleToggleForm}
          aria-label="Ajouter une nouvelle adresse"
        />
      </div>

      {isFormVisible && (
        <AddressForm
          initialData={currentAddress}
          userId={user.id}
          onSubmit={handleSubmit}
          onCancel={handleToggleForm}
        />
      )}
    </section>
  );
};

AddressSection.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default AddressSection;
