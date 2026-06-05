import React from "react";

const HomeSectionCard = ({ product }) => {
  return (
    <div className="cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition p-2 sm:p-3">
      
      {/* Image Container (responsive) */}
      <div className="w-full aspect-[4/5] overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Info */}
      <div className="mt-2 text-center px-1">
        <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-800 line-clamp-1">
          {product.title}
        </h3>

        <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-1 line-clamp-1">
          {product.subtitle}
        </p>
      </div>
    </div>
  );
};

export default HomeSectionCard;