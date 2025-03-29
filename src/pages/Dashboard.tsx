
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/layout/PageTransition';
import { useSupabase } from '@/context/SupabaseContext';
import ActivityCard from '@/components/dashboard/ActivityCard';
import StressChart from '@/components/dashboard/StressChart';
import ReminderCard from '@/components/dashboard/ReminderCard';
import InsightPanel from '@/components/dashboard/InsightPanel';
import { HealthConnectCard } from '@/components/health/HealthConnectCard';
import { FitDataDisplay } from '@/components/dashboard/FitDataDisplay';
import { Bell } from 'lucide-react';
import { useFitData } from '@/hooks/useFitData';
import { stressData, activityData, insightData } from '@/utils/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { GoogleFitConnector } from '@/components/integration/GoogleFitConnector';
import ThreeDCard from '@/components/ui/3d-card';

const Dashboard = () => {
  const { user } = useSupabase();
  const [showConnector, setShowConnector] = useState(false);
  const { fitData, isLoading, refreshFitData } = useFitData(false);
  const [randomizedFitData, setRandomizedFitData] = useState(null);

  useEffect(() => {
    // Generate random fitness data if no real data is available
    if (!fitData) {
      generateRandomFitnessData();
    }
  }, [fitData]);

  const generateRandomFitnessData = () => {
    const randomData = {
      steps: Math.floor(Math.random() * 6000) + 4000,
      caloriesBurned: Math.floor(Math.random() * 400) + 200,
      activeMinutes: Math.floor(Math.random() * 45) + 15,
      distance: (Math.random() * 3 + 1).toFixed(1),
      heartRate: {
        current: Math.floor(Math.random() * 30) + 65,
        resting: Math.floor(Math.random() * 10) + 60,
        max: Math.floor(Math.random() * 30) + 120,
      },
      sleepData: {
        duration: (Math.random() * 3 + 5).toFixed(1),
        quality: ['poor', 'fair', 'good'][Math.floor(Math.random() * 3)],
        deepSleep: (Math.random() * 2 + 0.5).toFixed(1),
      },
      lastUpdated: new Date(),
    };
    
    setRandomizedFitData(randomData);
  };

  const handleConnect = () => {
    setShowConnector(true);
  };

  const handleConnectComplete = () => {
    setShowConnector(false);
    refreshFitData();
  };

  // Determine which fitness data to use - real or random
  const displayFitData = fitData || randomizedFitData;

  return (
    <PageTransition>
      <div className="container mx-auto">
        <div className="mb-8">
          <motion.h1 
            className="text-3xl font-bold text-gray-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Dashboard
          </motion.h1>
          <p className="text-gray-500">Track your wellness metrics and activities</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, rotateY: -15, z: -50 }}
              animate={{ opacity: 1, rotateY: 0, z: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <ThreeDCard className="omi-card p-6 rounded-xl overflow-hidden" rotationIntensity={15}>
                <FitDataDisplay 
                  fitData={displayFitData} 
                  isLoading={isLoading} 
                  onRefresh={refreshFitData}
                  onConnect={handleConnect} 
                />
              </ThreeDCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, rotateY: 15, z: -50 }}
              animate={{ opacity: 1, rotateY: 0, z: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <ThreeDCard className="p-0 rounded-xl overflow-hidden" rotationIntensity={10}>
                <div className="omi-card p-6 border-0 shadow-none">
                  <ActivityCard 
                    type={activityData[0].type}
                    value={activityData[0].value}
                    unit={activityData[0].unit}
                    description={activityData[0].description}
                  />
                </div>
              </ThreeDCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, rotateX: 15, z: -50 }}
              animate={{ opacity: 1, rotateX: 0, z: 0 }}
              transition={{ delay: 0.4, type: "spring", damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <ThreeDCard className="p-0 rounded-xl overflow-hidden" rotationIntensity={5}>
                <div className="omi-card p-6 border-0 shadow-none">
                  <StressChart 
                    data={stressData}
                    title="Stress Levels"
                    description="Your stress levels throughout the day"
                  />
                </div>
              </ThreeDCard>
            </motion.div>
          </div>
          
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <ThreeDCard className="p-0 rounded-xl overflow-hidden" rotationIntensity={12}>
                <div className="omi-card p-6 border-0 shadow-none">
                  <InsightPanel insights={insightData} />
                </div>
              </ThreeDCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 0.4, type: "spring", damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <ThreeDCard className="p-0 rounded-xl overflow-hidden" rotationIntensity={12}>
                <div className="omi-card p-6 border-0 shadow-none">
                  <ReminderCard 
                    icon={<Bell size={20} />}
                    title="Meditation Time"
                    description="It's time for your daily meditation session"
                    color="balance-indigo"
                    buttonText="Complete"
                    onAction={() => console.log("Reminder action clicked")}
                  />
                </div>
              </ThreeDCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 0.5, type: "spring", damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <ThreeDCard className="p-0 rounded-xl overflow-hidden" rotationIntensity={12}>
                <div className="omi-card p-6 border-0 shadow-none">
                  <HealthConnectCard />
                </div>
              </ThreeDCard>
            </motion.div>
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
              <GoogleFitConnector onConnect={handleConnectComplete} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
