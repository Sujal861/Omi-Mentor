import React, { useState } from 'react';
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

const Dashboard = () => {
  const { user } = useSupabase();
  const [showConnector, setShowConnector] = useState(false);
  const { fitData, isLoading, refreshFitData } = useFitData(false);

  const handleConnect = () => {
    setShowConnector(true);
  };

  const handleConnectComplete = () => {
    setShowConnector(false);
    refreshFitData();
  };

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="omi-card p-6">
                <FitDataDisplay 
                  fitData={fitData} 
                  isLoading={isLoading} 
                  onRefresh={refreshFitData}
                  onConnect={handleConnect} 
                />
              </div>
            </motion.div>
            
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
