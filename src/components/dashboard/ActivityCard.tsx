
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, Moon, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActivityType = 'focus' | 'heart' | 'sleep' | 'energy';

interface ActivityCardProps {
  type: ActivityType;
  value: number;
  unit: string;
  description: string;
  className?: string;
}

const ActivityCard = ({ type, value, unit, description, className }: ActivityCardProps) => {
  const icons = {
    focus: { icon: Clock, color: 'text-balance-blue', bg: 'bg-balance-blue' },
    heart: { icon: Heart, color: 'text-balance-red', bg: 'bg-balance-red' },
    sleep: { icon: Moon, color: 'text-balance-indigo', bg: 'bg-balance-indigo' },
    energy: { icon: Zap, color: 'text-balance-yellow', bg: 'bg-balance-yellow' },
  };

  const { icon: Icon, color, bg } = icons[type];

  return (
    <motion.div 
      className={cn(
        "glass-card rounded-2xl p-5 relative overflow-hidden card-hover",
        className
      )}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className={cn("p-3 rounded-xl w-12 h-12 flex items-center justify-center", `${bg}/10`)}>
            <Icon className={color} size={24} />
          </div>
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-semibold">{value}</span>
              <span className="text-sm text-gray-500">{unit}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>
        
        <motion.div 
          className="absolute right-0 bottom-0 w-24 h-24 opacity-5"
          initial={{ rotate: -10 }}
          animate={{ rotate: 5 }}
          transition={{ yoyo: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <Icon size={96} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
