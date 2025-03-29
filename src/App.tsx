
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SupabaseProvider } from "@/context/SupabaseContext";
import { AnimatePresence } from "framer-motion";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
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
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected routes */}
                <Route element={<Layout requireAuth />}>
                  <Route index element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
                
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
