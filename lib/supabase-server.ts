import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceKey) {
  console.warn(
    "Supabase server environment variables missing. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set."
  );
}

let serverClient =
  supabaseUrl && serviceKey ? createClient(supabaseUrl, serviceKey) : null;

export function getServerSupabaseClient() {
  if (!serverClient && supabaseUrl && serviceKey) {
    serverClient = createClient(supabaseUrl, serviceKey);
  }
  return serverClient;
}

