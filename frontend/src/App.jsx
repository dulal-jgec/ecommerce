import React from 'react'
import Navigation from './customer/components/navigation/Navigation'
import HomePages from './customer/pages/HomePage/HomePages'
import Footer from './customer/components/Footer/Footer'
import Product from './customer/components/Product/Product'

import ProductDetails from './customer/components/ProductDetails/ProductDetails'
import Cart from './customer/components/Cart/Cart'
import CheckOut from './customer/components/CheckOut/CheckOut'
import Orders from './customer/components/Order/Orders'
import OrderTracker from './customer/components/Order/OrderTracker'
import OrderDetails from './customer/components/Order/OrderDetails'

import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <>
      <Navigation />

      <Routes>

        {/* Home */}
        <Route path="/" element={<HomePages />} />

        {/* Products */}
        <Route path="/products" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Checkout */}
        <Route path="/checkout" element={<CheckOut />} />

        {/* Orders */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<OrderDetails />} />

        {/* (Optional) Order Tracker */}
        <Route path="/order-tracker" element={<OrderTracker />} />

      </Routes>

      <Footer />
    </>
  )
}

export default App