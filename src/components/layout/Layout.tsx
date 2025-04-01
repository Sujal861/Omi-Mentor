
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from './Sidebar';
import { useSupabase } from '@/context/SupabaseContext';
import AIHealthAgent from '../ai/AIHealthAgent';

type LayoutProps = {
  requireAuth?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ requireAuth = false }) => {
  const { user } = useSupabase();

  if (requireAuth && !user) {
    // If authentication is required and no user is logged in, 
    // the routing will automatically redirect to login page
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

