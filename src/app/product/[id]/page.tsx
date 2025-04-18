"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbars from "../../../components/navbar/Navbars";
import Image from "next/image";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useSession } from "next-auth/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import Loading from "../../../components/loadeing/Loading";
import { Minus, Plus } from "lucide-react";
import Favorites from "../../../components/form/Favorites";

type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  images: { url: string }[];
};

const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [categoryProduct, setCategoryProduct] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const  session = useSession();
  const [cartItems, setCartItems] = useState<
    {
      id: number;
      quantity: number;
      title: string;
      price: number;
      images: any;
    }[]
  >([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const productId = id as any;


  useEffect(()=>{
    session.update
  }, [])


  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/product/fetchproductid/${id}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const data = (await response.json()) as ProductType;
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    if (product) {
      const fetchAndFilterCategoryProduct = async () => {
        try {
          const response = await fetch(
            `/api/product/fetchcategoryproduct?categoryId=${product.categoryId}`,
            { method: "GET" }
          );
          const data = await response.json();
          const filteredData = data.filter(
            (item: ProductType) => item.id !== product.id
          );
          setCategoryProduct(filteredData);
        } catch (error) {
          console.error(error);
        }
      };
      fetchAndFilterCategoryProduct();
    }
  }, [product]);

  const addToCart = () => {
    if (!session?.data?.user) {
      toast.error("กรุณาล็อกอินก่อนเพิ่มสินค้าในตะกร้า");
      return;
    }
    if (!product) {
      toast.error("ไม่พบสินค้า");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || '{"items": []}');
    const existingProductIndex = cart.items.findIndex(
      (item: ProductType) => item.id === product.id
    );

    if (existingProductIndex >= 0) {
      cart.items[existingProductIndex].quantity += quantity;
    } else {
      cart.items.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCartItems(cart.items);
    toast.success("เพิ่มสินค้าในตะกร้าแล้ว!");
  };

  const decreaseQuantity = () => {
    if (quantity > 1 && product) {
      setQuantity((e) => e - 1);
      setPrice((e) => e - product.price);
    }
  };

  const increaseQuantity = () => {
    if (!product) return;
    if (quantity < product.quantity) {
      setQuantity((e) => e + 1);
      setPrice((e) => e + product.price);
    } else {
      toast.error("สินค้าหมด");
    }
  };

  useEffect(() => {
    if (session?.data?.user?.favorite?.includes(productId)) {
      setIsFavorite(true);
    }
  }, [session, id]);

  const AddFavorite = async () => {
    try {
      if (isFavorite) {
        const response = await fetch(`/api/user/RemoveFavorite/${id}`, {
          method: "DELETE",
          body: JSON.stringify({ userId: session?.data?.user.id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          toast.error("เกิดข้อผิดพลาดในการลบ");
          return;
        }
  
        setIsFavorite(false);
        toast.success("ลบออกจากรายการที่ถูกใจ");
      } else {
        const response = await fetch(`/api/user/AddFavorite/${id}`, {
          method: "POST",
          body: JSON.stringify({ userId: session?.data?.user.id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          toast.error("เกิดข้อผิดพลาดในการเพิ่ม");
          return;
        }
  
        setIsFavorite(true);
        toast.success("เพิ่มเข้ารายการที่ถูกใจ");
      }
    } catch (error) {
      console.error(error);
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  };
  
  
  
  useEffect(() => {
    if (session?.data?.user?.id && product) {
      fetchFavoriteStatus();
    }
  }, [session, product]);
  const fetchFavoriteStatus = async () => {
    if (!session?.data?.user.id || !product) return;
  
    try {
      const response = await fetch(`/api/user/checkFavorite/${id}?userId=${session?.data?.user.id}`, {
        method: "GET",
      });
  
      if (response.ok) {
        const data = await response.json();
        setIsFavorite(data.isFavorite);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  useEffect(()=>{
    fetchFavoriteStatus()
  },[])

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      setPrice(product.price * quantity);
    }
  }, [quantity, product]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Navbars />
      <div className="max-w-[1200px] w-full px-4 md:px-8 lg:px-0 flex items-center justify-center">
        {product ? (
          <div className="py-10 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
              <div className="relative group flex justify-center">
                <Image
                  className="object-cover transform transition-transform duration-300 rounded-md bg-gray-700"
                  src={product.images[0]?.url || "/default-image.jpg"}
                  alt={product.title}
                  width={330}
                  height={330}
                  priority
                />
              </div>

              <div className="w-full">
                {product.quantity > 0 ? (
                  <div className="bg-green-300 rounded-md flex items-center justify-center w-[100px]">
                    <p className="text-green-900 font-bold">มีสินค้า</p>
                  </div>
                ) : (
                  <div className="bg-red-300 rounded-md flex items-center justify-center w-[100px]">
                    <p className="text-red-900 font-bold">สินค้าหมด</p>
                  </div>
                )}

                <div className="mt-4">
                  <h1 className="line-clamp-3 w-full text-lg">
                    {product.description}
                  </h1>
                </div>

                <div className="mt-5">
                  <p className="text-xl text-red-700">
                    ฿{new Intl.NumberFormat().format(price)}.00
                  </p>
                </div>

                <div className="py-7">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={decreaseQuantity}
                      className="px-2 py-2 bg-gray-200 hover:bg-red-600 hover:text-white duration-300 border border-red-500 text-black rounded-md"
                    >
                      <Minus />
                    </button>
                    <p className="text-lg font-bold">{quantity}</p>
                    <button
                      onClick={increaseQuantity}
                      className="px-2 py-2 bg-gray-200 hover:bg-red-600 hover:text-white duration-300 border border-red-500 text-black rounded-md"
                    >
                      <Plus />
                    </button>

                    <div className="border border-red-600 rounded-md">
                      <button
                        onClick={addToCart}
                        className="flex gap-2 py-2 px-6 text-red-700 font-bold hover:bg-red-700 hover:text-white duration-300"
                      >
                        <Icon
                          icon="solar:bag-5-broken"
                          width="24"
                          height="24"
                        />
                        เพิ่มในตะกร้า
                      </button>
                    </div>
                  </div>

                  <div className="border rounded-md mt-6 bg-red-700 flex items-center justify-center cursor-pointer">
                    {session?.data?.user.id ? (
                      <Link
                        onClick={addToCart}
                        href="/checkout"
                        className="py-2 px-6 font-bold text-white duration-300 w-full text-center"
                      >
                        ซื้อเลย
                      </Link>
                    ) : (
                      <Link
                        onClick={addToCart}
                        href="/login"
                        className="py-2 px-6 font-bold text-white duration-300 w-full text-center"
                      >
                        กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ
                      </Link>
                    )}
                  </div>
                </div>
                <hr />

                <button onClick={AddFavorite} className="mt-4">
                  <Icon
                    className={`bg-slate-100 border rounded-full p-1 ${
                      isFavorite ? "text-red-500" : "text-gray-500"
                    }`}
                    icon={isFavorite ? "mdi:heart" : "mdi:heart-outline"}
                    width="32"
                    height="32"
                  />
                </button>
              </div>

              <div className="bg-gray-100 p-2 rounded-md lg:max-w-[260px] md:max-w-[670]">
                <div className="group flex flex-col gap-1 pl-3 border-l-0 text-gray-600 hover:border-l-4 hover:border-red-500 hover:text-red-500 transition-all duration-200">
                  <div className="flex items-center gap-1">
                    <Icon icon="eva:car-outline" className="w-5 h-5" />
                    <span>ส่งฟรีทั่วไทย</span>
                  </div>
                  <span className="text-sm group-hover:text-red-500">
                    ช้อปครบ 5,000 บาทขึ้นไป
                  </span>
                </div>

                <div className="mt-5 group flex flex-col gap-1 pl-3 border-l-0 text-gray-600 hover:border-l-4 hover:border-red-500 hover:text-red-500 transition-all duration-200">
                  <div className="flex gap-1">
                    <Icon
                      icon="material-symbols:search-check-2-outline"
                      width="24"
                      height="24"
                    />
                    <span className="group-hover:text-red-500">
                      ผ่อนสูงสุด 10 เดือน
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 group-hover:text-red-500">
                    ผ่อนได้เลย เพียงแค่มีบัตรเครดิต
                  </span>
                </div>

                <div className="mt-5 group flex flex-col gap-1 pl-3 border-l-0 text-gray-600 hover:border-l-4 hover:border-red-500 hover:text-red-500 transition-all duration-200">
                  <div className="flex gap-1">
                    <Icon
                      icon="material-symbols-light:shopping-bag-outline-sharp"
                      width="24"
                      height="24"
                    />
                    <span className="group-hover:text-red-500">
                      รับเองที่ร้านลด 1000.-
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 group-hover:text-red-500">
                    รับสินค้าเองที่ร้านเพื่อรับส่วนลด เฉพาะคอมเซ็ตประกอบ
                  </span>
                </div>

                <div className="mt-5 group flex flex-col pl-3 border-l-0 text-gray-600 hover:border-l-4 hover:border-red-500 hover:text-red-500 transition-all duration-200">
                  <div className="flex gap-1">
                    <Icon icon="eva:car-outline" width="24" height="24" />
                    <span className="">เปลี่ยนคืนง่าย</span>
                  </div>
                  <span className="text-sm text-slate-600 group-hover:text-red-500">
                    ภายใน 7 วัน
                  </span>
                  <span className="text-[12px] text-red-600 pl-1">
                    *เงื่อนไขเป็นไปตามที่บริษัทกำหนด
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <p className="font-bold text-xl">จากหมวดหมู่เดียวกัน</p>
            </div>

            <footer className="flex justify-center mt-6">
              <Swiper
                slidesPerView={4}
                spaceBetween={15}
                breakpoints={{
                  300: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  910: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                pagination={{ clickable: true }}
                navigation={true}
                observer={true}
                observeParents={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper w-full max-w-[1200px]"
              >
                {categoryProduct.map((item) => (
                  <SwiperSlide
                    key={item.id}
                    className="relative flex flex-col items-center bg-white p-4 rounded-lg shadow-md mb-6 w-full sm:w-[180px] md:w-[200px] lg:max-w-[244px] h-auto sm:h-[350px] md:h-[380px] lg:max-h-[400px]"
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
                      <p className="mt-2 text-sm font-semibold">{item.title}</p>
                      <p className="mt-1 text-[12px] text-gray-400 text-left line-clamp-2 leading-4 max-w-[188px] opacity-70">
                        {item.description}
                      </p>
                      <div className="mt-5 flex items-center w-full">
                        <span className="text-base font-bold text-red-500">
                          ฿{item.price.toLocaleString()}
                        </span>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </footer>
          </div>
        ) : (
          <p className="text-center text-gray-600 py-10">ไม่พบสินค้า</p>
        )}
      </div>
    </div>
  );
};

export default Page;
