import { createClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../../DatabaseDefinitions'

export const supabaseClient = createClient(
  'https://ncvoplbawcrefpsplcue.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jdm9wbGJhd2NyZWZwc3BsY3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwOTU0MTksImV4cCI6MjAwNTY3MTQxOX0.oLJWKI79KQPVKLvk9jI_f7fwig4hruuedsJMC-7tlAo'
);