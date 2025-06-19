export const setStripePrice = async (amount) => {
  /* ctrl value of pice before processing */

  const mappedPrice = (amount / 100).toFixed(2);
  return mappedPrice;
};

export default setStripePrice;
