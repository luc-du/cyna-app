import { createSlice } from "@reduxjs/toolkit";

/* En attendant le backend */
const loadUserFomLocalStorage = () => {
  try {
    const user = localStorage.getItem("user", JSON.parse(user));
    console.log("Chargement des données de user:", user);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'utilisateur:", error);
    return { user: [] };
  }
};

const saveUserToLocalStorage = (user) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
    console.log("Sauvegarde de user réussie");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'utilisateur:", error);
  }
};

/* Test */
const userTest = {
  id: 0,
  fname: "John",
  lname: "Doe",
  age: 24,
  job: "web engineer",
  email: "johndoe@fakemail.com",
  password: "P@ssword123.",
};

/* Slice */
const initialState = {
  initialState: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: {},
    registerUser: {},
    logOut: {},
  },
});
