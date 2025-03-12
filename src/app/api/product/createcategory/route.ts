import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authCheck } from "../../../../utils/authCheck";

export async function POST(request: NextRequest) {
  const check = await authCheck();
  if (!check) {
    return NextResponse.json({ message: "อย่าๆ" }, { status: 403 });
  }

  const body = await request.json();
  const { name } = body;
  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }
  try {
    const category = await prisma.category.create({
      data: {
        name: name,
      },
    });
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
