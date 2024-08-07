// import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterAutoWidth from "../components/FilterAutoWidth";
import CancelOrderModal from "../components/CancelOrderModal";
import ReviewModal from "../components/ReviewModal";
import UpBtn from "../components/UpBtn";
import PaginationControlled from "../components/Pagination";

import { useAuth } from "../context/AuthContext";
import { host } from "../context/host";

import formatPrice from "../utils/formatPrice";

import "../assets/css/OrderPage.css";
import { Skeleton } from "@mui/material";

export default function OrderPage() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const [showCancelOrderModal, setShowCancelOrderModal] = useState({
    show: false,
    orderId: "",
  });
  const [showReviewModal, setShowReviewModal] = useState({
    show: false,
    order: {},
  });
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = `Danh sách đơn hàng | Shop BB`;
  }, []);

  useEffect(() => {
    const accessToken = Cookies.get("access-token");
    // const userId = Cookies.get("user-id");
    setLoading(true);
    if (user) {
      fetch(`${host.dev}/api/shop/orders?${searchParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-id": user._id,
          "access-token": accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            // console.log(data);
            setOrders(data.metadata.orders);
            setPagination({
              totalPages: data.metadata.totalPages,
              currentPage: data.metadata.page,
            });
            console.log(data.metadata.orders);
          } else {
            console.log(data.error);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [user, searchParams]);

  const filterOrder = [
    {
      name: "Đang chờ xử lý",
      value: "pending",
    },
    {
      name: "Đang xử lý",
      value: "processing",
    },
    {
      name: "Đang giao hàng",
      value: "shipping",
    },
    {
      name: "Đã giao hàng",
      value: "delivered",
    },
    {
      name: "Đã hủy",
      value: "cancelled",
    },
  ];

  return (
    <div className="orderPage">
      <ToastContainer />
      <Header />
      <div className="orderPage__content">
        <h2>Danh sách đơn hàng</h2>
        <FilterAutoWidth
          slug="status"
          name="Trạng thái đơn hàng"
          filterOrder={filterOrder}
          className="orderPage__content__filter"
        />
        {loading ? (
          <div className="orderPage__content__list__item">
            <div className="orderPage__content__list__item__header">
              <Skeleton variant="text" width={"40%"} height={40} />
              <Skeleton variant="text" width={"40%"} height={40} />
              <Skeleton variant="text" width={"40%"} height={40} />
            </div>
            <div className="orderPage__content_products__body">
              <div className="productOrder__content">
                <div className="productOrder__content__info">
                  <div className="productOrder__content__info__item">
                    <Skeleton variant="rectangular" width={100} height={100} />
                    <Skeleton variant="text" width={200} height={40} />
                  </div>
                  <div>
                    <Skeleton variant="text" width={100} height={40} />
                  </div>
                  <div >
                    <Skeleton variant="text" width={100} height={40} />
                  </div>
                  <Skeleton variant="text" width={100} height={40} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="orderPage__content__list">
              {orders?.length === 0 ? (
                <h4 style={{ marginTop: 20 }}>Không có đơn hàng nào</h4>
              ) : (
                orders.map((order, index) => (
                  <div className="orderPage__content__list__item" key={index}>
                    <div className="orderPage__content__list__item__header">
                      <h4>
                        Mã đơn hàng:
                        <span>{order._id}</span>
                      </h4>
                      <h4>
                        Ngày đặt hàng:
                        <span>
                          {new Date(order.createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      </h4>
                      <h4>
                        Tên người nhận:
                        <span>{order.customer.name}</span>
                      </h4>
                      <h4>
                        Số điện thoại:
                        <span>{order.customer.phone}</span>
                      </h4>
                      <h4>
                        Địa chỉ giao hàng:
                        <span>{order.customer.address}</span>
                      </h4>
                      {order.note && (
                        <h4>
                          Ghi chú:
                          <span>{order.note}</span>
                        </h4>
                      )}
                      <h4>
                        Hình thức thanh toán:
                        <span>
                          {order.payment === "COD"
                            ? "Thanh toán khi nhận hàng"
                            : "Thanh toán Banking"}
                        </span>
                      </h4>
                    </div>
                    <div className="orderPage__content__list__item__body">
                      <div className="orderPage__content__list__item__body__left">
                        <div className="orderPage__content_products__header">
                          <div className="orderPage__content_products__header__title">
                            <span>Sản phẩm</span>
                            <span>Đơn giá</span>
                            <span>Số lượng</span>
                            <span>Thành tiền</span>
                          </div>
                        </div>
                        <div className="orderPage__content_products__body">
                          {order.products.map((item, index) => (
                            <div key={index} className="productOrder__content">
                              <div className="productOrder__content__info">
                                <div className="productOrder__content__info__item">
                                  <img
                                    src={item.product.thumb}
                                    alt={item.product.name}
                                  />
                                  <h4
                                    className="productOrder__content__info__item__name"
                                    onClick={() =>
                                      navigate(`/product/${item.product.slug}`)
                                    }
                                  >
                                    {item.product.name}
                                  </h4>
                                </div>
                                <div>
                                  <p>
                                    {formatPrice(
                                      item.product.price *
                                        (1 - item.product.discount)
                                    )}
                                  </p>
                                  <del>{formatPrice(item.product.price)}</del>
                                </div>
                                <div className="productOrder__content__info__quantity">
                                  <span>{item.quantity}</span>
                                </div>
                                <p>
                                  {formatPrice(
                                    item.product.price *
                                      (1 - item.product.discount) *
                                      item.quantity
                                  )}
                                </p>
                              </div>
                              {/* <div className="productOrder__content__gift">
                      <div className="productOrder__content__gift__item">
                        <i className="fa-solid fa-gift"></i>
                        <span>Chuột Logitech G903 Hero với giá 1.5 Triệu đồng</span>
                      </div>
                      <div className="productOrder__content__gift__item">
                        <i className="fa-solid fa-gift"></i>
                        <span>Bàn phím cơ Acer PREDATOR Aethon 301 TKL USB </span>
                      </div>
                      <div className="productOrder__content__gift__item">
                        <i className="fa-solid fa-gift"></i>
                        <span>Tai nghe DareU</span>
                      </div>
                      <div className="productOrder__content__gift__item">
                        <i className="fa-solid fa-gift"></i>
                        <span>Balo Shop BB</span>
                      </div>
                    </div> */}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="orderPage__content__list__item__body__right">
                        {order.status === "delivered" &&
                          (order.reviewed === false ? (
                            <div
                              className="orderPage__content__list__item__body__right__btn"
                              onClick={() =>
                                setShowReviewModal(
                                  (prev) =>
                                    !prev.show && { show: true, order: order }
                                )
                              }
                            >
                              Đánh giá sản phẩm
                            </div>
                          ) : (
                            <div className="orderPage__content__list__item__body__right__btn done">
                              Đã đánh giá
                            </div>
                          ))}
                        {showReviewModal.show && (
                          <ReviewModal
                            handleCloseReviewModal={() =>
                              setShowReviewModal(
                                (prev) => !prev.show && prev.order
                              )
                            }
                            order={showReviewModal.order}
                          />
                        )}
                        {order.status === "pending" && (
                          <>
                            <div
                              className="orderPage__content__list__item__body__right__btn cancel"
                              onClick={() =>
                                setShowCancelOrderModal(
                                  (prev) =>
                                    !prev.show && {
                                      show: true,
                                      orderId: order._id,
                                    }
                                )
                              }
                            >
                              Hủy đơn hàng
                            </div>
                          </>
                        )}
                        {showCancelOrderModal.show && (
                          <CancelOrderModal
                            handleCloseCancelOrderModal={() =>
                              setShowCancelOrderModal(
                                (prev) => !prev.show && prev.orderId
                              )
                            }
                            orderId={showCancelOrderModal.orderId}
                          />
                        )}
                        <div className="orderPage__content__list__item__body__right__total">
                          <h4>
                            Tổng tiền: <span>{formatPrice(order.total)}</span>
                          </h4>
                          <h4>
                            Trạng thái:{" "}
                            <span>
                              {order.status === "pending"
                                ? "Đang chờ xử lý"
                                : order.status === "processing"
                                ? "Đang xử lý"
                                : order.status === "shipping"
                                ? "Đang giao hàng"
                                : order.status === "delivered"
                                ? "Đã giao hàng"
                                : "Đã hủy"}
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <PaginationControlled
              totalPages={pagination.totalPages}
              currentPage={pagination.currentPage}
            />
          </>
        )}
      </div>
      <UpBtn />
      <Footer />
    </div>
  );
}
