import { createClient } from "@supabase/supabase-js";

const deleteimageproduct = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default deleteimageproduct;
