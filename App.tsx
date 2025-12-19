
import React, { useState, useCallback } from 'react';
// Added missing Sparkles import
import { Upload, PhoneCall, LayoutDashboard, History, Loader2, PlayCircle, BarChart3, AlertCircle, Sparkles } from 'lucide-react';
import { analyzeSalesCall } from './services/gemini';
import { AppState, AnalysisResult } from './types';
import SentimentChart from './components/SentimentChart';
import CoachingCard from './components/CoachingCard';
import TranscriptView from './components/TranscriptView';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isAnalyzing: false,
    result: null,
    error: null
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setState(prev => ({ ...prev, isAnalyzing: true, error: null }));

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const result = await analyzeSalesCall(base64, file.type);
        setState({ isAnalyzing: false, result, error: null });
      };
      reader.onerror = () => {
        setState({ isAnalyzing: false, result: null, error: "Failed to read file." });
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setState({ 
        isAnalyzing: false, 
        result: null, 
        error: err.message || "An error occurred during analysis." 
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="w-full md:w-64 bg-indigo-900 text-white p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">SalesPulse</span>
        </div>

        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-white transition-colors hover:bg-white/20">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-indigo-300 rounded-xl transition-colors hover:bg-white/5">
            <History size={20} />
            <span className="font-medium">Call Logs</span>
          </button>
        </nav>

        <div className="mt-auto bg-indigo-800/50 p-4 rounded-2xl">
          <p className="text-xs text-indigo-300 mb-2 font-medium uppercase">Active Campaign</p>
          <p className="text-sm font-bold">Enterprise SaaS Q4</p>
          <div className="w-full bg-indigo-700 h-1.5 rounded-full mt-3">
            <div className="bg-indigo-400 w-3/4 h-full rounded-full" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Coaching Intelligence</h1>
            <p className="text-slate-500">Upload sales recordings to extract deal insights and improve performance.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-indigo-100 active:scale-95">
              <Upload size={18} />
              Analyze New Call
              <input 
                type="file" 
                className="hidden" 
                accept="audio/*" 
                onChange={handleFileUpload}
                disabled={state.isAnalyzing}
              />
            </label>
          </div>
        </header>

        {state.isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="relative mb-6">
              <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PhoneCall size={20} className="text-indigo-400" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Analyzing Sales Dialogue...</h2>
            <p className="text-slate-500 max-w-xs text-center">
              Gemini is transcribing, diarizing speakers, and generating coaching insights. This takes about 30-45 seconds.
            </p>
          </div>
        )}

        {state.error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4 text-rose-700 mb-8">
            <AlertCircle size={24} />
            <div>
              <p className="font-bold">Analysis Failed</p>
              <p className="text-sm">{state.error}</p>
            </div>
          </div>
        )}

        {!state.isAnalyzing && !state.result && !state.error && (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-200 rounded-3xl">
            <div className="bg-slate-100 p-6 rounded-full mb-6 text-slate-400">
              <Upload size={48} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Start Your Coaching Session</h2>
            <p className="text-slate-500 mb-8">Upload an MP3, WAV, or M4A file of your sales call.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl px-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <PlayCircle size={24} />
                </div>
                <h3 className="font-bold mb-1">Diarized Transcript</h3>
                <p className="text-xs text-slate-500">Automatically separate voices between salesperson and prospect.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 size={24} />
                </div>
                <h3 className="font-bold mb-1">Engagement Metrics</h3>
                <p className="text-xs text-slate-500">Visualize call flow and prospect sentiment over time.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-bold mb-1">AI Coaching</h3>
                <p className="text-xs text-slate-500">Get 3 actionable strengths and 3 missed opportunities.</p>
              </div>
            </div>
          </div>
        )}

        {state.result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Call Health</p>
                  <p className="text-3xl font-bold text-indigo-600">{state.result.overallSentiment}%</p>
                </div>
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                  <BarChart3 size={24} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                  <p className="text-3xl font-bold text-slate-800">{state.result.transcript[state.result.transcript.length - 1]?.timestamp || '0:00'}</p>
                </div>
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600">
                  <PhoneCall size={24} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Speakers</p>
                  <p className="text-3xl font-bold text-slate-800">2 Identified</p>
                </div>
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600">
                  <LayoutDashboard size={24} />
                </div>
              </div>
            </div>

            {/* Middle Section: Graph and Coaching Card */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
              <div className="lg:col-span-3">
                <SentimentChart data={state.result.transcript} />
              </div>
              <div className="lg:col-span-2">
                <CoachingCard 
                  strengths={state.result.strengths} 
                  opportunities={state.result.opportunities} 
                  summary={state.result.summary}
                />
              </div>
            </div>

            {/* Bottom Section: Transcript */}
            <div className="mb-12">
              <TranscriptView transcript={state.result.transcript} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
