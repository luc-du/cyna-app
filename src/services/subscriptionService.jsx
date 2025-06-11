import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";
import { getToken } from "../components/utils/authStorage";

/**
 * Ajoute une nouvelle méthode de paiement pour le customer courant.
 * @param {Object} payload – { customerId, type, number, month, year, cvc }
 * @returns {Promise<Object>}
 */
export const addPaymentMethod = async (payload) => {
  const token = getToken();
  const response = await axios.post(
    API_ROUTES.SUBSCRIPTION.ADD_PAYMENT_METHOD,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
