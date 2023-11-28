import { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import SideBar from "../../components/admin/SideBar";
import Modal from "../../components/admin/Modal";

import { host } from "../../context/host";

import "../../assets/css/admin/AdminProduct.css";

const initialState = {
  name: "",
  slug: "",
  thumb: "",
  attributes: {},
  reviews: 0,
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

export default function AdminProduct() {
  const { id } = useParams();

  // const [product, setProduct] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

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
    fetch(`${host.dev}/api/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((metadata) => {
        document.title = `${metadata.data.name} | Admin`;
        dispatch({ type: "name", payload: metadata.data.name });
        dispatch({ type: "slug", payload: metadata.data.slug });
        dispatch({ type: "thumb", payload: metadata.data.thumb });
        dispatch({ type: "attributes", payload: metadata.data.attributes });
        dispatch({ type: "reviews", payload: metadata.data.reviews });
        dispatch({ type: "rating", payload: metadata.data.rating });
        dispatch({ type: "price", payload: metadata.data.price });
        dispatch({ type: "discount", payload: metadata.data.discount });
        dispatch({ type: "quantity", payload: metadata.data.quantity });
        dispatch({ type: "sold", payload: metadata.data.sold });
        dispatch({ type: "category", payload: metadata.data.category });
        setDescription(metadata.data.description);
      })
      .catch((err) =>
        console.log("Lỗi: ", err, "Tại: ", "client/src/pages/Product.jsx")
      );
  }, [id]);

  useEffect(() => {
    fetch(`${host.dev}/api/category/${product.category}`)
      .then((res) => res.json())
      .then((metadata) => {
        setCategoryAttributes(metadata.data.attributes);
      });
  }, [product?.category]);

  const accessToken = Cookies.get("access-token");
  const userId = Cookies.get("user-id");

  const handleDeleteProduct = () => {
    fetch(`${host.dev}/api/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "user-id": userId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsShowDeleteModal(false);
          window.location.href = "/admin/products";
        }
      });
  };

  const handleEditProduct = () => {
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
    });
    fetch(`${host.dev}/api/product/${id}`, {
      method: "PUT",
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
          setIsShowEditModal(false);
          window.location.href = "/admin/products";
        }
        else {
          alert(data.message);
        }
      });
  };

  return (
    <div className="adminProductPage">
      <SideBar />
      <div className="adminProductPage__content">
        <div className="adminProductPage__content__header">
          {!isEdit ? (
            <>
              <div
                className="adminProductPage__content__header__item"
                onClick={() => setIsShowDeleteModal(true)}
              >
                Xóa sản phẩm
              </div>

              <div
                className="adminProductPage__content__header__item"
                onClick={() => setIsEdit(true)}
              >
                Sửa sản phẩm
              </div>
            </>
          ) : (
            <>
              <div
                className="adminProductPage__content__header__item"
                onClick={() => {
                  setIsEdit(false)
                  window.location.reload();
                }}
              >
                Hủy
              </div>

              <div
                className="adminProductPage__content__header__item"
                onClick={() => setIsShowEditModal(true)}
              >
                Lưu
              </div>
            </>
          )}
        </div>
        <div className="adminProductPage__content__body">
          <div className="adminProductPage__content__body__info">
            <div className="adminProductPage__content__body__info__item">
              <p>
                Đánh giá: {product.rating} ({product.reviews.length} đánh giá)
              </p>
            </div>
            <div className="adminProductPage__content__body__info__item">
              <p>Tên sản phẩm</p>
              <input
                type="text"
                value={product.name}
                disabled={!isEdit}
                onChange={(e) =>
                  dispatch({ type: "name", payload: e.target.value })
                }
              />
            </div>
            <div className="adminProductPage__content__body__info__item">
              <p>Slug</p>
              <input
                type="text"
                value={product.slug}
                disabled={!isEdit}
                onChange={(e) =>
                  dispatch({ type: "slug", payload: e.target.value })
                }
              />
            </div>
            <div className="adminProductPage__content__body__info__item">
              <p>Giá sản phẩm</p>
              <input
                type="number"
                value={product.price}
                disabled={!isEdit}
                onChange={(e) =>
                  dispatch({ type: "price", payload: e.target.value })
                }
              />
            </div>
            <div className="adminProductPage__content__body__info__item">
              <p>Giảm giá</p>
              <input
                type="number"
                value={product.discount}
                disabled={!isEdit}
                onChange={(e) =>
                  dispatch({ type: "discount", payload: e.target.value })
                }
              />
            </div>
            <div className="adminProductPage__content__body__info__item">
              <p>Số lượng</p>
              <input
                type="number"
                value={product.quantity}
                disabled={!isEdit}
                onChange={(e) =>
                  dispatch({ type: "quantity", payload: e.target.value })
                }
              />
            </div>

            <div className="adminProductPage__content__body__info__item">
              <p>Hình ảnh sản phẩm (link hình ảnh)</p>
              <input
                type="text"
                value={product.thumb}
                disabled={!isEdit}
                onChange={(e) =>
                  dispatch({ type: "thumb", payload: e.target.value })
                }
              />
              <img src={product.thumb} alt="" />
            </div>
            <div className="adminProductPage__content__body__info__item">
              <p>Mô tả sản phẩm</p>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                readOnly={!isEdit}
              />
            </div>
            <div className="adminProductPage__content__body__info__item">
              <p>Danh mục sản phẩm</p>
              <select
                value={product.category}
                disabled={!isEdit}
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
            <div className="adminProductPage__content__body__info__item">
              <p>Thuộc tính sản phẩm</p>
              <div className="adminProductPage__content__body__info__item__attributes">
                {categoryAttributes?.map((attribute, index) => (
                  <div key={index}>
                    <span>{attribute.name}</span>
                    <select
                      value={product.attributes[attribute.slug]}
                      disabled={!isEdit}
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
        {isShowDeleteModal && (
          <Modal
            title="Bạn có chắc muốn xóa sản phẩm này?"
            handleCloseModal={() => setIsShowDeleteModal(false)}
            handle={handleDeleteProduct}
          />
        )}
        {isShowEditModal && (
          <Modal
            title="Bạn có chắc muốn sửa sản phẩm này?"
            handleCloseModal={() => setIsShowEditModal(false)}
            handle={handleEditProduct}
          />
        )}
        {isShowDeleteModal && <div className="overlay"></div>}
      </div>
    </div>
  );
}
