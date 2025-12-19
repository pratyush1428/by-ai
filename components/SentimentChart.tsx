
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TranscriptSegment } from '../types';

interface Props {
  data: TranscriptSegment[];
}

const SentimentChart: React.FC<Props> = ({ data }) => {
  const chartData = data.map((seg, idx) => ({
    time: seg.timestamp,
    sentiment: seg.sentiment,
    speaker: seg.speaker,
    displayTime: `Seg ${idx + 1}`
  }));

  return (
    <div className="h-[300px] w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Engagement & Sentiment Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#94a3b8' }}
          />
          <YAxis 
            domain={[0, 100]} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#94a3b8' }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelClassName="font-bold text-gray-700"
          />
          <Area 
            type="monotone" 
            dataKey="sentiment" 
            stroke="#4f46e5" 
            fillOpacity={1} 
            fill="url(#colorSentiment)" 
            name="Engagement Level"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentChart;
