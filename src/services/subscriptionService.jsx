import axios from "axios";
import { API_ROUTES } from "../api/apiRoutes";
import { getToken } from "../components/utils/auth/authStorage";
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
 * Créer un objet Price dans Stripe
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

/**
 * customerId – ID Stripe du client
 * @param {number | string} customerId
 */

export const getSubscriptionByCustomer = async (customerId) => {
  const token = getToken();
  const response = await axios.get(
    API_ROUTES.SUBSCRIPTION.GET_BY_CUSTOMER(customerId),
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

/*
 * subscriptionId – ID Stripe de l'abonnement
 * priceId      – ID du plan Stripe (vérifier en amont)
 * quantity     – quantité (1 par défaut)
 */
export const updateSubscription = async ({
  subscriptionId,
  priceId,
  quantity,
}) => {
  const token = getToken();
  const response = await axios.patch(
    API_ROUTES.SUBSCRIPTION.UPDATE_SUBSCRIPTION(subscriptionId),
    { priceId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

/*
 * subscriptionId – ID Stripe de l'abonnement
 */
export const cancelCustomerSubscription = async (subscriptionId) => {
  const token = getToken();
  const response = await axios.post(
    API_ROUTES.SUBSCRIPTION.CANCEL_SUBSCRIPTION,
    { subscriptionId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
export default {
  createPrice,
  createSubscription,
  getSubscriptionByCustomer,
  updateSubscription,
  cancelCustomerSubscription,
};
