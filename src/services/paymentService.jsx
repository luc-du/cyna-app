import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";
import { getToken } from "../components/utils/auth/authStorage";

/**
 * Service pour gérer les méthodes de paiement utilisateur.
 */
const paymentService = {
  /**
   * Récupère la liste des cartes pour un customerId donné.
   * @param {string} customerId
   */
  fetchPaymentMethods: async (customerId) => {
    const token = getToken();
    const url = API_ROUTES.PAYMENT_METHODS.GET_ALL(customerId);
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  /**
   * Ajoute une nouvelle carte.
   * @param {{ customerId, type, number, month, year, cvc }} data
   */
  addPaymentMethod: async (data) => {
    const token = getToken();
    const response = await axios.post(API_ROUTES.PAYMENT_METHODS.CREATE, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  /**
   * Supprime une carte par son ID.
   * @param {string} id
   */
  deletePaymentMethod: async (id) => {
    const token = getToken();
    const response = await axios.delete(API_ROUTES.PAYMENT_METHODS.DELETE(id), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  /**
   * Définit une carte comme défaut.
   * @param {string} id
   */
  // paymentService.js (correction)
  setDefaultPaymentMethod: async (id, customerId) => {
    const token = getToken();
    const response = await axios.patch(
      API_ROUTES.PAYMENT_METHODS.SET_DEFAULT({ id, customerId }),
      null,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },
};

export default paymentService;
