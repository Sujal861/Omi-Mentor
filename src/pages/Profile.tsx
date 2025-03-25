
import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import UserProfile from '../components/profile/UserProfile';
import { Bell, Eye, Fingerprint, HelpCircle, Language, Lock, LogOut, Moon, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { userData } from '../utils/mockData';
import { toast } from 'sonner';

const ProfileSection = ({ icon, title, description, buttonText, onClick }) => {
  return (
    <motion.div 
      className="glass-card rounded-xl p-5 relative overflow-hidden flex justify-between items-center"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-lg bg-balance-blue/10 text-balance-blue">
          {icon}
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Button variant="soft" onClick={onClick}>
        {buttonText}
      </Button>
    </motion.div>
  );
};

const Profile = () => {
  const showSetting = (setting) => {
    toast.info(`${setting} settings will be available soon!`);
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold">
              Profile & Settings
            </h1>
            <p className="text-gray-500 mt-2">
              Manage your account and preferences
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <UserProfile 
              name={userData.name} 
              email={userData.email} 
              avatar={userData.avatar}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <motion.h2 
              className="text-xl font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Account Settings
            </motion.h2>
            
            <div className="space-y-4">
              <ProfileSection 
                icon={<Lock size={20} />}
                title="Privacy"
                description="Manage your data and privacy settings"
                buttonText="Manage"
                onClick={() => showSetting('Privacy')}
              />
              
              <ProfileSection 
                icon={<Bell size={20} />}
                title="Notifications"
                description="Set your notification preferences"
                buttonText="Configure"
                onClick={() => showSetting('Notification')}
              />
              
              <ProfileSection 
                icon={<ShieldCheck size={20} />}
                title="Security"
                description="Manage password and security settings"
                buttonText="Review"
                onClick={() => showSetting('Security')}
              />
            </div>
            
            <motion.h2 
              className="text-xl font-semibold mt-8 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              App Settings
            </motion.h2>
            
            <div className="space-y-4">
              <ProfileSection 
                icon={<Eye size={20} />}
                title="Appearance"
                description="Customize your app theme and display"
                buttonText="Customize"
                onClick={() => showSetting('Appearance')}
              />
              
              <ProfileSection 
                icon={<Language size={20} />}
                title="Language"
                description="Change your preferred language"
                buttonText="Change"
                onClick={() => showSetting('Language')}
              />
              
              <ProfileSection 
                icon={<Fingerprint size={20} />}
                title="AI Personalization"
                description="Adjust how the AI learns from your behavior"
                buttonText="Configure"
                onClick={() => showSetting('AI Personalization')}
              />
            </div>
            
            <div className="pt-6 flex justify-between">
              <Button variant="ghost" className="text-gray-500">
                <HelpCircle size={16} className="mr-2" />
                Help & Support
              </Button>
              
              <Button variant="soft" className="bg-balance-red/10 text-balance-red hover:bg-balance-red/20">
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
