"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  category: { id: number; name: string };
  images: { url: string }[];
}

interface Category {
  name: string;
  href: string;
}

interface ModalProps {
  setShowModal: (show: boolean) => void;
  cartItems: CartItem[];
  onConfirm: () => void;
  filteredCategories: Category[];
  deleteItem: (id: number) => void;
  deleteAllItem: () => void;
}

const ModalMD = ({
  setShowModal,
  cartItems,
  onConfirm,
  filteredCategories,
  deleteItem,
  setActivePage,
  activePage,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleConfirm = () => {
    onConfirm();
    localStorage.setItem("cart", JSON.stringify({ items: cartItems }));
    localStorage.removeItem("cartDIY");
    setShowModal(false);
  };

  const totalPrice = cartItems.reduce(
    (sum: any, item: any) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white p-4 rounded-xl text-center block md:hidden"
      >
        <button className="p-2 text-gray-950 rounded-lg transition-colors duration-200 flex items-center gap-2 justify-center">
          <Icon icon="lucide:arrow-left" width="24" height="24" />
          ดูรายการจัดสเปคคอม
        </button>

        <div
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white border-r border-gray-800`}
        >
          <div className="flex justify-between w-full p-4">
            <h1 className="text-lg font-semibold">ยอดรวมทั้งสิ้น</h1>
            <h1 className="text-red-600 text-lg font-semibold">
              ฿{totalPrice.toLocaleString()}
            </h1>
          </div>

          <div className="flex-col gap-3 max-w-[300px] mx-auto p-2 mb-2">
            {filteredCategories.map((item: any) => (
              <button
                key={item.name}
                onClick={() => setActivePage(item.href)}
                className={`flex mt-3 items-center justify-start gap-3 p-3 h-[45px] w-full text-left rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ${
                  activePage === item.href
                    ? "bg-white text-gray-800"
                    : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="font-medium truncate">{item.name}</span>
              </button>
            ))}
          </div>

          {cartItems.length > 0 && (
            <div className="flex flex-col gap-2 p-2">
              {cartItems.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 w-full">
                    <Image
                      src={item.images[0]?.url}
                      alt={item.title}
                      width={40}
                      height={40}
                      className="object-cover rounded-md"
                    />
                    <div className="flex flex-col flex-1">
                      <span className="text-gray-800 font-medium truncate line-clamp-1 w-[90px]">
                        {item.title}...
                      </span>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">
                          {item.category.name}
                        </span>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="bg-slate-100 rounded-full p-1 hover:bg-slate-200"
                        >
                          <Icon
                            icon="uiw:delete"
                            width="22"
                            height="22"
                            color="red"
                            className="p-[3px]"
                          />
                        </button>
                      </div>
                      <span className="text-gray-600 text-[11px]">
                        ฿{(item.price * (item.quantity || 1)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-3 max-w-[300px] mx-auto p-2 mb-2">
            {cartItems.length > 0 && (
              <button
                onClick={() => setShowModal(true)}
                className="flex bg-red-500 p-2 rounded-md text-white"
              >
                <Icon icon="ri:tools-line" width="24" height="24" />
                สร้างชุดสเปคคอม
              </button>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ModalMD;
