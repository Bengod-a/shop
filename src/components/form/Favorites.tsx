"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export interface Favorite {
  id: number;
  productId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

const Favorites = () => {
  const session = useSession();

  const RemoveFavorite = async (id: any) => {
    try {
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

      toast.success("ลบออกจากรายการที่ถูกใจ");
      session.update;
    } catch (error) {
      console.error(error);
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  };

  useEffect(() => {
    session.update();
  }, [RemoveFavorite]);

  return (
    <>
      <div>
        <h1 className="flex gap-2 text-center items-center">
          <Icon icon="mdi:heart" width="24" height="24" color="red" />
          <span className="font-bold text-[25px]">สถานะการสั่งซื้อ</span>
        </h1>
      </div>

      {session &&
      session.data &&
      session.data.user &&
      Array.isArray(session.data.user.favorite) &&
      session.data.user.favorite.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {session.data.user.favorite.map((item: any) => (
            <div key={item.id} className="bg-white rounded-md w-full">
              <div className="relative aspect-square">
                <Image
                  src={item.product?.images?.[0]?.url || "/placeholder.jpg"}
                  alt={item.product?.title || "Favorite Product"}
                  fill
                  className="object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
                  priority={item.product?.id === 1}
                />
              </div>
              <div className="p-2 w-full">
                <p className="line-clamp-1">{item.product?.title}</p>
                <p>{item.product?.price ? `${item.product.price} บาท` : 0}</p>
              </div>
              <div className="p-2 flex gap-2 w-full">
                <Link
                  href={`/product/${item.product.id}`}
                  className="bg-red-600 text-center felx items-center justify-center p-2 rounded-md w-[135px] h-[40px]"
                >
                  <Icon
                    icon="mdi-light:cart"
                    width="24"
                    height="24"
                    color="white"
                    className="mx-auto"
                  />
                </Link>
                <button
                  onClick={() => RemoveFavorite(item.product.id)}
                  className="bg-red-600 text-center felx items-center justify-center p-2 rounded-md w-[40px] h-[40px]"
                >
                  <Icon
                    icon="material-symbols-light:delete-outline-rounded"
                    width="24"
                    height="24"
                    color="white"
                    className="mx-auto"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-between py-4">
          <h5 className="text-gray-500">ไม่มีสินค้า</h5>
        </div>
      )}
    </>
  );
};

export default Favorites;
