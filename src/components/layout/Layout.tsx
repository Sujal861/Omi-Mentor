
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from './Sidebar';
import { useSupabase } from '@/context/SupabaseContext';
import { Navigate } from 'react-router-dom';

type LayoutProps = {
  requireAuth?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ requireAuth = false }) => {
  const { user } = useSupabase();
  
  // If page requires auth and user is not logged in, redirect to login
  if (requireAuth && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {user ? (
        <SidebarProvider defaultOpen>
          <div className="flex w-full min-h-screen">
            <AppSidebar />
            <main className="flex-1 p-6">
              <div className="flex items-center justify-between mb-4">
                <SidebarTrigger className="md:hidden" />
              </div>
              <Outlet />
            </main>
          </div>
        </SidebarProvider>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Layout;
