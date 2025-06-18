export const getPricingLabel = (pricingModel) => {
  const labels = {
    PER_MONTH_PER_USER: "Mensuel et par utilisateur",
    PER_YEAR_PER_USER: "Annuel et par utilisateur",
    PER_MONTH_PER_DEVICE: "Mensuel et par appareil",
    PER_YEAR_PER_DEVICE: "Annuel et par appareil",
    PAY_AS_YOU_GO: "Payer en une fois",
    ONE_TIME: "Payer en une fois",
  };

  return labels[pricingModel] || "Modèle inconnu";
};
