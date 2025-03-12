import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { uploadFile } from "@/lib/uspabase";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const image = formData.get("image") as File | null;

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "กรุณากรอกข้อมูลให้ครบ" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "อีเมลนี้ถูกใช้แล้ว" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const image_url = image ? await uploadFile(image) : undefined;

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        password: hashedPassword,
        image: image ? image_url : undefined,
      },
    });

    return NextResponse.json({
      message: "สร้างบัญชีผู้ใช้สำเร็จ",
      user: newUser,
    });
  } catch (error: any) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { message: error.message || "Authentication failed" },
      { status: 500 }
    );
  }
}
