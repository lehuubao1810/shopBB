// import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import notify from "../utils/notify";

import { useAuth } from "../context/AuthContext";

import "../assets/css/PersonalPage.css";

export default function PersonalPage() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address);

  // user.address
  // ex:  ABC , Xã Công Bằng, Huyện Pác Nặm, Tỉnh Bắc Kạn
  const addressUser = useMemo(() => {
    return address ? address.split(",") : [];
  }, [address]);

  const cityDisplay = useMemo(() => {
    return address
      ? { name: `${addressUser[3].trim()}` }
      : { name: "Tỉnh, Thành phố" };
  }, [address, addressUser]);
  console.log(cityDisplay);

  const [city, setCity] = useState([]);
  const [citySelected, setCitySelected] = useState("");
  const [district, setDistrict] = useState(
    address ? [{ name: `${addressUser[2].trim()}` }] : [{ name: "Quận, Huyện" }]
  );
  const [districtSelected, setDistrictSelected] = useState("");
  const [ward, setWard] = useState(
    address ? [{ name: `${addressUser[1].trim()}` }] : [{ name: "Phường, Xã" }]
  );
  const [wardSelected, setWardSelected] = useState("");
  const [addressDetail, setAddressDetail] = useState(
    address ? `${addressUser[0].replace(/\s+/g, ' ')}` : ""
  );
  console.log(city, district, ward, addressDetail);

  const [disabledEdit, setDisabledEdit] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isChangeAddress, setIsChangeAddress] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = `Thông tin cá nhân | Shop BB`;
    fetch("https://provinces.open-api.vn/api/")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCity([cityDisplay, ...data]);
      })
      .catch((err) => console.log(err));
  }, [cityDisplay]);
  const callApiDistrict = (provinceId) => {
    fetch(`https://provinces.open-api.vn/api/p/${provinceId}?depth=2`)
      .then((res) => res.json())
      .then((data) => setDistrict(data.districts))
      .catch((err) => console.log(err));
  };
  const callApiWard = (districtId) => {
    fetch(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`)
      .then((res) => res.json())
      .then((data) => setWard(data.wards))
      .catch((err) => console.log(err));
  };

  const accessToken = Cookies.get("access-token");
  const userId = Cookies.get("user-id");
  const handleUpdateInfo = () => {
    console.log({
      name,
      phone,
      address: `${addressDetail.replace(/\s+/g, ' ')}, ${
        isChangeAddress
          ? `${ward.find((item) => item.code == wardSelected).name}, ${
              district.find((item) => item.code == districtSelected).name
            }, ${city.find((item) => item.code == citySelected).name}`
          : `${addressUser[1].trim()}, ${addressUser[2].trim()}, ${addressUser[3].trim()}`
      }`,
    });
    fetch("https://shopbb.onrender.com/api/shop/update-info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "user-id": userId,
      },
      body: JSON.stringify({
        name,
        phone,
        address: `${addressDetail}, ${
          isChangeAddress
            ? `${ward.find((item) => item.code == wardSelected).name}, ${
                district.find((item) => item.code == districtSelected).name
              }, ${city.find((item) => item.code == citySelected).name}`
            : `${addressUser[1].trim()}, ${addressUser[2].trim()}, ${addressUser[3].trim()}`
        }`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          notify("success", "Cập nhật thông tin thành công!");
          window.location.reload();
        } else {
          notify("error", "Cập nhật thông tin thất bại! Vui lòng thử lại!");
        }
      })
      .catch((err) => {
        console.log(err);
        notify("error", "Cập nhật thông tin thất bại! Vui lòng thử lại!");
      });
  };

  return (
    <div className="personalPage">
      <ToastContainer />
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
          <div className="personalPage__content__info__item">
            <h4>Địa chỉ:</h4>
            <select
              name="city"
              id="city"
              onChange={(e) => {
                setCitySelected(e.target.value);
                callApiDistrict(e.target.value);
                setIsChangeAddress(true);
              }}
              disabled={disabledEdit}
            >
              {city.map((item, index) => (
                <option value={item.code} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              name="district"
              id="district"
              onChange={(e) => {
                setDistrictSelected(e.target.value);
                callApiWard(e.target.value);
              }}
              disabled={disabledEdit}
            >
              {district.map((item, index) => (
                <option value={item.code} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              name="ward"
              id="ward"
              onChange={(e) => {
                setWardSelected(e.target.value);
              }}
              disabled={disabledEdit}
            >
              {ward.map((item, index) => (
                <option value={item.code} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={addressDetail}
              disabled={disabledEdit}
              onChange={(e) => {
                setAddressDetail(e.target.value);
              }}
              className="personalPage__content__info__item__addressDetail"
            />
          </div>
          {!disabledEdit && (
            <div className="personalPage__content__info__footer">
              <button
                className="personalPage__content__info__btn cancel"
                onClick={() => {
                  setDisabledEdit(!disabledEdit);
                  setName(user?.name);
                  setEmail(user?.email);
                  setPhone(user?.phone);
                  setAddress(user?.address);
                }}
              >
                Hủy
              </button>
              <button
                className="personalPage__content__info__btn done"
                onClick={() => {
                  setIsShowModal(true);
                }}
              >
                Lưu
              </button>
            </div>
          )}
        </div>
      </div>
      {isShowModal && (
        <div className="confirmModal" onClick={() => setIsShowModal(false)}>
          <div
            className="confirmModal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Bạn có chắc muốn sửa đổi thông tin?</h4>
            <div className="confirmModal__content__buttons">
              <button onClick={() => setIsShowModal(false)}>Không</button>
              <button
                onClick={() => {
                  handleUpdateInfo();
                  setIsShowModal(false);
                  setDisabledEdit(!disabledEdit);
                }}
              >
                Có
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
