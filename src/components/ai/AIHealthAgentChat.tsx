
import React, { useRef, useEffect } from 'react';
import AIHealthAgentChatMessage from './AIHealthAgentChatMessage';
import { Message } from './types/health-agent.types';

interface AIHealthAgentChatProps {
  messages: Message[];
  isTyping: boolean;
}

const AIHealthAgentChat: React.FC<AIHealthAgentChatProps> = ({ 
  messages,
  isTyping
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <AIHealthAgentChatMessage key={message.id} message={message} />
      ))}
      
      {isTyping && (
        <div className="flex items-start">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg rounded-tl-none p-3">
            <div className="flex space-x-1">
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default AIHealthAgentChat;
