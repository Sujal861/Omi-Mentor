
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
  const [networkRetries, setNetworkRetries] = useState(0);
  const MAX_RETRIES = 3;

  // Check connection status regardless of what's passed in
  // Use strict comparison to ensure we only auto-connect when explicitly set to true
  const realConnectionStatus = isConnected === true || isGoogleFitAuthenticated();

  useEffect(() => {
    // Only fetch data if connected AND explicitly allowed to connect
    if (!realConnectionStatus) return;
    
    const fetchFitData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchFitnessData();
        setFitData(data);
        setLastRefreshed(new Date());
        // Reset retries on success
        setNetworkRetries(0);
        
      } catch (err: any) {
        console.error('Error fetching fitness data:', err);
        setError(err.message || 'Failed to fetch fitness data');
        
        // Check if it's a network error
        if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError') || 
            err.message?.includes('Network request failed') || !navigator.onLine) {
          
          // Increment retry counter
          setNetworkRetries(prev => prev + 1);
          
          if (networkRetries < MAX_RETRIES) {
            // Try again after a delay, but don't show toast to avoid popup spam
            setTimeout(() => fetchFitData(), 2000);
            return;
          }
        }
        
        // Don't show error toast, just set the error state - avoids popup spam
        // We'll show connection button instead
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
  }, [realConnectionStatus, networkRetries]);
  
  // Function to manually refresh data
  const refreshFitData = async () => {
    if (!realConnectionStatus) {
      // Don't show error toast, just return - avoids popup spam
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchFitnessData();
      setFitData(data);
      setLastRefreshed(new Date());
      // Reset retries on success
      setNetworkRetries(0);
      
      toast.success('Fitness data updated');
    } catch (err: any) {
      console.error('Error refreshing fitness data:', err);
      setError(err.message || 'Failed to refresh fitness data');
      
      // Only show toast on manual refresh, not automatic
      toast.error('Could not update fitness data', {
        description: 'Please check your connection and try again',
      });
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
