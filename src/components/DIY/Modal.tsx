"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { CartItem } from "../../types/next-auth";



interface ModalProps {
  setShowModal: (show: boolean) => void;
  cartItems: CartItem[];
  onConfirm: () => void;
}

const Modal = ({ setShowModal, cartItems, onConfirm }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const hideModal = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    onConfirm();
    localStorage.setItem("cart", JSON.stringify({ items: cartItems }));
    localStorage.removeItem("cartDIY");
    setShowModal(false);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden={!isOpen}
        className={`${
          isOpen ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50`} // เพิ่มพื้นหลังโปร่งใส
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl flex text-center items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <Icon icon="prime:list-check" width="24" height="24" /> รายการ
              </h3>
              <button
                type="button"
                onClick={hideModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <Icon
                  icon="material-symbols-light:close"
                  width="24"
                  height="24"
                />
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ลำดับ
                      </th>
                      <th scope="col" className="px-6 py-3">
                        รายการ
                      </th>
                      <th scope="col" className="px-6 py-3">
                        จำนวน
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ราคา
                      </th>
                      <th scope="col" className="px-6 py-3">
                        สถานะ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr
                        key={item.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4 flex items-center gap-2">
                          <img
                            src={item.images[0]?.url}
                            alt={item.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span>{item.title}</span>
                        </td>
                        <td className="px-6 py-4">{item.quantity || 1}</td>
                        <td className="px-6 py-4">
                          ฿{(item.price * (item.quantity || 1)).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">-</td>
                      </tr>
                    ))}
                    <tr className="bg-red-50 dark:bg-red-900">
                      <td colSpan={3} className="px-6 py-4 font-semibold">
                        ราคารวมทั้งหมด
                      </td>
                      <td
                        colSpan={2}
                        className="px-6 py-4 font-semibold text-red-600 dark:text-red-400"
                      >
                        ฿{totalPrice.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Link
                href={`/checkout`}
                  onClick={handleConfirm}
                  className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  ยืนยันสั่งซื้อ
                </Link>
                <button
                  onClick={hideModal}
                  className="text-gray-900 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;