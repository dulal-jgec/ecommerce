import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HomeSectionCarosel = ({ data, sectionTitle }) => {
  
  const swiperRef = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="px-4 lg:px-8 py-6 relative">

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {sectionTitle}
      </h2>

      {/* LEFT ARROW */}
      {!isBeginning && (
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </button>
      )}

      {/* RIGHT ARROW */}
      {!isEnd && (
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
        >
          <ArrowForwardIosIcon fontSize="small" />
        </button>
      )}

      {/* SWIPER */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        spaceBetween={12}
        slidesPerView={2}
        breakpoints={{
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <HomeSectionCard product={item} />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default HomeSectionCarosel;