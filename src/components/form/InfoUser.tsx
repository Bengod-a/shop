import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Form, Input, Button } from "@heroui/react";

const InfoUser = () => {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState<string>(session?.user?.name || "");
  const [email, setEmail] = useState<string>(session?.user?.email || "");
  const [phonenumber, setPhonenumber] = useState<string>(
    session?.user?.addresses?.[0]?.phonenumber || ""
  );
  const [birthDate, setBirthDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const userId = session?.user?.id;

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setPhonenumber(session.user.addresses?.[0]?.phonenumber || "");
    }
  }, [session]);

  const handleChangename = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeemail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangephonenumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhonenumber(event.target.value);
  };

  const handleChangeBirthDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(event.target.value);
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError("กรุณาเข้าสู่ระบบก่อน");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/user/editusers/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          name,
          email,
          phonenumber,
          birthDate,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "ไม่สามารถอัพเดทข้อมูลได้");
      }

      await update({
        name,
        email,
        phonenumber,
        birthDate,
      });

      setSuccess("อัพเดทข้อมูลสำเร็จ");
    } catch (error: any) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1 className="flex gap-2 text-center items-center">
          <Icon icon="lets-icons:user-fill" width="24" height="24" color="red" />
          <span className="font-bold text-[25px]">ข้อมูลส่วนตัว</span>
        </h1>
      </div>

      <div className="flex justify-between py-4">
        <div className="w-full">
          <div className="bg-white w-full p-4 flex items-center gap-4 rounded-md">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt="User"
                className="rounded-full w-20 h-20 object-cover"
              />
            ) : (
              <Icon icon="uil:user" width="24" height="24" />
            )}
            <span>{session?.user?.name}</span>
            <span className="hidden sm:block text-gray-500">
              {session?.user?.email}
            </span>
          </div>

          {/* <div className="py-6">
            <h1 className="flex gap-2 text-center items-center">
              <Icon
                icon="flowbite:user-edit-solid"
                width="24"
                height="24"
                color="red"
              />
              <span className="font-bold text-[25px]">แก้ไขข้อมูลส่วนตัว</span>
            </h1>

            <div className="bg-white w-full px-10 py-10 rounded-md">
              <Form onSubmit={handleSubmit} className="w-full justify-center items-center space-y-4">
                <div className="grid xl:grid-cols-2 gap-4 md:grid-cols-1">
                  <Input
                    className="xl:w-[350px] md:w-[200px] w-[150px] mx-auto"
                    isRequired
                    label="ชื่อ"
                    labelPlacement="outside"
                    name="name"
                    value={name}
                    onChange={handleChangename}
                  />

                  <Input
                    className="xl:w-[350px] md:w-[200px] w-[150px] mx-auto"
                    label="อีเมล"
                    labelPlacement="outside"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={handleChangeemail}
                  />

                  <Input
                    className="xl:w-[350px] md:w-[200px] w-[150px] mx-auto"
                    label="เบอร์โทรศัพท์"
                    labelPlacement="outside"
                    name="phonenumber"
                    placeholder="เบอร์โทรศัพท์"
                    value={phonenumber}
                    onChange={handleChangephonenumber}
                    type="tel"
                  />

                  <Input
                    className="xl:w-[350px] md:w-[200px] w-[150px] mx-auto"
                    isRequired
                    label="วันเกิด"
                    labelPlacement="outside"
                    name="birthdate"
                    placeholder="เลือกวันที่"
                    type="date"
                    value={birthDate}
                    onChange={handleChangeBirthDate}
                    max={new Date().toISOString().split("T")[0]}
                  />

                  {birthDate && (
                    <div className="text-gray-500">
                      อายุ: {calculateAge(birthDate)} ปี
                    </div>
                  )}
                </div>

                {error && <div className="text-red-500 text-center">{error}</div>}
                {success && <div className="text-green-500 text-center">{success}</div>}

                <div className="flex gap-4">
                  <Button
                    className="w-full"
                    color="danger"
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading || status !== "authenticated"}
                  >
                    แก้ไขข้อมูลส่วนตัว
                  </Button>
                </div>
              </Form>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default InfoUser;