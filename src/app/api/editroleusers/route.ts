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

    const updateRoleUser = await prisma.user.update({
      where: { email: body.email.toLowerCase() },
      data: {
        role: body.role,
      },
    });

    return NextResponse.json({ updateRoleUser }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: error.message || "Error updating role" },
      { status: 500 }
    );
  }
}
