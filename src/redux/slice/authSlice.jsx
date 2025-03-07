import { createSlice } from "@reduxjs/toolkit";
import {
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../../components/utils/storage";

const storedUsers = loadFromLocalStorage("users") || [];

// test
const userTest = {
  id: 0,
  name: "John Doe",
  age: 24,
  job: "web engineer",
  email: "johndoe@fakemail.com",
  password: "P@ssword123.",
};

// Ajout de l'utilisateur test s'il n'existe pas déjà
if (!storedUsers.find((user) => user.email === userTest.email)) {
  storedUsers.push(userTest);
  saveToLocalStorage("users", storedUsers);
}

// Chargement de l'utilisateur connecté
const initialUser = loadFromLocalStorage("user") || null;

const initialState = {
  user: initialUser,
  isAuthenticated: !!initialUser,
  users: storedUsers,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 1. Connexion
    loginUser: (state, action) => {
      state.loading = true;
      state.error = null;

      const { email, password } = action.payload;
      const foundUser = state.users.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        state.user = { name: foundUser.name, email: foundUser.email };
        state.isAuthenticated = true;
        saveToLocalStorage("user", state.user);
      } else {
        state.error = "Email ou mot de passe invalide";
      }
      state.loading = false;
    },

    // 2. Création d'un compte
    registerUser: (state, action) => {
      state.loading = true;
      state.error = null;

      const { name, email, password } = action.payload;
      const existingUser = state.users.find((user) => user.email === email);

      if (existingUser) {
        state.error = "Email déjà utilisé";
      } else {
        const newUser = { id: state.users.length, name, email, password };
        state.users.push(newUser);
        saveToLocalStorage("users", state.users);

        state.user = { name, email };
        state.isAuthenticated = true;
        saveToLocalStorage("user", state.user);
      }
      state.loading = false;
    },

    // 3. Déconnexion
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeFromLocalStorage("user");
    },
  },
});

export const { loginUser, registerUser, logOut } = authSlice.actions;
export default authSlice.reducer;
