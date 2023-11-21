// import { useState } from "react";
import PropTypes from "prop-types";

import HalfRating from "./HalfRating";

export default function ReviewElement({
  item,
  onChangeContent,
  onChangeRating,
}) {
  return (
    <div className="reviewElement">
      <div className="reviewElement__info">
        <div className="reviewElement__img">
          <img src={item.product.thumb} alt={item.product.name} />
        </div>
        <div className="reviewElement__info">
          <p>{item.product.name}</p>
          <p>x{item.quantity}</p>
        </div>
      </div>
      <div className="reviewElement__review">
        <HalfRating onChangeRating={onChangeRating} />
        <textarea
          placeholder="Nhập đánh giá của bạn"
          onChange={(e) => {
            onChangeContent(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
}

ReviewElement.propTypes = {
  item: PropTypes.object,
  onChangeContent: PropTypes.func,
  onChangeRating: PropTypes.func,
};
