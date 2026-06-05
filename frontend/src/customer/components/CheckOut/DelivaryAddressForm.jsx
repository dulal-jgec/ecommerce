// DeliveryAddressForm.jsx
import React, { useState } from 'react';
import { MapPinIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/outline';

const DeliveryAddressForm = ({ onSubmit, initialData }) => {
  const [address, setAddress] = useState(initialData || {
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });
  
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!address.fullName) newErrors.fullName = 'Full name is required';
    if (!address.email) newErrors.email = 'Email is required';
    if (!address.phone) newErrors.phone = 'Phone number is required';
    if (!address.addressLine1) newErrors.addressLine1 = 'Address is required';
    if (!address.city) newErrors.city = 'City is required';
    if (!address.state) newErrors.state = 'State is required';
    if (!address.pincode) newErrors.pincode = 'PIN code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(address, shippingMethod);
    }
  };

  const shippingOptions = [
    { id: 'standard', name: 'Standard Delivery', price: 5, days: '5-7 business days', icon: TruckIcon },
    { id: 'express', name: 'Express Delivery', price: 15, days: '2-3 business days', icon: ClockIcon },
    { id: 'overnight', name: 'Overnight Delivery', price: 25, days: 'Next day delivery', icon: ClockIcon },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-indigo-500" />
          Delivery Information
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={address.fullName}
              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              className={`
                w-full px-4 py-3 border rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all
                ${errors.fullName ? 'border-red-500' : 'border-gray-200'}
              `}
              placeholder="John Doe"
            />
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={address.email}
              onChange={(e) => setAddress({ ...address, email: e.target.value })}
              className={`
                w-full px-4 py-3 border rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all
                ${errors.email ? 'border-red-500' : 'border-gray-200'}
              `}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              className={`
                w-full px-4 py-3 border rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all
                ${errors.phone ? 'border-red-500' : 'border-gray-200'}
              `}
              placeholder="+1 234 567 8900"
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Address Details</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={address.addressLine1}
            onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
            className={`
              w-full px-4 py-3 border rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all
              ${errors.addressLine1 ? 'border-red-500' : 'border-gray-200'}
            `}
            placeholder="Street address, P.O. Box"
          />
          {errors.addressLine1 && <p className="text-xs text-red-500 mt-1">{errors.addressLine1}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            value={address.addressLine2}
            onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all"
            placeholder="Apartment, suite, unit, etc."
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className={`
                w-full px-4 py-3 border rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all
                ${errors.city ? 'border-red-500' : 'border-gray-200'}
              `}
              placeholder="New York"
            />
            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              className={`
                w-full px-4 py-3 border rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all
                ${errors.state ? 'border-red-500' : 'border-gray-200'}
              `}
              placeholder="NY"
            />
            {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={address.pincode}
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
              className={`
                w-full px-4 py-3 border rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all
                ${errors.pincode ? 'border-red-500' : 'border-gray-200'}
              `}
              placeholder="10001"
            />
            {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              value={address.country}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TruckIcon className="h-5 w-5 text-indigo-500" />
          Shipping Method
        </h3>
        <div className="space-y-3">
          {shippingOptions.map((option) => {
            const Icon = option.icon;
            return (
              <label
                key={option.id}
                className={`
                  flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all
                  ${shippingMethod === option.id
                    ? 'border-indigo-500 bg-indigo-50/30'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={option.id}
                    checked={shippingMethod === option.id}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">{option.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{option.days}</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">
                  {option.price === 0 ? 'Free' : `$${option.price}`}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          className="flex-1 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
        >
          Back to Cart
        </button>
        <button
          type="submit"
          className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg shadow-indigo-200"
        >
          Continue to Summary
        </button>
      </div>
    </form>
  );
};

export default DeliveryAddressForm;