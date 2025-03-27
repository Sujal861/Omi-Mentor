
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Activity, ChevronRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { initGoogleFit, isGoogleFitAuthenticated, handleAuthRedirect } from "@/services/googleFitService";

interface GoogleFitConnectorProps {
  onConnect: () => void;
}

export const GoogleFitConnector = ({ onConnect }: GoogleFitConnectorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(isGoogleFitAuthenticated());

  useEffect(() => {
    // Check for OAuth redirect response when component mounts
    const handleRedirectIfNeeded = async () => {
      // If URL has a 'code' parameter, we're returning from OAuth
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (code) {
        setIsLoading(true);
        const success = await handleAuthRedirect();
        setIsLoading(false);
        
        if (success) {
          setIsConnected(true);
          onConnect();
        }
      }
    };
    
    handleRedirectIfNeeded();
  }, [onConnect]);

  const connectToGoogleFit = async () => {
    try {
      setIsLoading(true);
      
      // Initiate Google Fit OAuth flow
      await initGoogleFit();
      
      // Note: initGoogleFit redirects the user to Google's auth page,
      // so we won't reach code below until the user returns with a code
      
    } catch (error) {
      console.error("Error connecting to Google Fit:", error);
      toast.error("Failed to connect to Google Fit", {
        description: "Please try again later",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-32 h-32"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-green-400"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute inset-2 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-blue-500"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Activity size={40} />
        </motion.div>
      </motion.div>

      <Card className="w-full p-4 shadow-md">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                <Activity size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Google Fit</h3>
                <p className="text-sm text-muted-foreground">Connect your health data</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </div>
          
          <p className="text-sm text-muted-foreground">
            Connect to Google Fit to track steps, activities, heart rate, sleep, and more.
          </p>
          
          <Button 
            onClick={connectToGoogleFit} 
            disabled={isLoading || isConnected}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : isConnected ? (
              "Connected"
            ) : (
              "Connect Google Fit"
            )}
          </Button>
        </div>
      </Card>
      
      <p className="text-xs text-muted-foreground text-center max-w-sm">
        By connecting your Google Fit account, you allow Omni Mentor to access your fitness data to provide personalized insights.
      </p>
    </div>
  );
};
