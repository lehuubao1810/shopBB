import { useState } from "react";

function Header() {
  const [isShow, setIsShow] = useState(false);

  function handleCloseNav() {
    if (isShow) setIsShow(false);
  }

  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");

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
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ul>
            <li>
              <a href="#">
                <i className="fa-solid fa-laptop"></i>
                Laptop
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-mobile-screen-button"></i>
                Điện thoại
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-computer"></i>
                PC - Máy tính bộ
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-regular fa-keyboard"></i>
                PC - Phụ kiện máy tính
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-desktop"></i>
                PC - Màn hình máy tính
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-headphones"></i>
                Thiết bị âm thanh
              </a>
            </li>
            <li>
              <a href="#">
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
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <i className="fa-solid fa-magnifying-glass btnSearch"></i>
      </div>
      <div className="login">
        <a href="#">
          <i className="fa-solid fa-circle-user"></i>
          <div>
            Đăng nhập
            <br />
            Đăng ký
          </div>
        </a>
      </div>
      <div className="cart">
        <a href="#">
          <i className="fa-solid fa-cart-shopping"></i>
          <div>
            Giỏ hàng của bạn
            <br />({cartItems.length}) sản phẩm
          </div>
        </a>
      </div>
    </header>
  );
}

export default Header;
