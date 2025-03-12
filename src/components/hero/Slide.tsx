"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

const Slide = () => {
  return (
    <div className="flex items-center justify-center mt-2">
      <Swiper
        slidesPerView={3}
        // centeredSlides={true}
        spaceBetween={6}
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
            slidesPerView: 3,
          },
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full max-w-[1200px]"
      >
          <SwiperSlide className="relative flex items-center justify-center">
            <Image
              className="object-cover transform group-hover:scale-105 transition-transform duration-300 w-full h-auto rounded-xl"
              src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/17375116956790530fe1af7."
              alt=""
              width={380}
              height={200}
              priority
            />
          </SwiperSlide>

        <SwiperSlide className="relative">
          <Image
            className="object-cover transform group-hover:scale-105 transition-transform duration-300 w-full h-auto rounded-xl"
            src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/173750983467904bca847e6.jpg"
            alt=""
            width={380}
            height={200}
            priority
          />
        </SwiperSlide>

        <SwiperSlide className="relative">
          <Image
            className="object-cover transform group-hover:scale-105 transition-transform duration-300 w-full h-auto rounded-xl"
            src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/slidebanner/173751169767905311438ca."
            alt=""
            width={380}
            height={200}
            priority
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slide;
