import { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

import { host } from "./host";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null); // [1]
  const [errorAuth, setErrorAuth] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("access-token");
    const userId = Cookies.get("user-id");
    if (accessToken && userId) {
      setLoadingUser(true);
      fetch(`${host.dev}/api/access/shop/`, {
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
          "user-id": userId,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            if (data.metadata.shop.role === "Customer") {
              setUser(data.metadata.shop);
              setAdmin(null);
            }
            else if (data.metadata.shop.role === "Seller") {
              setAdmin(data.metadata.shop);
              setUser(null);
            }
            setErrorAuth(null);
            setLoadingUser(false);
          } else {
            // setErrorAuth("Email hoặc mật khẩu không chính xác");
            setLoadingUser(false);
          }
        })
        .catch((error) => {
          // setErrorAuth("Email hoặc mật khẩu không chính xác");
          console.log(error);
          setLoadingUser(false);
        });
    }
  }, []);

  const login = (email, password) => {
    setLoadingUser(true);
    try {
      fetch(`${host.dev}/api/access/shop/login?role=Customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            Cookies.set("access-token", data.metadata.tokenPair.accessToken, {
              expires: 1,
            });
            Cookies.set("user-id", data.metadata.shop._id, { expires: 1 });
            setUser(data.metadata.shop);
            setLoadingUser(false);
            // alert("Đăng nhập thành công!");
            setErrorAuth(null);
            if (localStorage.getItem("order")) {
              localStorage.setItem("order", JSON.stringify([]));
            }
          } else {
            // setErrorAuth(data.error);
            setErrorAuth("Email hoặc mật khẩu không chính xác");
            setLoadingUser(false);
          }
        });
    } catch (error) {
      // setErrorAuth(error.message);
      setErrorAuth("Email hoặc mật khẩu không chính xác");
      setLoadingUser(false);
    }
  };

  const loginAdmin = (email, password) => {
    setLoadingUser(true);
    // if (user) {
    //   logout();
    // }
    try {
      fetch(`${host.dev}/api/access/shop/login?role=Seller`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            Cookies.set("access-token", data.metadata.tokenPair.accessToken, {
              expires: 1,
            });
            Cookies.set("user-id", data.metadata.shop._id, { expires: 1 });
            setAdmin(data.metadata.shop);
            setLoadingUser(false);
            // alert("Đăng nhập thành công!");
            setErrorAuth(null);
            if (localStorage.getItem("order")) {
              localStorage.setItem("order", JSON.stringify([]));
            }
          } else {
            // setErrorAuth(data.error);
            setErrorAuth("Email hoặc mật khẩu không chính xác");
            setLoadingUser(false);
          }
        });
    } catch (error) {
      // setErrorAuth(error.message);
      setErrorAuth("Email hoặc mật khẩu không chính xác");
      setLoadingUser(false);
    }
  };


  const logout = () => {
    const accessToken = Cookies.get("access-token");
    const userId = Cookies.get("user-id");
    setLoadingUser(true);
    try {
      fetch(`${host.dev}/api/access/shop/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
          "user-id": userId,
        },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            Cookies.remove("access-token");
            Cookies.remove("user-id");
            setUser(null);
            setErrorAuth(null);
            console.log("logout success");
            if (localStorage.getItem("order")) {
              localStorage.setItem("order", JSON.stringify([]));
            }
            setLoadingUser(false);
          } else {
            alert("Đăng xuất không thành công. Vui lòng thử lại!");
            setErrorAuth(data.error);
            setLoadingUser(false);
          }
        });
    } catch (error) {
      setErrorAuth(error.message);
      alert("Đăng xuất không thành công. Vui lòng thử lại!");
      setLoadingUser(false);
    }
  };

  const register = (name, email, password) => {
    setLoadingUser(true);
    try {
      fetch(`${host.dev}/api/access/shop/signup?role=Customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            Cookies.set("access-token", data.metadata.tokenPair.accessToken, {
              expires: 1,
            });
            Cookies.set("user-id", data.metadata.shop._id, { expires: 1 });
            setUser(data.metadata.shop);
            setLoadingUser(false);
            setErrorAuth(null);
            if (localStorage.getItem("order")) {
              localStorage.setItem("order", JSON.stringify([]));
            }
          } else {
            alert("Đăng ký tài khoản không thành công. Vui lòng thử lại!");
            setLoadingUser(false);
            setErrorAuth(data.error);
          }
        });
    } catch (error) {
      setErrorAuth(error.message);
      setLoadingUser(false);
      alert("Đăng ký tài khoản không thành công. Vui lòng thử lại!");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, errorAuth, login, logout, register, loadingUser, admin, loginAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
