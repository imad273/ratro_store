
import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// @ts-ignore
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export default supabase