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
import { Skeleton } from "@mui/material";

// import { products } from "../context/products";

export default function Home() {
  const navigate = useNavigate();

  const [laptop, setLaptop] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [pc, setPc] = useState([]);
  // const [phone, setPhone] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Shop BB | Laptop, Điện thoại, Linh kiện, PC";
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${host.dev}/api/product/category/slug/laptop`)
      .then((res) => res.json())
      .then((data) => {
        setLaptop(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="homePage">
      <Header />
      <SlideShow />
      <div className="homePage__content">
        <div className="smallBanner">
          <div
            className="smallBanner__item"
            onClick={() => navigate("/laptop")}
          >
            <img src={image1} alt="small-bannerLaptop" />
          </div>
          <div className="smallBanner__item" onClick={() => navigate("/pc")}>
            <img src={image2} alt="small-bannerPc" />
          </div>
          <div
            className="smallBanner__item"
            onClick={() => navigate("/monitor")}
          >
            <img src={image3} alt="small-bannerMonitor" />
          </div>
          <div className="smallBanner__item" onClick={() => navigate("/phone")}>
            <img src={image4} alt="small-bannerPhone" />
          </div>
        </div>
        <div className="listProduct">
          <div className="listProduct__header">
            <h2>Laptop nổi bật</h2>
            <div
              className="listProduct__header__moreBtn"
              onClick={() => navigate("/laptop")}
            >
              Xem tất cả <i className="fa-solid fa-angle-right"></i>
            </div>
          </div>
          <div className="listProduct__content">
            {loading ? (
              <>
                <Skeleton variant="rounded" width={"100%"} height={360} />
                <Skeleton variant="rounded" width={"100%"} height={360} />
                <Skeleton variant="rounded" width={"100%"} height={360} />
                <Skeleton variant="rounded" width={"100%"} height={360} />
              </>
            ) : (
              laptop?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categoryName="laptop"
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
      <UpBtn />
    </div>
  );
}
