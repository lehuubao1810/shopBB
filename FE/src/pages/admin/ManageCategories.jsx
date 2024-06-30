import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "../../components/admin/SideBar";
import TableDashboard from "../../components/admin/TableDashboard";

import { host } from "../../context/host";

import "../../assets/css/admin/ManageCategories.css";

export default function ManageCategories() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Quản lý danh mục sản phẩm | Admin";
  }, []);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${host.dev}/api/category`)
      .then((res) => res.json())
      .then((metadata) => {
        setCategories(metadata.data);
      });
  }, []);

  return (
    <div className="manageCategoriesPage">
      <SideBar />
      <div className="manageCategoriesPage__content">
        <div className="manageCategoriesPage__content__header">
          {/* <div className="manageCategoriesPage__content__header__notify__item">
            <i className="fa-solid fa-bell"></i>
          </div> */}
          <form className="search">
            <input
              type="text"
              placeholder="Nhập tên danh mục cần tìm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.replace(/\s+/g, " "));
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/admin/categories?search=${search}`);
              }}
              className="btnSearch"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <div
                className="manageCategoriesPage__content__header__item"
                onClick={() => navigate("/admin/create-category")}
              >
                Thêm danh mục
              </div>
        </div>
        <div className="manageCategoriesPage__content__body">
          <div className="manageCategoriesPage__content__body__listCategories">
            <TableDashboard
              header={[
                "Tên danh mục",
                "Slug",
                "Số lượng sản phẩm",
                "Số thuộc tính",
                "Ngày cập nhật",
              ]}
              data={categories}
              type="category"
            />
          </div>
        </div>
        {false && <div className="overlay"></div>}
      </div>
    </div>
  );
}
