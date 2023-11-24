import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSpin from "./LoadingSpin";
import SearchResult from "./SearchResult";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();

  const [isShowNav, setIsShowNav] = useState(false);
  const [isShowPersonalBoard, setIsShowPersonalBoard] = useState(false);
  const [isShowSearchResult, setIsShowSearchResult] = useState(false);

  const [search, setSearch] = useState("");

  const handleCloseNav = () => {
    if (isShowNav) setIsShowNav(false);
    if (isShowPersonalBoard) setIsShowPersonalBoard(false);
    if (isShowSearchResult) setIsShowSearchResult(false);
  };
  const handleLogOut = async () => {
    await logout();
    navigate("/");
  };

  const { cartQuantity } = useCart();
  const { user, logout, loadingUser } = useAuth();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://shopbb.onrender.com/api/category")
      .then((res) => res.json())
      .then((metadata) => {
        setCategories(metadata.data);
      });
  }, []);

  return (
    <>
      <header onClick={handleCloseNav}>
        <a className="logo" onClick={() => navigate("/")}>
          BB.
        </a>
        <div
          className="category"
          onClick={() => {
            setIsShowNav(!isShowNav);
          }}
        >
          <i className="fa-solid fa-bars"></i>
          <span>Danh mục sản phẩm</span>
        </div>
        {isShowNav && (
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
                  <a
                    onClick={() => {
                      handleCloseNav();
                      navigate(`/${category.slug}`);
                    }}
                  >
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
              setSearch((e.target.value).replace(/\s+/g, ' '));
              setIsShowSearchResult(true);
            }}
          />
          <i
            className="fa-solid fa-magnifying-glass btnSearch"
            onClick={() => navigate(`/search/${search}`)}
          ></i>
          {
            isShowSearchResult && (
              <SearchResult search={search} setIsShow={setIsShowSearchResult}/>
            )
          }
        </div>
        <div className="login">
          {loadingUser ? (
            <LoadingSpin size={8} />
          ) : user ? (
            <a onClick={() => setIsShowPersonalBoard(!isShowPersonalBoard)}>
              <i className="fa-solid fa-circle-user"></i>
              <div>
                Xin chào,
                <br />
                {user.name.split(" ")[0].toUpperCase()}
              </div>
              {isShowPersonalBoard && (
                <ul
                  className="personalBoard"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <li onClick={() => navigate(`/user/${user._id}/order`)}>
                    Đơn hàng của tôi
                  </li>
                  <li onClick={() => navigate(`/user/${user._id}/personal`)}>
                    Thông tin cá nhân
                  </li>
                  <li onClick={handleLogOut}>Đăng xuất</li>
                </ul>
              )}
            </a>
          ) : (
            <a onClick={() => navigate("/login")}>
              <i className="fa-solid fa-circle-user"></i>
              <div>
                Đăng nhập
                <br />
                Đăng ký
              </div>
            </a>
          )}
        </div>
        <div className="cart">
          <a onClick={() => navigate("/cart")}>
            <i className="fa-solid fa-cart-shopping"></i>
            <div>
              Giỏ hàng của bạn
              <br />({cartQuantity}) sản phẩm
            </div>
          </a>
        </div>
      </header>
      {isShowNav && (
        <div className="overlay" onClick={() => setIsShowNav(false)}></div>
      )}
      {isShowPersonalBoard && (
        <div
          className="overlay"
          onClick={() => setIsShowPersonalBoard(false)}
        ></div>
      )}
      {isShowSearchResult && (
        <div
          className="overlay"
          onClick={() => setIsShowSearchResult(false)}
        ></div>
      )}
    </>
  );
}

export default Header;
