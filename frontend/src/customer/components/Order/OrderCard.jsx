// OrderCard.jsx
import React from 'react';
import { 
  EyeIcon, 
  TruckIcon, 
  CalendarIcon,
  CurrencyDollarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

import { useNavigate } from "react-router-dom";

const OrderCard = ({ order, onViewDetails, statusBadge }) => {
  const StatusIcon = statusBadge.icon;

  const navigate = useNavigate();
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Order Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-lg font-bold text-gray-900">Order #{order.id}</h3>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-${statusBadge.color}-100 text-${statusBadge.color}-700`}>
                <StatusIcon className="h-3.5 w-3.5" />
                {statusBadge.text}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>Placed on {formatDate(order.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <CurrencyDollarIcon className="h-4 w-4" />
                <span className="font-semibold text-gray-900">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => navigate(`/order/${order.id}`)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all group/btn"
          >
            <EyeIcon className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
            View Details
          </button>
        </div>
      </div>

      {/* Order Items Preview */}
      <div className="p-6">
        <div className="flex flex-wrap gap-4">
          {order.items.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                <p className="text-xs text-indigo-600 font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300">
              <span className="text-xs font-medium text-gray-500">+{order.items.length - 3} more</span>
            </div>
          )}
        </div>

        {/* Mobile items info */}
        <div className="sm:hidden mt-3 space-y-1">
          {order.items.map((item, idx) => (
            <div key={idx} className="text-sm">
              <span className="text-gray-600">{item.name}</span>
              <span className="text-gray-400 mx-1">x</span>
              <span className="text-gray-600">{item.quantity}</span>
            </div>
          ))}
        </div>

        {/* Delivery Info */}
        {order.trackingNumber && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm">
              <TruckIcon className="h-4 w-4 text-indigo-500" />
              <span className="text-gray-600">Tracking #:</span>
              <span className="font-mono text-xs text-gray-900">{order.trackingNumber}</span>
              {order.estimatedDelivery && (
                <>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-600">Est. delivery: {formatDate(order.estimatedDelivery)}</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Shipping Address Preview */}
        <div className="mt-3 flex items-start gap-2 text-sm">
          <MapPinIcon className="h-4 w-4 text-gray-400 mt-0.5" />
          <span className="text-gray-500 text-xs">
            {order.address.fullName}, {order.address.addressLine1}, {order.address.city}, {order.address.state} - {order.address.pincode}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;