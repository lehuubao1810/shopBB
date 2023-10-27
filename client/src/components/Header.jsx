import { useState} from "react";
import { useCart } from "../context/CartContext";

function Header() {
  const [isShow, setIsShow] = useState(false);

  function handleCloseNav() {
    if (isShow) setIsShow(false);
  }

  const { cartQuantity } = useCart();

  // const [search, setSearch] = useState("");

  return (
    <header onClick={handleCloseNav}>
      <a href="/" className="logo">
        BB.
      </a>
      <div className="category" onClick={() => setIsShow(!isShow)}>
        <i className="fa-solid fa-bars"></i>
        <span>Danh mục sản phẩm</span>
      </div>
      {isShow && (
        <nav
          className="nav"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ul>
            <li>
              <a href="/laptop">
                <i className="fa-solid fa-laptop"></i>
                Laptop
              </a>
            </li>
            <li>
              <a href="/phone">
                <i className="fa-solid fa-mobile-screen-button"></i>
                Điện thoại
              </a>
            </li>
            <li>
              <a href="/pc">
                <i className="fa-solid fa-computer"></i>
                PC - Máy tính bộ
              </a>
            </li>
            <li>
              <a href="/accessory">
                <i className="fa-regular fa-keyboard"></i>
                PC - Phụ kiện máy tính
              </a>
            </li>
            <li>
              <a href="/monitor">
                <i className="fa-solid fa-desktop"></i>
                PC - Màn hình máy tính
              </a>
            </li>
            <li>
              <a href="/sound">
                <i className="fa-solid fa-headphones"></i>
                Thiết bị âm thanh
              </a>
            </li>
            <li>
              <a href="/office-equipment">
                <i className="fa-solid fa-print"></i>
                Thiết bị văn phòng
              </a>
            </li>
          </ul>
        </nav>
      )}
      <div className="search">
        <input
          type="text"
          placeholder="Nhập sản phẩm cần tìm"
          // onChange={(e) => {
          //   setSearch(e.target.value);
          // }}
        />
        <i className="fa-solid fa-magnifying-glass btnSearch"></i>
      </div>
      <div className="login">
        <a href="/login">
          <i className="fa-solid fa-circle-user"></i>
          <div>
            Đăng nhập
            <br />
            Đăng ký
          </div>
        </a>
      </div>
      <div className="cart">
        <a href="/cart">
          <i className="fa-solid fa-cart-shopping"></i>
          <div>
            Giỏ hàng của bạn
            <br />({cartQuantity}) sản phẩm
          </div>
        </a>
      </div>
    </header>
  );
}

export default Header;
