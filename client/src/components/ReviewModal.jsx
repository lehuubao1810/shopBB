import { useState } from "react";

import PropTypes from "prop-types";
import Cookies from "js-cookie";

import ReviewElement from "./ReviewElement";

import notify from "../utils/notify";

export default function ReviewModal({ handleCloseReviewModal, order }) {
  const [reviews, setReviews] = useState(
    order.products.map((item) => ({ product: item.product._id , content: "", rating: 0 }))
  );

  // Hàm xử lý khi textarea thay đổi
  const handleChangeContent = (index, content) => {
    setReviews((prevReviews) => {
      const newReviews = [...prevReviews];
      newReviews[index].content = content;
      return newReviews;
    });
  };

  const handleChangeRating = (index, rating) => {
    setReviews((prevReviews) => {
      const newReviews = [...prevReviews];
      newReviews[index].rating = rating;
      return newReviews;
    });
  }

  const accessToken = Cookies.get("access-token");
  const userId = Cookies.get("user-id");

  const handleReview = () => {
    console.log(reviews);
    fetch(`http://localhost:5000/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "user-id": userId, 
        "order-id": order._id,
      },
      body: JSON.stringify({ reviews }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          notify("success", "Đánh giá thành công");
          handleCloseReviewModal();
          window.location.reload();
        }
      })
      .catch((err) => {
        notify("error", "Đánh giá không thành công");
        console.log(err);
      });
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
              <ReviewElement
                key={index}
                item={item}
                onChangeContent={(content) => handleChangeContent(index, content)}
                onChangeRating={(rating) => handleChangeRating(index, rating)}
              />
            ))}
          </div>
        </div>
        <div className="ReviewModal__content__buttons">
          <button onClick={handleCloseReviewModal}>Hủy</button>
          <button onClick={handleReview}>Đánh giá</button>
        </div>
      </div>
    </div>
  );
}

ReviewModal.propTypes = {
  handleCloseReviewModal: PropTypes.func,
  order: PropTypes.object,
};
