const useSortedProducts = (element) => {
  const elementProduct = [...element.products];

  const sortedProducts = elementProduct.sort((a, b) => {
    if (a.disponible === b.disponible) {
      return a.priorite - b.priorite;
    } else {
      return b.disponible - a.disponible;
    }
  });

  return sortedProducts;
};

export default useSortedProducts;
