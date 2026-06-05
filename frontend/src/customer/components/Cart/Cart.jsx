// Cart.jsx
import React, { useState, useEffect } from 'react';
import { 
  ShoppingBagIcon, 
  ArrowRightIcon, 
  CreditCardIcon, 
  TruckIcon,
  ShieldCheckIcon,
  XMarkIcon,
  TagIcon
} from '@heroicons/react/24/outline';

import CartItem from './CartItems';
import { useCart } from "../../../context/CartContext";

import { Link } from "react-router-dom";


import {
  calculateSubtotal,
  calculateShipping,
  calculateTax,
  calculateTotal
} from "../../../utils/cartUtils.js";

// Sample cart data - replace with your actual data source


const Cart = () => {
 // const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);


  const { cartItems, updateQuantity, removeFromCart } = useCart();




  

  // Calculate totals
const subtotal = calculateSubtotal(cartItems);
const shipping = calculateShipping(subtotal);
const tax = calculateTax(subtotal);
const total = calculateTotal(subtotal, shipping, tax, discount);

const handleUpdateQuantity = (id, newQuantity) => {
  updateQuantity(id, newQuantity);
};

const handleRemoveItem = (id) => {
  removeFromCart(id);
};

  // Handle promo code
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE20' && !promoApplied) {
      setDiscount(subtotal * 0.2);
      setPromoApplied(true);
    } else if (promoCode.toUpperCase() === 'SAVE10' && !promoApplied) {
      setDiscount(subtotal * 0.1);
      setPromoApplied(true);
    } else if (promoApplied) {
      // Already applied
    } else {
      alert('Invalid promo code');
    }
  };

  const handleRemovePromo = () => {
    setDiscount(0);
    setPromoApplied(false);
    setPromoCode('');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
              <ShoppingBagIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>

               <Link
  to="/products"
  className="flex justify-center items-center gap-1 font-medium text-indigo-600 hover:text-indigo-700 group"
>
  Continue Shopping
  <ArrowRightIcon className="h-4 w-4 rotate-180 transform transition-transform group-hover:-translate-x-1" />
</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[linear-gradient(to_bottom,var(--light-bg),#ecfdf5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Shopping Cart
              </h1>
              <p className="text-gray-500 mt-1">
                You have {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
              </p>
            </div>
            <Link to="/products"
              className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 group"
            >
               
              <ArrowRightIcon className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
             Continue Shopping
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="hidden sm:flex sm:items-center sm:justify-between pb-4 border-b border-gray-100 mb-2">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Product</span>
                  <div className="flex items-center gap-12">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider w-[100px] text-center">
                      Quantity
                    </span>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider w-[100px] text-right">
                      Total
                    </span>
                    <span className="w-8" />
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="p-2 bg-emerald-50 rounded-full">
                  <TruckIcon className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="p-2 bg-indigo-50 rounded-full">
                  <ShieldCheckIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Secure Checkout</p>
                  <p className="text-xs text-gray-500">100% secure payment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                  
                  {/* Promo Code */}
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promo code"
                          disabled={promoApplied}
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all disabled:bg-gray-50 disabled:text-gray-400"
                        />
                      </div>
                      <button
                        onClick={handleApplyPromo}
                        disabled={promoApplied || !promoCode}
                        className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Apply
                      </button>
                    </div>
                    {promoApplied && (
                      <div className="mt-2 flex items-center justify-between bg-emerald-50 rounded-lg px-3 py-2">
                        <span className="text-xs text-emerald-700 font-medium">
                          Promo applied: ${discount.toFixed(2)} off
                        </span>
                        <button onClick={handleRemovePromo} className="text-emerald-500 hover:text-emerald-700">
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-3 pb-4 border-b border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="text-gray-900 font-medium">
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tax (8%)</span>
                      <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-600">Discount</span>
                        <span className="text-emerald-600 font-medium">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-4 pb-6">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-200 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group">
                    <CreditCardIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    Proceed to Checkout
                    <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Payment Methods */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 text-center mb-3">We accept</p>
                    <div className="flex justify-center gap-3">
                      {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method) => (
                        <span key={method} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended */}
              <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50/30 to-purple-50/30 rounded-xl border border-indigo-100">
                <p className="text-xs text-indigo-600 font-medium uppercase tracking-wide">Special Offer</p>
                <p className="text-sm text-gray-700 mt-1">
                  Add <span className="font-semibold">2 more items</span> to get extra 10% off!
                </p>
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-1/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;