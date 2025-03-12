import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { authCheck } from "../../../../../utils/authCheck";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export async function DELETE(request: NextRequest, { params }:any) {
  const { id } = await params.id; 

  const check = await authCheck();
  if (!check) {
    return NextResponse.json({ message: "อย่าๆ" }, { status: 403 });
  }
  try {
    
    const { error: storageError } = await supabase.storage.from("ProductImage").remove([id]);
    if (storageError) {
      throw new Error(storageError.message);
    }

    return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

