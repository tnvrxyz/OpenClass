// OpenClass - Supabase Configuration

const SUPABASE_URL = "https://wqyupzeckgttkrltkoya.supabase.co";

const SUPABASE_KEY = "sb_publishable_tYjvoNoHqW01e5otimApzw_HhP9e17-";

// Create Supabase client
window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("OpenClass Supabase connected!");