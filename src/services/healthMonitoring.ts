
import { toast } from "sonner";
import { FitnessData } from "@/hooks/useFitData";

// Health thresholds
const HEALTH_THRESHOLDS = {
  highHeartRate: 100, // bpm
  highStressLevel: 70, // percent
  lowSleepDuration: 6, // hours
  highBloodPressure: 140, // systolic
};

// Function to check if health metrics indicate a potential issue
export const detectHealthIssues = (fitData: FitnessData | null): { hasIssue: boolean; message: string } => {
  if (!fitData) return { hasIssue: false, message: "" };
  
  // Check heart rate
  if (fitData.heartRate.current > HEALTH_THRESHOLDS.highHeartRate) {
    return {
      hasIssue: true,
      message: `Your heart rate is high (${fitData.heartRate.current} bpm). Consider taking a break and practicing deep breathing.`,
    };
  }
  
  // Check sleep data
  if (fitData.sleepData.duration < HEALTH_THRESHOLDS.lowSleepDuration) {
    return {
      hasIssue: true,
      message: `You only got ${fitData.sleepData.duration} hours of sleep last night. Try to get at least 7 hours of sleep for better health.`,
    };
  }
  
  // No issues detected
  return { hasIssue: false, message: "" };
};

// Function to send an email alert
export const sendHealthAlert = async (email: string, message: string): Promise<boolean> => {
  if (!email || !message) return false;
  
  try {
    // In a real implementation, this would call a backend API to send the email
    // For this demo, we'll simulate sending an email with a delay
    
    console.log(`Sending health alert email to ${email}: ${message}`);
    
    // Simulate API call to send email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    toast.success("Health alert sent", {
      description: "An email notification has been sent with health recommendations",
    });
    
    return true;
  } catch (error) {
    console.error("Error sending health alert:", error);
    toast.error("Failed to send health alert");
    return false;
  }
};
