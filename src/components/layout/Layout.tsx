import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from './Sidebar';
import { useSupabase } from '@/context/SupabaseContext';
import AIHealthAgent from '../ai/AIHealthAgent';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Lock, UserCircle } from "lucide-react";
import { toast } from "sonner";

const loginSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { signIn } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      const result = await signIn(data.email, data.password);
      
      if (result && result.error) {
        throw result.error;
      }
      
      toast.success("Login successful");
      onSuccess();
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Login failed", {
        description: error.message || "Please check your credentials and try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Username</FormLabel>
              <FormControl>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    className="pl-10 rounded-full border-gray-200"
                    placeholder="Your username"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input 
                    className="pl-10 rounded-full border-gray-200"
                    placeholder="your.email@example.com" 
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input 
                    className="pl-10 rounded-full border-gray-200"
                    type="password" 
                    placeholder="••••••••" 
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full rounded-full bg-primary hover:bg-primary/90" 
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};

type LayoutProps = {
  requireAuth?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ requireAuth = false }) => {
  const { user, loading, signIn } = useSupabase();
  const location = useLocation();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (requireAuth && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md omi-card silver-shadow">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login Required</CardTitle>
            <CardDescription className="text-center">
              Please log in to access this page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onSuccess={() => {}} />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/home">
              <Button variant="outline">Return to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
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
        <>
          <Outlet />
          <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                  Please sign in to access your account
                </DialogDescription>
              </DialogHeader>
              <LoginForm onSuccess={() => {
                if (location.pathname === '/home') {
                } else {
                  window.location.reload();
                }
              }} />
              <div className="text-sm text-center text-gray-500 mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline" onClick={() => setShowLoginDialog(false)}>
                  Create an account
                </Link>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}

      <AIHealthAgent />
      
      {!user && (
        <div className="fixed bottom-4 right-4 z-40">
          <Button 
            className="bg-primary text-white rounded-full shadow-lg hover:bg-primary/90"
            onClick={() => setShowLoginDialog(true)}
          >
            <UserCircle className="mr-2 h-5 w-5" />
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Layout;
