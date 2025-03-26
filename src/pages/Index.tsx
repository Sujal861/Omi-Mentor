import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { ActivityCard } from "@/components/dashboard/ActivityCard";
import { StressChart } from "@/components/dashboard/StressChart";
import { ReminderCard } from "@/components/dashboard/ReminderCard";
import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { PageTransition } from "@/components/layout/PageTransition";
import { HealthConnectCard } from "@/components/health/HealthConnectCard";
import { useFitData } from "@/hooks/useFitData";
import { FitDataDisplay } from "@/components/dashboard/FitDataDisplay";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { GoogleFitConnector } from "@/components/integration/GoogleFitConnector";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useSupabase();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [showConnector, setShowConnector] = useState<boolean>(false);
  const { fitData, isLoading, refreshFitData } = useFitData(isConnected);

  useEffect(() => {
    // Check if the user is connected to Google Fit (would be stored in a real app)
    // For demo purposes, we'll keep it in state - in a real app would be in DB
    const checkConnection = () => {
      // Simulate checking connection status (would use localStorage or DB in real app)
      const connected = localStorage.getItem("googlefit_connected") === "true";
      setIsConnected(connected);
      
      // If not connected and logged in, show the connector
      if (!connected && user) {
        setShowConnector(true);
      }
    };
    
    checkConnection();
  }, [user]);

  const handleConnectGoogleFit = () => {
    // In a real app, this would verify the connection status with the backend
    localStorage.setItem("googlefit_connected", "true");
    setIsConnected(true);
    setShowConnector(false);
  };

  return (
    <PageTransition>
      <div className="container px-4 py-8 max-w-6xl mx-auto">
        {user ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <motion.h1 
                className="text-3xl font-bold tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Welcome, {user.user_metadata?.name || "Friend"}
              </motion.h1>
              {!isConnected && (
                <Button onClick={() => setShowConnector(true)}>
                  Connect Google Fit
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {isConnected && (
                  <FitDataDisplay 
                    fitData={fitData} 
                    isLoading={isLoading} 
                    onRefresh={refreshFitData} 
                  />
                )}
                <ActivityCard />
                <StressChart />
              </div>
              <div className="space-y-6">
                <InsightPanel />
                <ReminderCard />
                <HealthConnectCard />
              </div>
            </div>
            
            <Dialog open={showConnector} onOpenChange={setShowConnector}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Connect to Google Fit</DialogTitle>
                  <DialogDescription>
                    Connect your Google Fit account to track your health and fitness data
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <GoogleFitConnector onConnect={handleConnectGoogleFit} />
                </div>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-6">Balance Boost Coach</h1>
            <p className="mb-8 text-muted-foreground max-w-md mx-auto">
              Track your health, manage stress, and boost your wellness with personalized insights.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => navigate("/login")}>Sign In</Button>
              <Button variant="outline" onClick={() => navigate("/register")}>
                Create Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Index;
