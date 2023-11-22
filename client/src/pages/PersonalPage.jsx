// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useAuth } from "../context/AuthContext";

import "../assets/css/PersonalPage.css";

export default function PersonalPage() {
  const { user } = useAuth();

  const [disabledEdit, setDisabledEdit] = useState(true);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  // const [address, setAddress] = useState(user?.address);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = `Thông tin cá nhân | Shop BB`;
  }, []);

  const handleUpdateInfo = () => {};

  return (
    <div className="personalPage">
      <Header />
      <div className="personalPage__content">
        <div className="personalPage__content__info">
          <div className="personalPage__content__info__header">
            <h3>Thông tin cá nhân</h3>
            <button
              className="personalPage__content__info__btn"
              onClick={() => {
                setDisabledEdit(!disabledEdit);
              }}
            >
              Chỉnh sửa
            </button>
          </div>
          <div className="personalPage__content__info__item">
            <h4>Họ và tên:</h4>
            <input
              type="text"
              value={name}
              disabled={disabledEdit}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="personalPage__content__info__item">
            <h4>Email:</h4>
            <input
              type="text"
              value={email}
              disabled
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="personalPage__content__info__item">
            <h4>Số điện thoại:</h4>
            <input
              type="text"
              value={phone}
              disabled={disabledEdit}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          {/* <div className="personalPage__content__info__item">
            <h4>Địa chỉ:</h4>
            <input type="text" value={address} disabled={disabledEdit} 
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div> */}
          {!disabledEdit && (
            <div className="personalPage__content__info__footer">
              <button className="personalPage__content__info__btn cancel"
                onClick={() => {
                  setDisabledEdit(!disabledEdit);
                  setName(user?.name);
                  setEmail(user?.email);
                  setPhone(user?.phone);
                  // setAddress(user?.address);
                }}
              >
                Hủy
              </button>
              <button className="personalPage__content__info__btn done"
                onClick={() => {
                  setDisabledEdit(!disabledEdit);
                  handleUpdateInfo();
                }}
              >
                Lưu
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
