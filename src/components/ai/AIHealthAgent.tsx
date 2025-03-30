
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X, MessageSquare, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ThreeDCard from '@/components/ui/3d-card';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  content: string;
  type: 'user' | 'agent';
  timestamp: Date;
};

type HealthSuggestion = {
  title: string;
  content: string;
  category: 'sleep' | 'nutrition' | 'activity' | 'mental';
};

const AIHealthAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Default responses based on common health questions
  const healthResponses: Record<string, string> = {
    'water': 'Staying hydrated is essential! Try to drink at least 8 glasses (2 liters) of water daily. Your body uses water for almost every function, including regulating temperature, removing waste, and lubricating joints.',
    'sleep': 'Adults should aim for 7-9 hours of quality sleep per night. Consider establishing a regular sleep schedule and creating a relaxing bedtime routine to improve sleep quality.',
    'stress': 'Try mindfulness meditation, deep breathing exercises, or progressive muscle relaxation to manage stress. Even 5 minutes of focused breathing can help reduce anxiety levels.',
    'exercise': 'Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity each week, plus muscle-strengthening activities twice a week.',
    'diet': 'Focus on a balanced diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats. Try to limit processed foods, added sugars, and excessive sodium.',
    'help': 'I can answer questions about exercise, nutrition, sleep, stress management, and general wellness. Try asking something like "How much water should I drink?" or "Tips for better sleep".',
  };

  const healthSuggestions: HealthSuggestion[] = [
    {
      title: 'Track Your Sleep',
      content: 'Consistent sleep patterns improve overall health. Try to get 7-9 hours each night.',
      category: 'sleep',
    },
    {
      title: 'Stay Hydrated',
      content: 'Drink at least 8 glasses of water daily to maintain optimal body functions.',
      category: 'nutrition',
    },
    {
      title: 'Take Movement Breaks',
      content: 'Stand up and stretch for 5 minutes every hour to improve circulation and focus.',
      category: 'activity',
    },
    {
      title: 'Practice Mindfulness',
      content: 'Try a 5-minute daily meditation to reduce stress and improve mental clarity.',
      category: 'mental',
    },
  ];

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

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

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

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check for keyword matches in our predefined responses
    for (const [keyword, response] of Object.entries(healthResponses)) {
      if (input.includes(keyword)) {
        return response;
      }
    }
    
    // Default responses for different question types
    if (input.includes('how') || input.includes('what') || input.includes('why')) {
      return "That's a great question! While I don't have specific information on that, I recommend consulting with a healthcare professional for personalized advice. Would you like to know about water intake, sleep, stress management, exercise, or nutrition instead?";
    }
    
    if (input.includes('thank')) {
      return "You're welcome! I'm here to help anytime you need health and wellness guidance.";
    }
    
    // Fallback response
    return "I'm not sure I understand. Could you try rephrasing your question? You can ask me about water intake, sleep, stress management, exercise, or nutrition.";
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
      {/* Floating button */}
      <button
        onClick={toggleAgent}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg bg-gradient-to-r from-balance-blue to-balance-indigo text-white"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>
      
      {/* Agent dialogue */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-[350px] max-w-[90vw]"
          >
            <ThreeDCard className="overflow-hidden" rotationIntensity={5}>
              <Card className="border-0 shadow-none h-[500px] max-h-[70vh] flex flex-col">
                <CardHeader className="bg-gradient-to-r from-balance-blue to-balance-indigo text-white py-3">
                  <CardTitle className="flex items-center text-lg">
                    <Bot className="mr-2" size={20} />
                    Omi Health Assistant
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
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
                </CardContent>
                
                <div className="px-4 py-2 border-t">
                  <div className="text-xs text-gray-500 mb-2">Suggested topics:</div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {healthSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.category === 'sleep' && <Zap className="mr-1" size={12} />}
                        {suggestion.category === 'nutrition' && <Sparkles className="mr-1" size={12} />}
                        {suggestion.category === 'activity' && <Zap className="mr-1" size={12} />}
                        {suggestion.category === 'mental' && <Sparkles className="mr-1" size={12} />}
                        {suggestion.title}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <CardFooter className="p-2">
                  <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about health, exercise, diet..."
                      className="flex-1"
                    />
                    <Button type="submit" size="sm">
                      <MessageSquare size={16} />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </ThreeDCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIHealthAgent;
