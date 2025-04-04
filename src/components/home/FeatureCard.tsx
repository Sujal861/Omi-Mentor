
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FeatureProps {
  feature: {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
    link?: string;
    image?: string;
  };
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureProps) => {
  const navigate = useNavigate();
  
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
      className="p-6 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      {feature.image ? (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img 
            src={feature.image} 
            alt={feature.title}
            className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="mb-4 overflow-hidden rounded-lg bg-gray-100 h-48 flex items-center justify-center">
          <feature.icon size={48} className="text-gray-400" />
        </div>
      )}
      <div 
        className="mb-4 p-3 rounded-full bg-gradient-to-r w-fit transform transition-transform duration-300 hover:scale-110"
        style={{ backgroundImage: `linear-gradient(to right, ${feature.color})` }}
      >
        <feature.icon size={28} className="text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{feature.title}</h3>
      <p className="text-gray-600 flex-grow">{feature.description}</p>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Button 
          variant="ghost" 
          className="text-sm font-medium text-balance-blue p-0 hover:bg-transparent hover:text-balance-indigo flex items-center gap-1 group"
          onClick={() => feature.link ? navigate(feature.link) : {}}
        >
          Learn more
          <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
