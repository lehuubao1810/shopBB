import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import success from "../assets/images/responsePage/success.png";
import fail from "../assets/images/responsePage/fail.png";

import "../assets/css/Response.css";

export default function ResponseCheckout() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const isCheckout = searchParams.get("isCheckout") === "true";
  const isResponse = searchParams.get("status") === "success";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="responseCheckoutPage">
      <Header />
      <div className="responseCheckoutPage__content">
        {isCheckout ? (
          isResponse ? (
            <div className="checkOutPage__container__empty">
            <img
              src={success}
              alt="empty cart"
            />
            Đơn hàng của bạn đã được đặt thành công. Chúng tôi sẽ gửi hóa đơn
              qua email cho bạn.
              <br />
              Cảm ơn bạn đã mua hàng tại shop!
            <button onClick={() => navigate("/")}>Tiếp tục mua sắm</button>
          </div>
          ) : (
            <div className="checkOutPage__container__empty">
            <img
              src={fail}
              alt="empty cart"
            />
            Xin lỗi, đơn hàng của bạn không thể được đặt thành công. Vui lòng
              thử lại sau.
              <br />
              Hoặc liên hệ với chúng tôi qua email:{" "}
              <a href="mailto:bb@cskh.com">bb@cskh.com</a>
            <button onClick={() => navigate("/")}>Quay lại mua sắm</button>
          </div>
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
