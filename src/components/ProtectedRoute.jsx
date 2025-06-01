import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * ProtectedRoute : bloque l'accès si l'utilisateur n'est pas authentifié
 * @param {string[]} roles - rôles autorisés (optionnel)
 */
/**
 * Composant de route protégée pour React Router.
 *
 * Ce composant vérifie si l'utilisateur est authentifié et possède les rôles requis pour accéder à la route enfant.
 * - Si l'utilisateur n'est pas connecté, il est redirigé vers la page de connexion.
 * - Si l'utilisateur n'a pas le rôle requis, il est redirigé vers une page d'accès non autorisé.
 * - Sinon, il affiche la route enfant via <Outlet />.
 *
 * Accessibilité :
 * - Les redirections sont gérées côté client pour garantir une navigation fluide.
 * - Veillez à fournir des pages de destination accessibles pour les routes "/login" et "/unauthorized".
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {string[]} [props.roles=[]] - Liste des rôles autorisés à accéder à la route.
 * @returns {React.ReactElement} L'élément de route protégée ou une redirection.
 *
 * @example
 * <ProtectedRoute roles={['admin', 'user']} />
 */
const ProtectedRoute = ({ roles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Non connecté → redirection
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Rôle non autorisé → redirection ou message
  if (roles.length > 0 && user && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
