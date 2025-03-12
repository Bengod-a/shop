import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    console.log("req", req);
    const {
      name,
      phonenumber,
      address,
      province,
      amphure,
      tambon,
      zipcode,
      userId,
    } = await req.json();
    console.log("req.body", {
      name,
      phonenumber,
      address,
      province,
      amphure,
      tambon,
      zipcode,
      userId,
    });

    if (!name ||  !phonenumber || !address ||   !province || !amphure || !tambon || !userId
    ) {
      return NextResponse.json({ message: "ข้อมูลไม่ครบถ้วน" }, { status: 400 });
    }

    const userAddress = await prisma.address.create({
      data: {
        userId,
        name,
        phonenumber,
        address,
        province,
        amphure,
        tambon,
        zipcode: zipcode,
      },
    });
    return NextResponse.json(  { message: "เพิ่มที่อยู่สำเร็จ", userAddress }, { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาด", error: error.message },
      { status: 500 }
    );
  }
}
