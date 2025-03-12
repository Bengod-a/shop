"use client";

import {useState, useEffect} from "react";
import { Button, Input, Checkbox, Link, Form, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { signIn, useSession, signOut } from "next-auth/react";


export default function Signin() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { data: session, status } = useSession();
  

  const router = useRouter();



  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router])
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });     

      if (!result) {
        toast.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
        return;
      }

      if (result.error) {
        toast.error(result.error);
        return;
      }
      
      toast.success("ล็อกอินสำเร็จ");
      router.push("/");
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  

  };
  return (
    <div className="flex items-center min-h-screen justify-center w-full">
      <main className="flex flex-col w-full h-full">
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
            <div className="flex flex-col gap-1">
              <h1 className="text-large font-medium">เข้าสู่ระบบ</h1>
            </div>

            <Form
              className="flex flex-col gap-3"
              validationBehavior="native"
              onSubmit={handleSubmit}
            >
              <Input
                isRequired
                label="อีเมล"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
                value={email}
                onValueChange={(value) => setEmail(value)}
              />
              <Input
                isRequired
                endContent={
                  <button type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="รหัสผ่าน"
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                value={password}
                onValueChange={(value) => setPassword(value)}
              />

              <Button className="w-full" color="primary" type="submit">
                เข้าสู่ระบบ
              </Button>
            </Form>
            {message && (
              <p className="text-small text-danger text-center">{message}</p>
            )}
            <div className="flex items-center gap-4 py-2">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">OR</p>
              <Divider className="flex-1" />
            </div>
            <div className="flex flex-col gap-2">
              {/* <Button
              className=""
                startContent={
                  <Icon icon="flat-color-icons:google" width={24} />
                }
                variant="bordered"
              >
                เข้าสู่ระบบด้วยบัญชี Google
              </Button> */}
            </div>
            <p className="text-center text-small">
              Need to create an account?&nbsp;
              <Link href="/register" size="sm">
                สมัครสมาชิก
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
