import { createClient } from "@supabase/supabase-js";

const bucket = "ProfileUser";

// Create Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);

// Upload file using standard upload
export async function uploadFile(image: File) {
  const timeStame = Date.now();
  const newname = `Profile-${timeStame}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newname, image);
  if (!data) throw new Error("Image Upload Failed!!!");
  return supabase.storage.from(bucket).getPublicUrl(newname).data.publicUrl
}
