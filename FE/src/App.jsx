import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { useContext } from 'react'
// import Cookies from 'js-cookie'

import { useAuth } from "./context/AuthContext";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Category from "./pages/Category";
import Product from "./pages/Product";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import ResponseCheckout from "./pages/ResponseCheckout";
import SearchPage from "./pages/SearchPage";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";
import OrderPage from "./pages/OrderPage";
import PersonalPage from "./pages/PersonalPage";

import LoginAdmin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageUsers from "./pages/admin/ManageUsers";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminOrder from "./pages/admin/AdminOrder";
import AdminUser from "./pages/admin/AdminUser";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";

function App() {
  const { user, admin } = useAuth();

  // const user = Cookies.get('access-token') ? true : false

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:categoryName" element={<Category />} />
        <Route path="/product/:productSlug" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout/response" element={<ResponseCheckout />} />
        <Route path="/search/:searchValue" element={<SearchPage />} />
        <Route path="/policy/:policyName" element={<Policy />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        <Route path="/checkout" element={<CheckOut />} />
        {user ? (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route
              path={`/user/${user._id}/personal`}
              element={<PersonalPage />}
            />
            <Route path={`/user/${user._id}/order`} element={<OrderPage />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        {/* Admin */}
        {admin ? (
          <>
            <Route path="/admin/login" element={<Navigate to="/admin" />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/categories" element={<ManageCategories />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/categories/:id" element={<AdminCategory />} />
            <Route path="/admin/products/:id" element={<AdminProduct />} />
            <Route path="/admin/orders/:id" element={<AdminOrder />} />
            <Route path="/admin/users/:id" element={<AdminUser />} />
            <Route path="/admin/create-category" element={<CreateCategory />} />
            <Route path="/admin/create-product" element={<CreateProduct />} />
            
          </>
        ) : (
          <>
            <Route path="/admin/login" element={<LoginAdmin />} />
            <Route path="/admin" element={<Navigate to="/admin/login" />} />
            {/* <Route
              path="/admin/categories"
              element={<Navigate to="/admin/login" />}
            />
            <Route
              path="/admin/products"
              element={<Navigate to="/admin/login" />}
            />
            <Route
              path="/admin/orders"
              element={<Navigate to="/admin/login" />}
            />
            <Route
              path="/admin/users"
              element={<Navigate to="/admin/login" />}
            /> */}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
