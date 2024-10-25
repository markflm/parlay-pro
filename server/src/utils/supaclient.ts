import * as dotenv from 'dotenv';
import { SupabaseClient, createClient } from "@supabase/supabase-js";
dotenv.config();
if (!process.env.SUPABASE_API_URL || !process.env.SUPABASE_ANON_KEY ) {
    throw new Error("Can't establish supabase connection")
}
export const dbClient = createClient(process.env.SUPABASE_API_URL, process.env.SUPABASE_ANON_KEY);