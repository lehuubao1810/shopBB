import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import Rating from "@mui/material/Rating";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import UpBtn from "../components/UpBtn";
import { useCart } from "../context/CartContext";
import formatPrice from "../utils/formatPrice";
import notify from "../utils/notify";

import "../assets/css/Product.css";

// import { products } from "../context/products";

export default function Product() {
  // http://localhost:5173/laptop/laptop-msi-gaming-bravo-15-b7ed-010vn
  const { productSlug } = useParams();

  // console.log(productSlug);
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [attributesC, setAttributes] = useState([]);
  const [productsRelated, setProductsRelated] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // Get product by slug (use fetch)
    fetch(`https://shopbb.onrender.com/api/product/${productSlug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((metadata) => {
        document.title = `${metadata.data.name} | Shop BB`;
        metadata.data.priceDiscount =
          metadata.data.price * (1 - metadata.data.discount);
        setProduct(metadata.data);
        console.log(metadata.data);
        setLoading(false);
      })
      .catch((err) =>
        console.log("Lỗi: ", err, "Tại: ", "client/src/pages/Product.jsx")
      );
  }, [productSlug]);

  useEffect(() => {
    fetch(
      `https://shopbb.onrender.com/api/product/category/${product?.category}?limit=4&brand=${
        product.attributes === undefined ? "" : product.attributes.brand
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((metadata) => {
        setProductsRelated(metadata.products);
        // console.log(data);
      })
      .catch((err) => console.log(err));

      
    fetch(`https://shopbb.onrender.com/api/category/${product?.category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((metadata) => {
        console.log(metadata.data.attributes);
        setAttributes(metadata.data.attributes);
        setLoading(false);
      })
      .catch((err) =>
        console.log("Lỗi: ", err, "Tại: ", "client/src/pages/Product.jsx")
      );
  }, [ product]);

  const { addToCart } = useCart();
  const handleAddToCart = () => {
    // add product to cart (local storage)
    addToCart(product);
    notify("success", "Thêm vào giỏ hàng thành công");
  };

  const handleBuyNow = () => {
    // notify("success", "Thêm vào giỏ hàng thành công");
    addToCart(product);
    navigate("/cart");
  };

  return (
    <>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <div className="productPage">
          <ToastContainer />
          <Header />
          <div className="productPage__content">
            <div className="productPreview">
              <div className="productPreview__info">
                <div className="productPreview__info__left">
                  <div className="productPreview__info__left__img">
                    <img src={product.thumb} alt={product.name} />
                  </div>
                  <div className="productPreview__info__left__tech">
                    {attributesC.map((attribute, index) => (
                      <div
                        key={index}
                        className="productPreview__info__left__tech__item"
                      >
                        <span className="productPreview__info__left__tech__item__name">
                          {attribute.name}:{" "}
                        </span>
                        <span className="productPreview__info__left__tech__item__value">
                          {product.attributes &&
                            product.attributes[attribute.slug]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="productPreview__info__right">
                  <h2 className="productPreview__info__right__name">
                    {product.name}
                  </h2>
                  <div className="productPreview__info__right__brand">
                    <span className="productPreview__info__right__brand__name">
                      Thương hiệu:{" "}
                    </span>
                    <span className="productPreview__info__right__brand__value">
                      {product.brand}
                    </span>
                  </div>
                  <span className="productPreview__info__right__priceDiscounted">
                    {formatPrice(product.priceDiscount)}
                  </span>
                  <div className="productPreview__info__right__price">
                    <del>{formatPrice(product.price)}</del>
                    <span className="productPreview__info__right__price__discount">{`${(
                      product.discount * 100
                    ).toFixed()} %`}</span>
                  </div>
                  <div className="productPreview__info__right__line"></div>
                  <div className="productPreview__info__right__gift">
                    <h4>Khuyến mãi</h4>
                    <div className="productPreview__info__right__gift__item">
                      <i className="fa-solid fa-gift"></i>
                      <span>
                        Chuột Logitech G903 Hero với giá 1.5 Triệu đồng
                      </span>
                    </div>
                    <div className="productPreview__info__right__gift__item">
                      <i className="fa-solid fa-gift"></i>
                      <span>Bàn phím cơ Acer PREDATOR Aethon 301 TKL USB </span>
                    </div>
                    <div className="productPreview__info__right__gift__item">
                      <i className="fa-solid fa-gift"></i>
                      <span>Tai nghe DareU</span>
                    </div>
                    <div className="productPreview__info__right__gift__item">
                      <i className="fa-solid fa-gift"></i>
                      <span>Balo Shop BB</span>
                    </div>
                  </div>
                  <div className="productPreview__info__right__btn">
                    <button className="btnAddToCart" onClick={handleAddToCart}>
                      Thêm vào giỏ hàng
                    </button>
                    <button className="btnBuyNow" onClick={handleBuyNow}>
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
              <div className="productPreview__policies">
                <h4 className="productPreview__policies__title">
                  Chính sách bán hàng
                </h4>
                <div className="productPreview__policies__content">
                  <div className="productPreview__policies__content__item">
                    <i className="fa-solid fa-shipping-fast"></i>
                    <span>Giao hàng toàn quốc</span>
                  </div>
                  <div className="productPreview__policies__content__item">
                    <i className="fa-solid fa-retweet"></i>
                    <span>Đổi trả trong 7 ngày</span>
                  </div>
                  <div className="productPreview__policies__content__item">
                    <i className="fa-solid fa-credit-card"></i>
                    <span>Thanh toán khi nhận hàng</span>
                  </div>
                </div>
                <h4 className="productPreview__policies__title">
                  Dịch vụ khác
                </h4>
                <div className="productPreview__policies__content">
                  <div className="productPreview__policies__content__item">
                    <i className="fa-solid fa-award"></i>
                    <span>Bảo hành chính hãng</span>
                  </div>
                  <div className="productPreview__policies__content__item">
                    <i className="fa-solid fa-gear"></i>
                    <span>Sửa chữa tận nơi</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="productDetail">
              <div className="productDetail__description">
                <h3>Mô tả sản phẩm</h3>
                <div className="productDetail__description__content">
                  <p
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              </div>
              <div className="productDetail__details">
                <h3>Thông số kỹ thuật</h3>
                <div className="productDetail__details__content">
                  {attributesC.map((attribute, index) => (
                    <>
                      {index % 2 == 0 ? (
                        <div
                          className="productDetail__details__content__item"
                          key={index}
                        >
                          <span>{attribute.name}</span>
                          <span>
                            {product.attributes &&
                              product.attributes[attribute.slug]}
                          </span>
                        </div>
                      ) : (
                        <div
                          className="productDetail__details__content__item"
                          style={{ background: "#f6f6f6" }}
                          key={index}
                        >
                          <span>{attribute.name}</span>
                          <span>
                            {product.attributes &&
                              product.attributes[attribute.slug]}
                          </span>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
            <div className="productReviews">
              <h3>Đánh giá sản phẩm</h3>
              <div className="productReviews__content">
                {product.reviews && product.reviews.length !== 0 ? (
                  product.reviews.map((review, index) => (
                    <div className="productReviews__item" key={index}>
                      {/* <div className="productReviews__item__header">
                        <span className="productReviews__item__header__name">
                          {review.name}
                        </span>
                      </div> */}
                      <div className="productReviews__item__rating">
                        <Rating
                          name="read-only"
                          value={review.rating}
                          precision={0.1}
                          readOnly
                        />
                      </div>
                      <div className="productReviews__item__header__date">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                      <div className="productReviews__item__content">
                        {review.content}
                      </div>
                    </div>
                  ))
                ) : (
                  <h4 style={{ color: "#0248b8" }}>Chưa có đánh giá nào</h4>
                )}
              </div>
            </div>
            <div className="productRelated">
              <h2 className="productRelated__title">Sản phẩm liên quan</h2>
              <div className="productRelated__content">
                <div className="listProduct__content">
                  {productsRelated &&
                    productsRelated
                      .slice(0, 4)
                      .map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                        />
                      ))}
                </div>
              </div>
            </div>
          </div>
          <UpBtn />
          <Footer />
        </div>
      )}
    </>
  );
}
