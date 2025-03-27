
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
      
      // Fix: Remove the catch method and use try/catch instead
      try {
        await supabase.rpc('exec_sql', { sql: createTableSQL });
      } catch (err) {
        console.error('Failed to create profiles table:', err);
      }
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

// Create a function to initialize the notifications table
export const initNotificationsTable = async () => {
  try {
    // Check if notifications table exists
    const { data, error } = await supabase
      .from('notifications')
      .select('count')
      .limit(1);
    
    if (error && error.code === '42P01') {
      // Table doesn't exist, create it
      console.log('Creating notifications table...');
      const createTableSQL = `
        create table if not exists notifications (
          id uuid primary key default uuid_generate_v4(),
          user_id uuid references auth.users(id) on delete cascade,
          title text not null,
          message text not null,
          read boolean default false,
          created_at timestamp with time zone default current_timestamp,
          type text not null
        );
      `;
      
      try {
        await supabase.rpc('exec_sql', { sql: createTableSQL });
        console.log('Notifications table created successfully');
      } catch (err) {
        console.error('Failed to create notifications table:', err);
      }
    }
  } catch (err) {
    console.error('Failed to initialize notifications table:', err);
  }
};

// Initialize notifications table in browser environment
if (typeof window !== 'undefined') {
  initNotificationsTable();
}
