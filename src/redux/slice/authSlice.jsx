import { createSlice } from "@reduxjs/toolkit";
import {
  loadFomLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../../components/utils/storage";

/* En attendant le backend */
/* 
Utilisation du localStorage
*/
/* DataTest */
const userTest = {
  id: 0,
  name: "John Doe",
  age: 24,
  job: "web engineer",
  email: "johndoe@fakemail.com",
  password: "P@ssword123.",
};

saveToLocalStorage("user", userTest);

/* Slice */
const initialUser = loadFomLocalStorage("user") || null;
const initialState = {
  initialState: initialUser,
  isAuthenticated: initialUser ? true : false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 1.Connexion
    loginUser: (state, action) => {
      state.loading = true;
      state.error = null;
      const { email, password } = action.payload;

      // Simulation d'un fetch API
      if (email === userTest.email && password === userTest.password) {
        state.user = { name: userTest.name, email: userTest.email };
        state.isAuthenticated = true;
        saveToLocalStorage("user", state.user);
      } else {
        state.error = "Invalid Credentials";
      }
      state.loading = false;
    },

    // 2.Création
    registerUser: (state, action) => {
      state.loading = false;
      state.error = null;

      // Simulation d'une API
      state.user = { name: action.payload, email: action.payload };
      state.isAuthenticated = true;
      saveToLocalStorage("user", state.user);
    },

    // 3.Déconnexion
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeFromLocalStorage("user");
    },
  },
});

export const { loginUser, registerUser, logOut } = authSlice.actions;
export default authSlice.reducer;
