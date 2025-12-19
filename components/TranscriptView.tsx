
import React from 'react';
import { User, Headphones, Download } from 'lucide-react';
import { TranscriptSegment } from '../types';

interface Props {
  transcript: TranscriptSegment[];
}

const TranscriptView: React.FC<Props> = ({ transcript }) => {
  const handleDownload = () => {
    const textContent = transcript
      .map((seg) => `[${seg.timestamp}] ${seg.speaker}: ${seg.text}`)
      .join('\n\n');
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transcript_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Call Transcript</h3>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Download size={14} />
          Export TXT
        </button>
      </div>
      <div className="max-h-[500px] overflow-y-auto p-6 space-y-6">
        {transcript.map((seg, idx) => (
          <div key={idx} className={`flex gap-4 ${seg.speaker === 'Prospect' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              seg.speaker === 'Salesperson' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
            }`}>
              {seg.speaker === 'Salesperson' ? <Headphones size={20} /> : <User size={20} />}
            </div>
            <div className={`flex-1 ${seg.speaker === 'Prospect' ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center gap-2 mb-1 ${seg.speaker === 'Prospect' ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className={`text-xs font-bold uppercase tracking-tighter ${
                  seg.speaker === 'Salesperson' ? 'text-indigo-500' : 'text-gray-500'
                }`}>
                  {seg.speaker}
                </span>
                <span className="text-[10px] text-gray-400">{seg.timestamp}</span>
                <div className="flex-1" />
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  seg.sentiment > 70 ? 'bg-emerald-50 text-emerald-600' : 
                  seg.sentiment < 40 ? 'bg-rose-50 text-rose-600' : 
                  'bg-gray-50 text-gray-600'
                }`}>
                  {seg.sentiment}% Engagement
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${
                seg.speaker === 'Salesperson' ? 'text-gray-800' : 'text-gray-700'
              }`}>
                {seg.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranscriptView;
