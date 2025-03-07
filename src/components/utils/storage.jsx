const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("Sauvegarde de user réussie");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'utilisateur:", error);
  }
};

const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);

    if (data) {
      console.log("Données chargées avec succès:", JSON.parse(data));
      return JSON.parse(data);
    } else {
      console.warn("Aucune donnée trouvée pour:", key);
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'utilisateur:", error);
    return null;
  }
};

const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Erreur lors de la suppression de ${key}`, error);
  }
};

export { loadFromLocalStorage, removeFromLocalStorage, saveToLocalStorage };
