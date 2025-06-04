/**
 * Traite les données produit du backend pour éviter les problèmes de BigInt
 * et normaliser le format des données
 */
export const processProductData = (product) => {
  if (!product) return null;

  return {
    ...product,
    // Conversion sécurisée des BigInt
    id: String(product.id),
    categoryId: product.categoryId ? String(product.categoryId) : null,
    amount: typeof product.amount === "number" ? product.amount : 0,
    salesNumber:
      typeof product.salesNumber === "number" ? product.salesNumber : 0,

    // Normalisation du format images
    images: Array.isArray(product.images)
      ? product.images.map((img) =>
          typeof img === "string" ? { url: img } : img
        )
      : [],

    // Valeurs par défaut
    brand: product.brand || "",
    description: product.description || "",
    caracteristics: product.caracteristics || "",
    active: Boolean(product.active),
    promo: Boolean(product.promo),
    status: product.status || "AVAILABLE",
  };
};

/**
 * Traite un tableau de produits
 */
export const processProductList = (products) => {
  if (!Array.isArray(products)) return [];
  return products.map(processProductData).filter(Boolean);
};
