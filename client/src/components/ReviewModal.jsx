import { useState } from "react";

import PropTypes from "prop-types";
import Cookies from "js-cookie";

import notify from "../utils/notify";

export default function ReviewModal({ handleCloseReviewModal, order }) {
  const accessToken = Cookies.get("access-token");
  const userId = Cookies.get("user-id");

  const [review, setReview] = useState([
    {
      content: "",
      rating: 0,
      user: userId,
      product: "",
    },
  ]);

  const handleReview = () => {
    console.log(order);
    // fetch(`http://localhost:5000/api/order/cancel/${orderId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "access-token": accessToken,
    //     "user-id": userId,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.success) {
    //       notify("success", "Hủy đơn hàng thành công");
    //       handleCloseReviewModal();
    //       window.location.reload();
    //     }
    //   })
    //   .catch((err) => {
    //     notify("error", "Hủy đơn hàng không thành công");
    //     console.log(err);
    //   });
  };

  return (
    <div className="ReviewModal" onClick={handleCloseReviewModal}>
      <div
        className="ReviewModal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <h4>Đánh giá sản phẩm</h4>
        <div className="ReviewModal__content__order">
          <div className="ReviewModal__content__order__products">
            {order.products.map((item, index) => (
              <div
                className="ReviewModal__content__order__products__item"
                key={index}
              >
                <div className="ReviewModal__content__order__products__item__info">
                  <div className="ReviewModal__content__order__products__item__img">
                    <img src={item.product.thumb} alt={item.product.name} />
                  </div>
                  <div className="ReviewModal__content__order__products__item__info">
                    <p>{item.product.name}</p>
                    <p>x{item.quantity}</p>
                  </div>
                </div>
                <div className="ReviewModal__content__order__products__item__review">
                  <div className="ReviewModal__content__order__products__item__review__rating">
                    1 2 3 4 5
                  </div>
                  <textarea
                    placeholder="Nhập đánh giá của bạn"
                    onChange={(e) => {
                      setReview(
                        review.map((item) => {
                          if (item.product === "") {
                            return {
                              ...item,
                              product: item.product._id,
                              content: e.target.value,
                            };
                          } else {
                            return item;
                          }
                        })
                      );
                      console.log(review);
                    }}
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ReviewModal__content__buttons">
          <button onClick={handleCloseReviewModal}>Không</button>
          <button onClick={handleReview}>Có</button>
        </div>
      </div>
    </div>
  );
}

ReviewModal.propTypes = {
  handleCloseReviewModal: PropTypes.func,
  order: PropTypes.object,
};
