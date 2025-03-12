"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const NewProduct = () => {
  interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    images: { url: string }[];
    createdAt: string;
  }

  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/api/product/fetchproduct", {
          method: "GET",
        });
        const data: Product[] = await response.json();
        
        data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
        const limitedProducts = data.slice(0, 12);
        
        setProduct(limitedProducts);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchProduct();
  }, []);
  

  return (
    <div className="w-full mb-10 mt-10">
      <div className="w-full max-w-[1200px] mx-auto text-left mt-6 pl-4">
        <span className="flex gap-2 items-center ">
          <svg
            className="injected-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            data-src="/assets/images/icons/new-product-1.svg"
          >
            <g clipPath="url(#clip0-80)">
              <path
                d="M22.9347 12.001L24 10.1003L22.3995 8.62199L22.8254 6.48519L20.8463 5.57376L20.5911 3.40991L18.4273 3.15468L17.5158 1.17562L15.379 1.60157L13.9006 0.000976562L12 1.0663L10.0994 0.000976562L8.62106 1.60152L6.48427 1.17557L5.57283 3.15463L3.40898 3.40987L3.15375 5.57371L1.17469 6.48515L1.60064 8.62194L0 10.1003L1.06533 12.0009L0 13.9016L1.60055 15.3799L1.17459 17.5167L3.15366 18.4281L3.40889 20.592L5.57273 20.8472L6.48417 22.8263L8.62097 22.4003L10.0993 24.0009L11.9999 22.9356L13.9005 24.0009L15.3788 22.4003L17.5156 22.8263L18.4271 20.8472L20.5909 20.592L20.8462 18.4281L22.8252 17.5167L22.3993 15.3799L23.9998 13.9016L22.9347 12.001ZM8.62936 14.0641H7.61878L5.78016 11.7887V14.0641H4.50881V9.43504H5.49984L7.35802 11.7887V9.43504H8.62936V14.0641ZM12.7238 14.0641H9.42483V9.43504H12.6652V10.5434H10.6962V11.1954H12.3783V12.2255H10.6962V12.9557H12.7239V14.0641H12.7238ZM18.0765 14.0641H17.0203L16.3618 12.408L15.7098 14.0641H14.6536L12.8411 9.43504H14.2168L15.2209 12.6102L15.5403 11.6453L14.7905 9.43504H15.9576L16.3618 10.8629L16.7726 9.43504H17.9397L17.1768 11.6453L17.5094 12.6102L18.507 9.43504H19.8891L18.0765 14.0641Z"
                fill="#68C944"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0-80">
                <rect width="24" height="24" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
          <h1 className="text-base font-bold">สินค้าใหม่</h1>
        </span>
      </div>

      <div className="flex justify-center mt-6">
        <Swiper
          slidesPerView={6}
          centeredSlides={false}
          spaceBetween={10}
          breakpoints={{
            300: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 6 },
          }}
          navigation={true}
          observer={true}
          observeParents={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper w-full max-w-[1200px]"
        >
          {product.map((item: any) => (
            <SwiperSlide
              key={item.id}
              className="relative flex flex-col items-center bg-white p-4 rounded-lg mb-6"
            >
              <Link href={`/product/${item.id}`}>
                <div className="relative group">
                  <Image
                    className="object-cover rounded-md hover:scale-105 transition-all duration-300"
                    src={item.images?.[0]?.url}
                    alt={item.title}
                    width={380}
                    height={200}
                    priority
                  />

                </div>

                <p className="mt-11 text-sm text-gray-800 text-left line-clamp-1  leading-4 font-semibold max-w-[300px]">
                  {item.title}
                </p>

                <p className="mt-1 text-[12px] text-gray-400 text-left line-clamp-2 leading-4 max-w-[188px] opacity-70">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center   w-full">
                  <span className="text-base font-bold text-black">
                    ฿{item.price.toLocaleString()}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewProduct;
