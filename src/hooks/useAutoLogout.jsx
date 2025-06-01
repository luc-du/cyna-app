import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../components/utils/authStorage";
import { logout } from "../redux/slice/authSlice";
/**
 * Hook personnalisé pour la déconnexion automatique de l'utilisateur.
 *
 * Ce hook vérifie l'expiration du token JWT stocké (via getToken).
 * Si le token est expiré, il déclenche la déconnexion, efface le token
 * et redirige l'utilisateur vers la page de connexion.
 *
 * À utiliser dans un composant racine (ex: App) pour surveiller l'expiration du token.
 *
 * @example
 *   useAutoLogout();
 */
export const useAutoLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    try {
      // Décodage du token pour obtenir la date d'expiration (exp)
      const { exp } = jwtDecode(token);
      const now = Date.now() / 1000;
      const delay = (exp - now) * 1000;

      // Si le token est déjà expiré, déconnexion immédiate
      if (delay <= 0) {
        dispatch(logout());
        clearToken();
        navigate("/login");
        return;
      }

      // Déconnexion automatique programmée à l'expiration du token
      const timeout = setTimeout(() => {
        dispatch(logout());
        clearToken();
        navigate("/login");
      }, delay);

      // Nettoyage du timeout lors du démontage ou du changement de dépendances
      return () => clearTimeout(timeout);
    } catch (err) {
      console.error("Erreur dans useAutoLogout:", err);
    }
  }, [dispatch, navigate]);
};
