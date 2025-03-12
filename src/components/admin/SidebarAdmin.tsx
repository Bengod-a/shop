"use client";

import { useEffect, useState } from "react";
import "flowbite";
import {
  LayoutDashboard,
  Menu,
  UserRoundCheck,
  Film,
  Settings,
  ChevronDown,
  ShoppingBasket,
  Home,
  LogOut,
  SearchCheck,
  ChartColumnStacked,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Icon } from "@iconify/react/dist/iconify.js";

const menuItems = [
  {
    title: "แดชบอร์ด",
    icon: <LayoutDashboard size={20} />,
    path: "/admin",
  },
  {
    title: "จัดการผู้ใช้",
    icon: <UserRoundCheck size={20} />,
    path: "/admin/edituser",
  },
  {
    title: "จัดการข้อมูล",
    icon: <Film size={20} />,
    submenu: [
      {
        title: "เพิ่มสินค้า",
        icon: <ShoppingBasket size={18} />,
        path: "/admin/product/add",
      },
      {
        title: "เพิ่มหมวดหมู่สินค้า",
        icon: <Icon icon="material-symbols-light:box-add-outline" width="24" height="24" />,
        path: "/admin/product/createcategory",
      },
      // {
      //   title: "รายการสินค้า",
      //   icon: <SearchCheck size={18} />,
      //   path: "/admin/product/list",
      // },
      {
        title: "ออเดอร์",
        icon:<Icon icon="lsicon:order-done-outline" width="16" height="16" />,
        path: "/admin/product/orders",
      },
    ],
  },
  {
    title: "ตั้งค่า",
    icon: <Settings size={20} />,
    path: "/admin/settings",
  },
];

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    import("flowbite");
  }, []);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const isActive = (path: string) => pathname === path;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
        type="button"
      >
        <Menu size={22} />
      </button>

      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-900 border-r border-gray-800`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h5 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Admin Panel
          </h5>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:bg-gray-800 rounded-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col h-[calc(100vh-73px)]">
          <div className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => (
                <li key={item.title}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={`w-full flex items-center justify-between p-2 text-gray-300 rounded-lg hover:bg-gray-800 group transition-colors duration-200`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown
                          size={18}
                          className={`transform transition-transform duration-200 ${
                            openSubmenu === item.title ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openSubmenu === item.title && (
                        <ul className="mt-1 ml-6 space-y-1 border-l border-gray-800">
                          {item.submenu.map((subitem) => (
                            <li key={subitem.title}>
                              <Link
                                href={subitem.path}
                                className={`flex items-center gap-2 p-2 text-sm rounded-lg transition-colors duration-200 ${
                                  isActive(subitem.path)
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                                }`}
                              >
                                {subitem.icon}
                                <span>{subitem.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 ${
                        isActive(item.path)
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 space-y-2 border-t border-gray-800">
            <Link
              href="/"
              className="flex items-center gap-3 p-2 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <Home size={20} />
              <span>กลับหน้าหลัก</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 p-2 text-red-400 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <LogOut size={20} />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SidebarAdmin;
