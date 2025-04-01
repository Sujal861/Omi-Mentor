
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Sparkles } from 'lucide-react';
import { HealthSuggestion } from './types/health-agent.types';

interface AIHealthAgentSuggestionsProps {
  suggestions: HealthSuggestion[];
  onSuggestionClick: (suggestion: HealthSuggestion) => void;
}

const AIHealthAgentSuggestions: React.FC<AIHealthAgentSuggestionsProps> = ({
  suggestions,
  onSuggestionClick
}) => {
  return (
    <div className="px-4 py-2 border-t">
      <div className="text-xs text-gray-500 mb-2">Suggested topics:</div>
      <div className="flex flex-wrap gap-1 mb-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onSuggestionClick(suggestion)}
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
  );
};

export default AIHealthAgentSuggestions;
