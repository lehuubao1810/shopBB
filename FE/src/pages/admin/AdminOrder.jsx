import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

import SideBar from "../../components/admin/SideBar";
import Modal from "../../components/admin/Modal";
import OrderListProduct from "../../components/admin/OrderListProduct";

import { host } from "../../context/host";

import "../../assets/css/admin/AdminOrder.css";

export default function AdminOrder() {
  const { id } = useParams();

  const [order, setOrder] = useState({});

  const [isEdit, setIsEdit] = useState(false);
  const [isUpdateStatus, setIsUpdateStatus] = useState(false);

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowUpdateStatusModal, setIsShowUpdateStatusModal] = useState(false);

  const [orderCustomer, setOrderCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [orderListProduct, setOrderListProduct] = useState([]);

  const accessToken = Cookies.get("access-token");
  const userId = Cookies.get("user-id");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Quản lý danh mục sản phẩm | Admin";

    fetch(`${host.dev}/api/order/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "user-id": userId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.data);
        setOrderCustomer({
          name: data.data.customer.name,
          phone: data.data.customer.phone,
          address: data.data.customer.address,
          email: data.data.email,
        });
        setOrderListProduct(data.data.products);
        // setOrderSlug(metadata.data.slug);
        // setOrderThumb(metadata.data.thumb);
        // setOrderAttributes(metadata.data.attributes);
      });
  }, [id, accessToken, userId]);

  const handleDeleteOrder = () => {
    fetch(`${host.dev}/api/order/${id}`, {
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
          window.location.href = "/admin/orders";
        }
      });
  };

  const handleEditOrder = () => {
    console.log({
      ...order,
      customer: orderCustomer,
      products: orderListProduct,
    });
    fetch(`${host.dev}/api/order/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "user-id": userId,
      },
      body: JSON.stringify({
        ...order,
        customer: orderCustomer,
        products: orderListProduct,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsShowEditModal(false);
          window.location.reload();
        } else {
          alert("Sửa thất bại");
          window.location.reload();
        }
      });
  };

  const handleUpdateStatus = () => {
    console.log(order.status);
    fetch(`${host.dev}/api/order/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "user-id": userId,
      },
      body: JSON.stringify({
        status: order.status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsShowUpdateStatusModal(false);
          window.location.reload();
        } else {
          alert("Cập nhật thất bại");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="adminOrderPage">
      <SideBar />
      <div className="adminOrderPage__content">
        <div className="adminOrderPage__content__header">
          {(isEdit || isUpdateStatus) ? (
            <>
            <div
              className="adminOrderPage__content__header__item"
              onClick={() => {
                setIsEdit(false);
                setIsUpdateStatus(false);
                setOrderCustomer({
                  name: order.customer.name,
                  phone: order.customer.phone,
                  address: order.customer.address,
                  email: order.email,
                });
                setOrderListProduct(order.products);
                setOrder(order);
              }}
            >
              Hủy
            </div>

            <div
              className="adminOrderPage__content__header__item"
              onClick={() => {
                if (isUpdateStatus && isEdit) {
                  setIsShowEditModal(true);
                } else {
                  setIsShowUpdateStatusModal(true);
                }
              }}
            >
              Lưu
            </div>
          </>
          ) : (
            <>
              <div
                className="adminOrderPage__content__header__item"
                onClick={() => setIsShowDeleteModal(true)}
              >
                Xóa đơn hàng
              </div>

              <div
                className="adminOrderPage__content__header__item"
                onClick={() => {
                  setIsEdit(true);
                  setIsUpdateStatus(true);
                }}
              >
                Sửa đơn hàng
              </div>

              <div
                className="adminOrderPage__content__header__item"
                onClick={() => setIsUpdateStatus(true)}
              >
                Cập nhật trạng thái
              </div>
            </>
            
          )}
        </div>
        <div className="adminOrderPage__content__body">
          <div className="adminOrderPage__content__body__info">
            <div className="adminOrderPage__content__body__info__item">
              <p>
                Ngày tạo:{" "}
                {new Date(order.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div className="adminOrderPage__content__body__info__item">
              <p>
                Ngày cập nhật:{" "}
                {new Date(order.updatedAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div className="adminOrderPage__content__body__info__item">
              <p>Mã đơn hàng: {order._id}</p>
            </div>
            {order?.customer?.customer_id && (
              <div className="adminOrderPage__content__body__info__item">
                <p>Mã khách hàng: {order.customer.customer_id}</p>
              </div>
            )}
            <div className="adminOrderPage__content__body__info__item">
              <p>Email: {orderCustomer.email}</p>
            </div>
            {order?.note && (
              <div className="adminOrderPage__content__body__info__item">
                <p>Ghi chú: {order.note}</p>
              </div>
            )}
            <div className="adminOrderPage__content__body__info__item">
              <p>Trạng thái</p>
              <select
                name="status"
                id="status"
                disabled={!isUpdateStatus}
                value={order.status}
                onChange={(e) => {
                  setOrder({ ...order, status: e.target.value });
                }}
              >
                {/* "pending", "processing", "shipping", "delivered", "cancelled" */}
                <option value="pending">Chờ xử lý</option>
                <option value="processing">Đang xử lý</option>
                <option value="shipping">Đang giao hàng</option>
                <option value="delivered">Đã giao hàng</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
            <div className="adminOrderPage__content__body__info__item">
              <p>Tên khách hàng</p>
              <input
                type="text"
                value={orderCustomer.name}
                disabled={!isEdit}
                onChange={(e) =>
                  setOrderCustomer({ ...orderCustomer, name: e.target.value })
                }
              />
            </div>

            <div className="adminOrderPage__content__body__info__item">
              <p>Số điện thoại</p>
              <input
                type="text"
                value={orderCustomer.phone}
                disabled={!isEdit}
                onChange={(e) =>
                  setOrderCustomer({ ...orderCustomer, phone: e.target.value })
                }
              />
            </div>
            <div className="adminOrderPage__content__body__info__item">
              <p>Địa chỉ</p>
              <input
                type="text"
                value={orderCustomer.address}
                disabled={!isEdit}
                onChange={(e) =>
                  setOrderCustomer({
                    ...orderCustomer,
                    address: e.target.value,
                  })
                }
              />
            </div>

            <div className="adminOrderPage__content__body__info__item">
              <p>Danh sách sản phẩm</p>
              <OrderListProduct
                isEdit={isEdit}
                orderListProduct={orderListProduct}
                setOrderListProduct={setOrderListProduct}
                setTotal= {(total) => {
                  setOrder({...order, total: total});
                }}
              />
            </div>
          </div>
        </div>
        {isShowDeleteModal && (
          <Modal
            title="Bạn có chắc muốn xóa đơn hàng này?"
            handleCloseModal={() => setIsShowDeleteModal(false)}
            handle={handleDeleteOrder}
          />
        )}
        {isShowEditModal && (
          <Modal
            title="Bạn có chắc muốn sửa đơn hàng này?"
            handleCloseModal={() => setIsShowEditModal(false)}
            handle={handleEditOrder}
          />
        )}
        {
          isShowUpdateStatusModal && (
            <Modal
              title="Bạn có chắc muốn cập nhật trạng thái này?"
              handleCloseModal={() => setIsShowUpdateStatusModal(false)}
              handle={handleUpdateStatus}
            />
          )
        }
        {isShowDeleteModal && <div className="overlay"></div>}
      </div>
    </div>
  );
}
