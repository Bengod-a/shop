"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Select, SelectItem, Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface AddressData {
  id: number;
  zip_code: number;
  name_th: string;
  name_en: string;
  amphure_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  amphure: {
    id: number;
    name_th: string;
    name_en: string;
    province_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    province: {
      id: number;
      name_th: string;
      name_en: string;
      geography_id: number;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
    };
  };
}

const Address = ({ setActivePage }: any) => {
  const [provinceData, setProvinceData] = useState<AddressData[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [amphureData, setAmphureData] = useState<
    { id: number; name_th: string }[]
  >([]);
  const [tambonData, setTambonData] = useState<
    { id: number; name_th: string; zip_code: number }[]
  >([]);
  const [selectedTambon, setSelectedTambon] = useState<{
    id: number;
    name_th: string;
    zip_code: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string | null>(null);
  const [address, setAddress] = useState<string>("");
  const [zipcode, setZipcode] = useState<number | null>(null);
  const session = useSession();

  const [selectedAmphure, setSelectedAmphure] = useState<{
    id: number;
    name_th: string;
  } | null>(null);

  useEffect(() => {
    if (session?.status === "authenticated" && loading === true) {
      session.update();
      setLoading(false);
    }
  }, [session]);

  const fetchprovince = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_revert_tambon_with_amphure_province.json"
      );
      const jsonData: AddressData[] = await response.json();
      setProvinceData(jsonData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchprovince();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const selectedProvinceData = provinceData.filter(
        (item) => item.amphure.province.name_th === selectedProvince
      );
      const amphures = selectedProvinceData.reduce(
        (acc: { id: number; name_th: string }[], item) => {
          if (!acc.find((amphure) => amphure.id === item.amphure.id)) {
            acc.push({ id: item.amphure.id, name_th: item.amphure.name_th });
          }
          return acc;
        },
        []
      );
      setAmphureData(amphures);
      setSelectedAmphure(null);
      setTambonData([]);
      setSelectedTambon(null);
    } else {
      setAmphureData([]);
      setSelectedAmphure(null);
      setTambonData([]);
      setSelectedTambon(null);
    }
  }, [selectedProvince, provinceData]);

  useEffect(() => {
    if (selectedTambon) {
      setZipcode(selectedTambon.zip_code);
    } else {
      setZipcode(null);
    }
  }, [selectedTambon]);

  useEffect(() => {
    if (selectedAmphure) {
      const selectedAmphureData = provinceData.filter(
        (item) => item.amphure.id === selectedAmphure.id
      );
      const tambons = selectedAmphureData.map((item) => ({
        id: item.id,
        name_th: item.name_th,
        zip_code: item.zip_code,
      }));
      setTambonData(tambons);
      setSelectedTambon(null);
    } else {
      setTambonData([]);
      setSelectedTambon(null);
    }
  }, [selectedAmphure, provinceData]);

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProvince(event.target.value);
  };

  const handleAmphureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAmphureId = Number(event.target.value);
    const selectedAmphure = amphureData.find(
      (amphure) => amphure.id === selectedAmphureId
    );
    setSelectedAmphure(selectedAmphure || null);
  };

  const handleTambonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTambonId = Number(event.target.value);
    const selectedTambon = tambonData.find(
      (tambon) => tambon.id === selectedTambonId
    );
    setSelectedTambon(selectedTambon || null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const addressData = {
      userId: session?.data?.user?.id,
      name: name,
      phonenumber: phonenumber ? Number(phonenumber) : null,
      address: address,
      province: selectedProvince,
      amphure: selectedAmphure?.name_th,
      tambon: selectedTambon?.name_th,
      zipcode: zipcode,
    };

    try {
      const response = await fetch("/api/user/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "เกิดข้อผิดพลาด");
      }

      console.log(data);
      toast.success("เพิ่มที่อยู่สำเร็จ");
      session.update();
      setActivePage("list");
    } catch (error: any) {
      toast.error(error.message || "เกิดข้อผิดพลาด");
      console.error(error);
    }
  };

  return (
    <div className=" flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-baseline xl:items-center gap-4">
        <h1 className="flex gap-2 items-center">
          <Icon icon="bxs:map" width="24" height="24" color="red" />
          <span className="font-bold text-[25px]">ที่อยู่สำหรับจัดส่ง</span>
        </h1>

        <div
          onClick={() => setActivePage("list")}
          className="flex cursor-pointer"
        >
          <div className="px-6 py-2 bg-[#ffe1e6] text-red-700 rounded-md hover:bg-red-200 duration-300">
            กลับไปหน้า ที่อยู่
          </div>
        </div>
      </div>
      <div className="flex-grow relative flex items-center justify-center py-4">
        <Form
          onSubmit={handleSubmit}
          className="w-full max-w-[900px] space-y-4 bg-white rounded-md p-6 md:p-8 text-center"
        >
          <div className="flex flex-col gap-4 felx items-center justify-center mx-auto">
            <Input
              className="xl:w-[800px] md:w-[500px]  lg:w-[700px]  mx-auto"
              isRequired
              label="ชื่อ-นามสกุล"
              labelPlacement="outside"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              className="xl:w-[800px] md:w-[500px] lg:w-[700px] mx-auto"
              isRequired
              label="เบอร์โทรศัพท์"
              labelPlacement="outside"
              name="phonenumber"
              type="tel"
              value={phonenumber || ""}
              onChange={(e) => setPhonenumber(e.target.value)}
            />

            <Input
              className="xl:w-[800px] md:w-[500px]  lg:w-[700px]  mx-auto"
              isRequired
              label="ที่อยู่"
              labelPlacement="outside"
              name="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {/* From 2 */}
            <div className="grid xl:grid-cols-2 gap-4 lg:grid-cols-1 grid-cols-1">
              {/* จังหวัด */}
              <select
                required
                name="province"
                className="bg-gray-200 h-[40px] flex items-center justify-center rounded-xl"
                onChange={handleProvinceChange}
              >
                <option value="">เลือกจังหวัด</option>
                {provinceData
                  .reduce((acc: string[], item) => {
                    if (!acc.includes(item.amphure.province.name_th)) {
                      acc.push(item.amphure.province.name_th);
                    }
                    return acc;
                  }, [])
                  .map((provinceName) => (
                    <option key={provinceName} value={provinceName}>
                      {provinceName}
                    </option>
                  ))}
              </select>

              {/* อำเภอ  */}
              <select
                required
                name="amphure"
                className="bg-gray-200 h-[40px] flex items-center justify-center rounded-xl"
                onChange={handleAmphureChange}
              >
                <option value="">เลือกอำเภอ/เขต</option>
                {amphureData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name_th}
                  </option>
                ))}
              </select>

              {/* ตำบล */}
              <select
                name="tambon"
                className="bg-gray-200 h-[40px] flex items-center justify-center rounded-xl"
                onChange={handleTambonChange}
              >
                <option value="">เลือกตำบล</option>
                {tambonData.map((tambon) => (
                  <option key={tambon.id} value={tambon.id}>
                    {tambon.name_th}
                  </option>
                ))}
              </select>

              <Input
                value={String(zipcode || "")}
                disabled
                className="xl:w-[400px] md:w-[500px] lg:w-[700px] w-[200px] mx-auto"
                isRequired
                labelPlacement="outside"
                name="zipcode"
                placeholder="รหัสไปรษณีย์"
                type="text"
              />
            </div>

            <div className="flex gap-4">
              <Button className="w-full" color="danger" type="submit">
                เพิ่มที่อยู่
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Address;
