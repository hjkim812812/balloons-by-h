import { createClient } from "@supabase/supabase-js";

export function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(url, key);
}

export async function getNextOrderNumber(): Promise<number> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("orders")
    .select("order_number")
    .order("order_number", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data?.order_number ?? 1047) + 1;
}
