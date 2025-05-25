export const formatStripePrice = (amountInCents) => {
  if (typeof amountInCents !== "number" || isNaN(amountInCents)) {
    return "Prix indisponible";
  }
  return (amountInCents / 100).toFixed(2).replace(".", ".") + " €";
};
