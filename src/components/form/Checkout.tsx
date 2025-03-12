import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const Checkout = () => {
  const session = useSession();
  const [checkoutData, setCheckoutData] = useState(() => {
    const savedData = localStorage.getItem("checkoutData");
    return savedData
      ? JSON.parse(savedData)
      : {
          selectedOption: "ทรูมันนี่วอลเล็ท",
          shippingMethod: "จัดส่งปกติ",
          additionalInfo: "สั่งประกอบ",
        };
  });

  const [cartItems, setCartItems] = useState<
    {
      id: number;
      quantity: number;
      title: string;
      price: number;
      images: any;
    }[]
  >([]);

  useEffect(() => {
    session.update();
  }, []);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (parsedCart?.items && Array.isArray(parsedCart.items)) {
          setCartItems(
            parsedCart.items.filter(
              (item: any) =>
                item && typeof item === "object" && item.quantity !== undefined
            )
          );
        } else {
          setCartItems([]);
        }
      }
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      setCartItems([]);
    }
  }, []);

  const options = [
    {
      id: "credit-card",
      icon: "fluent:payment-20-filled",
      label: "บัตรเครดิต",
    },
    { id: "true-money", icon: "mdi:wallet", label: "ทรูมันนี่วอลเล็ท" },
    { id: "cash", icon: "fluent:money-24-regular", label: "เงินสดชำระหน้างาน" },
  ];

  useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
  }, [checkoutData]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const discount = 0;
  const priceBeforeTax = subtotal + shipping - discount;
  const vat = Math.floor(priceBeforeTax * 0.07);
  const total = Math.floor(priceBeforeTax + vat);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-[700px] max-h-[400px] rounded-md bg-white p-4 ">
          <div className="bg-gray-100 p-2 rounded-md h-[175px] w-full">
            {session?.data?.user?.addresses ? (
              <>
                <div className="flex justify-between items-center">
                  <h1>ที่อยู่ในการจัดส่งสินค้า</h1>
                </div>
                <div className="gap-1 flex">
                  <p className="text-gray-600 mt-4">
                    {session.data.user.addresses[0]?.name ?? "ไม่ระบุชื่อ"}
                  </p>
                  <p className="text-gray-600 mt-4">
                    (
                    {session.data.user.addresses[0]?.phonenumber ??
                      "ไม่ระบุเบอร์"}
                    )
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  <p className="text-gray-600 mt-4 max-w-xs">
                    {session.data.user.addresses[0]?.address ??
                      "ไม่ระบุที่อยู่"}
                  </p>
                  <p className="text-gray-600 mt-4">
                    ต.{session.data.user.addresses[0]?.tambon ?? "ไม่ระบุตำบล"}
                  </p>
                  <p className="text-gray-600 mt-4">
                    อ.
                    {session.data.user.addresses[0]?.amphure ?? "ไม่ระบุอำเภอ"}
                  </p>
                  <p className="text-gray-600 mt-4">
                    จ.
                    {session.data.user.addresses[0]?.province ??
                      "ไม่ระบุจังหวัด"}
                  </p>
                </div>
              </>
            ) : (
              <div>ไม่มีที่อยู่สำหรับจัดส่ง</div>
            )}
          </div>
        </div>

        <div className="w-full md:w-[380px] bg-white p-2 rounded-md hidden md:block">
          <div className="flex p-2">
            <h1 className="flex gap-2 text-center items-center font-bold">
              <Icon icon="lets-icons:bag-light" width="24" height="24" />{" "}
              คำสั่งซื้อของคุณ
            </h1>
          </div>
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <div className="p-2">
                      <h1 className="text-[12px] font-thin">{item.title}</h1>
                    </div>
                    <div>
                      <p className="text-red-700">
                        ฿{(item.price * item.quantity).toLocaleString()}.00
                      </p>
                    </div>
                  </div>
                  <div className="p-2">
                    <p>จำนวน {item.quantity}</p>
                  </div>
                  <hr className="mt-2" />
                </div>
              ))}
              <div className="p-2">
                <div className="flex items-center justify-between p-2">
                  <p>ค่าจัดส่ง: </p>
                  <p>฿{shipping.toLocaleString()}.00</p>
                </div>
                <div className="flex items-center justify-between p-2">
                  <p>ค่าส่วนลด: </p>
                  <p>฿{discount.toLocaleString()}.00</p>
                </div>
                <div className="flex items-center justify-between p-2">
                  <p>ราคาก่อนภาษี: </p>
                  <p>฿{priceBeforeTax.toLocaleString()}.00</p>
                </div>
                <div className="flex items-center justify-between p-2">
                  <p>ภาษี VAT 7%: </p>
                  <p>฿{vat.toLocaleString()}.00</p>
                </div>
                <hr />
                <div className="flex items-center justify-between p-2">
                  <p>ยอดรวมสุทธิ: </p>
                  <p>฿{total.toLocaleString()}.00</p>
                </div>

                {session &&
                session.data &&
                session.data.user &&
                Array.isArray(session.data.user.addresses) &&
                session.data.user.addresses.length > 0 ? (
                  <Link
                    href="/user/alternative"
                    className="w-full md:w-[300px] mx-auto bg-red-600 text-white p-2 rounded-md flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <Icon
                      icon="mdi:credit-card-outline"
                      width="24"
                      height="24"
                      className="mr-2"
                    />
                    ดำเนินการชำระเงิน
                  </Link>
                ) : (
                  <Link
                    href="/user/settingsprofile"
                    className="w-full mt-4 bg-gray-600 text-white p-2 rounded-md flex items-center justify-center hover:bg-gray-700 transition-colors"
                  >
                    <Icon
                      icon="mdi:map-marker-plus"
                      width="24"
                      height="24"
                      className="mr-2 flex items-center justify-center"
                    />
                    ไปเพิ่มที่อยู่
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div>ไม่มีสินค้าในตะกร้า</div>
          )}
        </div>
      </div>

      <div className="w-full bg-white rounded-md p-4 mt-8">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="bg-[#f6f9fc] p-6 rounded-md w-full md:w-[350px]">
            <h2 className="text-center mb-2 font-medium">วิธีการจัดส่ง</h2>
            <select
              className="w-full bg-gray-200 h-[40px] rounded-xl px-2"
              onChange={(e) =>
                setCheckoutData((prev: any) => ({
                  ...prev,
                  shippingMethod: e.target.value,
                }))
              }
              value={checkoutData.shippingMethod}
            >
              <option value="จัดส่งปกติ">จัดส่งปกติ</option>
              <option value="รับเองที่สาขา">รับเองที่สาขา</option>
            </select>
          </div>
          <div className="bg-[#f6f9fc] p-6 rounded-md w-full md:w-[350px]">
            <h2 className="text-center mb-2 font-medium">ข้อมูลเพิ่มเติม</h2>
            <select
              className="w-full bg-gray-200 h-[40px] rounded-xl px-2"
              onChange={(e) =>
                setCheckoutData((prev: any) => ({
                  ...prev,
                  additionalInfo: e.target.value,
                }))
              }
              value={checkoutData.additionalInfo}
            >
              <option value="สั่งประกอบ">สั่งประกอบ</option>
              <option value="ไม่ต้องประกอบ">ไม่ต้องประกอบ</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-md border border-gray-200 mt-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          วิธีการชำระเงิน
        </h2>
        <div className="flex flex-col gap-4 p-4">
          {options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-300 ${
                checkoutData.selectedOption === option.label
                  ? "border-2 border-gray-400"
                  : "border border-gray-200"
              } bg-white`}
              onClick={() =>
                setCheckoutData((prev: any) => ({
                  ...prev,
                  selectedOption: option.label,
                }))
              }
            >
              <div className="flex items-center gap-2">
                <Icon
                  icon={option.icon}
                  width="24"
                  height="24"
                  className="text-gray-600"
                />
                <p className="text-gray-800">{option.label}</p>
              </div>
              <input
                type="radio"
                id={option.id}
                name="payment-method"
                value={option.label}
                checked={checkoutData.selectedOption === option.label}
                onChange={() =>
                  setCheckoutData((prev: any) => ({
                    ...prev,
                    selectedOption: option.label,
                  }))
                }
                className="h-4 w-4 text-red-600 focus:ring-red-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-[380px] bg-white p-2 rounded-md block md:hidden mt-10">
        <div className="flex p-2">
          <h1 className="flex gap-2 text-center items-center font-bold">
            <Icon icon="lets-icons:bag-light" width="24" height="24" />{" "}
            คำสั่งซื้อของคุณ
          </h1>
        </div>
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div className="p-2">
                    <h1 className="text-[12px] font-thin">{item.title}</h1>
                  </div>
                  <div>
                    <p className="text-red-700">
                      ฿{(item.price * item.quantity).toLocaleString()}.00
                    </p>
                  </div>
                </div>
                <div className="p-2">
                  <p>จำนวน {item.quantity}</p>
                </div>
                <hr className="mt-2" />
              </div>
            ))}
            <div className="p-2">
              <div className="flex items-center justify-between p-2">
                <p>ค่าจัดส่ง: </p>
                <p>฿{shipping.toLocaleString()}.00</p>
              </div>
              <div className="flex items-center justify-between p-2">
                <p>ค่าส่วนลด: </p>
                <p>฿{discount.toLocaleString()}.00</p>
              </div>
              <div className="flex items-center justify-between p-2">
                <p>ราคาก่อนภาษี: </p>
                <p>฿{priceBeforeTax.toLocaleString()}.00</p>
              </div>
              <div className="flex items-center justify-between p-2">
                <p>ภาษี VAT 7%: </p>
                <p>฿{vat.toLocaleString()}.00</p>
              </div>
              <hr />
              <div className="flex items-center justify-between p-2">
                <p>ยอดรวมสุทธิ: </p>
                <p>฿{total.toLocaleString()}.00</p>
              </div>
              {session &&
                session.data &&
                session.data.user &&
                Array.isArray(session.data.user.addresses) &&
                session.data.user.addresses.length > 0 ? (
                  <Link
                    href="/user/alternative"
                    className="w-full md:w-[300px] mx-auto bg-red-600 text-white p-2 rounded-md flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <Icon
                      icon="mdi:credit-card-outline"
                      width="24"
                      height="24"
                      className="mr-2"
                    />
                    ดำเนินการชำระเงิน
                  </Link>
                ) : (
                  <Link
                    href="/user/settingsprofile"
                    className="w-full mt-4 bg-gray-600 text-white p-2 rounded-md flex items-center justify-center hover:bg-gray-700 transition-colors"
                  >
                    <Icon
                      icon="mdi:map-marker-plus"
                      width="24"
                      height="24"
                      className="mr-2 flex items-center justify-center"
                    />
                    ไปเพิ่มที่อยู่
                  </Link>
                )}
            </div>
          </div>
        ) : (
          <div>ไม่มีสินค้าในตะกร้า</div>
        )}
      </div>
    </>
  );
};

export default Checkout;
