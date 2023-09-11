import { createClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../../DatabaseDefinitions'

export const supabaseClient = createClient(
  'https://daiyycuunubdakrxtztl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhaXl5Y3V1bnViZGFrcnh0enRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxMDQ2MzMsImV4cCI6MjAwODY4MDYzM30.JHOlKkaa3XpZZGsDpyjYcHitCiO1aNLaINnAnm0KHuQ'
);