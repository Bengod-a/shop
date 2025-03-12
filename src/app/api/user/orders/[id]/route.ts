// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db";


// export async function GET(req: NextRequest, { params }:any) {
//   const { id } = await params.id;
//   console.log(id);

//   try {
//     const orderid = parseInt(id, 10);
//     const orders = await prisma.order.findUnique({
//       where: { id: orderid },
//       include: {
//         address: true,
//         products: {
//           include: {
//             product: {
//               include: {
//                 images: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     return NextResponse.json(orders);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest, { params }:any) {
  try {
    const { id } = params;
    console.log("Order ID:", id);

    const orderId = parseInt(id, 10);

    if (isNaN(orderId)) {
      return NextResponse.json(
        { error: "Invalid Order ID" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
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

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
      { status: 500 }
    );
  }
}