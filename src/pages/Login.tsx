
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useSupabase } from "@/context/SupabaseContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MailCheck, UserCircle, Mail, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { GoogleFitConnector } from "@/components/integration/GoogleFitConnector";
import { motion } from "framer-motion";

const loginSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { signIn, supabase } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const [email, setEmail] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [username, setUsername] = useState("");
  const [showGoogleFitDialog, setShowGoogleFitDialog] = useState(false);

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
      setEmail(data.email);
      setUsername(data.username);
      
      // Call signIn without destructuring the return value
      const result = await signIn(data.email, data.password);
      
      // Check if result exists and has an error property
      if (result && result.error) {
        // Check specifically for email_not_confirmed error
        // Using type assertion to access the code property safely
        const supabaseError = result.error as { code?: string, message: string };
        if (supabaseError.code === "email_not_confirmed") {
          setEmailNotConfirmed(true);
          throw new Error("Email not confirmed. Please check your inbox or request a new confirmation email.");
        }
        throw result.error;
      }
      
      toast.success("Login successful");
      setShowWelcome(true);
      
      // Show Google Fit connector dialog after 2 seconds
      setTimeout(() => {
        setShowWelcome(false);
        setShowGoogleFitDialog(true);
      }, 2000);
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Login failed", {
        description: error.message || "Please check your credentials and try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendConfirmationEmail = async () => {
    if (!email) return;

    try {
      setIsResendingEmail(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (error) throw error;
      
      toast.success("Confirmation email sent", {
        description: "Please check your inbox for the confirmation link",
      });
    } catch (error: any) {
      console.error("Error resending email:", error);
      toast.error("Failed to resend confirmation email", {
        description: error.message || "Please try again later",
      });
    } finally {
      setIsResendingEmail(false);
    }
  };

  const handleGoogleFitConnect = () => {
    // Close the dialog and navigate to dashboard
    setShowGoogleFitDialog(false);
    // Navigate directly to the dashboard
    navigate("/");
    // Force a full reload to ensure the dashboard loads properly
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4 bg-gradient-to-b from-white to-gray-50">
      {showWelcome ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md omi-card silver-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Welcome, {username}!</CardTitle>
              <CardDescription className="text-center">
                You've successfully logged in to Balance Boost Coach
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-12">
              <div className="animate-bounce text-5xl">🎉</div>
            </CardContent>
            <CardFooter className="text-center text-muted-foreground">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="h-1 bg-primary rounded-full"
              />
            </CardFooter>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="omi-card silver-shadow border-gray-100">
            <CardHeader>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <UserCircle className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="text-2xl text-center text-gray-700">Welcome Back</CardTitle>
                <CardDescription className="text-center text-gray-500">
                  Enter your credentials to access your account
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent>
              {emailNotConfirmed && (
                <Alert className="mb-4 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
                  <MailCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertDescription className="text-amber-800 dark:text-amber-300">
                    Your email is not confirmed yet. Please check your inbox or 
                    <Button 
                      variant="link" 
                      className="text-primary px-1 h-auto" 
                      onClick={resendConfirmationEmail}
                      disabled={isResendingEmail}
                    >
                      {isResendingEmail ? "Sending..." : "resend confirmation email"}
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <motion.div 
                    className="login-field"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
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
                                onChange={(e) => {
                                  field.onChange(e);
                                  setUsername(e.target.value);
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="login-field"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
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
                                onChange={(e) => {
                                  field.onChange(e);
                                  setEmail(e.target.value);
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="login-field"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
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
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full rounded-full bg-primary hover:bg-primary/90" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-center text-gray-500"
              >
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Create an account
                </Link>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      )}

      <Dialog open={showGoogleFitDialog} onOpenChange={setShowGoogleFitDialog}>
        <DialogContent className="sm:max-w-md bg-white border-gray-100">
          <DialogHeader>
            <DialogTitle>Connect to Google Fit</DialogTitle>
            <DialogDescription>
              Connect your Google Fit account to track your health and fitness data
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <GoogleFitConnector onConnect={handleGoogleFitConnect} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
