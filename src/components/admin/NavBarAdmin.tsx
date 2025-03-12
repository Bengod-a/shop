"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@heroui/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiBell, FiSettings, FiLogOut, FiUser, FiSearch } from 'react-icons/fi';
import SidebarAdmin from "@/components/admin/SidebarAdmin";



const NavBarAdmin = () => {
   const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState(session?.user);
  const [notifications, setNotifications] = useState(3); 
  const router = useRouter();

  

  return (
    <nav className=" top-0 z-50 w-full bg-gradient-to-r  ">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <SidebarAdmin />
            <div className="ml-4">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Admin Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
           

            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-all duration-200">
                  {session?.user?.image ? (
                    <>
                      <Image
                        className="rounded-full w-8 h-8 ring-2 ring-blue-500"
                        src={session.user.image}
                        width={32}
                        height={32}
                        alt="Profile"
                      />
                      <div className="hidden md:flex flex-col">
                        <span className="text-sm font-medium text-black">
                          {session.user.name}
                        </span>
                        <span className="text-xs  text-black">
                          {session.user.email}
                        </span>
                      </div>
                    </>
                  ) : (
                    <User
                      as="button"
                      className="transition-transform"
                      description={session?.user?.email}
                      name={session?.user?.name}
                    />
                  )}
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu">
                <DropdownItem
                  key="profile"
                  className=" hover:bg-gray-200"
                  startContent={<FiUser className="w-4 h-4" />}
                  onClick={() => router.push('/settingsprofile')}
                >
                  โปรไฟล์
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  className=" hover:bg-gray-200"
                  startContent={<FiSettings className="w-4 h-4" />}
                  onClick={() => router.push('/settings')}
                >
                  ตั้งค่า
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className="text-red-500 hover:bg-gray-700"
                  startContent={<FiLogOut className="w-4 h-4" />}
                  onClick={() => router.push('/api/auth/signout')}
                >
                  ออกจากระบบ
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default NavBarAdmin