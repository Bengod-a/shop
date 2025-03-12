import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authCheck } from "../../../utils/authCheck";

export async function PUT(req: NextRequest) {
    const check = await authCheck();
    if (!check) {
      return NextResponse.json({ message: "อย่าๆ" }, { status: 403 });
    }

  try {
    const body = await req.json();

    const EditStatusUsers = await prisma.user.update({
      where: { email: body.email.toLowerCase() },
      data: {
        enabled: body.enabled,
      },
    });

    NextResponse.json({EditStatusUsers}, { status:201 })
  } catch (error) {
    console.log(error);
  }
}
