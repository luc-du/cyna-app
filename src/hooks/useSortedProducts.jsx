const useSortedProducts = (element) => {
  const elementProduct = [...element.products];

  const sortedProducts = elementProduct.sort((a, b) => {
    if (a.available === b.available) {
      return a.priorite - b.priorite;
    } else {
      return b.available - a.available;
    }
  });

  return sortedProducts;
};

export default useSortedProducts;
