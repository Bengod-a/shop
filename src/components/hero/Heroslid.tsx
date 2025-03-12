"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

const Heroslid = () => {
  return (
    <div className="flex items-center justify-center mt-8">
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={0}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          400: {
            slidesPerView: 1,
          },
          500: {
            slidesPerView: 1,
          },
          750: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full max-w-[1200px] mySwiper" 
      >
        <SwiperSlide className="relative flex items-center justify-center rounded-xl">
          <Image
            className="object-contain transform group-hover:scale-105 transition-transform duration-300 w-full h-[400px] rounded-xl"
            src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/1735668866677434824d0d8.jpg"
            alt=""
            width={1200}
            height={400}
            priority
            />
        </SwiperSlide>

        <SwiperSlide className="relative rounded-xl">
          <Image
            className="object-contain transform group-hover:scale-105 transition-transform duration-300 w-full h-[400px] rounded-xl"
            src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/1735668866677434824d0d8.jpg"
            alt=""
            width={1200}
            height={400}
            priority
          />
        </SwiperSlide>

        <SwiperSlide className="relative rounded-xl">
          <Image
            className="object-contain transform group-hover:scale-105 transition-transform duration-300 w-full h-[400px] rounded-xl"
            src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/1735668866677434824d0d8.jpg"
            alt=""
            width={1200}
            height={400}
            priority
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Heroslid;
