
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Edit, Settings, User } from 'lucide-react';
import { Button } from '../common/Button';

interface UserProfileProps {
  name: string;
  email: string;
  avatar?: string;
}

const UserProfile = ({ name, email, avatar }: UserProfileProps) => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-balance-blue to-balance-indigo h-32 relative">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E')"
          }}
          animate={{ 
            backgroundPosition: ["0px 0px", "100px 100px"],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "linear"
          }}
        />
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full"
        >
          <Edit size={16} />
        </Button>
      </div>
      
      <div className="px-6 pb-6 pt-14 relative">
        <div className="absolute -top-12 left-6">
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden bg-white shadow-md">
            {avatar ? (
              <img 
                src={avatar} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-balance-blue/10 flex items-center justify-center">
                <User size={36} className="text-balance-blue" />
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-2">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-gray-500">{email}</p>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button variant="soft" className="w-full" size="lg">
              <Settings size={16} className="mr-2" />
              Settings
            </Button>
            <Button variant="soft" className="w-full" size="lg">
              <Bell size={16} className="mr-2" />
              Notifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
