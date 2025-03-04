const getServiceById = (serviceId, MOCK_Services, MOCK_PricingOptions) => {
  const service = MOCK_Services.find((service) => service.id === serviceId);
  if (!service) return null;

  return {
    ...service,
    pricingOptions: MOCK_PricingOptions.filter((option) =>
      service.pricingIds.includes(option.id)
    ),
  };
};

export default getServiceById;
