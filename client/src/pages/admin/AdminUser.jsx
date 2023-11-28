import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

import SideBar from "../../components/admin/SideBar";
import Modal from "../../components/admin/Modal";

import { host } from "../../context/host";

import "../../assets/css/admin/AdminUser.css";

export default function AdminUser() {
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");

  
  const accessToken = Cookies.get("access-token");
  const userId = Cookies.get("user-id");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Quản lý danh mục sản phẩm | Admin";

    fetch(`${host.dev}/api/access/shop/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "user-id": userId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.metadata.shop);
        setUserName(data.metadata.shop.name);
        setUserEmail(data.metadata.shop.email);
        setUserPhone(data.metadata.shop.phone);
        setUserAddress(data.metadata.shop.address);
      });
  }, [id, accessToken, userId]);

  const handleDeleteUser = () => {
    // fetch(`${host.dev}/api/User/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "access-token": accessToken,
    //     "user-id": userId,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.success) {
    //       setIsShowDeleteModal(false);
    //       window.location.href = "/admin/categories";
    //     }
    //   });
  };

  const handleEditUser = () => {
    // fetch(`${host.dev}/api/User/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "access-token": accessToken,
    //     "user-id": userId,
    //   },
    //   body: JSON.stringify({
    //     name: UserName,
    //     slug: UserSlug,
    //     thumb: UserThumb,
    //     attributes: UserAttributes,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.success) {
    //       setIsShowEditModal(false);
    //       window.location.reload();
    //     }
    //   });
  };

  return (
    <div className="adminUserPage">
      <SideBar />
      <div className="adminUserPage__content">
        <div className="adminUserPage__content__header">
          {!isEdit ? (
            <>
              <div
                className="adminUserPage__content__header__item"
                onClick={() => setIsShowDeleteModal(true)}
              >
                Xóa người dùng
              </div>

              <div
                className="adminUserPage__content__header__item"
                onClick={() => setIsEdit(true)}
              >
                Sửa thông tin
              </div>
            </>
          ) : (
            <>
              <div
                className="adminUserPage__content__header__item"
                onClick={() => setIsEdit(false)}
              >
                Hủy
              </div>

              <div
                className="adminUserPage__content__header__item"
                onClick={() => setIsShowEditModal(true)}
              >
                Lưu
              </div>
            </>
          )}
        </div>
        <div className="adminUserPage__content__body">
          <div className="adminUserPage__content__body__info">
            <div className="adminUserPage__content__body__info__item">
              <span>Ngày tạo</span>
              <input type="text" value={user.createdAt} disabled />
            </div>
            <div className="adminUserPage__content__body__info__item">
              <span>Ngày cập nhật</span>
              <input type="text" value={user.updatedAt} disabled />
            </div>
            <div className="adminUserPage__content__body__info__item">
              <span>Tên khách hàng</span>
              <input
                type="text"
                value={userName}
                disabled={!isEdit}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="adminUserPage__content__body__info__item">
              <span>Email</span>
              <input
                type="email"
                value={userEmail}
                disabled={!isEdit}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div className="adminUserPage__content__body__info__item">
              <span>Số điện thoại</span>
              <input
                type="text"
                value={userPhone}
                disabled={!isEdit}
                onChange={(e) => setUserPhone(e.target.value)}
              />
            </div>
            <div className="adminUserPage__content__body__info__item">
              <span>Địa chỉ</span>
              <div className="adminUserPage__content__body__info__item__attributes">
                <input
                  type="text"
                  value={userAddress}
                  disabled={!isEdit}
                  onChange={(e) => setUserAddress(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        {isShowDeleteModal && (
          <Modal
            title="Bạn có chắc muốn xóa danh mục này?"
            handleCloseModal={() => setIsShowDeleteModal(false)}
            handle={handleDeleteUser}
          />
        )}
        {isShowEditModal && (
          <Modal
            title="Bạn có chắc muốn sửa danh mục này?"
            handleCloseModal={() => setIsShowEditModal(false)}
            handle={handleEditUser}
          />
        )}
        {isShowDeleteModal && <div className="overlay"></div>}
      </div>
    </div>
  );
}
