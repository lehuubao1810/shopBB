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

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Apple MacBook Air M1 256GB 2020 I Chính hãng Apple Việt Nam",
      slug: "apple-macbook-air-m1-256gb-2020-i-chinh-hang-apple-viet-nam",
      imgUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/a/i/air_m2.png",
      price: 22990000,
      brand: "Apple",
      category: "Laptop",
      description:
        "Apple MacBook Air M1 256GB 2020 I Chính hãng Apple Việt Nam",
      rating: 4.5,
      discount: 0.16,
    },
    {
      id: 2,
      name: "Apple Macbook Pro 13 M2 2022 8GB 256GB I Chính hãng Apple Việt Nam",
      slug: "apple-macbook-pro-13-m2-2022-8gb-256gb-i-chinh-hang-apple-viet-nam",
      imgUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/p/r/pro-m2.jpg",
      price: 35990000,
      brand: "Apple",
      category: "Laptop",
      description:
        "Apple MacBook Air M1 256GB 2020 I Chính hãng Apple Việt Nam",
      rating: 4.5,
      discount: 0.18,
    },
    {
      id: 3,
      name: "Laptop ASUS TUF Gaming F15 FX506HC-HN144W",
      slug: "laptop-asus-tuf-gaming-f15-fx506hc-hn144w",
      imgUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/5/h/5h53.png",
      price: 22190000,
      brand: "Apple",
      category: "Laptop",
      description:
        "Apple MacBook Air M1 256GB 2020 I Chính hãng Apple Việt Nam",
      rating: 4.5,
      discount: 0.19,
    },
    {
      id: 4,
      name: "Laptop gaming MSI GF63 Thin 11SC 664VN",
      slug: "laptop-gaming-msi-gf63-thin-11sc-664vn",
      imgUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_21_.png",
      price: 16490000,
      brand: "Apple",
      category: "Laptop",
      description:
        "Apple MacBook Air M1 256GB 2020 I Chính hãng Apple Việt Nam",
      rating: 4.5,
      discount: 0.09,
    },
    {
      id: 5,
      name: "Laptop Asus VivoBook Go 14 E1404FA-NK177W",
      slug: "laptop-asus-vivobook-go-14-e1404fa-nk177w",
      imgUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_-_2023-06-08t005130.908.png",
      price: 14490000,
      brand: "Apple",
      category: "Laptop",
      description:
        "Apple MacBook Air M1 256GB 2020 I Chính hãng Apple Việt Nam",
      rating: 4.5,
      discount: 0.08,
    },
  ];

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
