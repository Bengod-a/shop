"use client";

import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  images: { url: string }[];
  categoryId: number;
  category: { id: number; name: string };
}

interface CpuProps {
  minPrice: number;
  maxPrice: number;
}

const Gpu = ({ minPrice, maxPrice }: CpuProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/product/fetchproduct", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: Product[] = await response.json();
      const filteredData = data.filter((product) => product.categoryId === 3);
      setProducts(filteredData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPrice && matchesSearch;
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">

      {loading ? (
        <p className="text-center text-gray-600">กำลังโหลด...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600">ไม่พบสินค้า</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            href={`/product/${product.id}`}
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gpu;