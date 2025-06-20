/**
 * Récupère les en-têtes d'authentification pour les requêtes HTTP.
 *
 * Cette fonction lit le token JWT stocké dans le localStorage et retourne
 * un objet contenant l'en-tête Authorization au format Bearer.
 *
 * @returns {Object} Objet contenant l'en-tête Authorization.
 * @throws {Error} Si aucun token n'est trouvé dans le localStorage.
 */
export const getAuthHeaders = () => {
  // Récupère le token JWT depuis le localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    // Lance une erreur si aucun token n'est trouvé
    throw new Error("Aucun token trouvé");
  }
  // Retourne l'en-tête Authorization au format Bearer
  return { Authorization: `Bearer ${token}` };
};
