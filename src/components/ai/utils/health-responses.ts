
// Enhanced responses database for better conversational ability
export const healthResponses: Record<string, string> = {
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

export const healthSuggestions = [
  {
    title: 'Track Your Sleep',
    content: 'Consistent sleep patterns improve overall health. Try to get 7-9 hours each night.',
    category: 'sleep' as const,
  },
  {
    title: 'Stay Hydrated',
    content: 'Drink at least 8 glasses of water daily to maintain optimal body functions.',
    category: 'nutrition' as const,
  },
  {
    title: 'Take Movement Breaks',
    content: 'Stand up and stretch for 5 minutes every hour to improve circulation and focus.',
    category: 'activity' as const,
  },
  {
    title: 'Practice Mindfulness',
    content: 'Try a 5-minute daily meditation to reduce stress and improve mental clarity.',
    category: 'mental' as const,
  },
];

export const generateResponse = (userInput: string): string => {
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
