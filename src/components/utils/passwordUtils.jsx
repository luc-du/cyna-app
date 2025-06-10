/**
 * Détermine la force d'un mot de passe.
 * @param {string} password
 * @returns {"Faible"|"Moyen"|"Fort"}
 */
export const checkPasswordStrength = (password) => {
  if (password.length < 6) return "Faible";
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  if (hasUpper && hasDigit && hasSpecial) return "Fort";

  return "Moyen";
};

/**
 * Retourne la classe Tailwind correspondant à la couleur
 * selon la force d'un mot de passe.
 * @param {"Faible"|"Moyen"|"Fort"} strength – Niveau de force
 * @returns {string} – Classe CSS (Tailwind) pour la couleur
 */
export const getColorStrength = (strength) => {
  switch (strength) {
    case "Fort":
      return "text-green-600";
    case "Moyen":
      return "text-yellow-600";
    default:
      return "text-red-600";
  }
};
