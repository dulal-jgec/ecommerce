// OrderDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  PrinterIcon,
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import OrderTracker from './OrderTracker';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch order details - replace with API call
    setTimeout(() => {
      const sampleOrder = {
        id: orderId,
        date: '2024-03-15T10:30:00',
        status: 'shipped',
        paymentStatus: 'paid',
        total: 287.99,
        subtotal: 271.00,
        shipping: 5.00,
        tax: 11.99,
        items: [
          { 
            id: 1, 
            name: 'Basic Tee 6-Pack', 
            quantity: 1, 
            price: 192.00,
            image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            color: 'Black',
            size: 'M'
          },
          { 
            id: 2, 
            name: 'Premium Hoodie', 
            quantity: 1, 
            price: 89.00,
            image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            color: 'Navy Blue',
            size: 'L'
          }
        ],
        shippingAddress: {
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 234 567 8900',
          addressLine1: '123 Main Street',
          addressLine2: 'Apt 4B',
          city: 'New York',
          state: 'NY',
          pincode: '10001',
          country: 'United States'
        },
        billingAddress: {
          fullName: 'John Doe',
          addressLine1: '123 Main Street',
          city: 'New York',
          state: 'NY',
          pincode: '10001'
        },
        paymentMethod: {
          type: 'card',
          last4: '4242',
          brand: 'Visa'
        },
        trackingNumber: '1Z999AA10123456784',
        trackingUrl: 'https://track.example.com/1Z999AA10123456784',
        estimatedDelivery: '2024-03-20',
        timeline: [
          { status: 'Order Placed', date: '2024-03-15T10:30:00', completed: true, description: 'Your order has been placed' },
          { status: 'Processing', date: '2024-03-15T14:20:00', completed: true, description: 'Payment confirmed and order is being processed' },
          { status: 'Shipped', date: '2024-03-16T09:15:00', completed: true, description: 'Your order has been shipped' },
          { status: 'Out for Delivery', date: '2024-03-18T08:00:00', completed: false, description: 'Estimated delivery today' },
          { status: 'Delivered', date: null, completed: false, description: 'Will be delivered soon' }
        ]
      };
      setOrder(sampleOrder);
      setLoading(false);
    }, 1000);
  }, [orderId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Order not found</p>
          <button onClick={() => navigate('/orders')} className="text-indigo-600 hover:text-indigo-700">
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
 <div className="bg-[linear-gradient(to_bottom,var(--light-bg),#ecfdf5)]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Orders
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Order #{order.id}
              </h1>
              <p className="text-gray-500 mt-1">Placed on {formatDate(order.date)}</p>
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <PrinterIcon className="h-4 w-4" />
                Print
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <ArrowDownTrayIcon className="h-4 w-4" />
                Invoice
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md">
                <ChatBubbleLeftRightIcon className="h-4 w-4" />
                Need Help?
              </button>
            </div>
          </div>
        </div>

        {/* Order Tracker */}
        <div className="mb-8">
          <OrderTracker timeline={order.timeline} currentStatus={order.status} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Items and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-6 flex gap-4">
                    <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <div className="text-sm text-gray-500 mt-1 space-y-0.5">
                        <p>Quantity: {item.quantity}</p>
                        {item.color && <p>Color: {item.color}</p>}
                        {item.size && <p>Size: {item.size}</p>}
                      </div>
                      <p className="text-indigo-600 font-semibold mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="text-gray-900 font-medium capitalize">
                    {order.paymentMethod.brand} •••• {order.paymentMethod.last4}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Status</span>
                  <span className="text-emerald-600 font-medium capitalize">{order.paymentStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary and Address */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-900">${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="text-gray-900">${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-indigo-600">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
              </div>
              <div className="p-6 space-y-2 text-sm">
                <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
                <p className="text-gray-600">{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && <p className="text-gray-600">{order.shippingAddress.addressLine2}</p>}
                <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                <p className="text-gray-600">{order.shippingAddress.country}</p>
                <p className="text-gray-600">📞 {order.shippingAddress.phone}</p>
                <p className="text-gray-600">✉️ {order.shippingAddress.email}</p>
              </div>
            </div>

            {/* Tracking Info */}
            {order.trackingNumber && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="font-semibold text-gray-900 mb-2">Tracking Information</h3>
                <p className="text-sm text-gray-600 mb-2">Tracking Number: {order.trackingNumber}</p>
                <a 
                  href={order.trackingUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
                >
                  Track Package →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;