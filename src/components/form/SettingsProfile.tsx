"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import Link from "next/link";
import Order from "./Order";
import Favorites from "./Favorites";
import InfoUser from "./InfoUser";
import Delivery from "./Delivery";
import Sidebar from "./Sidebar";

const SettingsProfile = () => {
  const [activePage, setActivePage] = useState("orders");

  return (
    <div>
      <div className="w-full py-8">
        <div className="max-w-[1230px] mx-auto p-8 flex">
          {/* left */}
          <div className="w-[305px] hidden xl:block">
            <div className="flex flex-col bg-white rounded-md">
              <div className="p-4">
                <h1 className="text-gray-500 text-[12px]">รายการ</h1>
              </div>

              <div
                className={`p-4 group hover:border-l-4 hover:border-red-500 transition-all duration-75 ${
                  activePage === "orders"
                    ? "border-l-4 border-red-500 text-red-500"
                    : ""
                }`}
                onClick={() => setActivePage("orders")}
              >
                <span className="flex gap-2 cursor-pointer">
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
                <span className="flex gap-2 cursor-pointer">
                  <Icon icon="mdi-light:heart" width="24" height="24" />
                  สินค้าที่ถูกใจ
                </span>
              </div>

              <div className="p-4 mt-6">
                <h1 className="text-gray-500 text-[12px]">บัญชี</h1>
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
                  className="flex gap-2 text-gray-700 group-hover:text-red-500"
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
                  className="flex gap-2 text-gray-700 group-hover:text-red-500"
                  href={""}
                >
                  <Icon icon="bx:map" width="24" height="24" />
                  ที่อยู่สำหรับจัดส่ง
                </Link>
              </div>

              <div className="p-4 group hover:border-l-4 hover:border-red-500 transition-all duration-75">
                <Link
                  className="flex gap-2 text-gray-700 group-hover:text-red-500"
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

          <div className="px-8 w-[920px] felx items-center justify-center mx-auto">
            {activePage === "orders" && <Order />}
            {activePage === "favorites" && <Favorites />}
            {activePage === "InfoUser" && <InfoUser />}
            {activePage === "Delivery" && <Delivery />}
          </div>
          <Sidebar setActivePage={setActivePage} activePage={activePage}/>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;
