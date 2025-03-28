import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import ActivityCard from "@/components/dashboard/ActivityCard";
import StressChart from "@/components/dashboard/StressChart";
import ReminderCard from "@/components/dashboard/ReminderCard";
import InsightPanel from "@/components/dashboard/InsightPanel";
import PageTransition from "@/components/layout/PageTransition";
import { HealthConnectCard } from "@/components/health/HealthConnectCard";
import { useFitData } from "@/hooks/useFitData";
import { FitDataDisplay } from "@/components/dashboard/FitDataDisplay";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { GoogleFitConnector } from "@/components/integration/GoogleFitConnector";
import { motion } from "framer-motion";
import { stressData, activityData, insightData } from "@/utils/mockData";
import { Bell, Clock, ArrowRight } from "lucide-react";
import { isGoogleFitAuthenticated, handleAuthRedirect } from "@/services/googleFitService";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useSupabase();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [showConnector, setShowConnector] = useState<boolean>(false);
  const { fitData, isLoading, refreshFitData } = useFitData(isConnected);
  const [isProcessingRedirect, setIsProcessingRedirect] = useState<boolean>(false);

  useEffect(() => {
    const processAuthRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (code) {
        setIsProcessingRedirect(true);
        
        try {
          const success = await handleAuthRedirect();
          if (success) {
            setIsConnected(true);
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        } catch (error) {
          console.error("Error handling auth redirect:", error);
        } finally {
          setIsProcessingRedirect(false);
        }
      }
    };
    
    processAuthRedirect();
    
    const checkConnection = () => {
      const connected = isGoogleFitAuthenticated();
      setIsConnected(connected);
      
      if (!connected && user) {
        setShowConnector(true);
      }
    };
    
    checkConnection();
  }, [user]);

  const handleConnectGoogleFit = () => {
    setIsConnected(true);
    setShowConnector(false);
  };

  if (isProcessingRedirect) {
    return (
      <PageTransition>
        <div className="container flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Completing Google Fit connection...</h2>
            <p className="text-gray-500">Please wait while we set up your connection.</p>
            <div className="mt-4 flex justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="bg-white min-h-screen">
        <div className="container px-4 py-8 max-w-6xl mx-auto">
          {user ? (
            <>
              <div className="flex justify-between items-center mb-8">
                <motion.h1 
                  className="text-3xl font-bold text-gray-700"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Welcome, {user.user_metadata?.name || "Friend"}
                </motion.h1>
                {!isConnected && (
                  <Button 
                    onClick={() => setShowConnector(true)}
                    className="rounded-full shadow-md"
                  >
                    Connect Google Fit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  {isConnected && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="omi-card p-6">
                        <FitDataDisplay 
                          fitData={fitData} 
                          isLoading={isLoading} 
                          onRefresh={refreshFitData} 
                        />
                      </div>
                    </motion.div>
                  )}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="omi-card p-6">
                      <ActivityCard 
                        type={activityData[0].type}
                        value={activityData[0].value}
                        unit={activityData[0].unit}
                        description={activityData[0].description}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="omi-card p-6">
                      <StressChart 
                        data={stressData}
                        title="Stress Levels"
                        description="Your stress levels throughout the day"
                      />
                    </div>
                  </motion.div>
                </div>
                
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="omi-card p-6">
                      <InsightPanel insights={insightData} />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="omi-card p-6">
                      <ReminderCard 
                        icon={<Bell size={20} />}
                        title="Meditation Time"
                        description="It's time for your daily meditation session"
                        color="balance-indigo"
                        buttonText="Complete"
                        onAction={() => console.log("Reminder action clicked")}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="omi-card p-6">
                      <HealthConnectCard />
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <Dialog open={showConnector} onOpenChange={setShowConnector}>
                <DialogContent className="sm:max-w-md omi-card">
                  <DialogHeader>
                    <DialogTitle className="text-gray-700">Connect to Google Fit</DialogTitle>
                    <DialogDescription className="text-gray-500">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold mb-6 text-gray-700">Omi Mentor</h1>
                <p className="mb-8 text-gray-500 max-w-md mx-auto">
                  Track your health, manage stress, and boost your wellness with personalized insights.
                </p>
                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={() => navigate("/login")} 
                    className="rounded-full px-6 py-2 text-white shadow-md"
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/register")} 
                    className="rounded-full border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Create Account
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
