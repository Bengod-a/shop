import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/db";

export async function GET(req: NextRequest, { params }:any) {
  try {
    const { id } = params; 
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json({ message: "Invalid Product ID" }, { status: 400 });
    }

    const url = new URL(req.url); 
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const parsedUserId = parseInt(userId, 10);

    if (isNaN(parsedUserId)) {
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
    }

    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: parsedUserId,
        productId,
      },
    });

    return NextResponse.json({ isFavorite: existingFavorite !== null }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}