import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import UpBtn from "../components/UpBtn";
import Pagination from "../components/Pagination";
// import FilterItem from "../components/FilterItem";
import FilterAutoWidth from "../components/FilterAutoWidth";
import SliderPrice from "../components/SliderPrice";

import "../assets/css/Category.css";

// import { products } from "../context/products";
// import { filterProduct } from "../context/filterProduct";

export default function Category() {
  // const [category, setCategory] = useState(null);
  const [dataProducts, setDataProducts] = useState([]); // [products, setProducts]
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryName } = useParams();
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
  const navigate = useNavigate();
  const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  // const [filterProduct, setFilterProduct] = useState([]);

  const handleFilter = (slug, value) => {
    searchParams.set(slug, value);
    navigate({ search: searchParams.toString() });
  };
  const handleFilterPrice = (value) => {
    //minPrice=20&maxPrice=50
    // const valueText = `minPrice=${value[0]}&maxPrice=${value[1]}`
    searchParams.set("minPrice", value[0]);
    searchParams.set("maxPrice", value[1]);
    navigate({ search: searchParams.toString() });
    // console.log(value);
  };

  useEffect(() => {
    // Get category by name (use fetch)
    fetch(`http://localhost:5000/api/category/slug/${categoryName}`, 
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((metadata) => {
        console.log(metadata.data.attributes);
        setFilter(metadata.data.attributes);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [categoryName]);

  useEffect(() => {
    // Get products by category (use fetch)
    fetch(
      `http://localhost:5000/api/product/category/${categoryName}?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((metadata) => {
        setDataProducts(metadata);
        setProducts(metadata.products);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, [searchParams, categoryName]);

  return (
    <div className="categoryPage">
      <Header />
      {/* {category && <h1>{category.name}</h1>} */}
      <div className="categoryPage__content">
        <h5 className="categoryPage__content__title">Lọc danh sách</h5>
        <div className="categoryPage__content__filter">
          {loading && <h1>Loading...</h1>}
          {filter.map((item, index) => (
            <FilterAutoWidth
              key={index}
              slug={item.slug}
              name={item.name}
              options={item.options}
              handleFilter={handleFilter}
            />
          ))}

          <FilterAutoWidth
            slug="sortPrice"
            name="Sắp xếp"
            sortPrice={sortPrice}
            handleFilter={handleFilter}
          />
          <SliderPrice handleFilterPrice={handleFilterPrice} />
          {false && <button className="btnFilter">Lọc</button>}
        </div>
        <h2 className="categoryPage__content__title">{categoryName}</h2>
        <div className="listProduct__content">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index} product={product} categoryName={categoryName} />
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
