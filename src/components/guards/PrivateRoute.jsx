import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Composant de garde d'accès aux routes protégées.
 *
 * Ce composant vérifie si l'utilisateur est authentifié via l'état Redux.
 * Si l'utilisateur est authentifié, il affiche les routes enfants via <Outlet />.
 * Sinon, il redirige l'utilisateur vers la page de connexion ("/login").
 *
 * @component
 * @returns {JSX.Element} Les routes enfants si authentifié, sinon une redirection vers "/login".
 *
 * @example
 * // Dans votre configuration de routes :
 * <Route element={<PrivateRoute />}>
 *   <Route path="/dashboard" element={<Dashboard />} />
 * </Route>
 */
const PrivateRoute = () => {
  // Récupère l'état d'authentification depuis le store Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Si authentifié, affiche les routes enfants, sinon redirige vers /login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
