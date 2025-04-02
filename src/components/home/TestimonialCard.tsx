
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface TestimonialProps {
  testimonial: {
    name: string;
    text: string;
    role: string;
    image?: string;
  };
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 * index, duration: 0.5 }}
      whileHover={{ 
        y: -5, 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:border-balance-blue/20 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute right-[-5px] top-[-5px] opacity-5 transform rotate-12">
        <Quote size={80} />
      </div>
      
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.3 * index }}
          >
            <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
          </motion.div>
        ))}
      </div>
      
      <p className="text-gray-600 mb-6 italic text-balance relative z-10">"{testimonial.text}"</p>
      
      <div className="flex items-center">
        {testimonial.image ? (
          <motion.div 
            className="mr-4 w-12 h-12 rounded-full overflow-hidden border-2 border-balance-blue/20"
            whileHover={{ scale: 1.1 }}
          >
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ) : (
          <motion.div 
            className="mr-4 w-12 h-12 rounded-full bg-gradient-to-br from-balance-blue to-balance-indigo flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
          </motion.div>
        )}
        <div>
          <p className="font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
