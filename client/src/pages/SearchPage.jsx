import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import UpBtn from "../components/UpBtn";
import FilterAutoWidth from "../components/FilterAutoWidth";
import SliderPrice from "../components/SliderPrice";

import "../assets/css/SearchPage.css";

export default function SearchPage() {
  const { searchValue } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  ); // useMemo: tạo ra 1 object mới khi location.search thay đổi ( tránh lặp vô tận )

  const [dataProducts, setDataProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Get products by category (use fetch)
    fetch(`http://localhost:5000/api/product/search/result?name=${searchValue}&${searchParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((metadata) => {
        setDataProducts(metadata);
        setProducts(metadata.products);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, [searchValue, searchParams]);
  const sortPrice = [
    {
      name: "Giá tăng dần",
      value: "asc",
    },
    {
      name: "Giá giảm dần",
      value: "desc",
    },
  ];
  const handleFilter = (slug, value) => {
    searchParams.set(slug, value);
    console.log(slug, value);
    navigate({ search: searchParams.toString() });
  };
  const handleFilterPrice = (value) => {
    // minPrice=20&maxPrice=50
    // const valueText = `minPrice=${value[0]}&maxPrice=${value[1]}`
    searchParams.set("minPrice", value[0]);
    searchParams.set("maxPrice", value[1]);
    console.log(value);
    navigate({ search: searchParams.toString() });
  };

  return (
    <div className="searchPage">
      <Header />
      <div className="searchPage__content">
        <h2 className="searchPage__content__title">Kết quả tìm kiếm cho: {searchValue}</h2>
        <div className="searchPage__content__header">
            <FilterAutoWidth
            slug="sortPrice"
            name="Sắp xếp"
            sortPrice={sortPrice}
            handleFilter={handleFilter}
          />
          <SliderPrice 
          handleFilterPrice={handleFilterPrice} 
          />
        </div>
        
        <div className="listProduct__content">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                categoryName={product.category.name.toLowerCase()}
              />
            ))
          ) : (
            <h4>Không tồn tại sản phẩm nào</h4>
          )}
        </div>
      </div>
      <Pagination
        totalPages={dataProducts.totalPages}
        currentPage={dataProducts.currentPage}
      />
      <UpBtn />
      <Footer />
    </div>
  );
}
