import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, validateToken } from "../redux/slice/authSlice";

/**
 * Hook personnalisé pour valider le token d'authentification lors du chargement d'une page protégée.
 * Si le token est invalide ou expiré, l'utilisateur est redirigé vers la page de connexion.
 * À utiliser dans chaque composant représentant une page nécessitant une authentification.
 *
 * Exemple d'utilisation :
 *   useAuthEffect();
 *
 */
export const useAuthEffect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Vérifie la validité du token utilisateur.
     * Si le token est invalide, effectue une déconnexion et redirige vers /login.
     */
    const checkToken = async () => {
      try {
        await dispatch(validateToken()).unwrap();
        // Token valide : aucune action supplémentaire
      } catch {
        dispatch(logout()); // Nettoie le state d'authentification
        navigate("/login"); // Redirige vers la page de connexion
      }
    };

    checkToken();
  }, [dispatch, navigate]);
};
