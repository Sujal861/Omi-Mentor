
import { ReactNode } from 'react';

export type HealthCategory = 'sleep' | 'nutrition' | 'activity' | 'mental';

export type Message = {
  id: string;
  content: string;
  type: 'user' | 'agent';
  timestamp: Date;
};

export type HealthSuggestion = {
  title: string;
  content: string;
  category: HealthCategory;
};
