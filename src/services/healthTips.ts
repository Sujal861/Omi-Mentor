
// Health categories
export type HealthCategory = 'sleep' | 'nutrition' | 'activity' | 'mental' | 'general';

// Health tip interface
export interface HealthTip {
  id: string;
  title: string;
  content: string;
  category: HealthCategory;
  sources?: string[];
}

// Collection of health tips
export const healthTips: HealthTip[] = [
  {
    id: 'sleep-1',
    title: 'Consistent Sleep Schedule',
    content: 'Go to bed and wake up at the same time every day, even on weekends, to regulate your body\'s internal clock.',
    category: 'sleep',
    sources: ['National Sleep Foundation']
  },
  {
    id: 'sleep-2',
    title: 'Bedtime Routine',
    content: 'Develop a relaxing pre-sleep routine such as reading, taking a warm bath, or practicing gentle stretches.',
    category: 'sleep',
  },
  {
    id: 'nutrition-1',
    title: 'Hydration',
    content: 'Drink water throughout the day. A good rule is to have a glass of water with each meal and between meals.',
    category: 'nutrition',
  },
  {
    id: 'nutrition-2',
    title: 'Colorful Plate',
    content: 'Aim to fill half your plate with a variety of colorful fruits and vegetables at each meal.',
    category: 'nutrition',
    sources: ['American Heart Association']
  },
  {
    id: 'activity-1',
    title: 'Daily Movement',
    content: 'Even brief periods of activity can add up. Try 10-minute walks throughout the day if you can\'t fit in a longer workout.',
    category: 'activity',
  },
  {
    id: 'activity-2',
    title: 'Strength Training',
    content: 'Incorporate strength training at least twice a week to maintain muscle mass and bone density.',
    category: 'activity',
    sources: ['American College of Sports Medicine']
  },
  {
    id: 'mental-1',
    title: 'Mindfulness Practice',
    content: 'Just 5 minutes of mindfulness meditation can help reduce stress and improve focus.',
    category: 'mental',
  },
  {
    id: 'mental-2',
    title: 'Digital Detox',
    content: 'Take regular breaks from screens. Try the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.',
    category: 'mental',
  },
  {
    id: 'general-1',
    title: 'Regular Check-ups',
    content: 'Schedule regular check-ups with your healthcare provider, even when you feel healthy.',
    category: 'general',
  },
  {
    id: 'general-2',
    title: 'Socialize',
    content: 'Maintain social connections. Strong relationships are associated with better physical and mental health.',
    category: 'general',
    sources: ['Harvard Health']
  },
];

// Function to get random health tips by category
export const getRandomTipsByCategory = (category: HealthCategory, count: number = 1): HealthTip[] => {
  const categoryTips = healthTips.filter(tip => tip.category === category);
  const shuffled = [...categoryTips].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to get random health tips across all categories
export const getRandomTips = (count: number = 3): HealthTip[] => {
  const shuffled = [...healthTips].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to search for health tips based on keywords
export const searchHealthTips = (query: string): HealthTip[] => {
  const searchTerms = query.toLowerCase().split(' ');
  return healthTips.filter(tip => {
    const content = tip.title.toLowerCase() + ' ' + tip.content.toLowerCase();
    return searchTerms.some(term => content.includes(term));
  });
};
