
export interface TranscriptSegment {
  speaker: 'Salesperson' | 'Prospect';
  text: string;
  timestamp: string;
  sentiment: number; // 0-100
}

export interface CoachingInsight {
  type: 'strength' | 'opportunity';
  description: string;
}

export interface AnalysisResult {
  transcript: TranscriptSegment[];
  strengths: string[];
  opportunities: string[];
  summary: string;
  overallSentiment: number;
}

export interface AppState {
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  error: string | null;
}
