"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Checkbox, select } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Alternative = () => {
  const session = useSession();
  const [cartItems, setCartItems] = useState<
    {
      id: number;
      quantity: number;
      title: string;
      price: number;
      images: any;
    }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    session.update();
  }, []);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);

        if (parsedCart?.items && Array.isArray(parsedCart.items)) {
          const validItems = parsedCart.items.filter(
            (item: any) =>
              item && typeof item === "object" && item.quantity !== undefined
          );
          setCartItems(validItems);
        } else {
          setCartItems([]);
        }
      }
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      setCartItems([]);
    }
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const discount = 0;
  const priceBeforeTax = subtotal + shipping - discount;
  const vat = Math.floor(priceBeforeTax * 0.07);
  const total = Math.floor(priceBeforeTax + vat);

  const [checkoutData, setCheckoutData] = useState(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("checkoutData");
      return storedData
        ? JSON.parse(storedData)
        : {
            selectedOption: "ทรูมันนี่วอลเล็ท",
            shippingMethod: "จัดส่งปกติ",
            additionalInfo: "สั่งประกอบ",
          };
    }
    return {
      selectedOption: "ทรูมันนี่วอลเล็ท",
      shippingMethod: "จัดส่งปกติ",
      additionalInfo: "สั่งประกอบ",
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCheckoutData = localStorage.getItem("checkoutData");
      if (storedCheckoutData) {
        setCheckoutData(JSON.parse(storedCheckoutData));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
  }, [checkoutData]);

  const handleCheckout = async () => {
    if (!session?.data?.user?.id) {
      toast.error("กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("ตะกร้าสินค้าของคุณว่างเปล่า");
      return;
    }

    const cartTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shipping = 0;
    const discount = 0;
    const priceBeforeTax = cartTotal + shipping - discount;
    const vat = Math.floor(priceBeforeTax * 0.07);
    const total = Math.floor(priceBeforeTax + vat);

    const data = {
      userId: session.data.user.id,
      address: session.data.user.addresses,
      cartTotal: total,
      products: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch("/api/user/addtocart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("สั่งซื้อสำเร็จ!");
        localStorage.removeItem("cart");
        setCartItems([]);
        router.push("/user/settingsprofile");
      } else {
        toast.error(`เกิดข้อผิดพลาด: ${result.error}`);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <div className="px-4 md:px-8">
      <div className="flex flex-col md:flex-row gap-8 mt-8 max-w-6xl mx-auto">
        <div className="w-full md:w-[700px] rounded-md bg-white p-4 ">
          <div className="p-4 rounded-md min-h-[175px] w-full">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 rounded-full w-6 h-6 flex items-center justify-center p-1.5">
                <p className="text-white text-xs">1</p>
              </div>
              <h1 className="text-lg font-semibold">รายละเอียดจัดส่ง</h1>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-100 rounded-md p-4">
                <div>
                  <h1>ที่อยู่ในการจัดส่งสินค้า</h1>
                </div>
                <div className="mt-1">
                  <div>
                    <p className="text-gray-500">
                      {session?.data?.user?.addresses?.[0].name} (0
                      {session?.data?.user?.addresses?.[0].phonenumber})
                    </p>
                    <p className="text-gray-500">
                      {session?.data?.user?.addresses?.[0].address} ต.
                      {session?.data?.user?.addresses?.[0].tambon} อ.
                      {session?.data?.user?.addresses?.[0].amphure}
                      จ.{session?.data?.user?.addresses?.[0].province}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-md p-4">
                <div>
                  <h1>วิธีการจัดส่ง</h1>
                </div>
                <div className="mt-1">
                  <div>
                    <p className="text-gray-500">
                      {checkoutData.shippingMethod}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-md p-4">
                <div>
                  <h1>ข้อมูลเพิ่มเติม</h1>
                </div>
                <div className="mt-1">
                  <div>
                    <p className="text-gray-500">
                      {checkoutData.additionalInfo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[380px] bg-white p-4 rounded-md hidden md:block">
          {cartItems.length > 0 ? (
            cartItems.map((item: any, index) => (
              <div key={item.id || index}>
                <div className="p-4 rounded-md  mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-[12px] font-semibold">
                      {item.description}
                    </h3>
                    <p className="text-gray-600 mt-1 text-[12px]">
                      จำนวน: {item.quantity}
                    </p>
                  </div>
                  <p className="text-red-600 font-bold">
                    ฿{(item.price * item.quantity).toLocaleString()}.00
                  </p>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <div className="p-4 bg-white rounded-md text-center text-gray-500">
              ไม่มีสินค้าในตะกร้า
            </div>
          )}

          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500">ค่าจัดส่ง:</p>
            <p className="text-[14px] font-semibold">฿0.00</p>
          </div>

          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500">ค่าจัดส่ง:</p>
            <p className="text-[14px] font-semibold">฿0.00</p>
          </div>

          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500">ค่าส่วนลด:</p>
            <p className="text-[14px] font-semibold">฿0.00</p>
          </div>
          <hr />

          <div className="flex justify-between items-center mt-4">
            <p className="text-[14px] font-semibold">ยอดรวมสุทธิ:</p>
            <p className="text-[14px] font-semibold">
              ฿{total.toLocaleString()}.00
            </p>
          </div>
          <Checkbox className="mt-2 text-[13px]" defaultSelected>
            <span className="text-[13px]">คุณยอมรับ</span>{" "}
            <Link
              className="text-red-600 border-b-1 border-red-600 text-[13px]"
              href={""}
            >
              นโยบายส่วนตัว
            </Link>z
            <span className="text-[13px]">และ</span>
            <Link
              className="text-red-600 text-[13px] border-b-1 border-red-600"
              href={""}
            >
              ข้อตกลงในการใช้บริการ
            </Link>
          </Checkbox>
          <button
            onClick={handleCheckout}
            className="mt-8 w-full md:w-[300px] md:mx-auto bg-red-600 text-white p-2.5 rounded-full mb-2 mx-auto flex items-center justify-center hover:bg-red-700 transition-all duration-300"
          >
            ชำระเงิน
          </button>
        </div>
      </div>

      <div className="w-full md:w-[700px] rounded-md bg-white p-4 mt-10">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 rounded-full w-6 h-6 flex items-center justify-center p-1.5">
            <p className="text-white text-xs">2</p>
          </div>
          <h1 className="text-lg font-semibold">รายละเอียดในการชำระเงิน</h1>
        </div>

        <div className="p-2 mt-4">
          <p className="text-gray-500">วิธีการชำระเงินที่เลือกไว้</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-1">
          <div className="bg-gray-100 p-4 rounded-md ">
            <div>
              <Icon icon="solar:wallet-bold" width="24" height="24" />
            </div>
            <div className="mt-4">
              <h1 className="font-semibold text-[14px]">
                {checkoutData.selectedOption}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white p-4 rounded-md block md:hidden mt-8">
        <button
          onClick={handleCheckout}
          className="mt-8 w-full md:w-[300px] md:mx-auto bg-red-600 text-white p-2.5 rounded-full mb-2 mx-auto flex items-center justify-center hover:bg-red-700 transition-all duration-300"
        >
          ชำระเงิน
        </button>
      </div>
    </div>
  );
};

export default Alternative;
