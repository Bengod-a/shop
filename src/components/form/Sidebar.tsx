"use client";

import { useEffect, useState } from "react";
import "flowbite";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const SidebarMobile = ({ activePage, setActivePage }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    import("flowbite");
  }, []);


  return (
    <div className="mb-5 block xl:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-950 hover:bg-gray-800 rounded-lg transition-colors duration-200"
        type="button"
      >
        <Menu size={24} />
      </button>

      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-800`}
      >


        <div className="flex flex-col  overflow-y-auto">
          <div className="flex-1">
            <div className="flex flex-col bg-white rounded-md">
              <div className="p-4">
                <h1 className="text-gray-400 text-[12px]">รายการ</h1>
              </div>

              <div
                className={`p-4 group hover:border-l-4 hover:border-red-500 transition-all duration-75 tex ${
                  activePage === "orders"
                    ? "border-l-4 border-red-500 text-red-500"
                    : ""
                }`}
                onClick={() => setActivePage("orders")}
              >
                <span className="flex gap-2 cursor-pointer text-gray-800">
                  <Icon icon="solar:bag-4-outline" width="24" height="24" />
                  คำสั่งซื้อ
                </span>
              </div>

              <div
                className={`p-4 group hover:border-l-4 hover:border-red-500 transition-all duration-75 ${
                  activePage === "favorites"
                    ? "border-l-4 border-red-500 text-red-500"
                    : ""
                }`}
                onClick={() => setActivePage("favorites")}
              >
                <span className="flex gap-2 cursor-pointer text-gray-800">
                  <Icon icon="mdi-light:heart" width="24" height="24" />
                  สินค้าที่ถูกใจ
                </span>
              </div>

              <div className="p-4 mt-6">
                <h1 className="text-gray-800 text-[12px]">บัญชี</h1>
              </div>

              <div
                className={`p-4 group hover:border-l-4 hover:border-red-500 transition-all duration-75  ${
                  activePage === "InfoUser"
                    ? "border-l-4 border-red-500 text-red-500"
                    : ""
                }`}
                onClick={() => setActivePage("InfoUser")}
              >
                <Link
                  className="flex gap-2 text-gray-800 group-hover:text-red-500"
                  href={""}
                >
                  <Icon icon="mdi:user-outline" width="24" height="24" />
                  ข้อมูลส่วนตัว
                </Link>
              </div>

              <div
                className={`p-4 group hover:border-l-4 hover:border-red-500 transition-all duration-75 ${
                  activePage === "Delivery"
                    ? "border-l-4 border-red-500 text-red-500"
                    : ""
                }`}
                onClick={() => setActivePage("Delivery")}
              >
                <Link
                  className="flex gap-2 text-gray-800 group-hover:text-red-500"
                  href={""}
                >
                  <Icon icon="bx:map" width="24" height="24" />
                  ที่อยู่สำหรับจัดส่ง
                </Link>
              </div>

              <div className="p-4 group hover:border-l-4 hover:border-red-500 transition-all duration-75">
                <Link
                  className="flex gap-2 text-gray-800 group-hover:text-red-500"
                  href={""}
                >
                  <Icon
                    icon="fluent:payment-16-regular"
                    width="16"
                    height="16"
                  />
                  ช่องทางชำระเงิน
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SidebarMobile;

