import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import SideBar from "../../components/admin/SideBar";
import TableDashboard from "../../components/admin/TableDashboard";

import { host } from "../../context/host";

import "../../assets/css/admin/ManageOrders.css";

export default function ManageOrders() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Quản lý đơn hàng | Admin";
  }, []);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const accessToken = Cookies.get("access-token");
    const userId = Cookies.get("user-id");

    fetch(`${host.dev}/api/order?limit=5`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "user-id": userId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.metadata.orders);
        console.log(data.metadata.orders);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="manageOrdersPage">
      <SideBar />
      <div className="manageOrdersPage__content">
        <div className="manageOrdersPage__content__header">
          {/* <div className="manageOrdersPage__content__header__notify__item">
            <i className="fa-solid fa-bell"></i>
          </div> */}
          <form className="search">
            <input
              type="text"
              placeholder="Nhập mã đơn hàng cần tìm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.replace(/\s+/g, " "));
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/admin/orders?search=${search}`);
              }}
              className="btnSearch"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          {/* <div
            className="manageOrdersPage__content__header__item"
            // onClick={() => setIsShowDeleteModal(true)}
          >
            Thêm đơn hàng
          </div> */}
        </div>
        <div className="manageOrdersPage__content__body">
          <div className="manageOrdersPage__content__body__listOrders">
            <TableDashboard
              header={[
                "Tên khác hàng",
                "Mã đơn hàng",
                "Tổng tiền",
                "Trạng thái",
                "Thời gian",
              ]}
              data={orders}
              type="order"
            />
          </div>
        </div>
        {false && <div className="overlay"></div>}
      </div>
    </div>
  );
}
