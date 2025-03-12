"use client"
import { useState, useEffect } from "react";
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import NavBarAdmin from "./NavBarAdmin";

interface User {
  id: string;
  email: string;
  role: string;
  enabled: boolean;
  image?: string;
}

export default function TableUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchUser, setSearchUser] = useState("");

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fetchuser", { method: "GET" });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editRoleUsers = async (email: string, role: string) => {
    setLoading(true);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.email === email ? { ...user, role } : user
      )
    );

    try {
      const response = await fetch("/api/editroleusers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Role updated successfully!");
      } else {
        toast.error(data.message || "Failed to update role.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role.");
      fetchUser(); 
    } finally {
      setLoading(false);
    }
  };

  const editStatusUsers = async (email: string, enabled: boolean) => {
    setLoading(true);
    setUsers((prevUser) =>
      prevUser.map((user) =>
        user.email === email ? { ...user, enabled } : user
      )
    );

    try {
      const response = await fetch("/api/editstatususers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, enabled }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Status updated successfully!");
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status.");
      fetchUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const filterUser = users.filter((user) =>
    user.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <>
      <NavBarAdmin />

      <div className="container mx-auto p-8 bg-gradient-to-b text-white shadow-2xl rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            จัดการผู้ใช้งาน
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาผู้ใช้..."
              className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className=" text-black">
                  <th className="px-6 py-3 text-left">ลำดับ</th>
                  <th className="px-6 py-3 text-left">โปรไฟล์</th>
                  <th className="px-6 py-3 text-left">อีเมล</th>
                  <th className="px-6 py-3 text-left">สิทธิ์</th>
                  <th className="px-6 py-3 text-left">สถานะ</th>
                  <th className="px-6 py-3 text-left">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filterUser.map((user: User, index) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-700 hover:bg-gray-400 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="relative w-12 h-12">
                        <Image
                          src={
                            user.image ||
                            "https://th.bing.com/th/id/R.bf40b0e86c9daf96e360f010aca4658f?rik=GLaBLrFbexez6w&pid=ImgRaw&r=0"
                          }
                          className="w-12 h-12 rounded-full object-cover"
                          alt={`Profile of ${user.email}`}
                        />
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                            user.enabled ? "bg-green-500" : "bg-red-500"
                          } border-2 border-white`}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-black">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        className="bg-gray-700 border border-gray-600 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue={user.role}
                        onChange={(e) =>
                          editRoleUsers(user.email, e.target.value)
                        }
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        onClick={() =>
                          editStatusUsers(user.email, !user.enabled)
                        }
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.enabled
                            ? "bg-green-500/20 text-green-950"
                            : "bg-red-500/20 text-red-500"
                        }`}
                      >
                        {user.enabled ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                      </Button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          className="p-2 hover:bg-red-500/20 rounded-full transition-colors duration-200"
                          title="ลบ"
                          // onClick={() => DeleteUsers(parseInt(user.id))}
                        >
                          <FiTrash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-400">ไม่มีข้อมูลผู้ใช้งาน</div>
        )}
      </div>
    </>
  );
}
