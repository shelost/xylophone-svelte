import { createClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../../DatabaseDefinitions'

export const supabaseClient = createClient(
  process.env.VITE_PUBLIC_SUPABASE_URL,
  process.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
);