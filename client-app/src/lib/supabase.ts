import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gwobixqfqpdcjnkbfphc.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_Xe9DwIKqzksGb4IaHVuLkA_R5zCAFZd";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
