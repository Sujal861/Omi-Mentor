
import React from 'react';
import { Bot, X } from 'lucide-react';

interface AIHealthAgentButtonProps {
  isOpen: boolean;
  toggleAgent: () => void;
}

const AIHealthAgentButton: React.FC<AIHealthAgentButtonProps> = ({
  isOpen,
  toggleAgent
}) => {
  return (
    <button
      onClick={toggleAgent}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg bg-gradient-to-r from-balance-blue to-balance-indigo text-white hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
      aria-label="Health Assistant"
      style={{ position: 'fixed' }} // Ensure it's fixed even with other CSS
    >
      {isOpen ? <X size={24} /> : <Bot size={24} />}
      {!isOpen && <span className="text-sm font-medium hidden md:inline">Ask Omi</span>}
    </button>
  );
};

export default AIHealthAgentButton;
