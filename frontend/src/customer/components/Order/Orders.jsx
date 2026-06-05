// Order.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  ArchiveBoxIcon, // ✅ instead of ArchiveBoxIcon
  XCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import OrderCard from "./OrderCard";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Sample orders data - replace with API call
  useEffect(() => {
    const fetchOrders = async () => {
      // Simulate API call
      setTimeout(() => {
        const sampleOrders = [
          {
            id: "ORD-12345",
            date: "2024-03-15",
            status: "delivered",
            total: 287.99,
            items: [
              {
                id: 1,
                name: "Basic Tee 6-Pack",
                quantity: 1,
                price: 192.0,
                image:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
              },
              {
                id: 2,
                name: "Premium Hoodie",
                quantity: 1,
                price: 89.0,
                image:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
              },
            ],
            trackingNumber: "1Z999AA10123456784",
            estimatedDelivery: "2024-03-20",
            address: {
              fullName: "John Doe",
              addressLine1: "123 Main Street",
              city: "New York",
              state: "NY",
              pincode: "10001",
            },
          },
          {
            id: "ORD-12346",
            date: "2024-03-10",
            status: "shipped",
            total: 156.5,
            items: [
              {
                id: 3,
                name: "Slim Fit Jeans",
                quantity: 2,
                price: 79.0,
                image:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
              },
            ],
            trackingNumber: "1Z999AA10123456785",
            estimatedDelivery: "2024-03-18",
            address: {
              fullName: "John Doe",
              addressLine1: "123 Main Street",
              city: "New York",
              state: "NY",
              pincode: "10001",
            },
          },
          {
            id: "ORD-12347",
            date: "2024-03-05",
            status: "processing",
            total: 423.99,
            items: [
              {
                id: 1,
                name: "Basic Tee 6-Pack",
                quantity: 2,
                price: 192.0,
                image:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
              },
              {
                id: 4,
                name: "Winter Jacket",
                quantity: 1,
                price: 89.99,
                image:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
              },
            ],
            address: {
              fullName: "John Doe",
              addressLine1: "123 Main Street",
              city: "New York",
              state: "NY",
              pincode: "10001",
            },
          },
        ];
        setOrders(sampleOrders);
        setLoading(false);
      }, 1000);
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      delivered: { color: "emerald", icon: CheckCircleIcon, text: "Delivered" },
      shipped: { color: "blue", icon: TruckIcon, text: "Shipped" },
      processing: { color: "amber", icon: ClockIcon, text: "Processing" },
      cancelled: { color: "red", icon: XCircleIcon, text: "Cancelled" },
    };
    return badges[status] || badges.processing;
  };

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === "all" || order.status === filter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: orders.length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    processing: orders.filter((o) => o.status === "processing").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="h-12 w-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
   <div className="bg-[linear-gradient(to_bottom,var(--light-bg),#ecfdf5)]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            My Orders
          </h1>
          <p className="text-gray-500 mt-1">
            Track and manage all your orders in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
                <p className="text-xs text-gray-500">Total Orders</p>
              </div>
              <ArchiveBoxIcon className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-emerald-600">
                  {stats.delivered}
                </p>
                <p className="text-xs text-gray-500">Delivered</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.shipped}
                </p>
                <p className="text-xs text-gray-500">In Transit</p>
              </div>
              <TruckIcon className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-amber-600">
                  {stats.processing}
                </p>
                <p className="text-xs text-gray-500">Processing</p>
              </div>
              <ClockIcon className="h-8 w-8 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID or product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <FunnelIcon className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">
                  Filter:{" "}
                  {filter === "all"
                    ? "All Orders"
                    : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </span>
                <ChevronDownIcon
                  className={`h-4 w-4 text-gray-500 transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </button>

              {showFilters && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                  {[
                    "all",
                    "processing",
                    "shipped",
                    "delivered",
                    "cancelled",
                  ].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilter(status);
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        filter === status
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-700"
                      }`}
                    >
                      {status === "all"
                        ? "All Orders"
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
              <ArchiveBoxIcon className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't placed any orders yet or no orders match your filters.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={() => navigate(`/order/${order.id}`)}
                statusBadge={getStatusBadge(order.status)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
