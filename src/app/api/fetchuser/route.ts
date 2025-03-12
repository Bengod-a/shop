import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const user = await prisma.user.findMany();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
