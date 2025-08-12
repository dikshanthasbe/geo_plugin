'use client'

import { useState } from 'react'
import { Search, Globe, TrendingUp, Target, Shield, Zap, Lightbulb, BarChart3 } from 'lucide-react'
import UrlInput from '@/components/url-input'
import AnalysisProgress from '@/components/analysis-progress'
import GeoScoreOverview from '@/components/geo-score-overview'
import PillarBreakdown from '@/components/pillar-breakdown'
import RecommendationsList from '@/components/recommendations-list'
import { AnalysisResult } from '@/types/analysis'

export default function Dashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalysis = async (url: string) => {
    setIsAnalyzing(true)
    setError(null)
    setAnalysisResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.')
      }

      const result = await response.json()
      setAnalysisResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-success-600'
      case 'B': return 'text-success-500'
      case 'C': return 'text-warning-500'
      case 'D': return 'text-warning-600'
      case 'F': return 'text-error-600'
      default: return 'text-neutral-600'
    }
  }

  // PDF Export function - using browser's native print-to-PDF for perfect quality
  const exportToPDF = () => {
    if (!analysisResult) return
    
    // Open browser's print dialog (which creates perfect quality PDFs)
    window.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient">
                  GEO URL Analyzer
                </h1>
                <p className="text-neutral-600">
                  Optimize for AI search engines
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-sm text-neutral-600">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>AI-First SEO</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>6-Pillar Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Real-time Results</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isAnalyzing && !analysisResult && (
          <div className="text-center space-y-8">
            {/* Hero Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
                  Optimize Your Website for{' '}
                  <span className="text-gradient">AI Search Engines</span>
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Get discovered by ChatGPT, Gemini, Claude & more! Our AI-powered analysis covers all critical optimization pillars for maximum AI discoverability.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="card text-center">
                  <div className="p-3 bg-primary-100 rounded-lg w-fit mx-auto mb-4">
                    <Lightbulb className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">6-Pillar Analysis</h3>
                  <p className="text-neutral-600 text-sm">
                    Comprehensive evaluation across content quality, structure, authority, and more
                  </p>
                </div>
                <div className="card text-center">
                  <div className="p-3 bg-success-100 rounded-lg w-fit mx-auto mb-4">
                    <Target className="h-6 w-6 text-success-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">AI-Powered Insights</h3>
                  <p className="text-neutral-600 text-sm">
                    GPT-4 powered analysis with actionable recommendations
                  </p>
                </div>
                <div className="card text-center">
                  <div className="p-3 bg-accent-100 rounded-lg w-fit mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-accent-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Instant Results</h3>
                  <p className="text-neutral-600 text-sm">
                    Get comprehensive analysis in under 30 seconds
                  </p>
                </div>
              </div>
            </div>

            {/* URL Input */}
            <div className="max-w-2xl mx-auto">
              <UrlInput onAnalyze={handleAnalysis} />
            </div>

            {/* Examples */}
            <div className="text-center">
              <p className="text-neutral-600 mb-2">Try analyzing these example websites:</p>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                {['https://example.com', 'https://httpbin.org', 'https://jsonplaceholder.typicode.com'].map((url) => (
                  <button
                    key={url}
                    onClick={() => handleAnalysis(url)}
                    className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-md text-neutral-700 transition-colors"
                  >
                    {url}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analysis Progress */}
        {isAnalyzing && (
          <AnalysisProgress />
        )}

        {/* Error Display */}
        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="card border-error-200 bg-error-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-error-100 rounded-lg">
                  <Search className="h-5 w-5 text-error-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-error-800">Analysis Failed</h3>
                  <p className="text-error-700">{error}</p>
                </div>
              </div>
              <button
                onClick={() => setError(null)}
                className="btn-primary mt-4"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-8 animate-fade-in">
            {/* Overall Score */}
            <GeoScoreOverview result={analysisResult} />

            {/* Pillar Breakdown */}
            <PillarBreakdown pillarScores={analysisResult.pillarScores} />

            {/* Recommendations */}
            <RecommendationsList recommendations={analysisResult.recommendations} />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setAnalysisResult(null)
                  setError(null)
                }}
                className="btn-secondary"
              >
                Analyze Another Website
              </button>
              <button
                onClick={exportToPDF}
                className="btn-primary"
              >
                Export Results
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-neutral-600">
            <p className="text-sm">
              Optimize your content for the AI-first future of search
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
