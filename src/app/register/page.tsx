"use client";

import { useEffect, useState } from "react";
import { Form, Input, Button, Link, Divider } from "@heroui/react";
import ImageInput from "../../components/form/ImageInput";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formdata = new FormData();

    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    if (image) {
      formdata.append("image", image);
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formdata,
      });

      const data = await response.json();

      

      if (response.ok) {
        toast.success("สมัครสมาชิกสำเร็จ!"); 
        router.push("/login");
      } else {
        throw new Error(data.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
      }
    } catch (error: any) {
      console.error("Registration error:", error.message);
      toast.error(error.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
    }
  };

  return (
    <div className="flex items-center min-h-screen justify-center w-full">
      <main className="flex flex-col w-full h-full">
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
            <div className="flex flex-col gap-1">
              <h1 className="text-large font-medium">สมัครสมาชิก</h1>
            </div>
            <Form
              className="flex flex-col gap-6"
              validationBehavior="native"
              onSubmit={handleSave}
            >
              <Input
                isRequired
                label="name"
                name="name"
                placeholder="Enter your name"
                type="text"
                variant="bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                isRequired
                label="อีเมล"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                isRequired
                label="รหัสผ่าน"
                name="password"
                placeholder="Enter your password"
                type="text"
                variant="bordered"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div className="mt-2">
                  <ImageInput onFileChange={setImage} />
                </div>
              </div>

              <Button className="w-full" color="primary" type="submit">
                สมัครสมาชิก
              </Button>
            </Form>

            <div className="flex items-center gap-4 py-2">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">OR</p>
              <Divider className="flex-1" />
            </div>
            <p className="text-center text-small">
              Need to create an account?&nbsp;
              <Link href="/login" size="sm">
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default RegisterPage;
