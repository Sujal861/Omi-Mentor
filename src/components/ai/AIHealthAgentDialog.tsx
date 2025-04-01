
import React, { useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ThreeDCard from '@/components/ui/3d-card';
import AIHealthAgentChat from './AIHealthAgentChat';
import AIHealthAgentSuggestions from './AIHealthAgentSuggestions';
import { Message, HealthSuggestion } from './types/health-agent.types';

interface AIHealthAgentDialogProps {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: (e?: React.FormEvent) => void;
  suggestions: HealthSuggestion[];
  handleSuggestionClick: (suggestion: HealthSuggestion) => void;
}

const AIHealthAgentDialog: React.FC<AIHealthAgentDialogProps> = ({
  isOpen,
  messages,
  isTyping,
  input,
  setInput,
  handleSendMessage,
  suggestions,
  handleSuggestionClick
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  return (
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
                  <MessageSquare className="mr-2" size={20} />
                  Omi Health Assistant
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                <AIHealthAgentChat messages={messages} isTyping={isTyping} />
                
                <AIHealthAgentSuggestions 
                  suggestions={suggestions}
                  onSuggestionClick={handleSuggestionClick}
                />
              </CardContent>
              
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
  );
};

export default AIHealthAgentDialog;
