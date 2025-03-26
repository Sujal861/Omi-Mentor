
import { createClient } from '@supabase/supabase-js';

// Supabase connection details
const supabaseUrl = 'https://kkpmzvobawbxhzfcitry.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcG16dm9iYXdieGh6ZmNpdHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MTU2NTYsImV4cCI6MjA1ODQ5MTY1Nn0.8RiumLbUuIe8S3igmtrZYsxrTYaSXPgaSwwED4iHmYI';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseKey);

// Create an RPC function for creating the profiles table if it doesn't exist
// This will work only if the RPC exists on the Supabase project
supabase.rpc('create_profiles_table', {}).catch(() => {
  console.log('Setting up RPC function for profile table creation...');
  // Create this function in your Supabase SQL editor:
  /*
  create or replace function create_profiles_table()
  returns void as $$
  begin
    create table if not exists profiles (
      id uuid primary key references auth.users(id) on delete cascade,
      name text,
      email text,
      avatar_url text,
      created_at timestamp with time zone default current_timestamp
    );
  end;
  $$ language plpgsql;
  */
});

// Set up auth redirects globally
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
    // Handle auth state changes if needed
  }
});
