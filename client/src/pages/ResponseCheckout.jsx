import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../assets/css/Response.css";

export default function ResponseCheckout() {
  const isCheckout = false;
  const isResponse = false;

  const navigate = useNavigate();

  return (
    <div className="responseCheckoutPage">
      <Header />
      <div className="responseCheckoutPage__content">
        {isCheckout ? (
          isResponse ? (
            <h1>
              Đơn hàng của bạn đã được đặt thành công. Chúng tôi sẽ gửi hóa đơn
              qua email cho bạn.
              <br />
              Cảm ơn bạn đã mua hàng tại shop!
            </h1>
          ) : (
            <h1>
              Xin lỗi, đơn hàng của bạn không thể được đặt thành công. Vui lòng
              thử lại sau.
              <br />
              Hoặc liên hệ với chúng tôi qua email:{" "}
              <a href="mailto:bb@cskh.com">bb@cskh.com</a>
            </h1>
          )
        ) : (
          <div className="checkOutPage__container__empty">
            <img
              src="https://shopfront-cdn.tekoapis.com/static/empty_cart.png"
              alt="empty cart"
            />
            <p>Không có đơn hàng nào được thực hiện</p>
            <button onClick={() => navigate("/")}>Quay lại mua sắm</button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
