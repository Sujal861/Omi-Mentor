
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
        
        // Query the profiles table for the current user
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
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return null;
    
    try {
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
