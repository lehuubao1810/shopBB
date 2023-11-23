import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useAuth } from "../context/AuthContext";

import "../assets/css/Login.css";

function Login() {
  useEffect(() => {
    document.title = "Đăng nhập | Shop BB";
  }, []);

  const navigate = useNavigate();

  const { login, loadingUser, errorAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(errorAuth);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    if (email !== "" && password !== "") {
      login(email, password);
      loadingUser && navigate("/");
      setError(errorAuth);
    } else {
      setError("Email hoặc mật khẩu không được để trống");
    }
  };

  const handleRegister = () => {
    // Handle register logic here
    navigate("/register");
    console.log("Redirecting to register page...");
  };

  return (
    <div className="loginPage">
      <Header />
      <div className="loginPage__content">
        <div className="loginPage__content__box">
          <h2 className="loginPage__content__box__title">Đăng nhập</h2>
          <form onSubmit={handleSubmit} className="loginPage__content__box__form">
            <label>
              <p>Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              <p>Mật khẩu</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit">Đăng nhập</button>
            {error && <span className="form__error">{error}</span>}
          </form>
          
          <p className="loginPage__content__box__register">
            Bạn chưa có tài khoản? {" "} <span onClick={handleRegister}>Đăng ký</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
