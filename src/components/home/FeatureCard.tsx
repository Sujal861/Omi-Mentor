
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
      className="p-6 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]"
    >
      <div className="mb-4 p-3 rounded-full bg-gradient-to-r w-fit" style={{ backgroundImage: `linear-gradient(to right, ${feature.color})` }}>
        <feature.icon size={28} className="text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </motion.div>
  );
};

export default FeatureCard;
