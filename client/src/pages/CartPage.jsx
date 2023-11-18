import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCart from "../components/ProductCart";
import { useCart } from "../context/CartContext";
import formatPrice from "../utils/formatPrice";

import "../assets/css/CartPage.css";

export default function CartPage() {
  const { cartItems, removeFromCart, addToCart, reduceQuantity } = useCart();
  const navigate = useNavigate();

  // handle addAll, addOne, removeOne, removeAll to order through checkbox
  const [order, setOrder] = useState([]);
  const [isAll, setIsAll] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if(!localStorage.getItem('order')){
      localStorage.setItem('order', JSON.stringify([]))
    }
    const orderStorage = JSON.parse(localStorage.getItem('order'))
    setOrder(orderStorage)
  },[])

  useEffect(() => {
    localStorage.setItem('order', JSON.stringify(order))
    setIsAll(order.length === cartItems.length)
  },[order, cartItems])

  const calculateTotal = () => {
    return order.reduce(
      (total, item) => total + (item.price * (1 - item.discount)) * item.quantity,
      0
    );
  };

  const handleCheckBoxAll = (e) => {
    if (e.target.checked) {
      setOrder(cartItems);
    } else {
      setOrder([]);
    }
  };

  const handleCheckBox = (e, item) => {
    if (e.target.checked) {
      setOrder([...order, item]);
    } else {
      setOrder(order.filter((orderItem) => orderItem._id !== item._id));
    }
  };

  const handleChangeQuantity = (item) => {
    setOrder(
      order.map((orderItem) =>
        orderItem._id === item._id
          ? { ...orderItem, quantity: item.quantity }
          : orderItem
      )
    )
  }
  const handleDelete = (item) => {
    setOrder(order.filter((orderItem) => orderItem._id !== item._id));
  }

  const checkIsExist = (item) => {
    return order.some((orderItem) => orderItem._id === item._id);
  };

  return (
    <div className="cartPage">
      <Header />
      <div className="cartPage__container">
        {cartItems.length === 0 ? (
          <div className="cartPage__container__empty">
            <img
              src="https://shopfront-cdn.tekoapis.com/static/empty_cart.png"
              alt="empty cart"
            />
            <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
            <button onClick={() => navigate("/")}>Quay lại mua sắm</button>
          </div>
        ) : (
          <>
            <h2>Giỏ hàng</h2>
            <div className="cartPage__container__content">
              <div className="cartPage__content_products">
                <div className="cartPage__content_products__header">
                  <input type="checkbox" onChange={(e) => handleCheckBoxAll(e)} checked={isAll}/>
                  <div className="cartPage__content_products__header__title">
                    <span>Sản phẩm</span>
                    <span>Đơn giá</span>
                    <span>Số lượng</span>
                    <span>Thành tiền</span>
                  </div>
                </div>
                <div className="cartPage__content_products__body">
                  {cartItems.map((item, index) => (
                    <ProductCart
                      key={index}
                      item={item}
                      index={index}
                      removeFromCart={removeFromCart}
                      reduceQuantity={reduceQuantity}
                      handleCheckBox={handleCheckBox}
                      checkIsExist={checkIsExist}
                      handleDelete={handleDelete}
                      handleChangeQuantity={handleChangeQuantity}
                      addToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
              <div className="cartPage__content_checkout">
                <div className="cartPage__content_checkout__discount">
                  <h4>Khuyến mãi</h4>
                  <i className="fa-solid fa-tag"></i>
                  <button>Chọn hoặc nhập mã khuyến mãi</button>
                </div>
                <div className="cartPage__content_checkout__payment">
                  <h4>Thanh toán</h4>
                  <div className="cartPage__content_checkout__payment__item">
                    <span>Tổng tạm tính</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                  <div className="cartPage__content_checkout__payment__item">
                    <span>Khuyến mãi</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                  <div className="cartPage__content_checkout__payment__item">
                    <span>Phí vận chuyển</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                  <div className="cartPage__content_checkout__payment__item">
                    <span>Thành tiền</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                  <button
                    onClick={() => navigate("/checkout")}
                  >Thanh toán</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
