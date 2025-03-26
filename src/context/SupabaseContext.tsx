
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Define result types for auth operations
type AuthResult = {
  error?: Error;
  data?: any;
};

// Define the context type
type SupabaseContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, name: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  supabase: typeof supabase;
};

// Create the context with a default value
const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

// Provider component
export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session and set up listener
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    };

    fetchSession();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Signed in successfully');
      return { data };
    } catch (error: any) {
      toast.error('Error signing in', { description: error.message });
      return { error };
    }
  };

  // Helper function to ensure profiles table exists
  const ensureProfilesTable = async () => {
    try {
      await supabase.from('profiles').select('count(*)').limit(1);
    } catch (error: any) {
      if (error.code === '42P01') {
        // Table doesn't exist, create it
        await supabase.query(`
          CREATE TABLE IF NOT EXISTS "profiles" (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            name TEXT,
            email TEXT,
            avatar_url TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
        `);
      }
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, name: string): Promise<AuthResult> => {
    try {
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { name },
          emailRedirectTo: `${window.location.origin}/login`,
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // After sign up, ensure we create the profile record
        try {
          // First ensure the profiles table exists
          await ensureProfilesTable();
          
          const newProfile = {
            id: data.user.id,
            name,
            email,
            avatar_url: null,
            created_at: new Date().toISOString(),
          };
          
          // This might fail if the user is not yet confirmed, that's okay
          // The profile will be created when they access their profile page
          await supabase
            .from('profiles')
            .insert(newProfile);
        } catch (profileError) {
          console.error('Could not create profile during signup:', profileError);
        }
        
        toast.success('Account created successfully');
      } else {
        toast.info('Please check your email to confirm your account');
      }
      
      return { data };
    } catch (error: any) {
      toast.error('Error creating account', { description: error.message });
      return { error };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error('Error signing out', { description: error.message });
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success('Password reset email sent');
    } catch (error: any) {
      toast.error('Error sending reset email', { description: error.message });
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    supabase,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

// Custom hook to use the auth context
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
