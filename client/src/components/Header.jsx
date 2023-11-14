import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

function Header() {

  const navigate = useNavigate();

  const [isShow, setIsShow] = useState(false);
  const [search, setSearch] = useState("");

  function handleCloseNav() {
    if (isShow) setIsShow(false);
  }

  const { cartQuantity } = useCart();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/category")
      .then((res) => res.json())
      .then((metadata) => {
        setCategories(metadata.data);
      });
  }, []);

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
            {/* <li>
              <a href="/laptop">
                <i className="fa-solid fa-laptop"></i>
                Laptop
              </a>
            </li> */}
            {categories.map((category) => (
              <li key={category._id}>
                <a href={`/${category.slug}`}>
                  <i className={`${category.thumb}`}></i>
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className="search">
        <input
          type="text"
          placeholder="Nhập sản phẩm cần tìm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <i className="fa-solid fa-magnifying-glass btnSearch" onClick={
          () => navigate(`/search/${search}`)
        }></i>
      </div>
      {/* <div className="login">
        <a href="/login">
          <i className="fa-solid fa-circle-user"></i>
          <div>
            Đăng nhập
            <br />
            Đăng ký
          </div>
        </a>
      </div> */}
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
