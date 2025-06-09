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
import { ADDRESS_DELETE_ERROR } from "../utils/errorMessages";
import {
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_DELETE_SUCCESS,
  ADDRESS_UPDATE_SUCCESS,
} from "../utils/successMessages";
import AddressForm from "./Address/AddressForm";
import AddressList from "./Address/AddressList";

/**
 * Section de gestion des adresses utilisateur (CRUD)
 */
const AddressSection = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { list, loading, error } = useSelector((state) => state.address);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const { showToast } = useGlobalToast();

  // Charger les adresses au montage du composant
  useEffect(() => {
    if (user?.id) {
      dispatch(getUserAddresses(user.id));
    }
  }, [dispatch, user?.id]);

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) setEditingAddress(null);
  };

  const handleDeleteAddress = async (addressId) => {
    const confirmed = window.confirm(
      "Voulez-vous réellement supprimer cette adresse ?"
    );
    if (!confirmed) return;

    try {
      await dispatch(deleteAddress(addressId)).unwrap();
      // Recharger les adresses après suppression
      if (user?.id) {
        await dispatch(getUserAddresses(user.id));
      }
      showToast(ADDRESS_DELETE_SUCCESS, "success");
    } catch (error) {
      console.error(ADDRESS_DELETE_ERROR, error);
      showToast("Erreur lors de la suppression de l'adresse", "error");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingAddress) {
        await dispatch(
          updateAddress({
            addressId: editingAddress.id,
            updatedData: { ...formData, userId: user.id },
          })
        ).unwrap();
        showToast(ADDRESS_UPDATE_SUCCESS, "success");
      } else {
        await dispatch(
          createAddress({ ...formData, userId: user.id })
        ).unwrap();
        showToast(ADDRESS_CREATE_SUCCESS, "success");
      }

      // Recharger les adresses après création/modification
      if (user?.id) {
        await dispatch(getUserAddresses(user.id));
      }
      setShowForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error("Erreur soumission formulaire adresse :", error);
      showToast("Erreur lors de l'enregistrement de l'adresse", "error");
    }
  };

  // Affichage de debug pour vérifier les données
  console.log("User ID:", user?.id);
  console.log("Addresses list:", list);
  console.log("Loading:", loading);
  console.log("Error:", error);

  return (
    <section
      className="relative w-full"
      aria-labelledby="address-section-title"
    >
      <h2 id="address-section-title" className="sr-only">
        Gestion des adresses
      </h2>

      {loading && <p>Chargement des adresses...</p>}
      {error && <p className="text-red-500">Erreur: {error}</p>}

      <AddressList
        addresses={list}
        handleDeleteAddress={handleDeleteAddress}
        setEditingAddress={setEditingAddress}
        setShowForm={setShowForm}
        user={user}
      />

      <div className="w-full flex items-center justify-end mt-2">
        <CTAButton
          label="Ajouter une adresse"
          className="cta-success"
          handleClick={toggleForm}
          aria-label="Ajouter une nouvelle adresse"
        />
      </div>

      {/* Overlay formulaire */}
      {showForm && (
        <AddressForm
          initialData={editingAddress}
          onSubmit={handleSubmit}
          onSuccess={() => {
            setShowForm(false);
            setEditingAddress(null);
          }}
          showForm={toggleForm}
        />
      )}
    </section>
  );
};

export default AddressSection;
