import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { uploadFileProduct } from "@/lib/supabaseproduct";
import { authCheck } from "../../../../../utils/authCheck";

export async function PUT(req: NextRequest, { params }:any) {
  const check = await authCheck();
  if (!check) {
    return NextResponse.json({ message: "อย่าๆ" }, { status: 403 });
  }

  try {
    if (!params?.id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const formData = await req.formData();
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const quantity = parseInt(formData.get("quantity")?.toString() || "0", 10);
    const categoryId = parseInt(formData.get("category")?.toString() || "0", 10);
    const image = formData.get("image");

    if (!title || !description || isNaN(price) || isNaN(quantity) || isNaN(categoryId)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const productId = parseInt(params.id, 10);

    const productData: any = {
      title,
      description,
      price,
      quantity,
      category: { connect: { id: categoryId } },
    };

    let imageUrl = null;
    if (image && image instanceof File) {
      imageUrl = await uploadFileProduct(image);
    }

    if (imageUrl) {
      productData.images = {
        create: {
          asset_id: imageUrl,
          public_id: imageUrl,
          url: imageUrl,
          secure_url: imageUrl,
        },
      };
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const product = await prisma.product.update({
      where: { id: productId },
      data: productData,
      include: { images: true },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

