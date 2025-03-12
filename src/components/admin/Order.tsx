import React, { useEffect, useState } from "react";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import toast from "react-hot-toast";
import Image from "next/image";

interface Order {
  id: number;
  orderbyId: number;
  amount: number;
  cartTotal: number;
  currency: string;
  status?: string;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  address?: {
    id: number;
    name: string;
    phonenumber: number;
    address: string;
    province: string;
    amphure: string;
    tambon: string;
    zipcode: number;
    userId: number;
  };
  products?: {
    id: number;
    product: {
      id: number;
      title: string;
      price: number;
      images: { url: string }[];
    };
    count: number;
  }[];
}

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ทั้งหมด");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(orders);

  const FetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/product/FetchOrders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("ไม่สามารถดึงข้อมูลได้");
      const data: Order[] = await response.json();
      setOrders(data);
    } catch (error: any) {
      setError(error.message || "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchOrders();
  }, []);

  const handleSelect = (status: string) => {
    setFilterStatus(status);
    setIsDropdownOpen(false);
  };

  const filteredOrders = orders.filter(
    (order) =>
      (filterStatus === "ทั้งหมด" || order.status === filterStatus) &&
      (String(order.id).includes(searchTerm) ||
        String(order.orderbyId).includes(searchTerm))
  );

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedOrder) return;

    try {
      const response = await fetch(
        `/api/product/StatusChange/${selectedOrder.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "ไม่สามารถอัปเดตสถานะได้");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: newStatus }
            : order
        )
      );
      setSelectedOrder((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );

      toast.success("อัปเดตสถานะสำเร็จ");
    } catch (error: any) {
      console.error("เกิดข้อผิดพลาด:", error.message);
      toast.error("เกิดข้อผิดพลาด: " + error.message);
    }
  };
  if (loading) return <div className="p-4">กำลังโหลด...</div>;
  if (error)
    return <div className="p-4 text-red-500">เกิดข้อผิดพลาด: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">จัดการคำสั่งซื้อ</h2>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="ค้นหาด้วย Order ID หรือ ID ลูกค้า"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full p-2 bg-green-500 text-white rounded-md flex justify-between items-center"
          >
            กรองตามสถานะ: {filterStatus}
            <ChevronDownIcon className="w-5 h-5" />
          </button>
          {isDropdownOpen && (
            <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
              {[
                "ทั้งหมด",
                "รอดำเนินการ",
                "จัดส่งแล้ว",
                "เสร็จสิ้น",
                "ยกเลิก",
              ].map((status) => (
                <div
                  key={status}
                  onClick={() => handleSelect(status)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">วันที่</th>
              <th className="p-2 border">ลูกค้า (ID)</th>
              <th className="p-2 border">สถานะ</th>
              <th className="p-2 border">ยอดรวม</th>
              <th className="p-2 border">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">
                  {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
                </td>
                <td className="p-2 border">{order.orderbyId}</td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 border">{order.cartTotal}</td>
                <td className="p-2 border flex space-x-2 justify-center">
                  <button
                    onClick={() => handleViewOrder(order)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                รายละเอียดคำสั่งซื้อ #{selectedOrder.id}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Order ID:</strong> {selectedOrder.id}
              </p>
              <p>
                <strong>วันที่สร้าง:</strong>
                {format(new Date(selectedOrder.createdAt), "dd/MM/yyyy HH:mm")}
              </p>
              <p>
                <strong>ID ลูกค้า:</strong> {selectedOrder.orderbyId}
              </p>
              <div>
                <strong>สถานะ:</strong>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="ml-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="	รอดำเนินการ">	รอดำเนินการ</option>
                  <option value="กำลังจัดส่ง">กำลังจัดส่ง</option>
                  <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                  <option value="ยกเลิก">ยกเลิก</option>
                </select>
              </div>
              <p>
                <strong>จำนวนสินค้า:</strong> {selectedOrder.amount}
              </p>
              <p>
                <strong>ยอดรวม:</strong>
                {selectedOrder.cartTotal.toLocaleString()}
                {selectedOrder.currency}
              </p>
              <p>
                <strong>สถานะคำสั่งซื้อ:</strong> {selectedOrder.orderStatus}
              </p>
              <p>
                <strong>อัปเดตล่าสุด:</strong>
                {format(new Date(selectedOrder.updatedAt), "dd/MM/yyyy HH:mm")}
              </p>
              {selectedOrder.address && (
                <div>
                  <strong>ที่อยู่ในการจัดส่ง:</strong>
                  <p>ชื่อ {selectedOrder.address.name}</p>
                  <p>
                    {selectedOrder.address.address},
                    {selectedOrder.address.tambon},
                    {selectedOrder.address.amphure},
                    {selectedOrder.address.province},
                    {selectedOrder.address.zipcode}
                  </p>
                  <p>โทร: {selectedOrder.address.phonenumber}</p>
                </div>
              )}
              <div className="max-h-64 overflow-y-auto border rounded-lg shadow-inner">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">#</th>
                      <th className="p-2 border">สินค้า</th>
                      <th className="p-2 border">จำนวน</th>
                      <th className="p-2 border">ราคา</th>
                    </tr>
                  </thead>
                  <tbody>
                  {selectedOrder?.products?.map((item: any, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-2 border">{index + 1}</td>
                      <td className="p-2 border flex items-center gap-2">
                        {item.product?.images?.[0] ? (
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.title || "สินค้า"}
                            width={50}
                            height={50}
                            className="object-cover rounded"
                          />
                        ) : (
                          <p>ไม่มีรูป</p>
                        )}
                        <span>{item.product?.title ?? "ไม่มีชื่อสินค้า"}</span>
                      </td>
                      <td className="p-2 border text-center">
                        {item.count ?? 0}
                      </td>
                      <td className="p-2 border text-right">
                        ฿
                        {(
                          (item.price ?? 0) * (item.count ?? 0)
                        ).toLocaleString()}
                      </td>
                    </tr>
                  )) ?? (
                    <tr>
                      <td colSpan={4} className="text-center p-4">
                        ไม่มีสินค้าในออเดอร์
                      </td>
                    </tr>
                  )}
                    <tr className="bg-red-50">
                      <td colSpan={3} className="p-2 border font-semibold text-right">
                        ราคารวมทั้งหมด
                      </td>
                      <td className="p-2 border text-red-600 font-semibold text-right">
                        ฿{selectedOrder.cartTotal.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
