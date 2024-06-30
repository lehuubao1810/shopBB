import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useAuth } from "../context/AuthContext";

import "../assets/css/register.css";

export default function Register() {
  const { register, loadingUser } = useAuth();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "Đăng ký | Shop BB";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate inputs
    if (name === "") {
      setNameError("Vui lòng nhập họ và tên");
      return;
    } else {
      setNameError("");
    }
    if (password === "") {
      setPasswordError("Vui lòng nhập mật khẩu");
      return;
    } else if (password.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    } else if (password.length > 30) {
      setPasswordError("Mật khẩu không được quá 30 ký tự");
      return;
    } else {
      setPasswordError("");
    }
    if (confirmPassword === "") {
      setConfirmPasswordError("Vui lòng nhập lại mật khẩu");
      return;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Mật khẩu không khớp");
      return;
    } else {
      setConfirmPasswordError("");
    }
    if (email === "") {
      setEmailError("Vui lòng nhập email");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email không hợp lệ");
      return;
    } else {
      setEmailError("");
    }
    register(name, email, password);
    loadingUser && navigate("/");
  };

  return (
    <div className="registerPage">
      <Header />
      <div className="registerPage__content">
        <div className="registerPage__content__box">
          <h2 className="registerPage__content__box__title">Đăng ký</h2>
          <form onSubmit={handleSubmit} className="registerPage__content__box__form">
            <div>
              <label>
                <p>Email</p>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              {emailError && <span className="form__error">{emailError}</span>}
            </div>
            <div>
              <label>
                <p>Họ và tên</p>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              {nameError && <span className="form__error">{nameError}</span>}
            </div>
            <div>
              <label>
                <p>Mật khẩu</p>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              {passwordError && <span className="form__error">{passwordError}</span>}
            </div>
            <div>
              <label>
                <p>Nhập lại mật khẩu</p>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              {confirmPasswordError && (
                <span className="form__error">{confirmPasswordError}</span>
              )}
            </div>
            <button type="submit">Đăng ký</button>
          </form>
          <div className="registerPage__content__box__login">
            <p>
              Bạn đã có tài khoản ?{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
              >
                Đăng nhập
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
