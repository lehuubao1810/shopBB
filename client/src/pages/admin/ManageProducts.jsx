import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "../../components/admin/SideBar";
import TableDashboard from "../../components/admin/TableDashboard";

import { host } from "../../context/host";

import "../../assets/css/admin/ManageProducts.css";

export default function ManageProducts() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Quản lý sản phẩm | Admin";
  }, []);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${host.dev}/api/product?perPage=1000`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.products);
      // console.log(data.products);
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <div className="manageProductsPage">
      <SideBar />
      <div className="manageProductsPage__content">
        <div className="manageProductsPage__content__header">
          {/* <div className="manageProductsPage__content__header__notify__item">
            <i className="fa-solid fa-bell"></i>
          </div> */}
          <form className="search">
            <input
              type="text"
              placeholder="Nhập tên sản phẩm cần tìm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.replace(/\s+/g, " "));
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/admin/products?search=${search}`);
              }}
              className="btnSearch"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <div
                className="manageProductsPage__content__header__item"
                onClick={() => navigate("/admin/create-product")}
              >
                Thêm sản phẩm
              </div>
        </div>
        <div className="manageProductsPage__content__body">
          <div className="manageProductsPage__content__body__listProducts">
            <TableDashboard
              header={[
                "Tên sản phẩm",
                "Giá bán",
                "Giảm giá",
                "Đã bán",
                "Tồn kho",
              ]}
              data={products}
              type="product"
            />
          </div>
        </div>
        {false && <div className="overlay"></div>}
      </div>
    </div>
  );
}
