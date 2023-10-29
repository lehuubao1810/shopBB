import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import formatPrice from "../util/formatPrice";

import "../assets/css/CheckOut.css";

export default function CheckOut() {
  const navigate = useNavigate();

  const [order, setOrder] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Hà Nội");
  const [district, setDistrict] = useState("Hà Đông");
  const [ward, setWard] = useState("Dương Nội");
  const [address, setAddress] = useState("");

  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("VNPAY-QR");

  useEffect(() => {
    if (!localStorage.getItem("order")) {
      localStorage.setItem("order", JSON.stringify([]));
    }
    const orderStorage = JSON.parse(localStorage.getItem("order"));
    setOrder(orderStorage);
  }, []);

  const calculateTotal = () => {
    return order.reduce(
      (total, item) => total + item.price * (1 - item.discount) * item.quantity,
      0
    );
  };

  const checkInput = () => {
    if (name === "" || phone === "" || email === "" || address === "") {
      return false;
    }
    return true;
  };

  const handleCheckOut = () => {
    if (checkInput()) {
      const orderCheckout = {
        name,
        phone,
        email,
        city,
        district,
        ward,
        address,
        note,
        payment,
        order,
        total: calculateTotal(),
      };
      alert("Đặt hàng thành công");
      console.log(orderCheckout);
      navigate("/checkout/response");
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
    }
  };

  return (
    <div className="checkOutPage">
      <Header />
      <div className="checkOutPage__container">
        {order.length === 0 ? (
          <div className="checkOutPage__container__empty">
            <img
              src="https://shopfront-cdn.tekoapis.com/static/empty_cart.png"
              alt="empty cart"
            />
            <p>Không có sản phẩm nào để tiến hành mua</p>
            <button onClick={() => navigate("/")}>Quay lại mua sắm</button>
          </div>
        ) : (
          <div className="checkOutPage__container__content">
            <div className="checkOutPage__container__content__left">
              <div className="checkOutPage__container__content__left__address">
                <h3>Thông tin nhận hàng</h3>
                <span>Họ và tên *</span>
                <input
                  type="text"
                  placeholder="Vui lòng nhập họ và tên người nhận"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="group">
                  <div className="group__item">
                    <span>Số điện thoại *</span>
                    <input
                      type="text"
                      placeholder="Nhập số điện thoại"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="group__item">
                    <span>Email *</span>
                    <input
                      type="text"
                      placeholder="Nhập email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="group">
                  <div className="group__item">
                    <span>Tỉnh/Thành phố *</span>
                    <select
                      name="city"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="hanoi">Hà Nội</option>
                      <option value="hcm">Hồ Chí Minh</option>
                    </select>
                  </div>
                  <div className="group__item">
                    <span>Quận/Huyện *</span>
                    <select
                      name="district"
                      id="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    >
                      <option value="hanoi">Hà Nội</option>
                      <option value="hcm">Hồ Chí Minh</option>
                    </select>
                  </div>
                </div>
                <div className="group">
                  <div className="group__item">
                    <span>Phường/Xã *</span>
                    <select
                      name="ward"
                      id="ward"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                    >
                      <option value="hanoi">Hà Nội</option>
                      <option value="hcm">Hồ Chí Minh</option>
                    </select>
                  </div>
                  <div className="group__item">
                    <span>Địa chỉ cụ thể *</span>
                    <input
                      type="text"
                      placeholder="Nhập địa chỉ"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="checkOutPage__container__content__left__note">
                <h4>Ghi chú cho đơn hàng</h4>
                <input
                  type="text"
                  placeholder="Nhập ghi chú cho đơn hàng"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="checkOutPage__container__content__left__payment">
                <h3>Phương thức thanh toán</h3>
                <p>Thông tin thanh toán của bạn sẽ được bảo mật</p>
                <div className="checkOutPage__container__content__left__payment__item">
                  <input
                    type="radio"
                    name="payment"
                    value="VNPAY-QR"
                    defaultChecked
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <span>Thanh toán VNPAY-QR</span>
                </div>
                <div className="checkOutPage__container__content__left__payment__item">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </div>
              </div>
            </div>
            <div className="checkOutPage__container__content__right">
              <div className="checkOutPage__container__content__right__product">
                <h3>Thông tin đơn hàng</h3>
                {order.map((item, index) => (
                  <div
                    className="checkOutPage__container__content__right__product__item"
                    key={index}
                  >
                    <div className="checkOutPage__container__content__right__product__item__info">
                      <div className="img">
                        <img src={item.imgDescs[0]} alt={item.name} />
                      </div>
                      <div className="group">
                        <p>{item.name}</p>
                        <span>Số lượng: {item.quantity}</span>
                        <h4>{formatPrice(item.price*(1-item.discount))}</h4>
                        <del>{formatPrice(item.price)}</del>
                      </div>
                    </div>
                    <div className="checkOutPage__container__content__right__product__item__gift">
                      <div className="checkOutPage__container__content__right__product__item__gift__item">
                        <i className="fa-solid fa-gift"></i>
                        <span>
                          Chuột Logitech G903 Hero với giá 1.5 Triệu đồng
                        </span>
                      </div>
                      <div className="checkOutPage__container__content__right__product__item__gift__item">
                        <i className="fa-solid fa-gift"></i>
                        <span>
                          Bàn phím cơ Acer PREDATOR Aethon 301 TKL USB{" "}
                        </span>
                      </div>
                      <div className="checkOutPage__container__content__right__product__item__gift__item">
                        <i className="fa-solid fa-gift"></i>
                        <span>Tai nghe DareU</span>
                      </div>
                      <div className="checkOutPage__container__content__right__product__item__gift__item">
                        <i className="fa-solid fa-gift"></i>
                        <span>Balo Shop BB</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="checkOutPage__container__content__right__checkout">
                <h4>Thanh toán</h4>
                <div className="checkOutPage__container__content__right__checkout__item">
                  <span>Tổng tạm tính</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
                <div className="checkOutPage__container__content__right__checkout__item">
                  <span>Khuyến mãi</span>
                  <span>{formatPrice(0)}</span>
                </div>
                <div className="checkOutPage__container__content__right__checkout__item">
                  <span>Phí vận chuyển</span>
                  <span>{formatPrice(0)}</span>
                </div>
                <div className="checkOutPage__container__content__right__checkout__item">
                  <span>Thành tiền</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
                <button onClick={handleCheckOut}>Thanh toán</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
