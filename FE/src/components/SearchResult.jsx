import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import formatPrice from "../utils/formatPrice";

import { host } from "../context/host";
import { CircularProgress } from "@mui/material";

export default function SearchResult({ search, setIsShow }) {
  const [result, setResult] = useState([]);

  const navigate = useNavigate();

  const [resultSuggestions, setResultSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get products by category (use fetch)
    setLoading(true);
    fetch(`${host.dev}/api/product/search/result?name=${search}&perPage=3`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((metadata) => {
        setResult(metadata.products);
        setResultSuggestions([]);
        setLoading(false);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [search]);

  return (
    <div
      className="searchResult"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h4>Kết quả tìm kiếm cho: {search}</h4>
      {loading ? (
        <CircularProgress />
      ) : result?.length > 0 ? (
        <>
          <div className="searchResult__list">
            {result.map((item) => (
              <div className="searchResult__item" key={item._id}>
                <img src={item.thumb} alt={item.name} />
                <div className="searchResult__item__info">
                  <h4
                    onClick={() => {
                      setIsShow(false);
                      navigate(`/product/${item.slug}`);
                    }}
                  >
                    {item.name}
                  </h4>
                  <span className="priceDiscount">
                    {formatPrice(item.price * (1 - item.discount))}
                  </span>
                  <del>{formatPrice(item.price)}</del>
                  <span className="discount">{`${(
                    item.discount * 100
                  ).toFixed()} %`}</span>
                </div>
              </div>
            ))}
          </div>
          <h4
            className="searchResult__more"
            onClick={() => {
              setIsShow(false);
              navigate(`/search/${search}`);
            }}
          >
            Xem tất cả kết quả
          </h4>
        </>
      ) : (
        <div className="searchResult__empty">
          <h4>Không tìm thấy kết quả</h4>
        </div>
      )}
      {resultSuggestions?.length > 0 && (
        <>
          <h4>Kết quả gợi ý cho bạn:</h4>
          <div className="searchResult__list">
            {resultSuggestions.map((item) => (
              <div className="searchResult__item" key={item._id}>
                <img src={item.thumb} alt={item.name} />
                <div className="searchResult__item__info">
                  <h4>{item.name}</h4>
                  <p>{formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

SearchResult.propTypes = {
  search: PropTypes.string.isRequired,
  setIsShow: PropTypes.func.isRequired,
};
