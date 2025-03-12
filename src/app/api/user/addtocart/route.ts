import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

interface ProductItem {
  productId: number;
  quantity: number;
}

interface AddressItem {
  id: number;
  name: string;
  phonenumber: number;
  address: string;
  province: string;
  amphure: string;
  tambon: string;
  zipcode: number;
  userId: number;
}

interface RequestBody {
  userId: number;
  products: ProductItem[];
  cartTotal: number;
  address: AddressItem[];
}

export async function POST(req: NextRequest) {
  try {
    const { userId, products, cartTotal, address } = (await req.json()) as RequestBody;

    if (!userId || !products.length || !address || !address[0]?.id) {
      return NextResponse.json({ message: "ข้อมูลไม่ครบถ้วน" }, { status: 400 });
    }

    const addressId = address[0].id;

    const validAddress = await prisma.address.findFirst({
      where: { id: addressId, userId },
    });
    if (!validAddress) {
      return NextResponse.json(
        { message: "ที่อยู่ไม่ถูกต้องหรือไม่ใช่ของผู้ใช้" },
        { status: 400 }
      );
    }

    let cart = await prisma.cart.findFirst({
      where: { orderbyId: userId },
      include: { products: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { orderbyId: userId, cartTotal: 0 },
        include: { products: true },
      });
    }

    let totalCartPrice = 0;
    const productUpdates: { id: number; quantity: number; price: number }[] = [];

    const productIds = products.map((item) => item.productId);
    const productData = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = new Map(productData.map((p) => [p.id, p]));

    for (const item of products) {
      const { productId, quantity } = item;

      const product = productMap.get(productId);
      if (!product || product.quantity < quantity) {
        return NextResponse.json(
          { message: `สินค้า ${productId} ไม่มีหรือสต็อกไม่เพียงพอ` },
          { status: 404 }
        );
      }

      const existingProduct = await prisma.productOncart.findFirst({
        where: { cartId: cart.id, productId },
      });

      if (existingProduct) {
        await prisma.productOncart.update({
          where: { id: existingProduct.id },
          data: { count: existingProduct.count + quantity },
        });
      } else {
        await prisma.productOncart.create({
          data: {
            cartId: cart.id,
            productId,
            count: quantity,
            price: product.price,
          },
        });
      }

      totalCartPrice += product.price * quantity;
      productUpdates.push({ id: productId, quantity, price: product.price });
    }

    const shipping = 0;
    const discount = 0;
    const priceBeforeTax = totalCartPrice + shipping - discount;
    const vat = Math.floor(priceBeforeTax * 0.07);
    const totalPrice = Math.floor(priceBeforeTax + vat);

    const totalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);

    if (cartTotal !== totalPrice) {
      console.warn("ยอดรวมจาก client ไม่ตรงกับการคำนวณ:", {
        client: cartTotal,
        server: totalPrice,
      });
    }

    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderbyId: userId,
          cartTotal: totalPrice, 
          amount: totalQuantity, 
          status: "รอดำเนินการ",
          currency: "THB",
          addressId,
        },
      });

      await Promise.all(
        products.map((item) => {
          const product = productMap.get(item.productId);
          if (!product) throw new Error(`ไม่พบสินค้า ${item.productId}`);

          return tx.productOnOrder.create({
            data: {
              orderId: newOrder.id,
              productId: item.productId,
              count: item.quantity,
              price: product.price,
            },
          });
        })
      );

      await Promise.all(
        productUpdates.map((update) =>
          tx.product.update({
            where: { id: update.id },
            data: {
              quantity: { decrement: update.quantity },
              sold: { increment: update.quantity },
            },
          })
        )
      );

      await tx.productOncart.deleteMany({
        where: { cartId: cart!.id },
      });

      await tx.cart.update({
        where: { id: cart!.id },
        data: { cartTotal: totalPrice },
      });

      return newOrder;
    });

    return NextResponse.json(
      { message: "สร้างออเดอร์สำเร็จ", order },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "เกิดข้อผิดพลาดในการสั่งซื้อ" }, { status: 500 });
  }
}