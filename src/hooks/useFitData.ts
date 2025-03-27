
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  fetchFitnessData, 
  isGoogleFitAuthenticated 
} from '@/services/googleFitService';

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

export const useFitData = (isConnected: boolean = false) => {
  const [fitData, setFitData] = useState<FitnessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  // Check connection status regardless of what's passed in
  const realConnectionStatus = isConnected || isGoogleFitAuthenticated();

  useEffect(() => {
    // Only fetch data if connected
    if (!realConnectionStatus) return;
    
    const fetchFitData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchFitnessData();
        setFitData(data);
        setLastRefreshed(new Date());
        
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
  }, [realConnectionStatus]);
  
  // Function to manually refresh data
  const refreshFitData = async () => {
    if (!realConnectionStatus) {
      toast.error('Not connected to Google Fit');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchFitnessData();
      setFitData(data);
      setLastRefreshed(new Date());
      
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
    lastRefreshed,
    refreshFitData,
  };
};
