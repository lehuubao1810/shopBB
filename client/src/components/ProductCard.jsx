import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import formatPrice from "../utils/formatPrice";

const ProductCard = ({ product, categoryName }) => {
  const priceDiscount = (product.price * (1 - product.discount))

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/${categoryName}/${product.slug}`);
  }

  return (
    <div className="productCard">
      <img src={product.thumb} alt={product.name} onClick={handleClick} />
      <h4 className="productName" onClick={handleClick}>
        {product.name}
      </h4>
      <span className="priceDiscount">{formatPrice(priceDiscount)}</span>
      <div className="productPrice">
        <del>{formatPrice(product.price)}</del>
        <span className="discount">{`${(product.discount * 100).toFixed()} %`}</span>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  categoryName: PropTypes.string.isRequired,
};

export default ProductCard;
