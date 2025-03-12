"use client";

import Link from "next/link";
import Navbars from "../../../components/navbar/Navbars";

import React, { useState, useEffect } from "react";
import Alternative from "../../../components/form/Alternative";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [activeStep, setActiveStep] = useState(2);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    session.update();
  }, []);

  useEffect(() => {
    if (!session.data?.user) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Navbars />
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 mt-8">
        <div className="flex items-center  justify-center">
          <Link
            href="/checkout"
            className={`px-4 py-2 rounded-full text-white  transition-all duration-300 max-h-[37px]  ${
              activeStep === 2 ? "bg-red-600" : "bg-red-300 "
            }`}
            onClick={() => setActiveStep(1)}
          >
            1. รายละเอียด
          </Link>

          <div
            className={`w-16 h-1 bg-red-300 ${
              activeStep === 2 ? "bg-red-500" : ""
            }`}
          ></div>

          <button
            className={`px-4 py-2 rounded-full  transition-all duration-300 max-h-[37px]  ${
              activeStep === 2
                ? "bg-red-600 text-white"
                : "bg-red-200 text-red-600"
            }`}
            onClick={() => setActiveStep(2)}
          >
            2. ชำระเงิน
          </button>
        </div>

        <Alternative />
      </div>
    </>
  );
};

export default Page;
