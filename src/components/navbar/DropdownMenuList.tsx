"use client";

import { useEffect, useState } from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import { Settings, LogOut } from "lucide-react";
import { Icon } from "@iconify/react";
import SidebarCart from "./SidebarCart";

export default function DropdownMenuList() {
  const  session  = useSession() as any
  const [updateProfile, setUpdateProfile] = useState(session?.data?.user);
  const [isSidebarCartOpen, setIsSidebarCartOpen] = useState(false);
  const [refreshedSession, setRefreshedSession] = useState(session);
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


  const toggleSidebarCart = () => {
    setIsSidebarCartOpen((e) => !e);
  };

  useEffect(() => {
    const refreshSession = async () => {
      const sessionData = await session.update(); 
      setRefreshedSession(sessionData);
    };
    refreshSession();
  }, []);

  useEffect(() => {
    setUpdateProfile(session.data?.user);
  }, [session]);

  const hdllogout = async () => {
    await signOut({ redirect: false });
  };
  
  

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <div className="relative flex items-center gap-4 p-2 rounded-full transition-all duration-300 cursor-pointer">
            {updateProfile?.image ? (
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={updateProfile.image}
                alt="Profile"
              />
            ) : (
              <User name=''/>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold capitalize">
                {updateProfile?.name}
              </span>
            </div>
            <div className="absolute bottom-10  left-10 text-white rounded-full font-bold  bg-red-500 px-2 text-base">
              {(cartItems ?? []).length > 0 ? (
                <span>{cartItems.length}</span>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </DropdownTrigger>

        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="user-info" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{updateProfile?.email}</p>
          </DropdownItem>
          <DropdownItem
            key="settings"
            href="/user/settingsprofile"
            className="h-12 mt-2 gap-3 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-300"
          >
            <div className="flex gap-2">
              <Settings size={18} />
              บัญชีของฉัน
            </div>
          </DropdownItem>

          <DropdownItem
            onClick={toggleSidebarCart}
            key="cart"
            href="#"
            className="h-12 mt-2 gap-3 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-300"
          >
            <div className="flex gap-2">
              <div className="absolute bottom-7  left-5 text-white rounded-full font-bold  bg-red-500 px-2 text-sm">
                {(cartItems ?? []).length > 0 ? (
                  <span>{cartItems.length}</span>
                ) : (
                  <span></span>
                )}
              </div>
              <Icon icon="solar:bag-5-broken" width="24" height="24" />
              My Cart
            </div>
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onClick={hdllogout}
            className="h-12 gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-300"
          >
            <div className="flex gap-2">
              <LogOut size={18} />
              Log Out
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {isSidebarCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarCartOpen(false)}
        />
      )}
      <SidebarCart isOpen={isSidebarCartOpen} />
    </div>
  );
}
