import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Order {
  id: number;
  createdAt: string;
  status: string;
  cartTotal: number;
}

const Order = () => {
  const session = useSession();

  useEffect(() => {
    session.update;
  }, []);

  const orders: Order[] = session.data?.user?.orders || [];

  if (orders.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 text-[14px]">
        ไม่มีคำสั่งซื้อ
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="flex gap-2 text-center items-center">
          <Icon icon="solar:bag-4-bold" width="24" height="24" color="red" />
          <span className="font-bold text-[25px]">สถานะการสั่งซื้อ</span>
        </h1>
      </div>

      <Link
        href={`/Orders/${orders[0]?.id}`}
        className="w-full mt-4 hidden md:block"
      >
        <table className="table-auto w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-gray-500">
                หมายเลขคำสั่งซื้อ
              </th>
              <th className="py-2 px-4 text-left text-gray-500">
                สถานะการสั่งซื้อ
              </th>
              <th className="py-2 px-4 text-left text-gray-500">เลขพัสดุ</th>
              <th className="py-2 px-4 text-left text-gray-500">ยอดทั้งหมด</th>
            </tr>
          </thead>
          <tbody className="cursor-pointer">
            {orders.map((item: any) => {
              const date = new Date(item.createdAt);
              const formattedDate = date.toLocaleString("th-TH", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <tr key={item.id} className="mb-2 border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-700 text-[12px] md:text-[14px] flex flex-col gap-1">
                    <Link href={`/Orders/${item.id}`} className="font-medium">
                      EC-{item.id}
                    </Link>
                    <Link
                      href={`/Orders/${item.id}`}
                      className="text-gray-500 text-[10px] md:text-[12px]"
                    >
                      {formattedDate}
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      href={`/Orders/${item.id}`}
                      className={`w-[120px] h-[32px] flex items-center justify-center text-[12px] md:text-[14px] text-center rounded-md border border-gray-400 ${
                        item.status === "กำลังดำเนินการ"
                          ? "bg-yellow-500 text-white"
                          : item.status === "กำลังจัดส่ง"
                          ? "bg-green-500 text-white"
                          : item.status === "เสร็จสิ้น"
                          ? "bg-blue-500 text-white"
                          : item.status === "ยกเลิก"
                          ? "bg-red-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {item.status}
                    </Link>
                  </td>
                  <td className="py-2 px-4">-</td>
                  <td className="py-2 px-4 text-black text-[12px] md:text-[14px]">
                    ฿{item.cartTotal.toLocaleString()}.00
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Link>

      {/* มือถื */}
      <div className="w-full mt-4 block md:hidden cursor-pointer">
        {orders.map((item: any) => {
          const date = new Date(item.createdAt);
          const formattedDate = date.toLocaleString("th-TH", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <Link
              key={item.id}
              href={`/Orders/${item.id}`}
              className="grid grid-cols-2 gap-4 p-4 bg-white rounded-md xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1"
            >
              <h5 className="text-center w-[100px] text-gray-500 text-[12px] md:text-[14px]">
                EC-{item.id}
              </h5>
              <h5 className="text-center w-[100px] text-gray-500 text-[12px] md:text-[14px]">
                {formattedDate}
              </h5>
              <h5
                className={`bg-gray-300 text-black w-[120px] h-[32px] flex items-center justify-center text-[12px] md:text-[14px] text-center rounded-md border border-gray-400 ${
                  item.status === "กำลังดำเนินการ"
                    ? "bg-yellow-500 text-white"
                    : item.status === "กำลังจัดส่ง"
                    ? "bg-green-500 text-white"
                    : item.status === "เสร็จสิ้น"
                    ? "bg-blue-500 text-white"
                    : item.status === "ยกเลิก"
                    ? "bg-red-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {item.status}
              </h5>
              <h5 className="text-center w-[120px] text-black text-[12px] md:text-[14px]">
                ฿{item.cartTotal.toLocaleString()}.00
              </h5>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Order;
