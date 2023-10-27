import Header from "../components/Header";
import "../assets/css/Home.css";
import SlideShow from "../components/SlideShow";
import UpBtn from "../components/UpBtn";
import image1 from "../assets/images/small-banner/1.png";
import image2 from "../assets/images/small-banner/2.png";
import image3 from "../assets/images/small-banner/3.png";
import image4 from "../assets/images/small-banner/4.png";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

import { products } from "../context/products";

export default function Home() {

  return (
    <div className="homePage">
      <Header />
      <SlideShow />
      <div className="homePage__content">
        <div className="smallBanner">
          <a href="/laptop">
            <img src={image1} alt="small-bannerLaptop" />
          </a>
          <a href="/pc">
            <img src={image2} alt="small-bannerPc" />
          </a>
          <a href="/monitor">
            <img src={image3} alt="small-bannerMonitor" />
          </a>
          <a href="/phone">
            <img src={image4} alt="small-bannerPhone" />
          </a>
        </div>
        <div className="listProduct">
          <div className="listProduct__header">
            <h2>Laptop nổi bật</h2>
            <a href="/laptop">
              Xem tất cả <i className="fa-solid fa-angle-right"></i>
            </a>
          </div>
          <div className="listProduct__content">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="listProduct">
          <div className="listProduct__header">
            <h2>PC nổi bật</h2>
            <a href="/pc">
              Xem tất cả <i className="fa-solid fa-angle-right"></i>
            </a>
          </div>
          <div className="listProduct__content">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="listProduct">
          <div className="listProduct__header">
            <h2>Điện thoại nổi bật</h2>
            <a href="/phone">
              Xem tất cả <i className="fa-solid fa-angle-right"></i>
            </a>
          </div>
          <div className="listProduct__content">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <UpBtn />
    </div>
  );
}
