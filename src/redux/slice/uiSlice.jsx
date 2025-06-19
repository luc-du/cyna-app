import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: localStorage.getItem("theme") === "dark",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("theme", state.darkMode ? "dark" : "light");

      const root = document.documentElement;
      if (state.darkMode) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("theme", action.payload ? "dark" : "light");
    },
  },
});

export const { toggleDarkMode, setDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
