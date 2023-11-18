import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import { useContext } from 'react'
import Cookies from 'js-cookie'

// import { useAuth } from './context/AuthContext'

import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Category from './pages/Category'
import Product from './pages/Product'
import CartPage from './pages/CartPage'
import CheckOut from './pages/CheckOut'
import ResponseCheckout from './pages/ResponseCheckout'
import SearchPage from './pages/SearchPage'
import Policy from './pages/Policy'
import Contact from './pages/Contact'

function App() {
  // const { user } = useAuth()

  const user = Cookies.get('token') ? true : false

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:categoryName" element={<Category />} />
        <Route path="/:categoryName/:productSlug" element={<Product />} />
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
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </Router>
  )
}


export default App



