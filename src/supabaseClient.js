import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ljbvidkwttmipjahexvx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqYnZpZGt3dHRtaXBqYWhleHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyODg3MTYsImV4cCI6MjA3NTg2NDcxNn0.h6_29QsXyEfAfRxU64gv8bG3IHPJISJP4s3K4zptMZA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
