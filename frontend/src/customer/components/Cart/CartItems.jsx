// CartItem.jsx
import React from 'react';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const {
    id,
    name,
    price,
    color,
    size,
    quantity,
    image,
    rating = 4,
  } = item;

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    } else {
      onRemove(id);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const itemTotal = price * quantity;

  return (
    <div className="group relative flex flex-col sm:flex-row gap-6 py-6 border-b border-gray-100 last:border-0 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-transparent transition-all duration-300 -mx-4 px-4 rounded-2xl">
      {/* Product Image */}
      <div className="relative sm:w-32 sm:h-32 w-full h-48 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 shadow-md group-hover:shadow-lg transition-all duration-300">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        {/* Stock badge */}
        <div className="absolute top-2 left-2 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full">
          In Stock
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          {/* Product Name */}
          <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
            {name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-4 w-4 ${
                    rating > star ? 'text-amber-400' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({rating}.0)</span>
          </div>

          {/* Variants */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500">Color:</span>
              <div className="flex items-center gap-1">
                <div 
                  className={`h-4 w-4 rounded-full ${color.classes || `bg-${color.id}-500`} ring-1 ring-gray-300`}
                  style={color.classes ? undefined : { backgroundColor: color.value }}
                />
                <span className="text-gray-700 text-xs font-medium">{color.name}</span>
              </div>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500">Size:</span>
              <span className="text-gray-700 text-xs font-medium uppercase">{size}</span>
            </div>
          </div>

          {/* Mobile Price */}
          <div className="sm:hidden">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Price:</span>
              <span className="text-lg font-bold text-gray-900">${itemTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Quantity Controls & Price */}
        <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1 shadow-inner">
            <button
              onClick={handleDecrease}
              className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Decrease quantity"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="w-10 text-center font-semibold text-gray-800 text-sm">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Increase quantity"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Desktop Price */}
          <div className="hidden sm:block min-w-[100px] text-right">
            <p className="text-lg font-bold text-gray-900">${itemTotal.toFixed(2)}</p>
            <p className="text-xs text-gray-400">${price.toFixed(2)} each</p>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(id)}
            className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group/remove"
            aria-label="Remove item"
          >
            <TrashIcon className="h-5 w-5 group-hover/remove:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;