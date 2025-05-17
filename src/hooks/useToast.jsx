import { useEffect, useState } from "react";
import Toast from "../components/ui/Toast";

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ message, type, duration });
  };

  const hideToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, toast.duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const ToastComponent = () =>
    toast ? (
      <Toast message={toast.message} type={toast.type} onClose={hideToast} />
    ) : null;

  return { showToast, ToastComponent };
};
