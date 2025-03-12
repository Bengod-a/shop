"use client";

import React, { useState } from "react";
import Cpu from "../../../components/category/Cpu";
import Navbars from "../../../components/navbar/Navbars";
import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Page = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(25000);
  const [price, setPrice] = useState([0, 25000]);
  const [ok, setOk] = useState(false);

  const handlePrice = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPrice(value);
      setMinPrice(value[0]);
      setMaxPrice(value[1]);
    }
    setTimeout(() => {
      setOk(!ok);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbars />

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="relative w-full xl:h-[250px] h-[70px] sm:h-[100px] md:h-[150px]">
          <Image
            src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/categories/1731384680.jpg"
            alt="โฆษณาโปรโมชันสินค้าไอที - I Have GPU DIY"
            fill
            className="object-cover rounded-lg shadow-md"
            priority
            onError={(e) => (e.currentTarget.src = "/override.webp")}
          />
        </div>

        <div className="mt-8">
          <h1 className="font-bold text-[18px]">
            ซีพียู ของแท้ สเปคแรง CPU Intel และ CPU AMD มี CPU ยี่ห้อดัง
          </h1>
          <p className="text-[14px] text-gray-600 mt-2">
            จำหน่าย ซีพียู (CPU) โปรเซสเซอร์คอมพิวเตอร์ ของแท้ มีซีพียูคุณภาพดี
            แบรนด์ดัง CPU Intel และ CPU AMD ราคาโปรโมชันพิเศษ
            และของแถมพิเศษอีกมากมายมีประกันหลังการขาย พร้อมให้คุณได้ CPU
            ราคาสุดพิเศษ และอุปกรณ์อื่น ๆ ไม่ว่าจะเป็นการ์ดจอ เมนบอร์ด
            ที่เหมาะกับการใช้งานของคุณ ไม่ว่าจะเล่นเกม หรือทำงาน ก็ไม่มีสะดุด
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h1>ซีพียู</h1>
            <p className="text-gray-600 text-[14px]">จำนวน 10 รายการ</p>
          </div>
          <div>
            <select className="border border-gray-300 rounded-md px-2 py-1">
              <option>เรียงลำดับ</option>
              <option>ราคา: ต่ำไปสูง</option>
              <option>ราคา: สูงไปต่ำ</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6 flex justify-between items-center">
        <div className="bg-white hidden md:block w-[282px] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300  flex-col h-[400px]">
          <div className="p-4">
            <h1>เลือกการแสดงสินค้า</h1>
          </div>
          <div className="pl-8">
            <h1>ช่วงราคา</h1>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex gap-2 mx-auto items-center">
              <input
                type="number"
                placeholder="ราคาต่ำสุด"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="border w-[100px] h-[40px] border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              -
              <input
                type="number"
                placeholder="ราคาสูงสุด"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="border w-[100px] h-[40px] border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Slider
              className="max-w-[228px] mx-auto"
              onChange={handlePrice}
              range
              min={0}
              max={100000}
              value={price}
              trackStyle={{ backgroundColor: "#fbabab" }}
              handleStyle={{
                borderColor: "#fbabab",
                backgroundColor: "#fff",
              }}
              railStyle={{ backgroundColor: "#d1d5db" }}
            />
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <Cpu minPrice={minPrice} maxPrice={maxPrice} />
        </div>
      </div>
    </div>
  );
};

export default Page;