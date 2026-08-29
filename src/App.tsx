import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Products from './components/Products'
import Custom from './components/Custom'

import Cart from './pages/Cart'
import Register from './pages/Register'
import Login from './pages/Login'
import Admin from './pages/Admin'
import AdminProducts from './pages/AdminProducts'
import Shop from './pages/Shop'

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Products />
      <Custom />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products" element={<AdminProducts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App