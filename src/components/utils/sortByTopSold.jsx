import PropTypes from "prop-types";

const sortProductsByTopSold = (products) => {
  return [...products].sort((a, b) => {
    const soldA = a.sold || 0;
    const soldB = b.sold || 0;

    // Compare by number of items sold, descending
    return soldB - soldA;
  });
};
export default sortProductsByTopSold;

PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sold: PropTypes.number, // Number of items sold
  active: PropTypes.bool.isRequired,
  promo: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired, // e.g., "AVAILABLE", "OUT_OF_STOCK"
});
