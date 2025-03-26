
export const stressData = [
  { time: '8 AM', value: 20 },
  { time: '9 AM', value: 35 },
  { time: '10 AM', value: 40 },
  { time: '11 AM', value: 45 },
  { time: '12 PM', value: 50 },
  { time: '1 PM', value: 35 },
  { time: '2 PM', value: 40 },
  { time: '3 PM', value: 60 },
  { time: '4 PM', value: 70 },
  { time: '5 PM', value: 55 },
  { time: '6 PM', value: 30 },
];

export const activityData = [
  {
    type: 'focus' as const,
    value: 5.2,
    unit: 'hrs',
    description: 'Total focus time today',
  },
  {
    type: 'heart' as const,
    value: 72,
    unit: 'bpm',
    description: 'Average heart rate',
  },
  {
    type: 'sleep' as const,
    value: 7.5,
    unit: 'hrs',
    description: 'Sleep duration last night',
  },
  {
    type: 'energy' as const,
    value: 85,
    unit: '%',
    description: 'Current energy level',
  },
];

export const insightData = [
  {
    title: 'Productivity peak detected',
    description: 'Your focus is highest between 9-11 AM. Schedule important tasks during this time.',
    type: 'productivity' as const,
  },
  {
    title: 'Stress levels rising',
    description: 'Your stress readings are 20% higher this week. Try taking more breaks.',
    type: 'ai' as const,
  },
  {
    title: 'Sleep quality improved',
    description: 'Your recent sleep pattern shows better quality. Keep maintaining your schedule.',
    type: 'wellness' as const,
  },
];

export const userData = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: null,
};
