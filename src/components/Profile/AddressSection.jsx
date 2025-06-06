import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/useToast";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "../../redux/slice/addressSlice";
import { fetchUserProfile } from "../../redux/slice/authSlice";
import CTAButton from "../shared/buttons/CTAButton";
import AddressForm from "./Address/AddressForm";
import AddressList from "./Address/AddressList";
const AddressSection = () => {
  // 1.States
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const { showToast, ToastComponent } = useToast();

  // 2.Handlers
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
      showToast("Adresse supprimée");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      showToast("Erreur lors de la suppression de l'adresse", "error");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingAddress) {
        await dispatch(
          updateAddress({
            addressId: editingAddress.id,
            updatedData: {
              ...formData,
              userId: user.id,
            },
          })
        ).unwrap();
      } else {
        await dispatch(
          createAddress({
            ...formData,
            userId: user.id,
          })
        ).unwrap();
      }

      await dispatch(fetchUserProfile());
      setShowForm(false);
      setEditingAddress(null);
      showToast("Adresse modifiée");
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      showToast("Erreur lors de mise à jour de l'adresse", "error");
    }
  };

  // 🖼️ Render
  return (
    <>
      <ToastComponent />
      <>
        <AddressList
          handleDeleteAddress={handleDeleteAddress}
          setEditingAddress={setEditingAddress}
          setShowForm={setShowForm}
          key={user.id}
          user={user}
        />
        <div className="w-full flex items-center gap-2 my-2 justify-end">
          <CTAButton
            label="Ajouter une adresse"
            className="mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
            handleClick={toggleForm}
          />
        </div>

        {showForm && (
          <AddressForm
            initialData={editingAddress}
            handleClick={showForm}
            onSuccess={() => {
              setShowForm(false);
              setEditingAddress(null);
            }}
            onSubmit={handleSubmit}
            showForm={toggleForm}
          />
        )}
      </>
    </>
  );
};

export default AddressSection;
