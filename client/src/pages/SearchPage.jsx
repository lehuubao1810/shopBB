import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import UpBtn from "../components/UpBtn";
import FilterAutoWidth from "../components/FilterAutoWidth";
import SliderPrice from "../components/SliderPrice";

import "../assets/css/SearchPage.css";

export default function SearchPage() {
//   const { searchValue } = useParams();

  const [dataProducts, setDataProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Get products by category (use fetch)
    fetch(`http://localhost:5000/api/product/category/laptop`, {
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
  }, []);
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
    console.log(slug, value);
  };
  const handleFilterPrice = (value) => {
    //minPrice=20&maxPrice=50
    // const valueText = `minPrice=${value[0]}&maxPrice=${value[1]}`
    // searchParams.set("minPrice", value[0]);
    // searchParams.set("maxPrice", value[1]);
    // navigate({ search: searchParams.toString() });
    console.log(value);
  };

  return (
    <div className="searchPage">
      <Header />
      <div className="searchPage__content">
        {/* <h1>{searchValue}</h1> */}
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
                // categoryName={categoryName}
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
