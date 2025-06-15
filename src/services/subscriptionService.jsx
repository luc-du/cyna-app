import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";
import { getToken } from "../components/utils/authStorage";
/**
 * Crée un Customer Stripe et met à jour l’utilisateur via le micro-service Auth-users.
 * @param {{ userId: number, name: string, email: string }} payload
 * @returns {Promise<object>} réponse contenant au minimum customerId
 */
export const createCustomer = async ({ userId, name, email }) => {
  const token = getToken();
  const response = await axios.post(
    API_ROUTES.SUBSCRIPTION.CREATE_CUSTOMER,
    { userId, name, email },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log("From subscriptionService - createCustomer:", response.data);

  return response.data;
};
