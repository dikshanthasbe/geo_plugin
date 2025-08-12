'use client'

import { Trophy, TrendingUp, Target, Zap } from 'lucide-react'
import { AnalysisResult } from '@/types/analysis'

interface GeoScoreOverviewProps {
  result: AnalysisResult
}

export default function GeoScoreOverview({ result }: GeoScoreOverviewProps) {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-success-600 bg-success-100 border-success-200'
      case 'B': return 'text-success-500 bg-success-50 border-success-200'
      case 'C': return 'text-warning-500 bg-warning-50 border-warning-200'
      case 'D': return 'text-warning-600 bg-warning-50 border-warning-200'
      case 'F': return 'text-error-600 bg-error-50 border-error-200'
      default: return 'text-neutral-600 bg-neutral-50 border-neutral-200'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-600'
    if (score >= 60) return 'text-warning-600'
    return 'text-error-600'
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-success-100'
    if (score >= 60) return 'bg-warning-100'
    return 'bg-error-100'
  }

  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return 'Excellent! Your website is highly optimized for AI discovery.'
    if (score >= 80) return 'Great job! Your website is well-optimized for AI search engines.'
    if (score >= 70) return 'Good! Your website has solid AI optimization with room for improvement.'
    if (score >= 60) return 'Fair! Your website needs some optimization for better AI discoverability.'
    if (score >= 50) return 'Needs work! Your website requires significant optimization for AI search.'
    return 'Poor! Your website needs major optimization to be discovered by AI engines.'
  }

  const getTopStrengths = () => {
    const pillars = Object.entries(result.pillarScores)
    return pillars
      .sort(([, a], [, b]) => b.score - a.score)
      .slice(0, 2)
      .map(([key, pillar]) => ({
        name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        score: pillar.score,
        grade: pillar.grade
      }))
  }

  const getTopImprovements = () => {
    const pillars = Object.entries(result.pillarScores)
    return pillars
      .sort(([, a], [, b]) => a.score - b.score)
      .slice(0, 2)
      .map(([key, pillar]) => ({
        name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        score: pillar.score,
        grade: pillar.grade
      }))
  }

  return (
    <div className="space-y-6">
      {/* Main Score Display */}
      <div className="card text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-4">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">
            Analysis Complete!
          </h2>
          <p className="text-neutral-600">
            Your website has been analyzed across all 6 optimization pillars
          </p>
        </div>

        {/* Overall Score */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl border border-primary-200">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-1">
                {result.overallScore}/100
              </div>
              <div className="text-sm text-primary-600">Overall Score</div>
            </div>
            <div className="w-px h-16 bg-primary-200"></div>
            <div className="text-center">
              <div className={`text-6xl font-bold ${getGradeColor(result.overallGrade)} px-4 py-2 rounded-xl border-2`}>
                {result.overallGrade}
              </div>
              <div className="text-sm text-primary-600 mt-1">Grade</div>
            </div>
          </div>
        </div>

        {/* Performance Message */}
        <div className="mb-6">
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            {getPerformanceMessage(result.overallScore)}
          </p>
        </div>

        {/* Analysis Stats */}
        <div className="grid md:grid-cols-3 gap-4 text-sm text-neutral-600">
          <div className="flex items-center justify-center space-x-2">
            <Target className="h-4 w-4" />
            <span>6 Pillars Analyzed</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>{result.analysisTime}s Analysis Time</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>{result.recommendations.length} Recommendations</span>
          </div>
        </div>
      </div>

      {/* Strengths and Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Strengths */}
        <div className="card">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-2">
            <div className="p-2 bg-success-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-success-600" />
            </div>
            <span>Top Strengths</span>
          </h3>
          <div className="space-y-3">
            {getTopStrengths().map((pillar, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-success-50 rounded-lg border border-success-200">
                <span className="font-medium text-success-800">{pillar.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-success-700 font-semibold">{pillar.score}/100</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(pillar.grade)}`}>
                    {pillar.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Improvements */}
        <div className="card">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-2">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Target className="h-5 w-5 text-warning-600" />
            </div>
            <span>Top Improvements</span>
          </h3>
          <div className="space-y-3">
            {getTopImprovements().map((pillar, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-warning-50 rounded-lg border border-warning-200">
                <span className="font-medium text-warning-800">{pillar.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-warning-700 font-semibold">{pillar.score}/100</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(pillar.grade)}`}>
                    {pillar.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
