
import React from 'react';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface Props {
  strengths: string[];
  opportunities: string[];
  summary: string;
}

const CoachingCard: React.FC<Props> = ({ strengths, opportunities, summary }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold text-gray-800">AI Coaching Card</h2>
        </div>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed italic border-l-4 border-indigo-100 pl-4">
          "{summary}"
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strengths */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Key Strengths</h3>
            </div>
            <ul className="space-y-3">
              {strengths.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-bold">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Missed Opportunities</h3>
            </div>
            <ul className="space-y-3">
              {opportunities.map((o, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-[10px] font-bold">
                    {i + 1}
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachingCard;
