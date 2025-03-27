
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
            toast.error(`Network issue detected. Retrying... (${networkRetries + 1}/${MAX_RETRIES})`, {
              description: 'Please check your internet connection',
              duration: 3000,
            });
            
            // Try again after a delay
            setTimeout(() => fetchFitData(), 2000);
            return;
          }
        }
        
        toast.error('Could not load fitness data', {
          description: 'Please check your internet connection and try again',
          duration: 5000,
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
  }, [realConnectionStatus, networkRetries]);
  
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
      // Reset retries on success
      setNetworkRetries(0);
      
      toast.success('Fitness data updated');
    } catch (err: any) {
      console.error('Error refreshing fitness data:', err);
      setError(err.message || 'Failed to refresh fitness data');
      
      // Check if it's a network error
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError') || 
          err.message?.includes('Network request failed') || !navigator.onLine) {
        toast.error('Network error', {
          description: 'Please check your internet connection and try again',
        });
      } else {
        toast.error('Could not update fitness data');
      }
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
