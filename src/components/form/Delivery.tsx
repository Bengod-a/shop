"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import Address from "./Address";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Delivery = () => {
  const [activePage, setActivePage] = useState("list");
  const [loading, setLoading] = useState(true);
  const session = useSession();



  const hdlDeleteAddress = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user/deleteaddress/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      toast.success("ลบที่อยู่สำเร็จ");
      session.update();
    } catch (error: any) {
      console.error( error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (session?.status === "authenticated" && loading === true) {
      session.update();
      setLoading(false);
    }
  }, [session]);


  

  return (
    <>
      {activePage === "list" ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-baseline xl:items-center gap-4">
            <h1 className="flex gap-2 items-center">
              <Icon icon="bxs:map" width="24" height="24" color="red" />
              <span className="font-bold text-[25px]">ที่อยู่สำหรับจัดส่ง</span>
            </h1>

            <div
              onClick={() => setActivePage("add")}
              className="flex cursor-pointer"
            >
              <div className="px-6 py-2 bg-[#ffe1e6] text-red-700 rounded-md hover:bg-red-200 duration-300">
                เพิ่มที่อยู่
              </div>
            </div>
          </div>

          {session?.data?.user.addresses &&
          session.data.user.addresses.length > 0 ? (
            <div className="py-4 flex flex-col gap-4">
              {session.data.user.addresses.map((address: any) => (
                <div
                  key={address.id}
                  className="p-4 border border-gray-300 rounded-md flex flex-col sm:flex-row justify-between items-center"
                >
                  <div className="flex flex-col">
                    <p className=" text-gray-600">สำหรับจัดส่ง</p>
                    <p className=" text-gray-600">
                      {address.address} ต.{address.tambon} อ.{address.amphure}
                      จ.{address.province} {address.zipcode}
                    </p>
                    <p className=" text-gray-600">0{address.phonenumber}</p>
                  </div>

                  <div className="flex gap-2 items-center justify-center">
                    <button className="flex  rounded-full p-3 sm:p-2 items-center justify-center bg-gray-200 hover:bg-gray-300 transition-all duration-300">
                      <Icon
                        className="text-gray-500 font-bold"
                        icon="fluent:edit-48-regular"
                        width="20"
                        height="20"
                      />
                    </button>

                    <button
                    onClick={() => hdlDeleteAddress(address.id)}
                    className="flex rounded-full p-3 sm:p-2 items-center justify-center bg-gray-200 hover:bg-gray-300 transition-all duration-300">
                    <Icon  className="text-gray-500 font-bold" icon="fluent-mdl2:delete" width="20" height="20" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-between py-4">
              <h5 className="text-gray-500">ไม่มีที่อยู่สำหรับจัดส่ง</h5>
            </div>
          )}
        </>
      ) : (
        <Address setActivePage={setActivePage} />
      )}
    </>
  );
};

export default Delivery;
