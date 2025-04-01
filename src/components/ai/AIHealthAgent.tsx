
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
  
  // Enhanced responses database for better conversational ability
  const healthResponses: Record<string, string> = {
    'water': 'Staying hydrated is essential! Try to drink at least 8 glasses (2 liters) of water daily. Your body uses water for almost every function, including regulating temperature, removing waste, and lubricating joints.',
    'sleep': 'Adults should aim for 7-9 hours of quality sleep per night. Consider establishing a regular sleep schedule and creating a relaxing bedtime routine to improve sleep quality.',
    'stress': 'Try mindfulness meditation, deep breathing exercises, or progressive muscle relaxation to manage stress. Even 5 minutes of focused breathing can help reduce anxiety levels.',
    'exercise': 'Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity each week, plus muscle-strengthening activities twice a week.',
    'diet': 'Focus on a balanced diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats. Try to limit processed foods, added sugars, and excessive sodium.',
    'help': 'I can answer questions about exercise, nutrition, sleep, stress management, and general wellness. Try asking something like "How much water should I drink?" or "Tips for better sleep".',
    'workout': 'For beginners, try a combination of cardio (like walking, jogging, or cycling) and simple bodyweight exercises (like push-ups, squats, and lunges). Start with 20-30 minutes, 3 times a week.',
    'protein': 'The recommended daily protein intake is about 0.8g per kg of body weight for average adults. Athletes and those building muscle may need 1.2-2.0g per kg.',
    'vitamins': 'A balanced diet should provide most vitamins you need. Key vitamins include A (vision), B complex (energy), C (immunity), D (bone health), and E (cell protection).',
    'meditation': 'Start with just 5 minutes daily. Sit comfortably, focus on your breath, and gently return your attention to breathing whenever your mind wanders.',
    'headache': 'Common causes include dehydration, stress, eye strain, or lack of sleep. Try drinking water, taking a short break from screens, and practicing deep breathing.',
    'motivation': 'Set specific, achievable goals. Find activities you enjoy. Track your progress. Exercise with friends. Reward yourself for milestones. Remember why you started.',
    'app': 'This health app helps you track fitness data, set health goals, get personalized insights, and connect with health professionals. Use the sidebar menu to navigate between features.',
    'features': 'Our app includes fitness tracking, sleep monitoring, nutrition planning, stress management tools, personalized health insights, and integration with wearable devices.',
    'dashboard': 'The dashboard shows your health overview, recent activities, progress toward goals, and personalized health insights. You can customize what metrics are displayed in settings.',
    'profile': 'In your profile, you can update personal information, set health goals, manage connected devices, and adjust notification preferences.',
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
    
    // More intelligent responses based on question types
    if (input.includes('how') && input.includes('work')) {
      return "Our app works by tracking your health data through manual input or connected devices. It then analyzes this information to provide personalized insights and recommendations tailored to your health goals.";
    }
    
    if (input.includes('how') && input.includes('start')) {
      return "To get started, explore the dashboard to see your health overview. Try connecting a fitness device in the Settings menu, or manually log your first activity by clicking the '+' button on any tracker panel.";
    }
    
    if (input.includes('what') && (input.includes('eat') || input.includes('food'))) {
      return "A balanced diet should include plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. Try to limit processed foods, added sugars, and excessive sodium. Would you like specific meal suggestions?";
    }
    
    if (input.includes('why') && input.includes('important')) {
      return "Regular physical activity, proper nutrition, adequate sleep, and stress management are important because they form the foundation of good health. They help prevent chronic diseases, boost energy levels, improve mood, and enhance overall quality of life.";
    }
    
    if (input.includes('thank')) {
      return "You're welcome! I'm here to help anytime you need health and wellness guidance. Is there anything else you'd like to know?";
    }
    
    // Fallback response that encourages further conversation
    return "That's an interesting question! While I don't have specific information on that exact topic, I can help with questions about exercise, nutrition, sleep, stress management, and how to use this app effectively. Could you try rephrasing or asking something more specific?";
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
      {/* Floating button - fixed position regardless of scroll */}
      <button
        onClick={toggleAgent}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg bg-gradient-to-r from-balance-blue to-balance-indigo text-white hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
        aria-label="Health Assistant"
        style={{ position: 'fixed' }} // Ensure it's fixed even with other CSS
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
        {!isOpen && <span className="text-sm font-medium hidden md:inline">Ask Omi</span>}
      </button>
      
      {/* Agent dialogue - fixed position */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-[350px] max-w-[90vw]"
            style={{ position: 'fixed' }} // Ensure it's fixed even with other CSS
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
