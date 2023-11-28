// import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();

  return (
    <div className="sideBar">
      <div className="sideBar__logo">BB.</div>
      <nav className="sideBar__nav">
        <ul>
          <li onClick={() => navigate("/admin")}>
            <i className="fa-solid fa-chart-pie"></i>
            Tổng quan
          </li>
          <li onClick={() => navigate("/admin/categories")}>
            <i className="fa-solid fa-list"></i>
            Danh mục
          </li>
          <li onClick={() => navigate("/admin/products")}>
            <i className="fa-solid fa-box"></i>
            Sản phẩm
          </li>
          <li onClick={() => navigate("/admin/orders")}>
            <i className="fa-solid fa-cart-flatbed"></i>
            Đơn hàng
          </li>
          <li onClick={() => navigate("/admin/users")}>
            <i className="fa-solid fa-users"></i>
            Khách hàng
          </li>
        </ul>
      </nav>
      <div className="sideBar__footer">
        {/* <div className="sideBar__footer__item">
          <i className="fa-solid fa-cog"></i>
          Cài đặt
        </div> */}
        <div className="sideBar__footer__logout">
          <i className="fa-solid fa-sign-out"></i>
          Đăng xuất
        </div>
      </div>
    </div>
  );
}
