// OpenClass - Supabase Configuration

const SUPABASE_URL = "YOUR_https://wqyupzeckgttkrltkoya.supabase.co";
const SUPABASE_KEY = "sb_publishable_tYjvoNoHqW01e5otimApzw_HhP9e17-";

// Check that Supabase loaded
if (!window.supabase) {
    console.error("Supabase library failed to load.");
}

// Create the client
window.supabaseClient = window.supabase.createClient(
    https://wqyupzeckgttkrltkoya.supabase.co,
    sb_publishable_tYjvoNoHqW01e5otimApzw_HhP9e17-
);

console.log("OpenClass Supabase connected!");

