"use client";

import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import NavBarAdmin from "@/components/admin/NavBarAdmin";
import toast from "react-hot-toast";
import ImageInput from "../../../../components/form/ImageInput";
import Link from "next/link";
import Loader from "../../../../components/loadeing/Loader";

const page = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: null as File | null,
  });
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const hdlsubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);
    formData.append("category", form.category);

    if (form.image) {
      formData.append("image", form.image);
    }
    try {
      const response = await fetch("/api/product/addproducts", {
        method: "POST",
        body: formData,
      });

      toast.success("เพิ่มสินค้าสำเร็จ");
      fetchProduct();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred");
    }
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/product/fetchproduct", {
        method: "GET",
      });
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteproduct = async (id: number) => {
    try {
      const response = await fetch(`/api/product/deleteproduct/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "เกิดข้อผิดพลาดในการลบหมวดหมู่");
      }

      toast.success("ลบสินค้าสำเร็จ");
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/product/fetchcategory", {
        method: "GET",
      });
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <NavBarAdmin />

          <div className="container mx-auto p-8 bg-white shadow-lg rounded-xl">
            <form onSubmit={hdlsubmit} className="space-y-8 max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-center text-gray-700">
                เพิ่มข้อมูลสินค้า
              </h1>
              <p className="text-center text-gray-500">
                กรอกข้อมูลด้านล่างเพื่อเพิ่มสินค้าใหม่
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-600"
                  >
                    ชื่อสินค้า
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="mt-2 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="ชื่อสินค้า"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-600"
                  >
                    รายละเอียดสินค้า
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="mt-2 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="รายละเอียดสินค้า"
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-600"
                  >
                    ราคา (บาท)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="mt-2 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="ราคา"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-600"
                  >
                    จำนวนสินค้า
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="mt-2 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="จำนวนสินค้า"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({ ...form, quantity: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="categoryId"
                    className="block text-sm font-medium text-gray-600"
                  >
                    หมวดหมู่สินค้า
                  </label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="mt-2 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="" disabled>
                      เลือกหมวดหมู่
                    </option>
                    {category.map((item: any, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    อัปโหลดรูป
                  </label>
                  <input
                    type="file"
                    accept="image/*png,image/jpeg,image/jpg"
                    className="input-style"
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.files?.[0] || null })
                    }
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  เพิ่มสินค้า
                </button>
              </div>
            </form>

            {/* Product table */}
            <div className="mt-8 overflow-x-auto">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                รายการสินค้า
              </h2>
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">No.</th>
                    <th className="px-4 py-2 text-left text-gray-600">
                      รูปสิ้นค้า
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600">
                      ชื่อสินค้า
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600">
                      รายละเอียด
                    </th>
                    <th className="px-4 py-2 text-right text-gray-600">ราคา</th>
                    <th className="px-4 py-2 text-right text-gray-600">
                      จำนวน
                    </th>
                    <th className="px-4 py-2 text-right text-gray-600">
                      ขายได้
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600">
                      อัปเดตวันที่
                    </th>
                    <th className="px-4 py-2 text-center text-gray-600">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.length > 0 ? (
                    product.map((item: any, index: number) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 text-left">{index + 1}</td>
                        <td className="px-4 py-2 text-left">
                          <img
                            src={item.images[0]?.url || "/placeholder.jpg"}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        </td>
                        <td className="px-4 py-2 text-left">{item.title}</td>
                        <td className="px-4 py-2 text-left">
                          {item.description}
                        </td>
                        <td className="px-4 py-2 text-right">
                          {item.price} บาท
                        </td>
                        <td className="px-4 py-2 text-right">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-2 text-right">
                          {item.sold || 0}
                        </td>
                        <td className="px-4 py-2 text-left">
                          {new Date(item.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-center flex">
                          <Link href={`/admin/product/edit/${item.id}`}>
                            <Pencil className="inline-block text-yellow-500 hover:text-yellow-600 cursor-pointer mr-2" />
                          </Link>
                          <Trash
                            className="inline-block text-red-500 hover:text-red-600 cursor-pointer"
                            onClick={() => deleteproduct(parseInt(item.id))}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center px-4 py-2 text-gray-500"
                      >
                        ไม่มีสินค้าในระบบ
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default page;
