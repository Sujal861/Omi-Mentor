
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SupabaseProvider } from "@/context/SupabaseContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import Navbar from "./components/layout/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SupabaseProvider>
      <BrowserRouter>
        <TooltipProvider>
          <div className="min-h-screen bg-white text-gray-700">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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
