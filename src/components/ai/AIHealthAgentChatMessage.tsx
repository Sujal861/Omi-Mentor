
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from './types/health-agent.types';

interface AIHealthAgentChatMessageProps {
  message: Message;
}

const AIHealthAgentChatMessage: React.FC<AIHealthAgentChatMessageProps> = ({ message }) => {
  return (
    <div
      className={cn(
        "flex flex-col",
        message.type === 'user' ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3",
          message.type === 'user'
            ? "bg-balance-blue text-white rounded-tr-none"
            : "bg-gray-100 dark:bg-gray-800 rounded-tl-none"
        )}
      >
        <p className="text-sm">{message.content}</p>
      </div>
      <span className="text-xs text-gray-500 mt-1">
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
};

export default AIHealthAgentChatMessage;
