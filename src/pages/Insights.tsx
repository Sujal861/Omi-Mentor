
import React from 'react';
import { motion } from 'framer-motion';
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageTransition from '../components/layout/PageTransition';
import { BrainCircuit, ChevronRight, LightbulbIcon } from 'lucide-react';
import { stressData } from '../utils/mockData';
import { Button } from '../components/common/Button';

const focusData = [
  { name: 'Deep Focus', value: 40 },
  { name: 'Medium Focus', value: 30 },
  { name: 'Light Focus', value: 20 },
  { name: 'Distracted', value: 10 },
];

const productivityByHour = [
  { hour: '8 AM', score: 65 },
  { hour: '9 AM', score: 75 },
  { hour: '10 AM', score: 90 },
  { hour: '11 AM', score: 85 },
  { hour: '12 PM', score: 60 },
  { hour: '1 PM', score: 50 },
  { hour: '2 PM', score: 70 },
  { hour: '3 PM', score: 80 },
  { hour: '4 PM', score: 75 },
  { hour: '5 PM', score: 65 },
];

const weeklyMoodData = [
  { day: 'Mon', value: 75 },
  { day: 'Tue', value: 80 },
  { day: 'Wed', value: 65 },
  { day: 'Thu', value: 70 },
  { day: 'Fri', value: 85 },
  { day: 'Sat', value: 90 },
  { day: 'Sun', value: 85 },
];

const COLORS = ['#5E5CE6', '#0A84FF', '#30D158', '#FFD60A'];

const Insights = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold">
              AI Insights
            </h1>
            <p className="text-gray-500 mt-2">
              Personalized recommendations based on your data
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div 
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <BrainCircuit className="text-balance-purple" size={20} />
              <h3 className="text-xl font-semibold">Productivity Analysis</h3>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={productivityByHour}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5E5CE6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#0A84FF" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="hour" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#888' }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#888' }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="p-3 bg-white shadow-md rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500">{`Time: ${label}`}</p>
                            <p className="text-sm font-medium text-balance-indigo">
                              {`Productivity: ${payload[0].value}/100`}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="score" 
                    radius={[4, 4, 0, 0]}
                    fill="url(#productivityGradient)" 
                    barSize={20}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 p-4 bg-balance-blue/5 rounded-lg">
              <div className="flex items-start space-x-3">
                <LightbulbIcon className="text-balance-yellow mt-1 flex-shrink-0" size={18} />
                <div>
                  <h4 className="font-medium text-sm">Productivity Insight</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Your peak productive hours are between 10 AM and 11 AM. Consider scheduling your most important tasks during this time for optimal focus and efficiency.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <LightbulbIcon className="text-balance-yellow" size={20} />
              <h3 className="text-xl font-semibold">Focus Distribution</h3>
            </div>
            
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="80%" height="80%">
                <PieChart>
                  <Pie
                    data={focusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    animationDuration={1500}
                    animationBegin={200}
                  >
                    {focusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="p-3 bg-white shadow-md rounded-lg border border-gray-100">
                            <p className="text-sm font-medium" style={{ color: payload[0].color }}>
                              {payload[0].name}: {payload[0].value}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-2">
              {focusData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-balance-indigo/5 rounded-lg">
              <div className="flex items-start space-x-3">
                <BrainCircuit className="text-balance-indigo mt-1 flex-shrink-0" size={18} />
                <div>
                  <h4 className="font-medium text-sm">Focus Insight</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    You spend 40% of your time in deep focus. Try the Pomodoro technique (25 min focus + 5 min break) to increase your deep focus periods.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Weekly Mood Trends</h3>
              <Button variant="ghost" size="sm" className="text-gray-500">
                View details <ChevronRight size={16} />
              </Button>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={weeklyMoodData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5E5CE6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#5E5CE6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: 'Mood', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#888', fontSize: 12, paddingLeft: 20 } }}
                  />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#5E5CE6" 
                    fillOpacity={1}
                    fill="url(#moodGradient)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 p-4 bg-balance-green/5 rounded-lg">
              <div className="flex items-start space-x-3">
                <LightbulbIcon className="text-balance-green mt-1 flex-shrink-0" size={18} />
                <div>
                  <h4 className="font-medium text-sm">Mood Insight</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Your mood tends to peak on weekends and dip mid-week. Consider incorporating more enjoyable activities during Wednesday to boost your mid-week mood.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <BrainCircuit className="text-balance-red" size={20} />
              <h3 className="text-xl font-semibold">Stress Analysis</h3>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={stressData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="stressGradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF453A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF453A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#FF453A" 
                    fillOpacity={1}
                    fill="url(#stressGradient2)" 
                    animationDuration={1500}
                    dot={{ r: 0 }}
                    activeDot={{ r: 4, fill: "#FF453A", stroke: "white", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 p-4 bg-balance-red/5 rounded-lg">
              <div className="flex items-start space-x-3">
                <LightbulbIcon className="text-balance-red mt-1 flex-shrink-0" size={18} />
                <div>
                  <h4 className="font-medium text-sm">Stress Insight</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Your stress levels peak around 4 PM. Consider scheduling a short 10-minute mindfulness session or a brief walk around this time to reduce stress.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Insights;
