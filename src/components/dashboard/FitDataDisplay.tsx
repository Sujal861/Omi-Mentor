
import { FitnessData } from "@/hooks/useFitData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Moon, Flame, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { detectHealthIssues, sendHealthAlert } from "@/services/healthMonitoring";
import { useSupabase } from "@/context/SupabaseContext";

interface FitDataDisplayProps {
  fitData: FitnessData | null;
  isLoading: boolean;
  onRefresh: () => void;
}

export const FitDataDisplay = ({ fitData, isLoading, onRefresh }: FitDataDisplayProps) => {
  const { user } = useSupabase();
  
  useEffect(() => {
    // Check for health issues when fitData changes
    if (fitData && user) {
      const { hasIssue, message } = detectHealthIssues(fitData);
      
      if (hasIssue && user.email) {
        // Send health alert email
        sendHealthAlert(user.email, message);
      }
    }
  }, [fitData, user]);
  
  if (!fitData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Fitness Data</CardTitle>
          <CardDescription>Connect Google Fit to see your data</CardDescription>
        </CardHeader>
        <CardContent className="h-40 flex items-center justify-center">
          <p className="text-muted-foreground">No fitness data available</p>
        </CardContent>
      </Card>
    );
  }
  
  // Check for health issues to display alerts
  const { hasIssue, message } = detectHealthIssues(fitData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Google Fit Data</CardTitle>
              <CardDescription>
                Last updated: {formatDistanceToNow(fitData.lastUpdated, { addSuffix: true })}
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRefresh}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Refresh"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {hasIssue && (
            <Alert className="mb-4 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-amber-800 dark:text-amber-300">
                {message}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              icon={<Activity size={18} className="text-blue-500" />}
              title="Steps"
              value={fitData.steps.toLocaleString()}
              color="blue"
            />
            <StatsCard
              icon={<Flame size={18} className="text-orange-500" />}
              title="Calories"
              value={`${fitData.caloriesBurned.toLocaleString()} kcal`}
              color="orange"
            />
            <StatsCard
              icon={<Heart size={18} className="text-red-500" />}
              title="Heart Rate"
              value={`${fitData.heartRate.current} bpm`}
              color="red"
            />
            <StatsCard
              icon={<Moon size={18} className="text-indigo-500" />}
              title="Sleep"
              value={`${fitData.sleepData.duration} hrs`}
              color="indigo"
            />
          </div>
          
          <div className="mt-6 space-y-3">
            <ProgressBar 
              label="Daily Activity" 
              value={fitData.activeMinutes} 
              max={60} 
              unit="minutes"
              color="bg-green-500" 
            />
            <ProgressBar 
              label="Sleep Quality" 
              value={fitData.sleepData.deepSleep} 
              max={3} 
              unit="hours deep sleep"
              color="bg-indigo-500" 
            />
            <ProgressBar 
              label="Distance" 
              value={fitData.distance} 
              max={5} 
              unit="km"
              color="bg-blue-500" 
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

const StatsCard = ({ icon, title, value, color }: StatsCardProps) => {
  return (
    <div className="bg-card rounded-lg border p-3 flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <div className={`rounded-full p-1.5 bg-${color}-100 dark:bg-${color}-900/30`}>
          {icon}
        </div>
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
      </div>
      <span className="text-2xl font-semibold">{value}</span>
    </div>
  );
};

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}

const ProgressBar = ({ label, value, max, unit, color }: ProgressBarProps) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value} {unit}</span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
