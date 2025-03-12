// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/db";
// import { uploadFileProduct } from "@/lib/supabaseproduct";
// import { authCheck } from "../../../../utils/authCheck";

// interface ProductData {
//   title: string;
//   description: string;
//   price: number;
//   quantity: number;
//   category: number;
//   image?: File | string;
// }

// export async function POST(request: NextRequest) {
//     const check = await authCheck();
//     if (!check) {
//       return NextResponse.json({ message: "อย่าๆ" }, { status: 403 });
//     }

//   try {
//     const formData = await request.formData();
    
//     const title = formData.get("title")?.toString() || "";
//     const description = formData.get("description")?.toString() || "";
//     const price = parseFloat(formData.get("price")?.toString() || "0");
//     const quantity = parseInt(formData.get("quantity")?.toString() || "0", 10);
//     const category = parseInt(formData.get("category")?.toString() || "0", 10);
//     const image = formData.get("image");

//     console.log(formData);
    

//     if (!title || !description || isNaN(price) || isNaN(quantity) || isNaN(category)) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     let imageUrl = null;
//     if (image && image instanceof File) {
//       imageUrl = await uploadFileProduct(image); 
//     }

//     const productData: any = {
//       title: title,
//       description: description,
//       price: price,
//       quantity: quantity,
//       category: {
//         connect: { id: category }, 
//       },
//     };

//     if (imageUrl) {
//       productData.images = {
//         create: {
//           asset_id: imageUrl,
//           public_id: imageUrl,
//           url: imageUrl,
//           secure_url: imageUrl,
//         },
//       };
//     }

//     const newProduct = await prisma.product.create({
//       data: productData,
//       include: {
//         images: true,  
//       },
//     });

//     console.log(newProduct);
    

//     return NextResponse.json({ message: "Product added successfully!", newProduct }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { uploadFileProduct } from "@/lib/supabaseproduct";
import { authCheck } from "../../../../utils/authCheck";

interface ProductData {
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: number;
  image?: File | string;
}

export async function POST(request: NextRequest) {
  const check = await authCheck();
  if (!check) {
    return NextResponse.json({ message: "อย่าๆ" }, { status: 403 });
  }

  try {
    const formData = await request.formData();


    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const quantity = parseInt(formData.get("quantity")?.toString() || "0", 10);
    const category = parseInt(formData.get("category")?.toString() || "0", 10);
    const image = formData.get("image");

    
    if (!title || !description || isNaN(price) || isNaN(quantity) || isNaN(category)) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    let imageUrl = null;
    if (image && image instanceof File) {
      try {
        imageUrl = await uploadFileProduct(image);
      } catch (uploadError: any) {
        console.error("Image upload error:", uploadError.message);
        return NextResponse.json(
          { error: "ไม่สามารถอัปโหลดรูปภาพได้: " + uploadError.message },
          { status: 500 }
        );
      }
    }

    const productData: any = {
      title: title,
      description: description,
      price: price,
      quantity: quantity,
      category: {
        connect: { id: category },
      },
    };

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

    const newProduct = await prisma.product.create({
      data: productData,
      include: {
        images: true,
      },
    });


    return NextResponse.json(
      { message: "เพิ่มสินค้าสำเร็จ!", newProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด: " + error.message },
      { status: 500 }
    );
  }
}