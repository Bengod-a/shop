import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/db";

export async function DELETE(req: NextRequest, { params }:any) {
  const { id } = params.id;
    console.log(id);

  try {
    const addressId = parseInt(id, 10);
    
    const deletedAddress = await prisma.address.delete({
      where: { id: addressId },
    });

    return NextResponse.json(
      { message: "ลบที่อยู่สำเร็จ", deletedAddress }, { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting address:", error);
      if(error.code === 'P2025'){
        return NextResponse.json(
          { error: "Address not found" },
          { status: 404 }
        );
      }
    return NextResponse.json(
      { error: "Failed to delete address" },
      { status: 500 }
    );
  }
}
