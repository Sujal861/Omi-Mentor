
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SupabaseProvider } from "@/context/SupabaseContext";
import { AnimatePresence } from "framer-motion";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";  // Restored Login page import
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SupabaseProvider>
      <BrowserRouter>
        <TooltipProvider>
          <div className="min-h-screen bg-white text-gray-700 perspective-2000">
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />  {/* Restored login route */}
                <Route path="/register" element={<Register />} />
                
                {/* Home page routes (both auth and non-auth) */}
                <Route element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/home" element={<Home />} />
                </Route>
                
                {/* Protected routes */}
                <Route element={<Layout requireAuth />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
                
                {/* Redirects */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </div>
          <Toaster />
          <Sonner position="top-right" expand={true} closeButton={true} richColors={true} />
        </TooltipProvider>
      </BrowserRouter>
    </SupabaseProvider>
  </QueryClientProvider>
);

export default App;

