
import React from 'react';
import PageTransition from '../components/layout/PageTransition';
import UserProfile from '../components/profile/UserProfile';
import { userData } from '../utils/mockData';
import { Card } from '@/components/ui/card';
import { Languages, Bell, Moon, LogOut } from 'lucide-react';
import { Button } from '@/components/common/Button';

const Profile = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <UserProfile 
              name={userData.name} 
              email={userData.email} 
              avatar={userData.avatar}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center space-x-3">
                    <Languages size={20} className="text-gray-500" />
                    <div>
                      <h3 className="font-medium">Language</h3>
                      <p className="text-sm text-gray-500">Set your preferred language</p>
                    </div>
                  </div>
                  <Button variant="soft" size="sm">English</Button>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center space-x-3">
                    <Bell size={20} className="text-gray-500" />
                    <div>
                      <h3 className="font-medium">Notifications</h3>
                      <p className="text-sm text-gray-500">Manage your notification settings</p>
                    </div>
                  </div>
                  <Button variant="soft" size="sm">Configure</Button>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center space-x-3">
                    <Moon size={20} className="text-gray-500" />
                    <div>
                      <h3 className="font-medium">Dark Mode</h3>
                      <p className="text-sm text-gray-500">Toggle between light and dark mode</p>
                    </div>
                  </div>
                  <Button variant="soft" size="sm">Auto</Button>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <LogOut size={20} className="text-gray-500" />
                    <div>
                      <h3 className="font-medium">Logout</h3>
                      <p className="text-sm text-gray-500">Sign out from your account</p>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm">Logout</Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Health Data</h2>
              <p className="text-gray-500 mb-4">
                Connect your wearables and health apps to improve your wellness coaching experience.
              </p>
              <Button variant="soft" size="sm">Connect devices</Button>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
