import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSpin from "../../components/LoadingSpin";

import { useAuth } from "../../context/AuthContext";

import "../../assets/css/Login.css";

function LoginAdmin() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Đăng nhập | Admin";
  }, []);

  const navigate = useNavigate();

  const { loginAdmin, loadingUser, errorAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(errorAuth);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    if (email !== "" && password !== "") {
      loginAdmin(email, password);
      loadingUser && navigate("/admin");
      setError(errorAuth);
    } else {
      setError("Email hoặc mật khẩu không được để trống");
    }
  };

  return (
    <div className="loginPage">
      <div className="loginPage__content" style={{minHeight: "100vh"}}>
        <div className="loginPage__content__box">
          <h2 className="loginPage__content__box__title">Đăng nhập tài khoản quản trị</h2>
          <form
            onSubmit={handleSubmit}
            className="loginPage__content__box__form"
          >
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
            <div style={{display: "flex", justifyContent: "center"}}>
            {loadingUser && <LoadingSpin size={8} />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
