"use client";
import React from "react";
import { Icon } from "@iconify/react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <div className="flex flex-col items-center">
        <Icon icon="eva:loading-spinner-fill" width="50" height="50" className="animate-spin" />
        <p className="mt-4 text-xl font-semibold text-gray-600">กำลังโหลด...</p>
      </div>
    </div>
  );
};

export default Loading;
