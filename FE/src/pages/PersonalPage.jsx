// import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import notify from "../utils/notify";

import { useAuth } from "../context/AuthContext";
import { host } from "../context/host";

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
      ? { province_name: `${addressUser[3].trim()}` }
      : { province_name: "Tỉnh, Thành phố" };
  }, [address, addressUser]);
  console.log(cityDisplay);

  const [city, setCity] = useState([]);
  const [citySelected, setCitySelected] = useState("");
  const [district, setDistrict] = useState(
    address
      ? [{ district_name: `${addressUser[2].trim()}` }]
      : [{ district_name: "Quận, Huyện" }]
  );
  const [districtSelected, setDistrictSelected] = useState("");
  const [ward, setWard] = useState(
    address
      ? [{ ward_name: `${addressUser[1].trim()}` }]
      : [{ ward_name: "Phường, Xã" }]
  );
  const [wardSelected, setWardSelected] = useState("");
  const [addressDetail, setAddressDetail] = useState(
    address ? `${addressUser[0].replace(/\s+/g, " ")}` : ""
  );
  console.log(city, district, ward, addressDetail);

  const [disabledEdit, setDisabledEdit] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isChangeAddress, setIsChangeAddress] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = `Thông tin cá nhân | Shop BB`;
    fetch("https://vapi.vnappmob.com/api/province/")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const provinceData = data.results.map((item) => {
          return {
            code: item.province_id,
            province_name: item.province_name,
          };
        });

        setCity([cityDisplay, ...provinceData]);
        console.log([cityDisplay, ...provinceData]);
      })
      .catch((err) => console.log(err));
  }, [cityDisplay]);
  const callApiDistrict = (provinceId) => {
    fetch(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
      .then((res) => res.json())
      .then((data) => {
        const districtData = data.results.map((item) => {
          return {
            code: item.district_id,
            district_name: item.district_name,
          };
        });
        setDistrict(districtData);
      })
      .catch((err) => console.log(err));
  };
  const callApiWard = (districtId) => {
    fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
      .then((res) => res.json())
      .then((data) => {
        const wardData = data.results.map((item) => {
          return {
            code: item.ward_id,
            ward_name: item.ward_name,
          };
        });
        setWard(wardData);
      })
      .catch((err) => console.log(err));
  };

  const accessToken = Cookies.get("access-token");
  const userId = Cookies.get("user-id");
  const handleUpdateInfo = () => {
    console.log({
      name,
      phone,
      address: `${addressDetail.replace(/\s+/g, " ")}, ${
        isChangeAddress
          ? `${ward.find((item) => item.code == wardSelected).ward_name}, ${
              district.find((item) => item.code == districtSelected)
                .district_name
            }, ${city.find((item) => item.code == citySelected).province_name}`
          : `${addressUser[1].trim()}, ${addressUser[2].trim()}, ${addressUser[3].trim()}`
      }`,
    });
    fetch(`${host.dev}/api/shop/update-info`, {
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
            ? `${ward.find((item) => item.code == wardSelected).ward_name}, ${
                district.find((item) => item.code == districtSelected)
                  .district_name
              }, ${
                city.find((item) => item.code == citySelected).province_name
              }`
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
                  {item.province_name}
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
                  {item.district_name}
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
                  {item.ward_name}
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
