import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../redux/slice/productSlice";
// import Loader from "../components/ui/Loader";

/**
 * Page de détail d’un produit.
 * Redirige vers une page 404 si l’identifiant est invalide.
 */
const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { item, loadingItem, errorItem } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (errorItem) {
      navigate("/404", { replace: true });
    }
  }, [errorItem, navigate]);

  // if (loadingItem) return <Loader />;
  if (loadingItem) return "Chargement";
  if (!item) return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <p className="text-gray-600">{item.description}</p>
      {/* Ajoute les images, spécifications, CTA, etc. */}
    </div>
  );
};

export default ProductDetails;
