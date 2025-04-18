// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../../../../lib/db";

// export async function POST(req: NextRequest, { params }:any) {
//   try {
//     const { id } =  params.id; 
//     const productId = parseInt(id);


//     const { userId } = await req.json();
//     const parsedUserId = parseInt(userId);

//     const user = await prisma.user.findUnique({
//       where: { id: parsedUserId },
//     });

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     const existingFavorite = await prisma.favorite.findFirst({
//       where: {
//         userId: parsedUserId,
//         productId,
//       },
//     });

//     await prisma.favorite.create({
//       data: {
//         userId: parsedUserId,
//         productId,
//       },
//     });

//     return NextResponse.json({ message: "เพิ่มเข้ารายการที่ถูกใจสำเร็จ" }, { status: 200 });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/db";

export async function POST(req: NextRequest, { params }:any) {
  try {
    const { id } = params;
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json({ message: "Invalid Product ID" }, { status: 400 });
    }

    const { userId } = await req.json();
    const parsedUserId = parseInt(userId, 10);

    if (!userId || isNaN(parsedUserId)) {
      return NextResponse.json({ message: "Invalid or missing User ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: parsedUserId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: parsedUserId,
        productId,
      },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { message: "สินค้านี้อยู่ในรายการที่ถูกใจแล้ว" },
        { status: 409 } 
      );
    }


    await prisma.favorite.create({
      data: {
        userId: parsedUserId,
        productId,
      },
    });

    return NextResponse.json({ message: "เพิ่มเข้ารายการที่ถูกใจสำเร็จ" }, { status: 201 }); // 201 Created
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}