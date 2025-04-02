
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureProps {
  feature: {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
  };
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index + 0.3 }}
      whileHover={{ 
        y: -10, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      className="p-6 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg transition-all duration-300"
    >
      <div 
        className="mb-4 p-3 rounded-full bg-gradient-to-r w-fit transform transition-transform duration-300 hover:scale-110"
        style={{ backgroundImage: `linear-gradient(to right, ${feature.color})` }}
      >
        <feature.icon size={28} className="text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <motion.span 
          className="text-sm font-medium text-balance-blue inline-flex items-center"
          whileHover={{ x: 5 }}
        >
          Learn more
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.span>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
