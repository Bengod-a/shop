"use client";

import React, { useEffect } from "react";
import { Link } from "@heroui/react";
import DropdownMenuList from "./DropdownMenuList";
import { useSession } from "next-auth/react";
import Header from "./Header";
import Searchbar from "./Searchbar";
import Menupath from "./Menupath";

const Navbars = () => {
  const session = useSession();

  useEffect(() => {
    session.update();
  }, []);

  return (
    <nav className="bg-white w-full shadow-lg">
      <Header />
      <div className="px-4 md:px-12 mx-auto max-w-[1200px]">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors">
              I Have GPU
            </h1>
          </Link>

          <div className="hidden md:block  mx-4 w-[670px]">
            <Searchbar />
          </div>

          <div className="flex gap-2 md:gap-4 items-center">
            <div className="md:hidden">
              <Searchbar isMobile />
            </div>

            {session?.data?.user ? (
              <div className="flex items-center gap-2">
                <DropdownMenuList />
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/register"
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 hover:scale-105"
                >
                  สมัครสมาชิก
                </Link>
                <Link
                  href="/login"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 hover:scale-105"
                >
                  เข้าสู่ระบบ
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-2">
          <Menupath />
        </div>
      </div>
    </nav>
  );
};

export default Navbars;
