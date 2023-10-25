import { useState } from "react";

function Header() {
  const [isShow, setIsShow] = useState(false);

  function handleCloseNav() {
    if (isShow) setIsShow(false);
  }

  const [cartItems, setCartItems] = useState([]);

  return (
    <header onClick={handleCloseNav}>
      <div className="logo">BB.</div>
      <div className="category" onClick={() => setIsShow(!isShow)}>
        <i class="fa-solid fa-bars"></i>
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
              <a href="#">Laptop</a>
            </li>
            <li>
              <a href="#">Điện thoại</a>
            </li>
            <li>
              <a href="#">Phụ kiện máy tính</a>
            </li>
            <li>
              <a href="#">PC - Máy tính bộ</a>
            </li>
            <li>
              <a href="#">Đồng hồ thông minh</a>
            </li>
          </ul>
        </nav>
      )}
      <div className="search">
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>
      <div className="login">
        <a href="#">
          <div>
            <i class="fa-solid fa-circle-user"></i>
          </div>
          Đăng nhập
          <br />
          Đăng ký
        </a>
      </div>
      <div className="cart">
        <a href="#">
          <div>
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
          Giỏ hàng của bạn
          <br />({cartItems.length}) sản phẩm
        </a>
      </div>
    </header>
  );
}

export default Header;
