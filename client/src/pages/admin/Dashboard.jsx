import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import SideBar from "../../components/admin/SideBar";
import RevenueChart from "../../components/admin/RevenueChart";
import CategorySalesChart from "../../components/admin/CategorySalesChart";
// import DailySalesChart from "../../components/admin/DailySalesChart";
// import OrdersChart from "../../components/admin/OrdersChart";
import TableDashboard from "../../components/admin/TableDashboard";

import formatPrice from "../../utils/formatPrice";

import { host } from "../../context/host";

import "../../assets/css/admin/DashboardPage.css";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [users, setUsers] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Thống kê tổng quát | Admin";
  }, []);

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
        setTotalOrders(data.metadata.total);
        console.log(data.metadata.orders);
        setRevenue(
          data.metadata.orders.reduce((acc, cur) => acc + cur.total, 0)
        );
      })
      .catch((err) => console.log(err));

    fetch(`${host.dev}/api/shop`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "user-id": userId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        // console.log(data.data.length);
      })
      .catch((err) => console.log(err));

    fetch(`${host.dev}/api/product?perPage=5`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
        // console.log(data.products);
      })
      .catch((err) => console.log(err));

    fetch(`${host.dev}/api/category`)
      .then((res) => res.json())
      .then((metadata) => {
        setCategories(metadata.data);
      });
  }, []);

  return (
    <div className="dashboardPage">
      <SideBar />
      <div className="dashboardPage__content">
        {/* <div className="dashboardPage__content__header">
          <div className="dashboardPage__content__header__notify__item">
            <i className="fa-solid fa-bell"></i>
          </div>
        </div> */}
        <div className="dashboardPage__content__body">
          <div className="dashboardPage__content__body__row">
            <div className="dashboardPage__content__body__row__item">
              <h4 className="dashboardPage__content__body__row__item__title">
                Doanh thu
              </h4>
              <div className="dashboardPage__content__body__row__item__value">
                {formatPrice(revenue)}
              </div>
            </div>
            <div className="dashboardPage__content__body__row__item">
              <h4 className="dashboardPage__content__body__row__item__title">
                Đơn hàng
              </h4>
              <div className="dashboardPage__content__body__row__item__value">
                {totalOrders}
              </div>
            </div>
            <div className="dashboardPage__content__body__row__item">
              <h4 className="dashboardPage__content__body__row__item__title">
                Sản phẩm
              </h4>
              <div className="dashboardPage__content__body__row__item__value">
                {totalProducts}
              </div>
            </div>
            <div className="dashboardPage__content__body__row__item">
              <h4 className="dashboardPage__content__body__row__item__title">
                Khách hàng
              </h4>
              <div className="dashboardPage__content__body__row__item__value">
                {users.length}
              </div>
            </div>
          </div>
          <div className="dashboardPage__content__body__row">
            <div className="dashboardPage__content__body__row__item">
              <h4 className="dashboardPage__content__body__row__item__title">
                Doanh thu trong 7 ngày gần đây
              </h4>
              <RevenueChart orders={orders} />
            </div>
            <div className="dashboardPage__content__body__row__item">
              <h4 className="dashboardPage__content__body__row__item__title">
                Đơn hàng theo danh mục
              </h4>
              <CategorySalesChart orders={orders} categories={categories} />
              <div className="dashboardPage__content__body__row__item__value">
                {orders.length === 0 && <p>Chưa có đơn hàng</p>}
              </div>
            </div>
          </div>
          {/* <div className="dashboardPage__content__body__row">
            <div className="dashboardPage__content__body__row__item">
              <h4 className="dashboardPage__content__body__row__item__title">
                Đơn hàng trong 7 ngày gần đây
              </h4>
              <DailySalesChart />
            </div>

            <div className="dashboardPage__content__body__row__item">
              <h4 className="dashboardPage__content__body__row__item__title">
                Đơn đặt hàng đến hiện tại
              </h4>
              <OrdersChart orders={orders} />
            </div>
          </div> */}
          <div className="dashboardPage__content__body__row">
            <div className="dashboardPage__content__body__row__item">
              <h4 className="dashboardPage__content__body__row__item__title">
                Đơn hàng gần đây
              </h4>
              <TableDashboard
                header={[
                  "Tên khác hàng",
                  "Mã đơn hàng",
                  "Tổng tiền",
                  "Trạng thái",
                  "Thời gian",
                ]}
                data={orders.slice(0, 5)}
                type="order"
              />
            </div>
            <div className="dashboardPage__content__body__row__item">
              <h4 className="dashboardPage__content__body__row__item__title">
                Sản phẩm bán chạy
              </h4>
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
        </div>
        {false && <div className="overlay"></div>}
      </div>
    </div>
  );
}
