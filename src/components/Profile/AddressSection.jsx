import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "../../redux/slice/addressSlice";
import { fetchUserProfile } from "../../redux/slice/authSlice";
import AddAddressForm from "../Address/AddressForm";
import CTAButton from "../ui/buttons/CTAButton";

const AddressSection = () => {
  // 🌟 States
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // 🧠 Handlers
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
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
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
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  };

  // 🖼️ Render
  return (
    <div id="address" className="container-profile-section">
      <h2 className="text-xl">Adresses</h2>

      <ul>
        {user?.addresses?.length > 0 ? (
          user.addresses.map((address, index) => (
            <li key={address.id}>
              <h3>
                {index === 0 ? "Adresse principale" : "Adresse secondaire"}
              </h3>
              <p>
                <strong>Nom :</strong> <span>{address.name}</span>
              </p>
              <p>
                <strong>Ville :</strong> <span>{address.city}</span>
              </p>
              <p>
                <strong>Code postal :</strong> <span>{address.postcode}</span>
              </p>
              <p>
                <strong>Pays :</strong> <span>{address.country}</span>
              </p>
              {address.url && (
                <p>
                  <strong>
                    <a
                      href={address.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-600"
                    >
                      Google map
                    </a>
                  </strong>
                </p>
              )}
              <div className="w-full flex items-center gap-2 my-2 justify-evenly">
                <CTAButton
                  label="Supprimer"
                  className="mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-red-600 hover:text-white transition"
                  handleClick={() => handleDeleteAddress(address.id)}
                />
                <CTAButton
                  label="Modifier"
                  className="mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
                  handleClick={() => {
                    setEditingAddress(address);
                    setShowForm(true);
                  }}
                />
              </div>
            </li>
          ))
        ) : (
          <li>Non renseigné</li>
        )}
      </ul>

      <div className="w-full flex items-center gap-2 my-2 justify-end">
        <CTAButton
          label="Ajouter une adresse"
          className="mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
          handleClick={toggleForm}
        />
      </div>

      {showForm && (
        <AddAddressForm
          initialData={editingAddress}
          onSuccess={() => {
            setShowForm(false);
            setEditingAddress(null);
          }}
          onSubmit={handleSubmit}
          showForm={showForm}
        />
      )}
    </div>
  );
};

export default AddressSection;
