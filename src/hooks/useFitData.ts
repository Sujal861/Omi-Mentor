
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Types for fitness data
export interface FitnessData {
  steps: number;
  caloriesBurned: number;
  activeMinutes: number;
  distance: number;
  heartRate: {
    current: number;
    resting: number;
    max: number;
  };
  sleepData: {
    duration: number;
    quality: 'poor' | 'fair' | 'good';
    deepSleep: number;
  };
  lastUpdated: Date;
}

// Mock data generation helper
const generateMockFitData = (): FitnessData => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  
  return {
    steps: Math.floor(Math.random() * 5000) + 2000,
    caloriesBurned: Math.floor(Math.random() * 300) + 100,
    activeMinutes: Math.floor(Math.random() * 60) + 15,
    distance: parseFloat((Math.random() * 3 + 1).toFixed(2)),
    heartRate: {
      current: Math.floor(Math.random() * 30) + 65,
      resting: Math.floor(Math.random() * 10) + 60,
      max: Math.floor(Math.random() * 20) + 140,
    },
    sleepData: {
      duration: Math.floor(Math.random() * 3) + 6,
      quality: ['poor', 'fair', 'good'][Math.floor(Math.random() * 3)] as 'poor' | 'fair' | 'good',
      deepSleep: parseFloat((Math.random() * 2 + 0.5).toFixed(1)),
    },
    lastUpdated: yesterday,
  };
};

export const useFitData = (isConnected: boolean = false) => {
  const [fitData, setFitData] = useState<FitnessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch data if connected
    if (!isConnected) return;
    
    const fetchFitData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real implementation, this would call the Google Fit API
        // For demo purposes, simulate an API call with a delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate mock data
        const mockData = generateMockFitData();
        setFitData(mockData);
        
      } catch (err: any) {
        console.error('Error fetching fitness data:', err);
        setError(err.message || 'Failed to fetch fitness data');
        toast.error('Could not load fitness data', {
          description: 'Please check your connection and try again',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFitData();
    
    // Set up a refresh interval (every 5 minutes)
    const intervalId = setInterval(() => {
      fetchFitData();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [isConnected]);
  
  // Function to manually refresh data
  const refreshFitData = async () => {
    if (!isConnected) {
      toast.error('Not connected to Google Fit');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate new mock data
      const mockData = generateMockFitData();
      mockData.lastUpdated = new Date();
      setFitData(mockData);
      
      toast.success('Fitness data updated');
    } catch (err: any) {
      console.error('Error refreshing fitness data:', err);
      setError(err.message || 'Failed to refresh fitness data');
      toast.error('Could not update fitness data');
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    fitData,
    isLoading,
    error,
    refreshFitData,
  };
};
