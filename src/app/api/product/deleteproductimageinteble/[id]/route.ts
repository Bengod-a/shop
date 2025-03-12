import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authCheck } from "../../../../../utils/authCheck";


export async function DELETE(request: NextRequest, { params }:any) {
  const { id } = await params.id;
    const check = await authCheck();
    if (!check) {
      return NextResponse.json({ message: "อย่าๆ" }, { status: 403 });
    }  
  try {
    const deletedImage = await prisma.image.delete({
      where: { id: parseInt(id) }, 
    });

    return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
