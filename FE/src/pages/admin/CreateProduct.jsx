import { useState, useEffect, useReducer } from "react";
import Cookies from "js-cookie";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import SideBar from "../../components/admin/SideBar";
import Modal from "../../components/admin/Modal";

import { host } from "../../context/host";

import "../../assets/css/admin/CreateProduct.css";

const initialState = {
  name: "",
  slug: "",
  thumb: "",
  attributes: {},
  reviews: [],
  rating: 0,
  price: 0,
  discount: 0,
  quantity: 0,
  sold: 0,
  category: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "slug":
      return { ...state, slug: action.payload };
    case "thumb":
      return { ...state, thumb: action.payload };
    case "attributes":
      return { ...state, attributes: action.payload };
    case "reviews":
      return { ...state, reviews: action.payload };
    case "rating":
      return { ...state, rating: action.payload };
    case "price":
      return { ...state, price: action.payload };
    case "discount":
      return { ...state, discount: action.payload };
    case "quantity":
      return { ...state, quantity: action.payload };
    case "sold":
      return { ...state, sold: action.payload };
    case "category":
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

export default function CreateProduct() {
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  const [product, dispatch] = useReducer(reducer, initialState);
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState([]);
  const [categoryAttributes, setCategoryAttributes] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetch(`${host.dev}/api/category`)
      .then((res) => res.json())
      .then((metadata) => {
        setCategories(metadata.data);
      });
  }, []);

  useEffect(() => {
    setCategoryAttributes(
      categories.find((category) => category._id === product.category)
        ?.attributes
    );
  }, [product.category, categories]);

  const accessToken = Cookies.get("access-token");
  const userId = Cookies.get("user-id");

  const handleAddProduct = () => {
    console.log({
        name: product.name,
        slug: product.slug,
        thumb: product.thumb,
        attributes: product.attributes,
        price: product.price,
        discount: product.discount,
        quantity: product.quantity,
        description: description,
        category: product.category,
      }
    );
    fetch(`${host.dev}/api/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "user-id": userId,
      },
      body: JSON.stringify({
        name: product.name,
        slug: product.slug,
        thumb: product.thumb,
        attributes: product.attributes,
        price: product.price,
        discount: product.discount,
        quantity: product.quantity,
        description: description,
        category: product.category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsShowAddModal(false);
          window.location.href = "/admin/products";
        } else {
          alert("Thêm sản phẩm thất bại!");
          window.location.href = "/admin/products";
        }
      });
  };

  return (
    <div className="createProductPage">
      <SideBar />
      <div className="createProductPage__content">
        <div className="createProductPage__content__header">
          <div
            className="createProductPage__content__header__item"
            onClick={() => setIsShowAddModal(true)}
          >
            Xác nhận thêm
          </div>
        </div>
        <div className="createProductPage__content__body">
          <div className="createProductPage__content__body__info">
            <div className="createProductPage__content__body__info__item">
              <p>
                Đánh giá: {product.rating} ({product.reviews.length || 0} đánh giá)
              </p>
            </div>
            <div className="createProductPage__content__body__info__item">
              <p>Tên sản phẩm</p>
              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  dispatch({ type: "name", payload: e.target.value })
                }
              />
            </div>
            <div className="createProductPage__content__body__info__item">
              <p>Slug</p>
              <input
                type="text"
                value={product.slug}
                onChange={(e) =>
                  dispatch({ type: "slug", payload: e.target.value })
                }
              />
            </div>
            <div className="createProductPage__content__body__info__item">
              <p>Giá sản phẩm</p>
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  dispatch({ type: "price", payload: e.target.value })
                }
              />
            </div>
            <div className="createProductPage__content__body__info__item">
              <p>Giảm giá</p>
              <input
                type="number"
                value={product.discount}
                onChange={(e) =>
                  dispatch({ type: "discount", payload: e.target.value })
                }
              />
            </div>
            <div className="createProductPage__content__body__info__item">
              <p>Số lượng</p>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  dispatch({ type: "quantity", payload: e.target.value })
                }
              />
            </div>

            <div className="createProductPage__content__body__info__item">
              <p>Hình ảnh sản phẩm (link hình ảnh)</p>
              <input
                type="text"
                value={product.thumb}
                onChange={(e) =>
                  dispatch({ type: "thumb", payload: e.target.value })
                }
              />
              <img src={product.thumb} alt="" />
            </div>
            <div className="createProductPage__content__body__info__item">
              <p>Mô tả sản phẩm</p>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
              />
            </div>
            <div className="createProductPage__content__body__info__item">
              <p>Danh mục sản phẩm</p>
              <select
                value={product.category}
                onChange={(e) =>
                  dispatch({ type: "category", payload: e.target.value })
                }
              >
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="createProductPage__content__body__info__item">
              <p>Thuộc tính sản phẩm</p>
              <div className="createProductPage__content__body__info__item__attributes">
                {categoryAttributes?.map((attribute, index) => (
                  <div key={index}>
                    <span>{attribute.name}</span>
                    <select
                      value={product.attributes[attribute.slug]}
                      onChange={(e) =>
                        dispatch({
                          type: "attributes",
                          payload: {
                            ...product.attributes,
                            [attribute.slug]: e.target.value,
                          },
                        })
                      }
                    >
                      {attribute.options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {isShowAddModal && (
          <Modal
            title="Bạn có chắc muốn thêm sản phẩm này?"
            handleCloseModal={() => setIsShowAddModal(false)}
            handle={handleAddProduct}
          />
        )}
        {isShowAddModal && <div className="overlay"></div>}
      </div>
    </div>
  );
}
