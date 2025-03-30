
import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from './Sidebar';
import { useSupabase } from '@/context/SupabaseContext';
import AIHealthAgent from '../ai/AIHealthAgent';

type LayoutProps = {
  requireAuth?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ requireAuth = false }) => {
  const { user, loading } = useSupabase();
  const location = useLocation();
  
  // Show loading state while authentication is being checked
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If page requires auth and user is not logged in, redirect to login
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
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
          <AIHealthAgent />
        </SidebarProvider>
      ) : (
        <>
          <Outlet />
          <AIHealthAgent />
        </>
      )}
    </div>
  );
};

export default Layout;
