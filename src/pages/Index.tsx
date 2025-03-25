
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Droplets, Yoga } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import ActivityCard from '../components/dashboard/ActivityCard';
import InsightPanel from '../components/dashboard/InsightPanel';
import StressChart from '../components/dashboard/StressChart';
import ReminderCard from '../components/dashboard/ReminderCard';
import { activityData, insightData, stressData } from '../utils/mockData';
import { toast } from 'sonner';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Show welcome toast on first load
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setTimeout(() => {
        toast.success('Welcome to Balance Boost Coach!', {
          description: 'Your personal AI wellness assistant is ready to help you maintain balance.',
          duration: 5000,
        });
        localStorage.setItem('hasVisited', 'true');
      }, 1000);
    }
  }, []);
  
  if (!mounted) return null;
  
  const handleCompleteBreak = () => {
    toast.success('Great job!', {
      description: 'Your mindfulness break has been recorded.',
    });
  };
  
  const handleCompleteHydration = () => {
    toast.success('Staying hydrated!', {
      description: 'Your hydration reminder has been completed.',
    });
  };
  
  const handleCompleteStretch = () => {
    toast.success('Feeling refreshed!', {
      description: 'Your stretching break has been recorded.',
    });
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold">
              Good afternoon, Alex
            </h1>
            <p className="text-gray-500 mt-2">
              Let's maintain your balance today
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {activityData.map((activity, index) => (
            <ActivityCard
              key={index}
              type={activity.type as any}
              value={activity.value}
              unit={activity.unit}
              description={activity.description}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <StressChart
              data={stressData}
              title="Stress Levels"
              description="Your stress pattern throughout the day"
            />
          </div>
          <div>
            <InsightPanel insights={insightData} />
          </div>
        </div>
        
        <div>
          <motion.h2 
            className="text-xl font-semibold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Wellness Reminders
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReminderCard
              icon={<Coffee size={20} />}
              title="Take a mindfulness break"
              description="It's been 2 hours since your last break"
              color="balance-indigo"
              buttonText="Complete break"
              onAction={handleCompleteBreak}
            />
            
            <ReminderCard
              icon={<Droplets size={20} />}
              title="Stay hydrated"
              description="Drink a glass of water now"
              color="balance-blue"
              buttonText="I drank water"
              onAction={handleCompleteHydration}
            />
            
            <ReminderCard
              icon={<Yoga size={20} />}
              title="Quick stretch"
              description="Stretch your back and neck for 1 minute"
              color="balance-green"
              buttonText="Complete stretch"
              onAction={handleCompleteStretch}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
