import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import SideBar from "../../components/admin/SideBar";
import Modal from "../../components/admin/Modal";
import CategoryAttributes from "../../components/admin/CategoryAttributes";

import { host } from "../../context/host";

import "../../assets/css/admin/CreateCategory.css";

export default function CreateCategory() {
  // const [category, setCategory] = useState({});

  const [isShowAddModal, setIsShowAddModal] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryThumb, setCategoryThumb] = useState("");
  const [categoryAttributes, setCategoryAttributes] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Thêm danh mục sản phẩm | Admin";
  }, []);

  const accessToken = Cookies.get("access-token");
  const userId = Cookies.get("user-id");

  const handleAddCategory = () => {
    console.log({
        name: categoryName,
        slug: categorySlug,
        thumb: categoryThumb,
        attributes: categoryAttributes,
    });
    fetch(`${host.dev}/api/category`, {
      method: "POST",
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
          setIsShowAddModal(false);
          window.location.href = "/admin/categories";
        }
        else {
          alert("Thêm danh mục thất bại!");
          window.location.href = "/admin/categories";
        }
      });
  };

  return (
    <div className="createCategoryPage">
      <SideBar />
      <div className="createCategoryPage__content">
        <div className="createCategoryPage__content__header">
          <div
            className="createCategoryPage__content__header__item"
            onClick={() => setIsShowAddModal(true)}
          >
            Xác nhận thêm
          </div>
        </div>
        <div className="createCategoryPage__content__body">
          <div className="createCategoryPage__content__body__info">
            <div className="createCategoryPage__content__body__info__item">
              <p>Tên danh mục</p>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="createCategoryPage__content__body__info__item">
              <p>Slug</p>
              <input
                type="text"
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
              />
            </div>

            <div className="createCategoryPage__content__body__info__item">
              <p>
                Icon danh mục: <i className={categoryThumb}></i>{" "}
                <a
                  href="https://fontawesome.com/search?o=r&m=free"
                  target="_blank"
                  rel="noreferrer"
                >
                  Danh sách icon
                </a>
              </p>
              <input
                type="text"
                value={categoryThumb}
                onChange={(e) => setCategoryThumb(e.target.value)}
              />
            </div>
            <div className="createCategoryPage__content__body__info__item">
              <p>Thuộc tính danh mục</p>
              <div className="createCategoryPage__content__body__info__item__attributes">
                <CategoryAttributes
                  categoryAttributes={categoryAttributes}
                  setCategoryAttributes={setCategoryAttributes}
                  isEdit={true}
                />
              </div>
            </div>
          </div>
        </div>
        {isShowAddModal && (
          <Modal
            title="Bạn có chắc muốn thêm danh mục này?"
            handleCloseModal={() => setIsShowAddModal(false)}
            handle={handleAddCategory}
          />
        )}
        {isShowAddModal && <div className="overlay"></div>}
      </div>
    </div>
  );
}
