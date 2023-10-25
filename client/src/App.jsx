import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { useAuth } from './context/AuthContext'

import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Category from './pages/Category'
import Product from './pages/Product'

function App() {
  // const { user } = useAuth()

  const user = true

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:categoryName" element={<Category />} />
        <Route path="/:categoryName/:productId" element={<Product />} />
        
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



