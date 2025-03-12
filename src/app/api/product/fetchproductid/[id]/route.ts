// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db"; 

// export async function GET(req: NextRequest, context: { params: { id: string } }) {
//     try {
//         const { id } = await context.params; 

//         const productId = parseInt(id, 10);
//         if (isNaN(productId)) {
//             return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
//         }

        
//         const product = await prisma.product.findUnique({
//             where: { id: productId },
//             include:{
//                 images: true
//             }
//         });

//         if (!product) {
//             return NextResponse.json({ error: "Product not found" }, { status: 404 });
//         }

//         return NextResponse.json(product, { status: 200 });

//     } catch (error) {
//         console.error("Error fetching product:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }


import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest, { params }:any) {
  try {
    const { id } = params; 

    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}