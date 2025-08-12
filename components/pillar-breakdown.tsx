'use client'

import { FileText, Target, TrendingUp, Zap, BarChart3, Lightbulb } from 'lucide-react'
import { PillarScores } from '@/types/analysis'

interface PillarBreakdownProps {
  pillarScores: PillarScores
}

const pillarConfig = {
  contentQuality: {
    name: 'Content Quality',
    description: 'Semantic richness, EEAT compliance, and content depth',
    icon: FileText,
    color: 'primary',
  },
  structuredSignals: {
    name: 'Structured Signals',
    description: 'Schema markup, heading hierarchy, and structured data',
    icon: Target,
    color: 'accent',
  },
  authoritySignals: {
    name: 'Authority Signals',
    description: 'Expertise indicators, citations, and trust signals',
    icon: TrendingUp,
    color: 'success',
  },
  crawlability: {
    name: 'Crawlability',
    description: 'AI bot accessibility and indexing optimization',
    icon: Zap,
    color: 'warning',
  },
  performance: {
    name: 'Performance',
    description: 'Page speed, Core Web Vitals, and user experience',
    icon: BarChart3,
    color: 'error',
  },
  modularContent: {
    name: 'Modular Content',
    description: 'Content structure for AI consumption and extraction',
    icon: Lightbulb,
    color: 'neutral',
  },
}

export default function PillarBreakdown({ pillarScores }: PillarBreakdownProps) {
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

  const getStatusColor = (score: number) => {
    if (score >= 80) return 'border-success-200 bg-success-50'
    if (score >= 60) return 'border-warning-200 bg-warning-50'
    return 'border-error-200 bg-error-50'
  }

  const getStatusText = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Needs Improvement'
  }

  const getStatusIconColor = (score: number) => {
    if (score >= 80) return 'text-success-600'
    if (score >= 60) return 'text-warning-600'
    return 'text-error-600'
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">
          Score Breakdown
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Detailed analysis of each optimization pillar with specific insights and recommendations
        </p>
      </div>

      {/* Pillar Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(pillarScores).map(([key, pillar]) => {
          const config = pillarConfig[key as keyof typeof pillarConfig]
          const Icon = config.icon
          
          return (
            <div
              key={key}
              className={`card border-2 transition-all duration-200 hover:shadow-lg ${getStatusColor(pillar.score)}`}
            >
              {/* Pillar Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg bg-${config.color}-100`}>
                  <Icon className={`h-5 w-5 text-${config.color}-600`} />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{config.name}</h3>
                  <p className="text-xs text-neutral-500">{config.description}</p>
                </div>
              </div>

              {/* Score Display */}
              <div className="text-center mb-4">
                <div className={`text-3xl font-bold mb-1 ${getScoreColor(pillar.score)}`}>
                  {pillar.score}/100
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(pillar.grade)}`}>
                  Grade {pillar.grade}
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-600">Status:</span>
                <span className={`text-sm font-medium ${getStatusIconColor(pillar.score)}`}>
                  {getStatusText(pillar.score)}
                </span>
              </div>

              {/* Breakdown */}
              <div className="bg-neutral-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-neutral-700 mb-2">Analysis:</h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {pillar.breakdown}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-neutral-500 mb-1">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      pillar.score >= 80 ? 'bg-success-500' :
                      pillar.score >= 60 ? 'bg-warning-500' : 'bg-error-500'
                    }`}
                    style={{ width: `${pillar.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Performance Summary</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600 mb-1">
              {Object.values(pillarScores).filter(p => p.score >= 80).length}
            </div>
            <div className="text-sm text-neutral-600">Excellent Pillars</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning-600 mb-1">
              {Object.values(pillarScores).filter(p => p.score >= 60 && p.score < 80).length}
            </div>
            <div className="text-sm text-neutral-600">Good Pillars</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error-600 mb-1">
              {Object.values(pillarScores).filter(p => p.score < 60).length}
            </div>
            <div className="text-sm text-neutral-600">Needs Improvement</div>
          </div>
        </div>
      </div>
    </div>
  )
}
