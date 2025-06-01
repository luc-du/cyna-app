/\*\*

- Slice Redux pour la gestion de l'authentification utilisateur.
-
- Ce fichier contient :
- - Les thunks asynchrones pour l'inscription, la connexion, la validation du token,
- la récupération et la mise à jour du profil utilisateur.
- - Le slice Redux pour gérer l'état d'authentification, l'utilisateur courant,
- l'identifiant utilisateur, les erreurs et le chargement.
-
- Utilise Redux Toolkit et AuthService pour centraliser la logique d'authentification.
  \*/

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import {
clearToken,
getToken,
setToken,
} from "../../components/utils/authStorage";
import { AuthService } from "../../services/authServices";
/\*\*

- Thunks asynchrones utilisant le service d'authentification centralisé
  \*/

// Inscription utilisateur
export const registerUser = createAsyncThunk(
"auth/register",
/\*\*

- @param {Object} userData - Données d'inscription de l'utilisateur
- @param {Object} thunkAPI - Objet Redux Toolkit pour la gestion des erreurs
  \*/
  async (userData, { rejectWithValue }) => {
  try {
  const data = await AuthService.register(userData);
  setToken(data.token);
  return data;
  } catch (error) {
  if (error.response?.data?.message?.includes("Duplicate entry")) {
  return rejectWithValue("Cet email est déjà utilisé.");
  }
  return rejectWithValue(
  error.response?.data || "Erreur lors de l'inscription"
  );
  }
  }
  );

// Connexion utilisateur
export const loginUser = createAsyncThunk(
"auth/login",
/\*\*

- @param {Object} credentials - Identifiants de connexion
- @param {Object} thunkAPI - Objet Redux Toolkit pour la gestion des erreurs
  \*/
  async (credentials, { rejectWithValue }) => {
  try {
  const data = await AuthService.login(credentials);
  setToken(data.token);
  return data;
  } catch (error) {
  return rejectWithValue(
  error.response?.data || "Email ou mot de passe incorrect !"
  );
  }
  }
  );

// Validation du token d'authentification
export const validateToken = createAsyncThunk(
"auth/validateToken",
/\*\*

- @param {void} \_ - Non utilisé
- @param {Object} thunkAPI - Objet Redux Toolkit pour la gestion des erreurs
  \*/
  async (\_, { rejectWithValue }) => {
  try {
  const token = getToken();
  if (!token) throw new Error("Token manquant");
  await AuthService.validate();
  return true;
  } catch (error) {
  clearToken();
  return rejectWithValue(error.response?.data || "Token invalide");
  }
  }
  );

// Récupération du profil utilisateur
export const fetchUserProfile = createAsyncThunk(
"auth/fetchUserProfile",
/\*\*

- @param {void} \_ - Non utilisé
- @param {Object} thunkAPI - Objet Redux Toolkit pour la gestion des erreurs
  \*/
  async (\_, { rejectWithValue }) => {
  try {
  const res = await AuthService.fetchProfile();
  return res.data;
  } catch (error) {
  return rejectWithValue(
  error.response?.data || "Impossible de récupérer le profil utilisateur"
  );
  }
  }
  );

// Mise à jour du profil utilisateur
export const updateUserProfile = createAsyncThunk(
"auth/updateUserProfile",
/\*\*

- @param {Object} param0 - Objet contenant userId et profileData
- @param {Object} thunkAPI - Objet Redux Toolkit pour la gestion des erreurs
  \*/
  async ({ userId, profileData }, { rejectWithValue }) => {
  try {
  const res = await AuthService.updateProfile(userId, profileData);
  return res.data;
  } catch (error) {
  return rejectWithValue(
  error.response?.data?.message ||
  "Erreur lors de la mise à jour du profil"
  );
  }
  }
  );

/\*\*

- État initial du slice d'authentification
- @typedef {Object} AuthState
- @property {Object|null} user - Données utilisateur
- @property {string|null} userId - Identifiant utilisateur
- @property {boolean} isAuthenticated - Statut d'authentification
- @property {boolean} loading - Statut de chargement
- @property {string|null} error - Message d'erreur éventuel
  \*/
  const initialState = {
  user: null,
  userId: null,
  isAuthenticated: !!getToken(),
  loading: false,
  error: null,
  };

/\*\*

- Slice Redux - Authentification
  _/
  const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  /\*\*
  _ Déconnexion de l'utilisateur
  _ @param {AuthState} state
  _/
  logout: (state) => {
  state.user = null;
  state.userId = null;
  state.isAuthenticated = false;
  clearToken();
  },
  /**
  _ Mise à jour du statut d'authentification
  _ @param {AuthState} state
  _ @param {Object} action
  _/
  setAuth: (state, action) => {
  state.isAuthenticated = !!action.payload;
  },
  /**
  _ Mise à jour des données utilisateur
  _ @param {AuthState} state
  _ @param {Object} action
  _/
  setUser: (state, action) => {
  state.user = action.payload;
  },
  /\*\*
  _ Mise à jour de l'identifiant utilisateur
  _ @param {AuthState} state
  _ @param {Object} action
  _/
  setUserId: (state, action) => {
  state.userId = action.payload;
  },
  },
  extraReducers: (builder) => {
  builder
  // Inscription réussie
  .addCase(registerUser.fulfilled, (state, action) => {
  const { token } = action.payload;
  const decoded = jwtDecode(token);
  state.userId = decoded.jti;
  state.user = action.payload;
  state.isAuthenticated = true;
  state.error = null;
  })
  // Inscription échouée
  .addCase(registerUser.rejected, (state, action) => {
  state.error = action.payload;
  })

        // Connexion réussie
        .addCase(loginUser.fulfilled, (state, action) => {
          const { token } = action.payload;
          const decoded = jwtDecode(token);
          state.userId = decoded.jti;
          state.user = action.payload;
          state.isAuthenticated = true;
          state.error = null;
        })
        // Connexion échouée
        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.payload;
        })

        // Validation du token réussie
        .addCase(validateToken.fulfilled, (state) => {
          state.isAuthenticated = true;
        })
        // Validation du token échouée
        .addCase(validateToken.rejected, (state) => {
          state.isAuthenticated = false;
          state.user = null;
          state.userId = null;
        })

        // Récupération du profil réussie
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
          state.user = action.payload;
          state.error = null;
        })
        // Récupération du profil échouée
        .addCase(fetchUserProfile.rejected, (state, action) => {
          state.error = action.payload;
        });

  },
  });

export const { logout, setAuth, setUser, setUserId } = authSlice.actions;
export default authSlice.reducer;

---

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from "../../api/apiRoutes";

// POST
export const createAddress = createAsyncThunk(
"address/POST",
async (addressData, { rejectWithValue }) => {
console.log(addressData);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(API_ROUTES.ADDRESS.POST, addressData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(token.userId);
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur de création d'adresse :",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de l'ajout de l'adresse"
      );
    }

}
);

// READ
/_ simple fetch de user via le token _/

// UPDATE
export const updateAddress = createAsyncThunk(
"address/update",
async ({ addressId, updatedData }, { rejectWithValue }) => {
try {
const token = localStorage.getItem("token");
const response = await axios.patch(
`${API_ROUTES.ADDRESS.DELETE(addressId)}`,
updatedData,
{
headers: {
Authorization: `Bearer ${token}`,
"Content-Type": "application/json",
},
}
);
return response.data;
} catch (error) {
console.error("Erreur de mise à jour :", error);
return rejectWithValue(
error.response?.data?.message || "Erreur lors de la mise à jour"
);
}
}
);

/_ DELETE _/
export const deleteAddress = createAsyncThunk(
"address/delete",
async (addressId, { rejectWithValue }) => {
try {
const token = localStorage.getItem("token");

      console.log("Suppression adresse ID :", addressId);
      console.log("Token utilisé :", token);

      await axios.delete(API_ROUTES.ADDRESS.DELETE(addressId), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return addressId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Une erreur est survenue"
      );
    }

}
);

// État initial
const initialState = {
list: [],
loading: false,
error: null,
};

// Slice Redux
const addressSlice = createSlice({
name: "address",
initialState,
reducers: {},
extraReducers: (builder) => {
builder
// POST address
.addCase(createAddress.pending, (state) => {
state.loading = true;
state.error = null;
})
.addCase(createAddress.fulfilled, (state, action) => {
state.loading = false;
state.list.push(action.payload);
state.error = null;
})
.addCase(createAddress.rejected, (state, action) => {
state.loading = false;
state.error = action.payload;
})

      // Delete address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(
          (address) => address.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

},
});

## export default addressSlice.reducer;

---

import { useEffect, useState } from "react";
import Toast from "../components/ui/Toast";

export const useToast = () => {
const [toast, setToast] = useState(null);

const showToast = (message, type = "success", duration = 3000) => {
setToast({ message, type, duration });
};

const hideToast = () => {
setToast(null);
};

useEffect(() => {
if (toast) {
const timer = setTimeout(() => {
setToast(null);
}, toast.duration || 3000);

      return () => clearTimeout(timer);
    }

}, [toast]);

const ToastComponent = () =>
toast ? (
<Toast message={toast.message} type={toast.type} onClose={hideToast} />
) : null;

return { showToast, ToastComponent };
};

---

import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { useToast } from "../hooks/useToast";

const ToastContext = createContext();

/\*\*

- Fournit un contexte global pour l'affichage des notifications toast dans l'application.
-
- @component
- @param {object} props - Les propriétés du composant.
- @param {React.ReactNode} props.children - Les éléments enfants à rendre à l'intérieur du provider.
- @returns {JSX.Element} Le provider de contexte toast englobant les enfants et le composant Toast.
-
-
- @example
- <GlobalToastProvider>
- <App />
- </GlobalToastProvider>
   */
  export const GlobalToastProvider = ({ children }) => {
    const { showToast, ToastComponent } = useToast();

return (
<ToastContext.Provider value={{ showToast }}>
{children}
<ToastComponent />
</ToastContext.Provider>
);
};
export const useGlobalToast = () => useContext(ToastContext);

GlobalToastProvider.propTypes = {
children: PropTypes.node.isRequired,
};

---

import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthEffect } from "../hooks/useAuthEffect";
import { useAutoLogout } from "../hooks/useAutoLogout";
import { fetchUserProfile, logout } from "../redux/slice/authSlice";
import { AuthService } from "../services/authServices";
import AccountStatus from "./Profile/AccountStatus";
import AddressSection from "./Profile/AddressSection";
import LogoutButton from "./Profile/LogoutButton";
import PaymentMethodsSection from "./Profile/PaymentMethodsSection";
import ProfileHeader from "./Profile/ProfileHeader";
import ProfileSection from "./Profile/ProfileSection";

/\*\*

- Composant de page de profil utilisateur.
-
- @component
- @description
- Affiche les informations du profil utilisateur, y compris l'avatar, les détails personnels,
- l'adresse, les méthodes de paiement et le statut du compte. Permet également la déconnexion
- et le changement d'avatar. Ce composant gère l'accessibilité via des rôles ARIA, des labels,
- et la gestion du focus pour une meilleure expérience utilisateur.
-
- @accessibilité
- - Utilise des rôles ARIA (`role="status"`, `role="alert"`) pour informer les technologies d'assistance.
- - Utilise des labels ARIA (`aria-label`, `aria-labelledby`) pour décrire les sections.
- - Gère le focus avec `tabIndex` pour permettre la navigation clavier.
-
- @returns {JSX.Element} La page de profil utilisateur.
  \*/
  const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

useAuthEffect(); // vérifie le token et redirige sinon
useAutoLogout(); // auto-déconnexion à expiration

const { user, loading } = useSelector((state) => state.auth);

useEffect(() => {
if (!user) dispatch(fetchUserProfile());
}, [user, dispatch]);

const handleLogout = () => {
dispatch(logout());
navigate("/login");
};

const handleAvatarUpload = async (file) => {
try {
await AuthService.uploadAvatar(user.id, file);
dispatch(fetchUserProfile());
} catch (error) {
console.error("Erreur upload avatar :", error);
}
};

return (

<main
      className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6"
      aria-label="Page de profil utilisateur"
      tabIndex={-1}
    >
{loading ? (
<p role="status" aria-live="polite">
Chargement des informations...
</p>
) : user ? (
<section
          className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md"
          aria-labelledby="profile-title"
        >
<h1
            id="profile-title"
            className="text-3xl font-bold text-center mb-4"
            tabIndex={0}
          >
Profil utilisateur
</h1>

          <ProfileHeader data={user} onUpload={handleAvatarUpload} />
          <ProfileSection data={user} />

          <div
            id="container-details-section"
            className="mt-4 py-4 text-left"
            aria-label="Détails du profil"
          >
            <AddressSection data={user} />
            <PaymentMethodsSection data={user} />
            <AccountStatus data={user} />
            <LogoutButton handleClick={handleLogout} />
          </div>
        </section>
      ) : (
        <p role="alert">
          Impossible de récupérer les informations utilisateur.
        </p>
      )}
    </main>

);
};

// PropTypes pour tous les composants enfants
ProfileHeader.propTypes = {
data: PropTypes.object.isRequired,
onUpload: PropTypes.func.isRequired,
};
ProfileSection.propTypes = { data: PropTypes.object.isRequired };
AddressSection.propTypes = { data: PropTypes.object.isRequired };
PaymentMethodsSection.propTypes = { data: PropTypes.object.isRequired };
AccountStatus.propTypes = { data: PropTypes.object.isRequired };
LogoutButton.propTypes = { handleClick: PropTypes.func.isRequired };

## export default Profile;

import PropTypes from "prop-types";
import { useRef } from "react";
import MenDefaultAvatar from "../../assets/avatars/default-men.png";
import CTAButton from "../ui/buttons/CTAButton";

const ProfileHeader = ({ data, onUpload }) => {
const fileInputRef = useRef();

const handleClick = () => {
fileInputRef.current?.click();
};

const handleFileChange = (e) => {
const file = e.target.files?.[0];
if (file) {
onUpload?.(file);
}
};

return (

<div className="flex flex-col items-center mb-4">
{!data ? (
<p role="alert">Erreur lors de la récupération des infos utilisateur</p>
) : (
<>
<img
src={data.urlProfile || MenDefaultAvatar}
alt={
data.firstname || data.lastname
? `Photo de profil de ${data?.firstname ?? ""} ${
                    data?.lastname ?? ""
                  }`.trim()
: "Photo de profil"
}
title={
data.firstname || data.lastname
? `Photo de profil de ${data?.firstname ?? ""} ${
                    data?.lastname ?? ""
                  }`.trim()
: "Photo de profil"
}
className="w-24 h-24 rounded-full border"
aria-label={
data.firstname || data.lastname
? `Photo de profil de ${data?.firstname ?? ""} ${
                    data?.lastname ?? ""
                  }`.trim()
: "Photo de profil"
}
/>
<input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Changer la photo de profil"
            tabIndex={-1}
          />
<CTAButton
            label="Modifier"
            className="cta-profile-style"
            handleClick={handleClick}
            aria-label="Modifier la photo de profil"
          />
</>
)}
</div>
);
};

ProfileHeader.propTypes = {
data: PropTypes.shape({
urlProfile: PropTypes.string,
firstname: PropTypes.string,
lastname: PropTypes.string,
}).isRequired,
onUpload: PropTypes.func,
};

## export default ProfileHeader;

---

import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/useToast";
import {
fetchUserProfile,
updateUserProfile,
} from "../../redux/slice/authSlice";
import CTAButton from "../ui/buttons/CTAButton";
import PersonalInfoForm from "./PersonalInfo/PersonalInfoForm";

const ProfileSection = ({ data }) => {
// 1.States:
const dispatch = useDispatch();
const { loading } = useSelector((state) => state.auth);
const [isEditing, setIsEditing] = useState(false);

const { showToast, ToastComponent } = useToast();

// 2.Functions:
const handleEditClick = () => {
setIsEditing(true);
};

const handleCancelEdit = () => {
setIsEditing(false);
};

const handleSaveProfile = async (formData) => {
try {
await dispatch(
updateUserProfile({ userId: data.id, profileData: formData })
).unwrap();
await dispatch(fetchUserProfile());
setIsEditing(false);
showToast("Informations mises à jour !");
} catch (error) {
console.error("Erreur lors de la mise à jour :", error);
showToast("Erreur lors de la mise à jour du profil", "error");
}
};

const mapUserRole = (value) => {
if (value === "User") {
return "Membre";
} else {
return "Administrateur";
}
};

if (!data || loading) {
return (

<div id="personal-informations" className="container-profile-section">
<p>Chargement des informations...</p>
</div>
);
}

// 4.Render:
return (
<>
<ToastComponent />

<div id="personal-informations" className="container-profile-section">
<h2 className="text-xl mb-4">Informations personnelles</h2>

        {isEditing ? (
          <PersonalInfoForm
            userData={data}
            onSave={handleSaveProfile}
            onCancel={handleCancelEdit}
          />
        ) : (
          <>
            <p>
              <strong>Nom :</strong> {data.firstname} {data.lastname}
            </p>
            <p>
              <strong>Email :</strong> {data.email}
            </p>
            <p>
              <strong>Téléphone :</strong>{" "}
              {data.phone
                ? data.phone.toString().startsWith("0")
                  ? data.phone
                  : `0${data.phone}`
                : "Non renseigné"}
            </p>
            <p>
              <strong>Status :</strong>{" "}
              {mapUserRole(
                data?.roles?.slice(0, 1) + data?.roles?.slice(1).toLowerCase()
              )}
            </p>

            <div className="container-cta mt-4">
              <CTAButton
                label="Modifier"
                className="cta-profile-style"
                handleClick={handleEditClick}
              />
            </div>
          </>
        )}
      </div>
    </>

);
};

ProfileSection.propTypes = {
data: PropTypes.shape({
id: PropTypes.number,
firstname: PropTypes.string,
lastname: PropTypes.string,
email: PropTypes.string.isRequired,
phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
roles: PropTypes.string.isRequired,
}).isRequired,
};

## export default ProfileSection;

---

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/useToast";
import {
createAddress,
deleteAddress,
updateAddress,
} from "../../redux/slice/addressSlice";
import { fetchUserProfile } from "../../redux/slice/authSlice";
import CTAButton from "../ui/buttons/CTAButton";
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

## export default AddressSection;

---

import PropTypes from "prop-types";
import CTAButton from "../ui/buttons/CTAButton";

const PaymentMethodsSection = ({ data }) => {
// 1.States
// 2.Functions
// 3.Others

// 4.Render

return (
<>
{/_ Méthode de paiement_/}

<div id="payment_methods" className="container-profile-section">
<h2 className="text-xl">Méthodes de paiement</h2>
{
/_ Afficher 2 CB _/
<ul>
{data.cards?.length > 0
? data.cards.map((card, index) => {
<li key={index}>{card}</li>;
})
: "Non renseigné"}
</ul>
}
<div className="container-cta">
<CTAButton label="Modifier" className="cta-profile-style" />
</div>
</div>
</>
);
};
PaymentMethodsSection.propTypes = {
data: PropTypes.shape({
cards: PropTypes.arrayOf(PropTypes.string),
}).isRequired,
};

## export default PaymentMethodsSection;

---

import PropTypes from "prop-types";
import CTAButton from "../ui/buttons/CTAButton";

const AccountStatus = ({ data }) => {
// 1.States
// 2.Functions
// 3.Others
let content;
if (!data || data === undefined) {
console;
content =
"Erreur lors de la récupération des informations de l'utilisateur";
} else {
/_ Actif / Vérifié / Verrouillé + bouton vérifier _/
content = (
<>

<p
className={`font-semibold ${
            data.enabled ? "text-green-600" : "text-red-600"
          }`} >
{data.enabled ? "✔ Compte actif" : "❌ Compte désactivé"}
</p>
<p
className={`font-semibold ${
            data.emailVerified ? "text-green-600" : "text-red-600"
          }`} >
{data.emailVerified ? "✔ Email vérifié" : "❌ Email non vérifié"}
</p>
<div className="w-full flex items-center justify-end">
<CTAButton
label="Vérifier"
className={
"mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
}
/>
</div>
</>
);
}

// 4.Render

return (

<div id="account-status" className="mt-4 py-4 border-b-2">
<h2 className="text-xl">État du compte</h2>
{content}
</div>
);
};
AccountStatus.propTypes = {
data: PropTypes.shape({
enabled: PropTypes.bool.isRequired,
emailVerified: PropTypes.bool.isRequired,
accountNonLocked: PropTypes.bool.isRequired,
}).isRequired,
};

## export default AccountStatus;

---

import PropTypes from "prop-types";
import CTAButton from "../ui/buttons/CTAButton";

const LogoutButton = ({ handleClick }) => {
// 1.States
// 2.Functions
// 3.Others

// 4.Render

return (

<div>
{/_ LogoutButton _/}
<div className="w-full flex items-center justify-center">
<CTAButton
label="Se déconnecter"
className={
"btn mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
}
handleClick={handleClick}
/>
</div>
</div>
);
};
LogoutButton.propTypes = {
handleClick: PropTypes.func.isRequired,
};

## export default LogoutButton;

## Autres:

- Bien vérifier que chaque section est pertinente voir CF CDC et bonnes pratiques (design en place, accessibilité, commentaires, documentation)
- nous avons dévéloppé une page dashboard et orders en attente

---
