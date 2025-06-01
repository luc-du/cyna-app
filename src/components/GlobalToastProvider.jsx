import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { useToast } from "../hooks/useToast";

const ToastContext = createContext();

/**
 * Fournit un contexte global pour l'affichage des notifications toast dans l'application.
 *
 * @component
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Les éléments enfants à rendre à l'intérieur du provider.
 * @returns {JSX.Element} Le provider de contexte toast englobant les enfants et le composant Toast.
 *
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
export const useGlobalToast = () => useContext(ToastContext);

GlobalToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
