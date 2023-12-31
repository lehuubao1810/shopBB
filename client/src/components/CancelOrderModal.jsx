import PropTypes from "prop-types";
import Cookies from "js-cookie";

import notify from "../utils/notify";

import { host } from "../context/host";

export default function CancelOrderModal({
  handleCloseCancelOrderModal,
  orderId,
}) {
  const accessToken = Cookies.get("access-token");
  const userId = Cookies.get("user-id");

  const handleCancelOrder = () => {
    // console.log(orderId);
    fetch(`${host.dev}/api/order/cancel/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "user-id": userId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          notify("success", "Hủy đơn hàng thành công");
          handleCloseCancelOrderModal();
          window.location.reload();
        }
      })
      .catch((err) => {
        notify("error", "Hủy đơn hàng không thành công");
        console.log(err);
      });
  };

  return (
    <div className="modal" onClick={handleCloseCancelOrderModal}>
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <h4>Bạn có chắc muốn hủy đơn hàng này?</h4>
        <div className="modal__content__buttons">
          <button onClick={handleCloseCancelOrderModal}>Không</button>
          <button onClick={handleCancelOrder}>Có</button>
        </div>
      </div>
    </div>
  );
}

CancelOrderModal.propTypes = {
  handleCloseCancelOrderModal: PropTypes.func,
  orderId: PropTypes.string,
};
