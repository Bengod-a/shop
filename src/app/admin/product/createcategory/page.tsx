"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import NavBarAdmin from "../../../../components/admin/NavBarAdmin";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const Page = () => {
  const [nameCategory, setNameCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleSave = async (event:any) => {
    event.preventDefault();

    if (!nameCategory.trim()) {
      toast.error("กรุณากรอกชื่อหมวดหมู่สินค้า");
      return;
    }

    try {
      const response = await fetch("/api/product/createcategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nameCategory }),
      });

      if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่");

      await response.json();
      toast.success("เพิ่มหมวดหมู่สำเร็จ!");

      fetchCategories();
      setNameCategory("");
    } catch (error: any) {
      console.error("Error saving category:", error);
      toast.error(error.message || "เกิดข้อผิดพลาด");
    }
  };


  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/product/deletecategory/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "เกิดข้อผิดพลาดในการลบหมวดหมู่");
      }

      toast.success("ลบหมวดหมู่สำเร็จ!");
      fetchCategories();
    } catch (error: any) {
      console.error("Error deleting category:", error);
      toast.error(error.message || "เกิดข้อผิดพลาด");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/product/fetchcategory");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBarAdmin />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            เพิ่มหมวดหมู่สินค้า
          </h1>
          <Form className="flex flex-col gap-4" onSubmit={handleSave}>
            <Input
              label="ชื่อหมวดหมู่สินค้า"
              labelPlacement="outside"
              placeholder="กรอกชื่อหมวดหมู่สินค้า"
              value={nameCategory}
              onChange={(e) => setNameCategory(e.target.value)}
            />
            <Button
              type="submit"
              variant="solid"
              className="w-full bg-green-500 text-white"
            >
              บันทึก
            </Button>
          </Form>
        </div>

        <div className="mt-8 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            รายการหมวดหมู่สินค้า
          </h2>
          <div className="bg-white shadow-lg rounded-lg p-4">
            {categories.length > 0 ? (
              categories.map((item: any) => (
                <div
                  key={item.id}
                  className="flex w-full items-center justify-between border-b last:border-none p-3"
                >
                  <h1 className="text-gray-800">{item.name}</h1>
                  <button
                    onClick={() => handleDelete(parseInt(item.id))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">ไม่มีหมวดหมู่สินค้า</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
