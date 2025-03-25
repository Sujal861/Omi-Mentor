
import React from 'react';
import { motion } from 'framer-motion';
import { ActivityIcon, ArrowRight, BrainCircuit, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { cn } from '@/lib/utils';

interface InsightPanelProps {
  insights: {
    title: string;
    description: string;
    type: 'productivity' | 'ai' | 'wellness';
  }[];
}

const InsightPanel = ({ insights }: InsightPanelProps) => {
  const typeIcons = {
    productivity: ActivityIcon,
    ai: BrainCircuit,
    wellness: Sparkles,
  };

  const typeColors = {
    productivity: 'text-balance-blue bg-balance-blue/10',
    ai: 'text-balance-purple bg-balance-purple/10',
    wellness: 'text-balance-green bg-balance-green/10',
  };

  return (
    <div className="glass-card rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BrainCircuit className="text-balance-purple" size={20} />
          <h3 className="text-xl font-semibold">AI Insights</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-500">
          View all
        </Button>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = typeIcons[insight.type];
          
          return (
            <motion.div 
              key={index}
              className="p-4 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 relative overflow-hidden shadow-subtle hover:shadow-soft transition-shadow duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-4">
                <div className={cn("p-2 rounded-lg", typeColors[insight.type])}>
                  <Icon size={18} />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{insight.description}</p>
                  
                  <div className="mt-3 flex items-center">
                    <Button variant="ghost" size="sm" className="text-xs text-balance-blue hover:text-balance-blue/80 p-0">
                      <span>Apply suggestions</span>
                      <ArrowRight size={12} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightPanel;
