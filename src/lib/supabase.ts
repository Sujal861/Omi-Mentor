
import { createClient } from '@supabase/supabase-js';

// Supabase connection details
const supabaseUrl = 'https://kkpmzvobawbxhzfcitry.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcG16dm9iYXdieGh6ZmNpdHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MTU2NTYsImV4cCI6MjA1ODQ5MTY1Nn0.8RiumLbUuIe8S3igmtrZYsxrTYaSXPgaSwwED4iHmYI';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseKey);
