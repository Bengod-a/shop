"use client";

import React, { useState, useEffect } from "react";
import Navbars from "../../components/navbar/Navbars";
import Image from "next/image";
import CPU from "../../components/DIY/CPU";
import Board from "../../components/DIY/Board";
import GPU from "../../components/DIY/GPU";
import Ram from "../../components/DIY/Ram";
import HDD from "../../components/DIY/HDD";
import Power from "../../components/DIY/Power";
import Case from "../../components/DIY/Case";
import Fan from "../../components/DIY/Fan";
import Mouse from "../../components/DIY/Mouse";
import Keyboard from "../../components/DIY/Keyboard";
import Monitor from "../../components/DIY/Monitor";
import {
  Cpu,
  Monitor as MonitorIcon,
  HardDrive,
  MemoryStick,
} from "lucide-react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import deleteAllItem from "../../utils/deleteAllItem";
import Modal from "../../components/DIY/Modal";
import ModalMD from "../../components/DIY/ModalMD";
import { CartItem } from "../../types/next-auth";



type Category = {
  id: number;
  name: string;
  icon: React.ReactNode;
  href: string;
};

const Page = () => {
  const [activePage, setActivePage] = useState("/cpu");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const loadCartFromLocalStorage = () => {
    try {
      const cartData = localStorage.getItem("cartDIY");
      const cart = cartData ? JSON.parse(cartData) : { itemsDIY: [] };
      const items = cart.itemsDIY || [];
      setCartItems(items);
      const total = items.reduce(
        (sum: number, item: CartItem) =>
          sum + item.price * (item.quantity || 1),
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.error(error);
      setCartItems([]);
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      loadCartFromLocalStorage();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum: number, item: CartItem) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotalPrice(isNaN(total) ? 0 : total);
  }, [cartItems]);

  const CategoriesDiy: Category[] = [
    { id: 1, name: "ซีพียู", icon: <Cpu size={18} />, href: "/cpu" },
    {
      id: 2,
      name: "เมนบอร์ด",
      icon: <Icon icon="ant-design:control-twotone" width="24" height="24" />,
      href: "/board",
    },
    {
      id: 3,
      name: "การ์ดจอ",
      icon: <Icon icon="bi:gpu-card" width="16" height="16" />,
      href: "/gpu",
    },
    { id: 4, name: "แรม", icon: <MemoryStick size={18} />, href: "/ram" },
    {
      id: 5,
      name: "ฮาร์ดดิสก์/SSD",
      icon: <HardDrive size={18} />,
      href: "/harddisk",
    },
    {
      id: 6,
      name: "พาวเวอร์ซัพพลาย",
      icon: <Icon icon="ic:baseline-power" width="24" height="24" />,
      href: "/power",
    },
    {
      id: 7,
      name: "เคส",
      icon: <Icon icon="ph:computer-tower-duotone" width="24" height="24" />,
      href: "/case",
    },
    {
      id: 8,
      name: "ชุดระบายความร้อน",
      icon: <Icon icon="bi:fan" width="24" height="24" />,
      href: "/fan",
    },
    {
      id: 9,
      name: "เมาส์",
      icon: (
        <Icon
          icon="material-symbols-light:mouse-outline"
          width="24"
          height="24"
        />
      ),
      href: "/mouse",
    },
    {
      id: 10,
      name: "คีย์บอร์ด",
      icon: (
        <Icon
          icon="material-symbols-light:keyboard-outline-rounded"
          width="24"
          height="24"
        />
      ),
      href: "/keyboard",
    },
    {
      id: 11,
      name: "จอมอนิเตอร์",
      icon: <MonitorIcon size={18} />,
      href: "/monitor",
    },
    // {
    //   id: 12,
    //   name: "อุปกรณ์เสริม",
    //   icon: (
    //     <Icon icon="famicons:game-controller-outline" width="24" height="24" />
    //   ),
    //   href: "/card",
    // },
  ];

  const handleConfirmOrder = () => {
    setCartItems([]);
    setTotalPrice(0);
    localStorage.setItem("cart", JSON.stringify({ items: [] }));
  };

  const categoryMap: Record<string, string> = {
    CPU: "ซีพียู",
    MAINBOARD: "เมนบอร์ด",
    GPU: "การ์ดจอ",
    RAM: "แรม",
    HDD: "ฮาร์ดดิสก์/SSD",
    "Power Supply": "พาวเวอร์ซัพพลาย",
    CASE: "เคส",
    Fan: "ชุดระบายความร้อน",
    MOUSE: "เมาส์",
    KEYBOARD: "คีย์บอร์ด",
    MONITOR: "จอมอนิเตอร์",
    // Accessories: "อุปกรณ์เสริม",
  };

  const filteredCategories = CategoriesDiy.filter((category) => {
    const existsInCart = cartItems.some((item) => {
      const normalizedItemName =
        categoryMap[item.category.name] || item.category.name;
      return normalizedItemName === category.name;
    });
    return !existsInCart;
  });

  const deleteItem = (id: number) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cartDIY", JSON.stringify({ itemsDIY: newCartItems }));
    setCartItems(newCartItems);
    const total = newCartItems.reduce(
      (sum: number, item: CartItem) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotalPrice(total);
    toast.success("ลบสินค้าสำเร็จ");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Navbars />

        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="relative w-full xl:h-[250px] h-[70px] sm:h-[100px] md:h-[150px]">
            <Image
              src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/categories/1713773859.jpg"
              alt="โฆษณาโปรโมชันสินค้าไอที - I Have GPU DIY"
              fill
              className="object-cover rounded-lg shadow-md"
              priority
              onError={(e) => (e.currentTarget.src = "/override.webp")}
            />
          </div>

          <div className="mt-8">
            <h1 className="font-bold text-[18px]">
              จัดสเปคคอม ประกอบคอม ทำคอมพิวเตอร์ประกอบ คอมประกอบสำหรับเล่นเกม
              ทำงาน
            </h1>
            <p className="text-[14px] text-gray-600 mt-2">
              เรื่องประกอบคอมพิวเตอร์ ทำคอมพิวเตอร์ประกอบสำหรับเล่นเกม ทำงาน
              เครื่องไม่อืด ทำงานได้เร็ว ให้มาที่ iHAVECPU เรารับจัดสเปคคอมแรง ๆ
              ทำคอมประกอบให้เหมาะสมกับแต่ละผู้ใช้งาน
              จัดสรรคอมพิวเตอร์ประกอบครบชุด และจัดสเปคคอมเล่นเกม
              อยากได้อุปกรณ์ครบชุด ซีพียูตัวแรง ฟังก์ชั่นครบครัน ต้องมาที่
              <span className="font-bold text-red-500">iHAVEGPU</span>
              นอกจากนี้เรายังมีเมนบอร์ด การ์ดจอรุ่นท็อป ให้เลือกช้อปกันด้วย
            </p>
          </div>
          <ModalMD
            setShowModal={setShowModal}
            activePage={activePage}
            setActivePage={setActivePage}
            cartItems={cartItems}
            onConfirm={handleConfirmOrder}
            filteredCategories={filteredCategories}
            deleteItem={deleteItem}
          />

          <div className="flex gap-8 mt-8">
            <div className="bg-gray-200 rounded-md hidden md:block">
              <div className="flex justify-between w-[320px] p-4">
                <h1 className="text-lg font-semibold">ยอดรวมทั้งสิ้น</h1>
                <h1 className="text-red-600 text-lg font-semibold">
                  ฿{totalPrice.toLocaleString()}
                </h1>
              </div>
              <div className="flex-col gap-3 max-w-[300px] mx-auto p-2 mb-2  transition-all duration-300">
                {filteredCategories.map((item) => (
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
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
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
                              className="bg-slate-100 rounded-full p-1 hover:bg-slate-200 transition-all duration-200"
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
                            ฿
                            {(
                              item.price * (item.quantity || 1)
                            ).toLocaleString()}
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
                {cartItems.length > 0 && (
                  <button
                    onClick={() =>
                      deleteAllItem(cartItems, setCartItems, setTotalPrice)
                    }
                    className="py-2 bg-gray-500 text-white rounded-lg  transition-colors duration-200"
                  >
                    ลบตะกร้าสินค้าทั้งหมด
                  </button>
                )}
              </div>
            </div>

            <div className="w-full max-w-4xl mx-auto">
              {activePage === "/cpu" && (
                <CPU cartItems={cartItems} setCartItems={setCartItems} />
              )}
              {activePage === "/board" && (
                <Board cartItems={cartItems} setCartItems={setCartItems} />
              )}
              {activePage === "/gpu" && (
                <GPU cartItems={cartItems} setCartItems={setCartItems} />
              )}
              {activePage === "/ram" && (
                <Ram cartItems={cartItems} setCartItems={setCartItems} />
              )}
              {activePage === "/harddisk" && (
                <HDD cartItems={cartItems} setCartItems={setCartItems} />
              )}
              {activePage === "/power" && (
                <Power cartItems={cartItems} setCartItems={setCartItems} />
              )}
              {activePage === "/case" && (
                <Case cartItems={cartItems} setCartItems={setCartItems} />
              )}
              {activePage === "/fan" && (
                <Fan cartItems={cartItems} setCartItems={setCartItems} />
              )}
              {activePage === "/mouse" && (
                <Mouse cartItems={cartItems} setCartItems={setCartItems} />
              )}
              {activePage === "/keyboard" && (
                <Keyboard cartItems={cartItems} setCartItems={setCartItems} />
              )}
              {activePage === "/monitor" && (
                <Monitor cartItems={cartItems} setCartItems={setCartItems} />
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          cartItems={cartItems}
          onConfirm={handleConfirmOrder}
        />
      )}
    </>
  );
};

export default Page;
