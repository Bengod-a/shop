"use client";

import React, { useState, useEffect, use } from "react";
import Navbars from "../../../components/navbar/Navbars";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  console.log(order);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/user/orders/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("ไม่พบคำสั่งซื้อ");
      const data = await response.json();
      setOrder(data);
      setStatus(data.status);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const [status, setStatus] = useState("รอดำเนินการ");

  const getIconColor = (step: string) => {
    if (status === step) return "red";
    return "gray";
  };

  const getLineColor = (step: string) => {
    const steps = ["รอดำเนินการ", "กำลังจัดส่ง", "เสร็จสิ้น", "ยกเลิก"];
    const currentIndex = steps.indexOf(status);
    const stepIndex = steps.indexOf(step);
    return stepIndex < currentIndex ? "bg-red-300" : "bg-gray-300";
  };

  if (loading) {
    return <div className="p-4 text-center text-gray-600">กำลังโหลด...</div>;
  }

  if (!order) {
    return <div className="p-4 text-center text-gray-600">ไม่พบคำสั่งซื้อ</div>;
  }

  return (
    <>
      <Navbars />

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="flex text-[25px] items-center gap-2">
            <Icon icon="solar:bag-4-bold" width="24" height="24" color="red" />
            รายละเอียดคำสั่งซื้อ
          </h1>

          <Link
            href="/user/settingsprofile"
            className="bg-red-100 p-2 text-red-500 rounded-md hover:bg-red-200 transition-colors duration-200"
          >
            รายการคำสั่งซื้อ
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mt-4 h-[245px]">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 p-2 rounded-full border border-gray-300">
                  <Icon
                    icon="fluent:box-16-filled"
                    width="32"
                    height="32"
                    color={getIconColor("รอดำเนินการ")}
                  />
                </div>
                <p className="text-[12px] text-gray-600 mt-2">รอดำเนินการ</p>
              </div>

              <div className={`flex-1 h-1 ${getLineColor("รอดำเนินการ")} mx-2`} />

              <div className="flex flex-col items-center">
                <div className="bg-gray-100 p-2 rounded-full border border-gray-300">
                  <Icon
                    icon="eva:car-fill"
                    width="32"
                    height="32"
                    color={getIconColor("กำลังจัดส่ง")}
                  />
                </div>
                <p className="text-[12px] text-gray-600 mt-2">กำลังจัดส่ง</p>
              </div>

              <div
                className={`flex-1 h-1 ${getLineColor("กำลังจัดส่ง")} mx-2`}
              />

              <div className="flex flex-col items-center">
                <div className="bg-gray-100 p-2 rounded-full border border-gray-300">
                  <Icon
                    icon="mdi:success"
                    width="32"
                    height="32"
                    color={getIconColor("เสร็จสิ้น")}
                  />
                </div>
                <p className="text-[12px] text-gray-600 mt-2">เสร็จสิ้น</p>
              </div>
            </div>

            <div className="mt-4"></div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-semibold">รายการสินค้า</h2>
          </div>

          {order.products && order.products.length > 0 ? (
            order.products.map((item: any, index: number) => (
              <div key={index}>
                <div className="bg-gray-100 mt-2 p-4 rounded-lg">
                  <Link
                    href={`/product/${item.product.id}`}
                    className="flex items-center gap-4 mb-4 last:mb-0"
                  >
                    <div className="relative w-24 h-24">
                      <Image
                        src={item.product.images[0]?.url}
                        alt={item.product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] font-medium">
                        {item.product.title}
                      </h3>
                      <p className="text-[14px] text-gray-600">
                        จำนวน: {item.count}
                      </p>
                    </div>
                    <p className="text-[14px] text-gray-600">
                      ฿{item.price.toLocaleString()}.00
                    </p>
                  </Link>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
              ไม่พบรายการสินค้า
            </div>
          )}
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-semibold">ที่อยู่ในการจัดส่ง</h2>
          </div>
          <div className="bg-gray-100 mt-2 p-4 rounded-lg">
            <p className="text-[14px] text-gray-600">
              คุณ {order.address?.name} ({order.address?.phonenumber})
            </p>
            <p className="text-[14px] text-gray-600 gap-1">
              {order.address.address} ต.{order.address.tambon} อ.
              {order.address.amphure}
              จ.{order.address.province} {order.address.zipcode}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-semibold">ราคาสินค้า</h2>
          </div>
          <div className="bg-gray-100 mt-2 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2"></div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[14px] text-gray-900">ค่าจัดส่ง</p>
              <p className="text-[14px] text-gray-900">
                ฿{(order.shippingCost || 0).toLocaleString()}.00
              </p>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <p className="text-[14px] text-gray-900 font-bold">รวมทั้งหมด</p>
              <p className="text-[14px] text-gray-900">
                ฿{(order.cartTotal || 0).toLocaleString()}.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
