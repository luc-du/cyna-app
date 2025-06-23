import { useToast } from "@hooks/useToast";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";

const ToastContext = createContext();

/**
 * Fournit un contexte global pour l'affichage des notifications toast dans l'application.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Les éléments enfants à encapsuler.
 * @returns {JSX.Element}
 *
 * @example
 * <GlobalToastProvider>
 *   <App />
 * </GlobalToastProvider>
 */
export const GlobalToastProvider = ({ children }) => {
  const { showToast, ToastComponent } = useToast();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastComponent />
    </ToastContext.Provider>
  );
};

/**
 * Hook pour accéder au contexte global de toast.
 * @returns {{ showToast: (message: string, type?: string, duration?: number) => void }}
 */
export const useGlobalToast = () => useContext(ToastContext);

GlobalToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
