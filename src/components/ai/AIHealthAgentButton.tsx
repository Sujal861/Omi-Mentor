
import React, { useState, useEffect } from 'react';
import { Bot, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIHealthAgentButtonProps {
  isOpen: boolean;
  toggleAgent: () => void;
}

const AIHealthAgentButton: React.FC<AIHealthAgentButtonProps> = ({
  isOpen,
  toggleAgent
}) => {
  const [isPulsing, setIsPulsing] = useState(false);
  
  useEffect(() => {
    // Create a pulsing effect every 10 seconds
    if (!isOpen) {
      const interval = setInterval(() => {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 2000);
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [isOpen]);
  
  return (
    <AnimatePresence>
      <motion.button
        onClick={toggleAgent}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2 ${
          isPulsing ? 'ring-4 ring-balance-blue/50' : ''
        }`}
        style={{ position: 'fixed' }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isPulsing ? [1, 1.1, 1] : 1, 
          opacity: 1,
          background: isOpen 
            ? 'linear-gradient(to right, #3a7bd5, #3a6073)' 
            : 'linear-gradient(to right, #00d2ff, #3a47d5)'
        }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ 
          duration: 0.3,
          scale: { duration: isPulsing ? 1 : 0.3, repeat: isPulsing ? 3 : 0, repeatType: 'reverse' }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Health Assistant"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <>
            <MessageCircle size={24} className="text-white" />
            <span className="text-sm font-medium hidden md:inline text-white">Ask Omi</span>
            {!isOpen && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              />
            )}
          </>
        )}
      </motion.button>
    </AnimatePresence>
  );
};

export default AIHealthAgentButton;
