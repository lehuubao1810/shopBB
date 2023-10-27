// import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCart from "../components/ProductCart";
import { useCart } from "../context/CartContext";

import "../assets/css/CartPage.css";

export default function CartPage() {
  const { cartItems, removeFromCart, addToCart, reduceQuantity } = useCart();
  const navigate = useNavigate();
  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cartPage">
      <Header />
      <div className="cartPage__container">
        {cartItems.length === 0 ? (
          <div className="cartPage__container__empty">
            <img src="https://shopfront-cdn.tekoapis.com/static/empty_cart.png" alt="empty cart" />
            <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
            <button
              onClick={() => navigate("/")}
            >Quay lại mua sắm</button>
          </div>
        ) : (
          <>
            <h2>Giỏ hàng</h2>
            <div className="cartPage__container__content">
              <div className="cartPage__content_products">
                <div className="cartPage__content_products__header">
                  <input type="checkbox" />
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
                      imgUrl={item.imgDescs[0]}
                      item={item}
                      discount={item.discount}
                      quantity={item.quantity}
                      index={index}
                      removeFromCart={removeFromCart}
                      reduceQuantity={reduceQuantity}
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
                  <button>Thanh toán</button>
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
