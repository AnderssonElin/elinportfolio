
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tfonudecjfbzxynsivut.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmb251ZGVjamZienh5bnNpdnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MzgyMjgsImV4cCI6MjA1NzAxNDIyOH0.WNN-lr5-I3WwjKbZiiGvZfSfPD_BQ_YLrdRKUkOx-Ik';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
