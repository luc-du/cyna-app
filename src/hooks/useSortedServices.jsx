const useSortedServices = (element) => {
  if (!element?.services) return [];

  // Trier les services par disponibilité et priorité
  const sortedServices = [...(element.products || [])].sort((a, b) =>
    a.status === "AVAILABLE" && b.status !== "AVAILABLE"
      ? -1
      : a.status !== "AVAILABLE" && b.status === "AVAILABLE"
      ? 1
      : 0
  );

  return sortedServices;
};

export default useSortedServices;
