import { useEffect } from "react";
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

import { products } from "../context/products";
// import { filterProduct } from "../context/filterProduct";

export default function Category() {
  // const [category, setCategory] = useState(null);
  // const [products, setProducts] = useState([]);
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // const [filterProduct, setFilterProduct] = useState([]);

  const handleFilter = (slug, value) => {
    searchParams.set(slug, value);
    navigate({ search: searchParams.toString() });
  };
  const handleFilterPrice = (slug, value) => {
    const valueText = value[0] + "-" + value[1];
    searchParams.set(slug, valueText);
    navigate({ search: searchParams.toString() });
    // console.log(value);
  };

  useEffect(() => {
    // Get the category ID from the URL
    // console.log(categoryId);
    // Fetch the category data from an API
    // fetch("https://reqres.in/api/users?page=2") // test API
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
    console.log(searchParams.toString())

  }, [searchParams]);

  return (
    <div className="categoryPage">
      <Header />
      {/* {category && <h1>{category.name}</h1>} */}
      <div className="categoryPage__content">
        <h5 className="categoryPage__content__title">Lọc danh sách</h5>
        <div className="categoryPage__content__filter">
          <FilterAutoWidth
            slug="brand"
            name="Thương hiệu"
            handleFilter={handleFilter}
          />
          <FilterAutoWidth slug="cpu" name="CPU" handleFilter={handleFilter} />
          <FilterAutoWidth slug="ram" name="RAM" handleFilter={handleFilter} />
          <FilterAutoWidth
            slug="disk"
            name="Ổ cứng"
            handleFilter={handleFilter}
          />
          <FilterAutoWidth
            slug="laptop_vga"
            name="Card đồ họa"
            handleFilter={handleFilter}
          />
          <FilterAutoWidth
            slug="laptop_resolution"
            name="Độ phân giải"
            handleFilter={handleFilter}
          />
          <FilterAutoWidth
            slug="laptop_screen_size"
            name="Kích thước màn hình"
            handleFilter={handleFilter}
          />
          <FilterAutoWidth
            slug="sort"
            name="Sắp xếp"
            handleFilter={handleFilter}
          />
          <SliderPrice
            slug="range_price"
            handleFilterPrice={handleFilterPrice}
          />
          {false && <button className="btnFilter">Lọc</button>}
        </div>
        <h2 className="categoryPage__content__title">{categoryName}</h2>
        <div className="listProduct__content">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Pagination />
      <UpBtn />
      <Footer />
    </div>
  );
}
