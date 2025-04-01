
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import AIHealthAgentButton from './AIHealthAgentButton';
import AIHealthAgentDialog from './AIHealthAgentDialog';
import { Message, HealthSuggestion } from './types/health-agent.types';
import { healthSuggestions, generateResponse } from './utils/health-responses';

const AIHealthAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  
  // Initial greeting when agent opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: Message = {
        id: Date.now().toString(),
        content: "Hi there! I'm Omi, your health assistant. How can I help you today? You can ask me about exercise, nutrition, sleep, or stress management.",
        type: 'agent',
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length]);

  const toggleAgent = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(input);
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        type: 'agent',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: HealthSuggestion) => {
    // Add suggestion as user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: `Tell me about ${suggestion.title.toLowerCase()}`,
      type: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Add agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: suggestion.content,
        type: 'agent',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  return (
    <>
      <AIHealthAgentButton isOpen={isOpen} toggleAgent={toggleAgent} />
      
      <AIHealthAgentDialog
        isOpen={isOpen}
        messages={messages}
        isTyping={isTyping}
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
        suggestions={healthSuggestions}
        handleSuggestionClick={handleSuggestionClick}
      />
    </>
  );
};

export default AIHealthAgent;
