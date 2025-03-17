import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/auth";

/* Signup de user */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { isRejectedWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, userData);
      return response.data;
    } catch (error) {
      return isRejectedWithValue(
        error.response?.data || "Erreur lors de l'inscription"
      );
    }
  }
);
