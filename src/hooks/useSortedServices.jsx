import { MOCK_Services } from "../mock/MOCKS_DATA";

const useSortedServices = (element) => {
  if (!element?.services) return [];

  // Filtrer les services correspondant aux IDs dans `element.services`
  const filteredServices = MOCK_Services.filter((service) =>
    element.services.includes(service.id)
  );

  // Trier les services par disponibilité et priorité
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (a.available === b.available) {
      return a.priorite - b.priorite;
    } else {
      return b.available - a.available;
    }
  });

  return sortedServices;
};

export default useSortedServices;
