import { useEffect, useState } from "react";
import Toast from "../components/ui/Toast";

/**
 * Hook personnalisé pour gérer l'affichage de notifications toast.
 *
 * @returns {{
 *   showToast: (message: string, type?: "success" | "warning" | "error", duration?: number) => void,
 *   ToastComponent: () => JSX.Element | null
 * }}
 */
export const useToast = () => {
  const [toast, setToast] = useState(null);

  /**
   * Affiche une notification toast.
   * @param {string} message - Le message à afficher.
   * @param {"success" | "warning" | "error"} [type="success"] - Le type de toast.
   * @param {number} [duration=3000] - Durée d'affichage en ms.
   */
  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ message, type, duration });
  };

  /**
   * Ferme la notification toast.
   */
  const hideToast = () => {
    setToast(null);
  };

  // Disparition automatique après `duration` ms
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, toast.duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  /**
   * Composant JSX à afficher dans le DOM.
   * @returns {JSX.Element|null}
   */
  const ToastComponent = () =>
    toast ? (
      <Toast message={toast.message} type={toast.type} onClose={hideToast} />
    ) : null;

  return { showToast, ToastComponent };
};
