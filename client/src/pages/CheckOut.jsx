import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../context/AuthContext";
import notify from "../utils/notify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import formatPrice from "../utils/formatPrice";
import PayPalPayment from "../components/PayPalPayment";

import "../assets/css/CheckOut.css";

export default function CheckOut() {

  const { user } = useAuth();

  const navigate = useNavigate();

  const [order, setOrder] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState([{ name: "Tỉnh, Thành phố" }]);
  const [citySelected, setCitySelected] = useState("");
  const [district, setDistrict] = useState([{ name: "Quận, Huyện" }]);
  const [districtSelected, setDistrictSelected] = useState("");
  const [ward, setWard] = useState([{ name: "Phường, Xã" }]);
  const [wardSelected, setWardSelected] = useState("");
  const [address, setAddress] = useState("");

  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("COD");

  useEffect(() => {
    document.title = "Đặt hàng | Shop BB";
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  },[user]);

  useEffect(() => {
    if (!localStorage.getItem("order")) {
      localStorage.setItem("order", JSON.stringify([]));
    }
    const orderStorage = JSON.parse(localStorage.getItem("order"));
    setOrder(orderStorage);

    // get address from api
    // const apiProvince = https://provinces.open-api.vn/api/
    // const apiDistrict = https://provinces.open-api.vn/api/p/${provinceId}?depth=2
    // const apiWard = https://provinces.open-api.vn/api/d/${districtId}?depth=2

    fetch("https://provinces.open-api.vn/api/")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCity(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const callApiDistrict = (provinceId) => {
    fetch(`https://provinces.open-api.vn/api/p/${provinceId}?depth=2`)
      .then((res) => res.json())
      .then((data) => setDistrict(data.districts))
      .catch((err) => console.log(err));
  };
  const callApiWard = (districtId) => {
    fetch(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`)
      .then((res) => res.json())
      .then((data) => setWard(data.wards))
      .catch((err) => console.log(err));
  };

  const calculateTotal = () => {
    return order.reduce(
      (total, item) => total + (item.product.price * (1 - item.product.discount)) * item.quantity,
      0
    );
  };


  const checkInput = () => {
    if (
      name === "" ||
      phone === "" ||
      email === "" ||
      address === "" ||
      citySelected === "" ||
      districtSelected === "" ||
      wardSelected === ""
    ) {
      notify("error", "Vui lòng nhập đầy đủ thông tin");
      return false;
    }
    return true;
  };

  const sendOrderToEmail = (orderCheckout) => {
    fetch("http://localhost:5000/api/mail/send-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderCheckout),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const handleCheckOut = () => {
    const orderCheckout = {
      customer: {
        customer_id: user._id ? user._id : null,
        name,
        phone,
        address: `${address}, ${(ward.find((item) => item.code == wardSelected)).name}, ${
          (district.find((item) => item.code == districtSelected)).name
        }, ${
          (city.find((item) => item.code == citySelected)).name
        }`,
      },
      email,
      products: order.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      total: calculateTotal(),
      note,
      payment,
    };
    console.log(orderCheckout);

    const orderEmail = {
      email: email,
      products: order.map((item) => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: formatPrice(item.product.price * (1 - item.product.discount)),
      })),
      total: formatPrice(calculateTotal()),
      payment,
      note,
      address: `${address}, ${(ward.find((item) => item.code == wardSelected)).name}, ${
        (district.find((item) => item.code == districtSelected)).name
      }, ${
        (city.find((item) => item.code == citySelected)).name
      }`,
    };

    // create order in database
    fetch("http://localhost:5000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderCheckout),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
        // clear order in localStorage
        localStorage.setItem("order", JSON.stringify([]));
        notify("success", "Đặt hàng thành công");
        sendOrderToEmail(orderEmail);
        // redirect to home page
        navigate("/checkout/response?isCheckout=true&status=success");
      })
      .catch((err) => {
        notify("error", "Đặt hàng thất bại");
        navigate("/checkout/response?isCheckout=true&status=fail");
        console.log(err);
      });
  };

  const handleBtnCheckOut = () => {
    if (!checkInput()) return;
    handleCheckOut();
  };

  return (
    <div className="checkOutPage">
      <ToastContainer />
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
                      onChange={(e) => {
                        setCitySelected(e.target.value);
                        callApiDistrict(e.target.value);
                      }}
                    >
                      <option value="">Tỉnh, Thành phố </option>
                      {city.map((item, index) => (
                        <option value={item.code} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="group__item">
                    <span>Quận/Huyện *</span>
                    <select
                      name="district"
                      id="district"
                      onChange={(e) => {
                        setDistrictSelected(e.target.value);
                        callApiWard(e.target.value);
                      }}
                    >
                      {district.map((item, index) => (
                        <option value={item.code} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="group">
                  <div className="group__item">
                    <span>Phường/Xã *</span>
                    <select
                      name="ward"
                      id="ward"
                      onChange={(e) => {
                        setWardSelected(e.target.value);
                      }}
                    >
                      {ward.map((item, index) => (
                        <option value={item.code} key={index}>
                          {item.name}
                        </option>
                      ))}
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
                    defaultChecked
                    value="COD"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </div>
                <div className="checkOutPage__container__content__left__payment__item">
                  <input
                    type="radio"
                    name="payment"
                    value="Banking"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <span>Thanh toán PayPal, Visa, Master, JCB</span>
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
                        <img src={item.product.thumb} alt={item.product.name} />
                      </div>
                      <div className="group">
                        <p>{item.product.name}</p>
                        <span>Số lượng: {item.quantity}</span>
                        <h4>{formatPrice(item.product.price * (1 - item.product.discount))}</h4>
                        <del>{formatPrice(item.product.price)}</del>
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
                {payment === "COD" ? (
                  <button onClick={handleBtnCheckOut}>Xác nhận đặt hàng</button>
                ) : (
                  <PayPalPayment
                    handleCheckOut={handleCheckOut}
                    checkInput={checkInput}
                    amount={parseFloat((calculateTotal() / 23000).toFixed(2))}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
