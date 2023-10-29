import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import formatPrice from "../util/formatPrice";
import notify from "../util/notify";

import "../assets/css/Product.css";

import { products } from "../context/products";

export default function Product() {
  const { productSlug } = useParams();
  console.log(productSlug);
  const navigate = useNavigate();
  const product = {
    id: 4,
    name: "Laptop gaming MSI GF63 Thin 11SC 664VN",
    slug: "laptop-gaming-msi-gf63-thin-11sc-664vn",
    imgUrl:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_21_.png",
    price: 16490000,
    brand: "MSI",
    category: "laptop",
    description: "Apple MacBook Air M1 256GB 2020 I Chính hãng Apple Việt Nam",
    rating: 4.5,
    discount: 0.09,
    // ram: "8GB",
    // cpu: "Intel Core i5",
    // disk: "512GB",
    // laptop_vga: "GTX 1650",
    // laptop_resolution: "FullHD",
    // laptop_screen_size: "15.6 inch",
    atributes: [
      {
        name: "RAM",
        value: "8GB",
      },
      {
        name: "CPU",
        value: "Intel Core i5",
      },
      {
        name: "Ổ cứng",
        value: "512GB",
      },
      {
        name: "Card đồ họa",
        value: "GTX 1650",
      },
      {
        name: "Độ phân giải",
        value: "FullHD",
      },
      {
        name: "Kích thước màn hình",
        value: "15.6 inch",
      },
    ],
    imgDescs: [
      "https://storage.googleapis.com/teko-gae.appspot.com/media/image/2023/8/23/1cfd5eca-3691-411e-a9b5-b82df8599289/acer-a314-thumbnail.jpg",
      "https://storage.googleapis.com/teko-gae.appspot.com/media/image/2023/8/23/1cfd5eca-3691-411e-a9b5-b82df8599289/acer-a314-thumbnail.jpg",
      "https://storage.googleapis.com/teko-gae.appspot.com/media/image/2023/8/23/1cfd5eca-3691-411e-a9b5-b82df8599289/acer-a314-thumbnail.jpg",
      "https://storage.googleapis.com/teko-gae.appspot.com/media/image/2023/8/23/1cfd5eca-3691-411e-a9b5-b82df8599289/acer-a314-thumbnail.jpg",
    ],
  };

  const priceDiscount = product.price * (1 - product.discount);

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
    <div className="productPage">
      <ToastContainer />
      <Header />
      <div className="productPage__content">
        <div className="productPreview">
          <div className="productPreview__info">
            <div className="productPreview__info__left">
              <div className="productPreview__info__left__img">
                <img src={product.imgUrl} alt={product.name} />
              </div>
              <div className="productPreview__info__left__tech">
                {product.atributes.map((atribute, index) => (
                  <div
                    key={index}
                    className="productPreview__info__left__tech__item"
                  >
                    <span className="productPreview__info__left__tech__item__name">
                      {atribute.name}:{" "}
                    </span>
                    <span className="productPreview__info__left__tech__item__value">
                      {atribute.value}
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
                {formatPrice(priceDiscount)}
              </span>
              <div className="productPreview__info__right__price">
                <del>{formatPrice(product.price)}</del>
                <span className="productPreview__info__right__price__discount">{`${
                  product.discount * 100
                } %`}</span>
              </div>
              <div className="productPreview__info__right__line"></div>
              <div className="productPreview__info__right__gift">
                <h4>Khuyến mãi</h4>
                <div className="productPreview__info__right__gift__item">
                  <i className="fa-solid fa-gift"></i>
                  <span>Chuột Logitech G903 Hero với giá 1.5 Triệu đồng</span>
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
            <h4 className="productPreview__policies__title">Dịch vụ khác</h4>
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
              <p>{product.description}</p>
              <img src={product.imgDescs[0]} alt={product.name} />
              <p>{product.description}</p>
              <img src={product.imgDescs[1]} alt={product.name} />
              <p>{product.description}</p>
              <img src={product.imgDescs[2]} alt={product.name} />
              <p>{product.description}</p>
              <img src={product.imgDescs[3]} alt={product.name} />
              <p>{product.description}</p>
            </div>
          </div>
          <div className="productDetail__details">
            <h3>Thông số kỹ thuật</h3>
            <div className="productDetail__details__content">
              {product.atributes.map((atribute, index) => (
                <>
                  {index % 2 == 0 ? (
                    <div className="productDetail__details__content__item">
                      <span>{atribute.name}</span>
                      <span>{atribute.value}</span>
                    </div>
                  ) : (
                    <div
                      className="productDetail__details__content__item"
                      style={{ background: "#f6f6f6" }}
                    >
                      <span>{atribute.name}</span>
                      <span>{atribute.value}</span>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="productRelated">
          <h2 className="productRelated__title">Sản phẩm liên quan</h2>
          <div className="productRelated__content">
            <div className="listProduct__content">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
