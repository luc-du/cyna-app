export const formatStripePrice = (amountInCents) => {
  // 1. Try to coerce/parse the input into a Number of cents
  const cents =
    typeof amountInCents === "number"
      ? amountInCents
      : parseFloat(amountInCents);

  if (isNaN(cents) || cents < 0) {
    return "Prix invalide";
  }

  const euros = (cents / 100).toFixed(2);

  const withComma = euros.replace(".", ",");

  return `${withComma} €`;
};
