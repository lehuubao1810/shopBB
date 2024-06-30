import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

import SideBar from "../../components/admin/SideBar";
import Modal from "../../components/admin/Modal";
import CategoryAttributes from "../../components/admin/CategoryAttributes";

import { host } from "../../context/host";

import "../../assets/css/admin/AdminCategory.css";

export default function AdminCategory() {
  const { id } = useParams();

  const [category, setCategory] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryThumb, setCategoryThumb] = useState("");
  const [categoryAttributes, setCategoryAttributes] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Quản lý danh mục sản phẩm | Admin";

    fetch(`${host.dev}/api/category/${id}`)
      .then((res) => res.json())
      .then((metadata) => {
        setCategory(metadata.data); // set category
        setCategoryName(metadata.data.name);
        setCategorySlug(metadata.data.slug);
        setCategoryThumb(metadata.data.thumb);
        setCategoryAttributes(metadata.data.attributes);
      });
  }, [id]);

  const accessToken = Cookies.get("access-token");
  const userId = Cookies.get("user-id");

  const handleDeleteCategory = () => {
    fetch(`${host.dev}/api/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "user-id": userId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsShowDeleteModal(false);
          window.location.href = "/admin/categories";
        }
      });
  };

  const handleEditCategory = () => {
    fetch(`${host.dev}/api/category/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "user-id": userId,
      },
      body: JSON.stringify({
        name: categoryName,
        slug: categorySlug,
        thumb: categoryThumb,
        attributes: categoryAttributes,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsShowEditModal(false);
          window.location.reload();
        }
      });
  };

  return (
    <div className="adminCategoryPage">
      <SideBar />
      <div className="adminCategoryPage__content">
        <div className="adminCategoryPage__content__header">
          {!isEdit ? (
            <>
              <div
                className="adminCategoryPage__content__header__item"
                onClick={() => setIsShowDeleteModal(true)}
              >
                Xóa danh mục
              </div>

              <div
                className="adminCategoryPage__content__header__item"
                onClick={() => setIsEdit(true)}
              >
                Sửa danh mục
              </div>
            </>
          ) : (
            <>
              <div
                className="adminCategoryPage__content__header__item"
                onClick={() => {
                  setIsEdit(false);
                  setCategoryName(category.name);
                  setCategorySlug(category.slug);
                  setCategoryThumb(category.thumb);
                  setCategoryAttributes(category.attributes);
                }}
              >
                Hủy
              </div>

              <div
                className="adminCategoryPage__content__header__item"
                onClick={() => setIsShowEditModal(true)}
              >
                Lưu
              </div>
            </>
          )}
        </div>
        <div className="adminCategoryPage__content__body">
          <div className="adminCategoryPage__content__body__info">
            <div className="adminCategoryPage__content__body__info__item">
              <p>
                Ngày tạo:{" "}
                {new Date(category.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div className="adminCategoryPage__content__body__info__item">
              <p>
                Ngày cập nhật:{" "}
                {new Date(category.updatedAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div className="adminCategoryPage__content__body__info__item">
              <p>Tên danh mục</p>
              <input
                type="text"
                value={categoryName}
                disabled={!isEdit}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="adminCategoryPage__content__body__info__item">
              <p>Slug</p>
              <input
                type="text"
                value={categorySlug}
                disabled={!isEdit}
                onChange={(e) => setCategorySlug(e.target.value)}
              />
            </div>

            <div className="adminCategoryPage__content__body__info__item">
              <p>
                Icon danh mục: <i className={categoryThumb}></i> <a href="https://fontawesome.com/search?o=r&m=free" target="_blank" rel="noreferrer">Danh sách icon</a>
              </p>
              <input
                type="text"
                value={categoryThumb}
                disabled={!isEdit}
                onChange={(e) => setCategoryThumb(e.target.value)}
              />
            </div>
            <div className="adminCategoryPage__content__body__info__item">
              <p>Thuộc tính danh mục</p>
              <div className="adminCategoryPage__content__body__info__item__attributes">
                <CategoryAttributes
                  categoryAttributes={categoryAttributes}
                  setCategoryAttributes={setCategoryAttributes}
                  isEdit={isEdit}
                />
              </div>
            </div>
          </div>
        </div>
        {isShowDeleteModal && (
          <Modal
            title="Bạn có chắc muốn xóa danh mục này?"
            handleCloseModal={() => setIsShowDeleteModal(false)}
            handle={handleDeleteCategory}
          />
        )}
        {isShowEditModal && (
          <Modal
            title="Bạn có chắc muốn sửa danh mục này?"
            handleCloseModal={() => setIsShowEditModal(false)}
            handle={handleEditCategory}
          />
        )}
        {isShowDeleteModal && <div className="overlay"></div>}
      </div>
    </div>
  );
}
