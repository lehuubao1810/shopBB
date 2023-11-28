import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

import { host } from "../context/host";

// import { products } from "../context/products";

export default function Home() {

  const navigate = useNavigate();

  const [laptop, setLaptop] = useState([]);
  // const [pc, setPc] = useState([]);
  // const [phone, setPhone] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Shop BB | Laptop, Điện thoại, Linh kiện, PC";
  },[]);

  useEffect(() => {
    fetch(`${host.dev}/api/product/category/slug/laptop`)
      .then((res) => res.json())
      .then((data) => {
        setLaptop(data.products);
      })
      .catch((err) => console.log(err));

    // fetch(`${host.dev}/api/product/category/pc`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setPc(data.products);
    //   })
    //   .catch((err) => console.log(err));
    // fetch(`${host.dev}/api/product/category/phone`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setPhone(data.products);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <div className="homePage">
      <Header />
      <SlideShow />
      <div className="homePage__content">
        <div className="smallBanner">
          <a onClick={()=> navigate('/laptop')}>
            <img src={image1} alt="small-bannerLaptop" />
          </a>
          <a onClick={()=> navigate('/pc')}>
            <img src={image2} alt="small-bannerPc" />
          </a>
          <a onClick={()=> navigate('/monitor')}>
            <img src={image3} alt="small-bannerMonitor" />
          </a>
          <a onClick={()=> navigate('/phone')}>
            <img src={image4} alt="small-bannerPhone" />
          </a>
        </div>
        <div className="listProduct">
          <div className="listProduct__header">
            <h2>Laptop nổi bật</h2>
            <a onClick={()=> navigate('/laptop')}>
              Xem tất cả <i className="fa-solid fa-angle-right"></i>
            </a>
          </div>
          <div className="listProduct__content">
            {laptop?.map((product) => (
              <ProductCard key={product.id} product={product} categoryName='laptop' />
            ))}
          </div>
        </div>
        {/* <div className="listProduct">
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
        </div> */}
      </div>
      <Footer />
      <UpBtn />
    </div>
  );
}
