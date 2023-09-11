import { createClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../../DatabaseDefinitions'

export const supabaseClient = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);