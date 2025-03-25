
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Watch, Heart, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

const healthProviders = [
  { 
    id: 'googlefit', 
    name: 'Google Fit', 
    icon: <Activity className="text-green-500" />, 
    description: 'Connect to Google Fit to track your activity and health data.'
  },
  { 
    id: 'applehealth', 
    name: 'Apple Health', 
    icon: <Heart className="text-red-500" />, 
    description: 'Connect to Apple Health to sync your health and fitness data.'
  },
  { 
    id: 'fitbit', 
    name: 'Fitbit', 
    icon: <Watch className="text-blue-500" />, 
    description: 'Connect your Fitbit device to track steps, sleep, and more.'
  },
  { 
    id: 'samsung', 
    name: 'Samsung Health', 
    icon: <Smartphone className="text-purple-500" />, 
    description: 'Connect to Samsung Health to monitor your wellness journey.'
  }
];

export const HealthConnectCard = () => {
  const [connectedApps, setConnectedApps] = useState<string[]>([]);
  
  const handleConnect = (providerId: string) => {
    // In a real app, this would initiate OAuth flow
    // This is just for demonstration
    toast.success(`Connecting to ${healthProviders.find(p => p.id === providerId)?.name}`);
    
    // Simulate connection after a short delay
    setTimeout(() => {
      setConnectedApps(prev => [...prev, providerId]);
      toast.success(`Successfully connected to ${healthProviders.find(p => p.id === providerId)?.name}`);
    }, 1500);
  };
  
  const handleDisconnect = (providerId: string) => {
    setConnectedApps(prev => prev.filter(id => id !== providerId));
    toast.info(`Disconnected from ${healthProviders.find(p => p.id === providerId)?.name}`);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="text-primary" />
          Health Trackers
        </CardTitle>
        <CardDescription>
          Connect your health and fitness apps for personalized insights.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {healthProviders.map((provider) => (
          <div 
            key={provider.id} 
            className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background">
                {provider.icon}
              </div>
              <div>
                <h3 className="font-medium">{provider.name}</h3>
                <p className="text-sm text-muted-foreground">{provider.description}</p>
              </div>
            </div>
            {connectedApps.includes(provider.id) ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDisconnect(provider.id)}
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => handleConnect(provider.id)}
              >
                Connect
              </Button>
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Your data is securely synchronized in real-time
        </p>
      </CardFooter>
    </Card>
  );
};
