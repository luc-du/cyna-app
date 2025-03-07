const saveToLocalStorage = (arrayName, obj) => {
  try {
    localStorage.setItem(arrayName, JSON.stringify(obj));
    console.log("Sauvegarde de user réussie");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'utilisateur:", error);
  }
};

const loadFromLocalStorage = (arrayName) => {
  try {
    const data = localStorage.getItem(arrayName);

    if (data) {
      console.log("Données chargées avec succès:", JSON.parse(data));
      return JSON.parse(data);
    } else {
      console.warn("Aucune donnée trouvée pour:", arrayName);
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
