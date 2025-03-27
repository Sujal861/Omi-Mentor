
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useSupabase } from '@/context/SupabaseContext';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  type: 'reminder' | 'alert' | 'update' | 'achievement';
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSupabase();

  // Mock data for when not connected to Supabase
  const mockNotifications: Notification[] = [
    {
      id: '1',
      user_id: 'mock-user',
      title: 'Meditation Reminder',
      message: 'Time for your daily meditation',
      read: false,
      created_at: new Date().toISOString(),
      type: 'reminder',
    },
    {
      id: '2',
      user_id: 'mock-user',
      title: 'New Achievement',
      message: 'Congratulations! You completed 7 days of activity tracking',
      read: true,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      type: 'achievement',
    },
    {
      id: '3',
      user_id: 'mock-user',
      title: 'Wellness Tip',
      message: 'Drink water regularly throughout the day for better health',
      read: false,
      created_at: new Date(Date.now() - 172800000).toISOString(),
      type: 'update',
    },
  ];

  const fetchNotifications = async () => {
    if (!user) {
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
      return;
    }

    setIsLoading(true);
    try {
      // Try to get real notifications from Supabase
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching notifications:', error);
        // Fall back to mock data if there's an error
        setNotifications(mockNotifications);
      } else if (data && data.length > 0) {
        setNotifications(data as Notification[]);
      } else {
        // If no notifications in DB, use mock data
        setNotifications(mockNotifications);
      }
      
      // Update unread count
      setUnreadCount(notifications.filter(n => !n.read).length);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setNotifications(mockNotifications);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (!notification || notification.read) return;

    // Update local state first for immediate UI feedback
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));

    if (!user) return; // Don't try to update DB if not logged in

    // Try to update in the database
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      if (error) {
        console.error('Error marking notification as read:', error);
      }
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    // Update local state first
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
    setUnreadCount(0);

    if (!user) return; // Don't try to update DB if not logged in

    // Try to update in the database
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);

      if (error) {
        console.error('Error marking all notifications as read:', error);
      }
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    // Subscribe to new notifications if logged in
    if (user) {
      const subscription = supabase
        .channel('notifications')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        }, (payload) => {
          // Add the new notification to the list
          const newNotification = payload.new as Notification;
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
          
          // Show a toast for the new notification
          toast.info(newNotification.title, {
            description: newNotification.message,
            duration: 5000,
          });
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    refreshNotifications: fetchNotifications,
  };
};
