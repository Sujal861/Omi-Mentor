
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
  const [hasInteracted, setHasInteracted] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const { toast } = useToast();
  
  // Initial greeting when agent opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: Message = {
        id: Date.now().toString(),
        content: "Hi there! 👋 I'm Omi, your health assistant. How can I help you today? You can ask me about exercise, nutrition, sleep, or stress management.",
        type: 'agent',
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length]);

  // Show popup after 15 seconds if user hasn't interacted yet
  useEffect(() => {
    const savedInteraction = localStorage.getItem('chatInteracted');
    if (savedInteraction) {
      setHasInteracted(true);
    } else {
      const timer = setTimeout(() => {
        if (!hasInteracted && !isOpen) {
          setIsOpen(true);
        }
      }, 15000);
      
      return () => clearTimeout(timer);
    }
  }, [hasInteracted, isOpen]);

  const toggleAgent = () => {
    setIsOpen(!isOpen);
    
    if (!hasInteracted) {
      setHasInteracted(true);
      localStorage.setItem('chatInteracted', 'true');
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim()) return;
    
    // Check if input contains specific keywords for lead capture
    const leadCaptureKeywords = ['guide', 'free', 'download', 'help', 'newsletter', 'contact'];
    const shouldCaptureEmail = leadCaptureKeywords.some(keyword => 
      input.toLowerCase().includes(keyword)
    ) && !userEmail && !showEmailPrompt;
    
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
    
    // If we should capture email, do that first
    if (shouldCaptureEmail && messages.length > 1) {
      setTimeout(() => {
        const emailPrompt: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'd be happy to help with that! Would you like to receive a free balance improvement guide? Just enter your email, and I'll send it right away.",
          type: 'agent',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, emailPrompt]);
        setIsTyping(false);
        setShowEmailPrompt(true);
      }, 1000);
      return;
    }
    
    // Process email submission
    if (showEmailPrompt && input.includes('@')) {
      setUserEmail(input);
      setShowEmailPrompt(false);
      
      setTimeout(() => {
        const thankYouMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `Thank you! I've sent the guide to ${input}. Is there anything else I can help you with?`,
          type: 'agent',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, thankYouMessage]);
        setIsTyping(false);
        
        toast({
          title: "Success!",
          description: "You'll receive your free guide shortly.",
        });
      }, 1500);
      return;
    }
    
    // Regular response for other queries
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
    
    if (!hasInteracted) {
      setHasInteracted(true);
      localStorage.setItem('chatInteracted', 'true');
    }
  };

  const handleQuickAction = (action: string) => {
    let responseContent = "";
    
    switch(action) {
      case "book":
        responseContent = "I'll help you book a free consultation. What day of the week works best for you?";
        break;
      case "price":
        responseContent = "We offer several pricing packages: Basic ($99), Advanced ($249), and Premium ($449). Would you like more details about any specific plan?";
        break;
      case "programs":
        responseContent = "We have personalized programs for balance improvement, fall prevention, and mobility enhancement. Which one interests you most?";
        break;
      case "testimonials":
        responseContent = "Our clients love our services! Sarah improved her balance by 40% in just 8 weeks, and Michael regained his confidence after just a month of training.";
        break;
      default:
        responseContent = "How can I assist you today?";
    }
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: action === "book" ? "I'd like to book a consultation" : 
               action === "price" ? "What are your pricing options?" :
               action === "programs" ? "Tell me about your programs" : "Show me testimonials",
      type: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        type: 'agent',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1000);
    
    if (!hasInteracted) {
      setHasInteracted(true);
      localStorage.setItem('chatInteracted', 'true');
    }
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
        handleQuickAction={handleQuickAction}
        showEmailPrompt={showEmailPrompt}
      />
    </>
  );
};

export default AIHealthAgent;
