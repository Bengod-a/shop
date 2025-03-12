"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [language, setLanguage] = useState("ไทย");

  const handleLanguageChange = (lang: any) => {
    setLanguage(lang);
  };

  return (
    <div>
      <div className="bg-black px-4 py-1 flex text-center justify-center">
        <div className="flex justify-between items-center w-[1200px]">
          <Link href={"/"} className="block md:hidden">
            <h1 className="text-xl font-bold text-red-500">I Have GPU</h1>
          </Link>
          <div className="flex gap-4">
            <div className="text-white  gap-2 text-xs hidden md:block">
              <div>
                <span className="flex justify-center items-center gap-1">
                  <Phone size="15px" />
                  66+
                </span>
              </div>
            </div>
            <div className="text-white  items-center gap-2 text-xs hidden md:block">
              <div>
                <span className="flex justify-center items-center gap-1">
                  <Mail size="15px" /> ihavegpu@gmail.com
                </span>
              </div>
            </div>
            <span className="text-white  items-center text-sm hidden md:block">
              ihavegpu ถ้าคุณชอบคอมพิวเตอร์ เราคือเพื่อนกัน
            </span>
          </div>

          {/* ด้านขวา */}
          <div>
            <Dropdown>
              <DropdownTrigger>
                <button className="text-white">{language}</button>
              </DropdownTrigger>
              <DropdownMenu aria-label="เลือกภาษา">
                <DropdownItem
                  key="thai"
                  onClick={() => handleLanguageChange("ไทย")}
                >
                  ไทย
                </DropdownItem>
                <DropdownItem
                  key="english"
                  onClick={() => handleLanguageChange("English")}
                >
                  English
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
