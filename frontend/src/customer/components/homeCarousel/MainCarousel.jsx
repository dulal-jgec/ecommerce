import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { carouselData } from "./MainCaroselData.js";

const MainCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
    >
      {carouselData.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="h-[400px] relative">
            
            {/* Image */}
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-10">
              
              <h2 className="text-white text-4xl font-bold mb-3">
                {item.title}
              </h2>

              <p className="text-gray-200 text-lg mb-5">
                {item.subtitle}
              </p>

              <button className="bg-white text-black px-6 py-2 rounded-full w-fit hover:bg-gray-200 transition">
                Shop Now
              </button>

            </div>

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainCarousel;