import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

import formatPrice from "../utils/formatPrice";

export default function ProductCart(props) {

  const navigate = useNavigate();

  const handleDelete = () => {
    if (props.quantity === 1) {
      props.removeFromCart(props.item);
      props.handleDelete(props.item);
    } else {
      props.reduceQuantity(props.item);
      props.handleChangeQuantity(props.item, -1);
    }
  };

  const handleAdd = () => {
    props.addToCart(props.item);
    props.handleChangeQuantity(props.item, 1);
  }

  return (
    <div className="productCart">
      <input type="checkbox" onChange={(e) => props.handleCheckBox(e, props.item, props.quantity)} checked={props.checkIsExist(props.item)}/>
      <div key={props.index} className="productCart__content">
        <div className="productCart__content__info">
          <div className="productCart__content__info__item">
            <img src={props.item.thumb} alt={props.item.name} />
            <h4 className="productCart__content__info__item__name" onClick={() => navigate(`/product/${props.item.slug}`)}>{props.item.name}</h4>
          </div>
          <div>
            <p>{formatPrice(props.item.price * (1 - props.item.discount))}</p>
            <del>{formatPrice(props.item.price)}</del>
          </div>
          <div className="productCart__content__info__quantity">
            <button onClick={handleDelete} >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                size="16"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12Z"
                  fill="#616161"
                ></path>
              </svg>
            </button>
            <span>{props.quantity}</span>
            <button onClick={handleAdd}>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                size="16"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.75 4C12.75 3.58579 12.4142 3.25 12 3.25C11.5858 3.25 11.25 3.58579 11.25 4V11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H11.25V20C11.25 20.4142 11.5858 20.75 12 20.75C12.4142 20.75 12.75 20.4142 12.75 20V12.75H20C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25H12.75V4Z"
                  fill="#616161"
                ></path>
              </svg>
            </button>
          </div>
          <p>
            {formatPrice(
              props.item.price * (1 - props.item.discount) * props.quantity
            )}
          </p>
        </div>
        <div className="productCart__content__gift">
          <div className="productCart__content__gift__item">
            <i className="fa-solid fa-gift"></i>
            <span>Chuột Logitech G903 Hero với giá 1.5 Triệu đồng</span>
          </div>
          <div className="productCart__content__gift__item">
            <i className="fa-solid fa-gift"></i>
            <span>Bàn phím cơ Acer PREDATOR Aethon 301 TKL USB </span>
          </div>
          <div className="productCart__content__gift__item">
            <i className="fa-solid fa-gift"></i>
            <span>Tai nghe DareU</span>
          </div>
          <div className="productCart__content__gift__item">
            <i className="fa-solid fa-gift"></i>
            <span>Balo Shop BB</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductCart.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  reduceQuantity: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
  checkIsExist: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleChangeQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};
