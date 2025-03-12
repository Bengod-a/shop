import { createClient } from "@supabase/supabase-js";

const bucket = "ProductImage"; 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export async function uploadFileProduct(image: File) {
  const timeStamp = Date.now();
  const newname = `Product-${timeStamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newname, image);
  
  if (error) throw new Error("❌ Image Upload Failed: " + error.message);
  
  return supabase.storage.from(bucket).getPublicUrl(newname).data.publicUrl;
}

export async function deleteFileProduct(imageUrl: string) {
  try {
    const filePath = imageUrl.split(`${bucket}/`)[1]; 
    
    if (!filePath) {
      console.error("❌ ไม่สามารถดึงชื่อไฟล์จาก URL ได้");
      return;
    }

    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) throw error;
    console.log(`✅ ลบไฟล์สำเร็จ: ${filePath}`);
  } catch (error) {
    console.error("❌ ลบไฟล์ไม่สำเร็จ:", error);
  }
}
