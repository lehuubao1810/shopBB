// import { useParams } from "react-router-dom";
import { useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useAuth } from "../context/AuthContext";

import "../assets/css/PersonalPage.css";

export default function PersonalPage() {
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = `Thông tin cá nhân | Shop BB`;
  }, []);

  return (
    <div className="personalPage">
      <Header />
      <div className="personalPage__content">
        <div className="personalPage__content__info">
          <h2>Thông tin cá nhân</h2>
          <div className="personalPage__content__info__item">
            <h3>Họ và tên: {user?.name}</h3>
          </div>
          <div className="personalPage__content__info__item">
            <h3>Email: {user?.email}</h3>
          </div>
          <div className="personalPage__content__info__item">
            <h3>Số điện thoại: {user?.phone || "Khong co"}</h3>
          </div>
          {/* <div className="personalPage__content__info__item">
            <h3>Địa chỉ: {user?.address || "Khong co"}</h3>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
