
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

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
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-gray-600 mb-6 italic text-balance">"{testimonial.text}"</p>
      <div className="flex items-center">
        {testimonial.image ? (
          <div className="mr-4 w-12 h-12 rounded-full overflow-hidden">
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="mr-4 w-12 h-12 rounded-full bg-balance-blue/10 flex items-center justify-center">
            <span className="text-balance-blue font-bold">{testimonial.name.charAt(0)}</span>
          </div>
        )}
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
