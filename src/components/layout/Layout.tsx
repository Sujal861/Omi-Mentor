
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from './Sidebar';
import { useSupabase } from '@/context/SupabaseContext';
import AIHealthAgent from '../ai/AIHealthAgent';

type LayoutProps = {
  requireAuth?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ requireAuth = false }) => {
  const { user, loading } = useSupabase();
  const navigate = useNavigate();

  // Handle auth redirects
  useEffect(() => {
    if (requireAuth && !loading && !user) {
      // Redirect to login if auth is required but no user is logged in
      navigate('/login', { replace: true });
    }
  }, [requireAuth, user, loading, navigate]);

  // If still loading, show a minimal loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If auth is required and no user is found, the useEffect will handle redirect
  if (requireAuth && !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <SidebarProvider defaultOpen>
        <div className="flex w-full min-h-screen">
          {user && <AppSidebar />}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>

      <AIHealthAgent />
    </div>
  );
};

export default Layout;
