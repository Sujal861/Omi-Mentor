
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';

interface StressData {
  time: string;
  value: number;
}

interface StressChartProps {
  data: StressData[];
  title: string;
  description: string;
}

const StressChart = ({ data, title, description }: StressChartProps) => {
  return (
    <motion.div 
      className="glass-card rounded-2xl p-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5E5CE6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#5E5CE6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12, fill: '#888' }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12, fill: '#888' }}
              domain={[0, 100]}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-3 bg-white shadow-md rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500">{`Time: ${label}`}</p>
                      <p className="text-sm font-medium text-balance-indigo">
                        {`Stress: ${payload[0].value}%`}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#5E5CE6" 
              strokeWidth={2}
              fill="url(#stressGradient)" 
              animationDuration={1500}
              dot={{ r: 0 }}
              activeDot={{ r: 4, fill: "#5E5CE6", stroke: "white", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default StressChart;
