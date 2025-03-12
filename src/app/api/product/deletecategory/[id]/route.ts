// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db";
// import { authCheck } from "../../../../../utils/authCheck";

// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//     const check = await authCheck();
//     if (!check) {
//       return NextResponse.json({ message: "อย่าๆ" }, { status: 403 });
//     }
//   try {
//     const id = parseInt(params.id, 10);
//     if (isNaN(id)) {
//       return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
//     }

//     const category = await prisma.category.delete({
//       where: { id },
//     });

//     return NextResponse.json({ message: "Category deleted successfully", category }, { status: 200 });
//   } catch (error) {
//     console.error("❌ Error deleting category:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authCheck } from "../../../../../utils/authCheck";

export async function DELETE(request: NextRequest, { params }:any) {
  const check = await authCheck();
  if (!check) {
    return NextResponse.json({ message: "อย่าๆ" }, { status: 403 });
  }

  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const product = await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully", product }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}