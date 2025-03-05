import PropTypes from "prop-types";

const TotalPerProduct = ({ item }) => {
  return (
    <div className="col-span-1 text-right font-semibold">
      <span>
        {item.price !== "Sur demande"
          ? `${(item.price * item.quantity).toFixed(2)}€`
          : "Sur demande"}
      </span>
    </div>
  );
};
TotalPerProduct.propTypes = {
  item: PropTypes.shape({
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};
export default TotalPerProduct;
