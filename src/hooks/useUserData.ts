
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useSupabase } from '@/context/SupabaseContext';
import { toast } from 'sonner';

// Define the user profile type
export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
};

export const useUserData = () => {
  const { user } = useSupabase();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Check if the profiles table exists and create it if needed
        try {
          // Try to access the profiles table to see if it exists
          const { error: checkError } = await supabase
            .from('profiles')
            .select('count')
            .limit(1);
          
          // If there's an error and it indicates the table doesn't exist
          if (checkError && checkError.code === '42P01') {
            // Table doesn't exist, create it using SQL function via RPC
            const { error: createError } = await supabase.rpc('create_profiles_table', {});
            
            if (createError) {
              console.error('Error creating profiles table via RPC:', createError);
              // We'll continue and let the profile query attempt anyway
            }
          }
        } catch (tableInitError) {
          console.error('Error initializing profiles table:', tableInitError);
        }
        
        // Now try to get the profile
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          // If the error is 'not found', it means the profile doesn't exist yet
          if (error.code === 'PGRST116') {
            // Create a new profile for the user
            console.log('Profile not found, creating new profile');
            const newProfile = {
              id: user.id,
              name: user.user_metadata?.name || '',
              email: user.email || '',
              avatar_url: null,
              created_at: new Date().toISOString(),
            };
            
            const { data: createdProfile, error: createError } = await supabase
              .from('profiles')
              .insert(newProfile)
              .select()
              .single();
            
            if (createError) {
              throw createError;
            }
            
            setProfile(createdProfile);
            return;
          }
          throw error;
        }

        setProfile(data);
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        
        // If the table doesn't exist, create a profile object locally
        // This allows the UI to still display something even if the DB isn't ready
        if (error.code === '42P01' && user) {
          const fallbackProfile: UserProfile = {
            id: user.id,
            name: user.user_metadata?.name || '',
            email: user.email || '',
            avatar_url: null,
            created_at: new Date().toISOString(),
          };
          setProfile(fallbackProfile);
          toast.warning('Using local profile data. Database setup in progress.');
        } else {
          toast.error('Failed to load profile data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return null;
    
    try {
      // First check if the profiles table exists
      const { error: checkError } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);
      
      // If table doesn't exist, create it via RPC
      if (checkError && checkError.code === '42P01') {
        const { error: createError } = await supabase.rpc('create_profiles_table', {});
        if (createError) {
          console.error('Error creating profiles table:', createError);
          throw createError;
        }
        
        // Now create the profile
        const newProfile = {
          id: user.id,
          ...updates,
          created_at: new Date().toISOString(),
        };
        
        const { data: createdProfile, error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();
        
        if (insertError) throw insertError;
        
        setProfile(createdProfile);
        toast.success('Profile created successfully');
        return createdProfile;
      }
      
      // If table exists, update the profile
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setProfile(data);
      toast.success('Profile updated successfully');
      return data;
    } catch (error: any) {
      toast.error('Error updating profile', { description: error.message });
      return null;
    }
  };

  return { profile, loading, updateProfile };
};
