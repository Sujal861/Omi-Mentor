
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Button } from '../common/Button';

interface ReminderCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  buttonText: string;
  onAction: () => void;
  className?: string;
}

const ReminderCard = ({
  icon,
  title,
  description,
  color,
  buttonText,
  onAction,
  className,
}: ReminderCardProps) => {
  return (
    <motion.div
      className={cn(
        "glass-card rounded-2xl p-5 relative overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start space-x-4">
        <div className={cn("p-2 rounded-xl", `bg-${color}/10 text-${color}`)}>
          {icon}
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          
          <div className="mt-4">
            <Button 
              variant="soft" 
              className={cn(`bg-${color}/10 text-${color} hover:bg-${color}/20`)}
              size="sm"
              onClick={onAction}
            >
              <Check size={14} className="mr-1" />
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReminderCard;
