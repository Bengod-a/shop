"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { CartItem } from "../../types/next-auth";



interface CPUProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}


const HDD = ({ cartItems, setCartItems }: CPUProps) => {
  const [selectedOption, setSelectedOption] = useState("ราคาต่ำ-สูง");
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const options = [
    { value: "low-to-high", label: "ราคาต่ำ-สูง" },
    { value: "high-to-low", label: "ราคาสูง-ต่ำ" },
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/product/fetchproduct", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("ไม่สามารถดึงข้อมูลสินค้าได้");
      const data: CartItem[] = await response.json();
      const filteredData = data.filter((product) => product.categoryId === 12); 
      setProducts(filteredData);
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      toast.error("ไม่สามารถดึงข้อมูลสินค้าได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product: CartItem) => {
    if (!session?.user) {
      toast.error("กรุณาล็อกอินก่อน");
      return;
    }

    let cart = { itemsDIY: [...cartItems] };

    const existingCategoryIndex = cart.itemsDIY.findIndex(
      (item) => item.categoryId === product.categoryId
    );

    if (existingCategoryIndex >= 0) {
      cart.itemsDIY[existingCategoryIndex] = { ...product, quantity: 1 };
      toast.success(`แทนที่สินค้าในหมวดหมู่ ${product.category.name} แล้ว!`);
    } else {
      cart.itemsDIY.push({ ...product, quantity: 1 });
      toast.success(`เพิ่มสินค้าในหมวดหมู่ ${product.category.name} แล้ว!`);
    }

    localStorage.setItem("cartDIY", JSON.stringify(cart));
    setCartItems(cart.itemsDIY);
  };

  const handleSelect = (option: { value: string; label: string }) => {
    setSelectedOption(option.label);
    setIsOpen(false);

    const sortedProducts = [...products].sort((a, b) =>
      option.value === "low-to-high" ? a.price - b.price : b.price - a.price
    );
    setProducts(sortedProducts);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h1 className="font-bold text-[15px] md:text-[17px] text-gray-800 mb-4">
          ซีพียู
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-1/2">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              id="search"
              type="search"
              placeholder="ค้นหาสินค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm hover:shadow-md transition-all duration-200"
            />
          </div>

          <div className="relative w-full sm:w-1/3">
            <div
              className="flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md focus-within:ring-2 focus-within:ring-red-500 transition-all duration-200 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="text-gray-700">{selectedOption}</span>
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <p className="text-center text-gray-600">กำลังโหลด...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600">ไม่พบสินค้า</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:h-[384px] md:w-[190px] w-[175px] h-[300px]"
              >
                <div className="relative aspect-square md:h-[189px] md:w-[189px] h-[148px] w-[148px]">
                  <Image
                    src={product?.images?.[0]?.url || "/default-image.jpg"}
                    alt={product.title}
                    fill
                    className="object-cover rounded-t-lg hover:scale-105 transition-transform duration-300 w-full h-full"
                    priority={product.id === 1}
                  />
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h1 className="text-[14px] text-gray-800 font-semibold line-clamp-2">
                      {product.title}
                    </h1>
                    <p className="text-[12px] text-gray-600 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[15px] font-bold text-red-600">
                      ฿{product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                    >
                      <PlusIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HDD;