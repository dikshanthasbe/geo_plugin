export interface PillarScore {
  score: number;
  breakdown: string;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  status: 'excellent' | 'good' | 'poor';
}

export interface PillarScores {
  contentQuality: PillarScore;
  structuredSignals: PillarScore;
  authoritySignals: PillarScore;
  crawlability: PillarScore;
  performance: PillarScore;
  modularContent: PillarScore;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  pillar: keyof PillarScores;
  priority: 'high' | 'medium' | 'low';
  impact: number; // 1-10 scale
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  implementation: string[];
  codeSnippets?: string[];
}

export interface DetectedEntity {
  name: string;
  type: 'person' | 'organization' | 'place' | 'product' | 'concept';
  confidence: number;
  context: string;
}

export interface ContentGap {
  element: string;
  description: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AnalysisResult {
  url: string;
  timestamp: string;
  overallScore: number;
  overallGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  pillarScores: PillarScores;
  recommendations: Recommendation[];
  detectedEntities: DetectedEntity[];
  contentGaps: ContentGap[];
  analysisTime: number; // in seconds
  contentExtracted: {
    title: string;
    metaDescription: string;
    metaKeywords: string;
    headings: string[];
    schemaMarkup: string[];
    performanceMetrics: {
      loadTime: number;
      coreWebVitals: any;
    };
  };
}

export interface AnalysisRequest {
  url: string;
  includePerformance?: boolean;
  includeSchema?: boolean;
}

export interface AnalysisProgress {
  step: string;
  progress: number;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  message: string;
}
