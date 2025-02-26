import MOCK_PricingOptions from "../../mock/MOCK_PricingOptions.jsx";
import CardProductPricing from "./CardProductPricing.jsx";

const ProductPricing = () => {
  // 1.State :
  // 2.Functions:
  // 3. Others
  const pricingOptions = MOCK_PricingOptions;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Prix des services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingOptions.map((option, index) => (
          <CardProductPricing option={option} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductPricing;
