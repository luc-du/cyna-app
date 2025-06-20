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

/**
 * customerId    – ID Stripe du client
 * priceId       – ID du plan Stripe (vérifier en amont)
 * quantity      – quantité (1 par défaut)
 * paymentMethodId – ID du PM sélectionné
 */
export const createSubscription = async (data) => {
  const token = getToken();
  const response = await axios.post(
    API_ROUTES.SUBSCRIPTION.CREATE_SUBSCRIPTION,
    // { customerId, priceId, quantity, paymentMethodId },
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

/**
 * Crée un objet Price dans Stripe
 * @param {{ priceId: string, currency: string, amount: number, productId: string, productName: string, description: string, pricingModel: string }} priceDto
 * @returns {Promise<PriceDto>}
 */
export const createPrice = async (priceDto) => {
  const token = getToken();
  const response = await axios.post(
    API_ROUTES.SUBSCRIPTION.CREATE_PRICE,
    priceDto,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export default {
  createSubscription,
  createPrice,
};
