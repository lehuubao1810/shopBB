import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const priceDiscount = product.price * (1 - product.discount);

  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/${product.category}/${product.slug}`);
  }

  return (
    <div className="productCard">
      <img src={product.imgUrl} alt={product.name} onClick={handleClick} />
      <h4 className="productName" onClick={handleClick}>
        {product.name}
      </h4>
      <span className="priceDiscount">{formatPrice(priceDiscount)}</span>
      <div className="productPrice">
        <del>{formatPrice(product.price)}</del>
        <span className="discount">{`${product.discount * 100} %`}</span>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
