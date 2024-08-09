
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// @ts-ignore
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase