import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";

import formatPrice from "../utils/formatPrice";

const ProductCard = ({ product }) => {
  const priceDiscount = product.price * (1 - product.discount);

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/product/${product.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="productCard">
      <img src={product.thumb} alt={product.name} onClick={handleClick} />
      <h4 className="productName" onClick={handleClick}>
        {product.name}
      </h4>
      <div className="productPrice">
        <span className="priceDiscount">{formatPrice(priceDiscount)}</span>
        <del>{formatPrice(product.price)}</del>
        <span className="discount">{`${(
          product.discount * 100
        ).toFixed()} %`}</span>
      </div>
      <div className="productRating">
        <Rating
          name="read-only"
          value={product.rating}
          precision={0.1}
          readOnly
        />
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
