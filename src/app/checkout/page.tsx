"use client";

import Link from "next/link";
import Checkout from "../../components/form/Checkout";
import Navbars from "../../components/navbar/Navbars";
import React, { useState } from "react";

const Page = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <>
      <Navbars />
      <div className="w-full mt-4">
        <div className="max-w-[1230px] mx-auto p-8 flex">
          <div className="flex items-center justify-center mx-auto">
            <div className="flex items-center ">
              <button
                className={`px-4 py-2 rounded-full text-white  transition-all duration-300 max-h-[37px]   ${
                  activeStep === 1 ? "bg-red-600" : "bg-red-300 "
                }`}
                onClick={() => setActiveStep(1)}
              >
                1. รายละเอียด
              </button>

              <div
                className={`w-16 h-1 bg-red-300 ${
                  activeStep === 2 ? "bg-red-500" : ""
                }`}
              ></div>

              <Link
              href={'user/alternative'}
                className={`px-4 py-2 rounded-full  transition-all duration-300 max-h-[37px]  ${
                  activeStep === 2
                    ? "bg-red-600 text-white"
                    : "bg-red-200 text-red-600"
                }`}
                onClick={() => setActiveStep(2)}
              >
                2. ชำระเงิน
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
          <Checkout />
        </div>
      </div>
    </>
  );
};

export default Page;
