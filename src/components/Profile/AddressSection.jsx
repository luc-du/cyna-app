import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "../../redux/slice/addressSlice";
import { fetchUserProfile } from "../../redux/slice/userSlice";
import { useGlobalToast } from "../GlobalToastProvider";
import CTAButton from "../shared/buttons/CTAButton";
import AddressForm from "./Address/AddressForm";
import AddressList from "./Address/AddressList";

/**
 * Section de gestion des adresses utilisateur (CRUD)
 */
const AddressSection = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const { showToast } = useGlobalToast();

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
      await dispatch(fetchUserProfile());
      showToast("Adresse supprimée avec succès", "success");
    } catch (error) {
      console.error("Erreur suppression adresse :", error);
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
        showToast("Adresse mise à jour avec succès", "success");
      } else {
        await dispatch(
          createAddress({ ...formData, userId: user.id })
        ).unwrap();
        showToast("Adresse ajoutée avec succès", "success");
      }

      await dispatch(fetchUserProfile());
      setShowForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error("Erreur soumission formulaire adresse :", error);
      showToast("Erreur lors de l'enregistrement de l'adresse", "error");
    }
  };

  return (
    <section
      className="relative w-full"
      aria-labelledby="address-section-title"
    >
      <h2 id="address-section-title" className="sr-only">
        Gestion des adresses
      </h2>

      <AddressList
        handleDeleteAddress={handleDeleteAddress}
        setEditingAddress={setEditingAddress}
        setShowForm={setShowForm}
        key={user.id}
        user={user}
      />

      <div className="w-full flex items-center justify-end mt-2">
        <CTAButton
          label="Ajouter une adresse"
          className="px-4 py-2 border border-primaryBackground text-primaryBackground rounded hover:bg-primaryBackground hover:text-white transition"
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
