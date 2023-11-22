import { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("access-token");
    const userId = Cookies.get("user-id");
    if (accessToken && userId) {
      fetch(`http://localhost:5000/api/access/shop/`, {
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
          "user-id": userId,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.metadata.shop);
            setError(null);
          } else {
            setError(data.error);
          }
        });
    }
  }, []);

  const login = (email, password) => {
    setLoadingUser(true);
    try {
      fetch("http://localhost:5000/api/access/shop/login?role=Customer", {
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
            setError(null);
          } else {
            setError(data.error);
            setLoadingUser(false);
            alert("Đăng nhập không thành công. Vui lòng thử lại!");
          }
        });
    } catch (error) {
      setError(error.message);
      setLoadingUser(false);
      alert("Đăng nhập không thành công. Vui lòng thử lại!");
    }
  };

  const logout = () => {
    const accessToken = Cookies.get("access-token");
    const userId = Cookies.get("user-id");
    try {
      fetch("http://localhost:5000/api/access/shop/logout", {
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
            setError(null);
            console.log("logout success");
          } else {
            alert("Đăng xuất không thành công. Vui lòng thử lại!");
            setError(data.error);
          }
        });
    } catch (error) {
      setError(error.message);
      alert("Đăng xuất không thành công. Vui lòng thử lại!");
    }
  };

  const register = (name, email, password) => {
    try {
      fetch("http://localhost:5000/api/access/shop/signup?role=Customer", {
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
            setError(null);
            alert("Đăng ký tài khoản thành công!");
          } else {
            alert("Đăng ký tài khoản không thành công. Vui lòng thử lại!");
            setError(data.error);
          }
        });
    } catch (error) {
      setError(error.message);
      alert("Đăng ký tài khoản không thành công. Vui lòng thử lại!");
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout, register, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
