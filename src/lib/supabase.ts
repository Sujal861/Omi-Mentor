
import { createClient } from '@supabase/supabase-js';

// Supabase connection details
const supabaseUrl = 'https://kkpmzvobawbxhzfcitry.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcG16dm9iYXdieGh6ZmNpdHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MTU2NTYsImV4cCI6MjA1ODQ5MTY1Nn0.8RiumLbUuIe8S3igmtrZYsxrTYaSXPgaSwwED4iHmYI';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseKey);

// Note: We removed the RPC function call that was causing errors

// Check if profiles table exists and create it if needed
const initProfilesTable = async () => {
  try {
    // Check if profiles table exists
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (error && error.code === '42P01') {
      // Table doesn't exist, create it
      console.log('Creating profiles table...');
      const createTableSQL = `
        create table if not exists profiles (
          id uuid primary key references auth.users(id) on delete cascade,
          name text,
          email text,
          avatar_url text,
          created_at timestamp with time zone default current_timestamp
        );
      `;
      
      await supabase.rpc('exec_sql', { sql: createTableSQL }).catch(err => {
        console.error('Failed to create profiles table:', err);
      });
    }
  } catch (err) {
    console.error('Failed to initialize profiles table:', err);
  }
};

// Only try to initialize in the browser environment
if (typeof window !== 'undefined') {
  initProfilesTable();
}

// Set up auth redirects globally
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
    // Handle auth state changes if needed
  }
});
