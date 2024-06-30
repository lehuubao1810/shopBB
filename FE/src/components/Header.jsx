import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSpin from "./LoadingSpin";
import SearchResult from "./SearchResult";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import { host } from "../context/host";

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
    fetch(`${host.dev}/api/category`)
      .then((res) => res.json())
      .then((metadata) => {
        setCategories(metadata.data);
      });
  }, []);

  return (
    <>
      <header onClick={handleCloseNav}>
        <div className="header">
          <div className="logo" onClick={() => navigate("/")}>
            BB.
          </div>
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
                  <li
                    key={category._id}
                    onClick={() => {
                      handleCloseNav();
                      navigate(`/${category.slug}`);
                    }}
                  >
                    <i className={`${category.thumb}`}></i>
                    {category.name}
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <form className="search searchPC">
            <input
              type="text"
              placeholder="Nhập danh mục cần tìm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.replace(/\s+/g, " "));
                setIsShowSearchResult(true);
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/search/${search}`);
                setIsShowSearchResult(false);
              }}
              className="btnSearch"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            {isShowSearchResult && (
              <SearchResult search={search} setIsShow={setIsShowSearchResult} />
            )}
          </form>

          <div className="login">
            {loadingUser ? (
              <LoadingSpin size={8} />
            ) : user ? (
              <div className="personalBoard__btn" onClick={() => setIsShowPersonalBoard(!isShowPersonalBoard)}>
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
                    <li
                      onClick={() => {
                        handleLogOut();
                        setIsShowPersonalBoard(false);
                      }}
                    >
                      Đăng xuất
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div className="login__btn" onClick={() => navigate("/login")}>
                <i className="fa-solid fa-circle-user"></i>
                <div>
                  Đăng nhập
                  <br />
                  Đăng ký
                </div>
              </div>
            )}
          </div>
          <div className="cart">
            <div className="cart__btn" onClick={() => navigate("/cart")}>
              <i className="fa-solid fa-cart-shopping"></i>
              <span>{cartQuantity}</span>
              <div className="cart__quantity">
                Giỏ hàng của bạn
                <br />({cartQuantity}) sản phẩm
              </div>
            </div>
          </div>
        </div>
        <form className="search searchMobile">
          <input
            type="text"
            placeholder="Nhập danh mục cần tìm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value.replace(/\s+/g, " "));
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(`/search/${search}`);
            }}
            className="btnSearch"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          {isShowSearchResult && (
            <SearchResult search={search} setIsShow={setIsShowSearchResult} />
          )}
        </form>
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
