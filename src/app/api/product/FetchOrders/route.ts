import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function GET(request: NextRequest) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        address: true,
        products: {
          include: {
            product: {
              include: {
                images: true,
            },
          },
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
      { status: 500 }
    );
  }
}
