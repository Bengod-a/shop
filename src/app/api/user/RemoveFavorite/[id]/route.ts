import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/db";

export async function DELETE(req: NextRequest, { params }:any) {
  try {
    const { id } = params 
    const productId = parseInt(id);

    const { userId } = await req.json();
    const parsedUserId = parseInt(userId);

    const user = await prisma.user.findUnique({
      where: { id: parsedUserId },
    });

    if (!user) {
      return NextResponse.json({ message: "กรุณาเข้าสู่ระบบก่อน" }, { status: 404 });
    }

    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: parsedUserId,
        productId,
      },
    });

    if (!existingFavorite) {
      return NextResponse.json({ message: "Item is not in the favorites list" }, { status: 404 });
    }

    await prisma.favorite.delete({
      where: {
        id: existingFavorite.id, 
      },
    });

    return NextResponse.json({ message: "Removed from favorites successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
