import PropTypes from "prop-types";
// import { useState } from "react";

import formatPrice from "../../utils/formatPrice";

export default function OrderListProduct({
  orderListProduct,
  setOrderListProduct,
  isEdit,
  setTotal,
}) {
  const calculateTotal = () => {
    let total = 0;
    orderListProduct.forEach((item) => {
      total += item.product.price * (1 - item.product.discount) * item.quantity;
    });
    return total;
  };

  return (
    <div className="orderListProduct">
      <div className="orderListProduct__header">
        <div className="orderListProduct__header__item">
          <p>Sản phẩm</p>
        </div>
        <div className="orderListProduct__header__item">
          <p>Đơn giá</p>
        </div>
        <div className="orderListProduct__header__item">
          <p>Số lượng</p>
        </div>
        <div className="orderListProduct__header__item">
          <p>Thành tiền</p>
        </div>
      </div>
      <div className="orderListProduct__body">
        {orderListProduct.map((item, index) => (
          <div className="orderListProduct__body__item" key={index}>
            <div className="orderListProduct__body__item__info">
              <img src={item.product.thumb} alt="" />
              <p>{item.product.name}</p>
            </div>
            <div className="orderListProduct__body__item__price">
              <p>
                {formatPrice(item.product.price * (1 - item.product.discount))}
              </p>
            </div>
            <div className="orderListProduct__body__item__quantity">
              <input
                type="number"
                value={item.quantity}
                disabled={!isEdit}
                onChange={(e) => {
                  const newOrderListProduct = [...orderListProduct];
                  newOrderListProduct[index].quantity = e.target.value;
                  setOrderListProduct(newOrderListProduct);
                  setTotal(calculateTotal());
                }}
              />
            </div>
            <div className="orderListProduct__body__item__total">
              <p>
                {formatPrice(
                  item.product.price *
                    (1 - item.product.discount) *
                    item.quantity
                )}
              </p>
            </div>
            {isEdit && (
              <i
                className="fa-solid fa-trash"
                onClick={() => {
                  const newOrderListProduct = [...orderListProduct];
                  newOrderListProduct.splice(index, 1);
                  setOrderListProduct(newOrderListProduct);
                }}
              ></i>
            )}
          </div>
        ))}
      </div>
      <div className="orderListProduct__footer">
        <div className="orderListProduct__footer__total">
          <p>Tổng tiền: {formatPrice(calculateTotal())}</p>
        </div>
      </div>
    </div>
  );
}

OrderListProduct.propTypes = {
  orderListProduct: PropTypes.array.isRequired,
  setOrderListProduct: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  setTotal: PropTypes.func.isRequired,
};
