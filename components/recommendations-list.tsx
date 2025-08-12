'use client'

import { useState } from 'react'
import { AlertTriangle, CheckCircle, Clock, Target, TrendingUp, Zap, BarChart3, Lightbulb, FileText } from 'lucide-react'
import { Recommendation } from '@/types/analysis'

interface RecommendationsListProps {
  recommendations: Recommendation[]
}

const priorityConfig = {
  high: {
    color: 'error',
    icon: AlertTriangle,
    label: 'HIGH PRIORITY',
    description: 'Immediate Impact',
  },
  medium: {
    color: 'warning',
    icon: Target,
    label: 'MEDIUM PRIORITY',
    description: 'High Impact',
  },
  low: {
    color: 'success',
    icon: CheckCircle,
    label: 'LOW PRIORITY',
    description: 'Good to Have',
  },
}

const pillarIcons = {
  contentQuality: FileText,
  structuredSignals: Target,
  authoritySignals: TrendingUp,
  crawlability: Zap,
  performance: BarChart3,
  modularContent: Lightbulb,
}

export default function RecommendationsList({ recommendations }: RecommendationsListProps) {
  const [expandedRecommendations, setExpandedRecommendations] = useState<Set<string>>(new Set())

  const toggleRecommendation = (id: string) => {
    setExpandedRecommendations(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const getPriorityColor = (priority: string) => {
    const config = priorityConfig[priority as keyof typeof priorityConfig]
    return config.color
  }

  const getPriorityIcon = (priority: string) => {
    const config = priorityConfig[priority as keyof typeof priorityConfig]
    const Icon = config.icon
    return <Icon className="h-5 w-5" />
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success-600 bg-success-100 border-success-200'
      case 'medium': return 'text-warning-600 bg-warning-100 border-warning-200'
      case 'hard': return 'text-error-600 bg-error-100 border-error-200'
      default: return 'text-neutral-600 bg-neutral-100 border-neutral-200'
    }
  }

  const getImpactColor = (impact: number) => {
    if (impact >= 8) return 'text-success-600'
    if (impact >= 5) return 'text-warning-600'
    return 'text-error-600'
  }

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder]
  })

  const groupedRecommendations = sortedRecommendations.reduce((acc, rec) => {
    if (!acc[rec.priority]) {
      acc[rec.priority] = []
    }
    acc[rec.priority].push(rec)
    return acc
  }, {} as Record<string, Recommendation[]>)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">
          🎯 Priority Recommendations
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Actionable optimization suggestions ranked by priority and impact
        </p>
      </div>

      {/* Priority Groups */}
      {Object.entries(groupedRecommendations).map(([priority, recs]) => {
        const config = priorityConfig[priority as keyof typeof priorityConfig]
        const Icon = config.icon
        
        return (
          <div key={priority} className="space-y-4">
            {/* Priority Header */}
            <div className={`flex items-center space-x-3 p-4 bg-${config.color}-50 border border-${config.color}-200 rounded-lg`}>
              <div className={`p-2 bg-${config.color}-100 rounded-lg`}>
                <Icon className={`h-6 w-6 text-${config.color}-600`} />
              </div>
              <div>
                <h3 className={`text-lg font-bold text-${config.color}-800`}>
                  {config.label}
                </h3>
                <p className={`text-sm text-${config.color}-700`}>
                  {config.description}
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              {recs.map((recommendation) => {
                const PillarIcon = pillarIcons[recommendation.pillar as keyof typeof pillarIcons]
                const isExpanded = expandedRecommendations.has(recommendation.id)
                
                return (
                  <div key={recommendation.id} className="card hover:shadow-md transition-shadow">
                    {/* Recommendation Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="p-2 bg-primary-100 rounded-lg">
                            <PillarIcon className="h-5 w-5 text-primary-600" />
                          </div>
                          <h4 className="text-lg font-semibold text-neutral-900">
                            {recommendation.title}
                          </h4>
                        </div>
                        <p className="text-neutral-600 mb-3">
                          {recommendation.description}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => toggleRecommendation(recommendation.id)}
                        className="flex-shrink-0 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                      >
                        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                          ▼
                        </div>
                      </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-neutral-50 rounded-lg">
                        <div className={`text-lg font-bold ${getImpactColor(recommendation.impact)}`}>
                          {recommendation.impact}/10
                        </div>
                        <div className="text-xs text-neutral-600">Impact</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-50 rounded-lg">
                        <div className={`inline-block px-2 py-1 rounded text-sm font-medium ${getDifficultyColor(recommendation.difficulty)}`}>
                          {recommendation.difficulty}
                        </div>
                        <div className="text-xs text-neutral-600 mt-1">Difficulty</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-50 rounded-lg">
                        <div className="text-lg font-bold text-neutral-700">
                          {recommendation.estimatedTime}
                        </div>
                        <div className="text-xs text-neutral-600">Time</div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="space-y-4 pt-4 border-t border-neutral-200">
                        {/* Implementation Steps */}
                        <div>
                          <h5 className="font-semibold text-neutral-900 mb-2 flex items-center space-x-2">
                            <Target className="h-4 w-4 text-primary-600" />
                            <span>Implementation Steps</span>
                          </h5>
                          <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-700">
                            {recommendation.implementation.map((step, index) => (
                              <li key={index} className="pl-2">{step}</li>
                            ))}
                          </ol>
                        </div>

                        {/* Code Snippets */}
                        {recommendation.codeSnippets && recommendation.codeSnippets.length > 0 && (
                          <div>
                            <h5 className="font-semibold text-neutral-900 mb-2 flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-primary-600" />
                              <span>Code Examples</span>
                            </h5>
                            <div className="space-y-2">
                              {recommendation.codeSnippets.map((snippet, index) => (
                                <pre key={index} className="bg-neutral-900 text-neutral-100 p-3 rounded-lg text-xs overflow-x-auto">
                                  <code>{snippet}</code>
                                </pre>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Expected Results */}
                        <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
                          <h5 className="font-semibold text-success-800 mb-2 flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-success-600" />
                            <span>Expected Results</span>
                          </h5>
                          <p className="text-sm text-success-700">
                            Implementing this recommendation is expected to improve your GEO score by{' '}
                            <span className="font-semibold">
                              {recommendation.impact * 2}-{recommendation.impact * 3} points
                            </span>
                            , particularly in the {recommendation.pillar.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} pillar.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Action Summary */}
      <div className="card bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200">
        <div className="text-center">
          <h3 className="text-xl font-bold text-primary-800 mb-2">
            Ready to Optimize?
          </h3>
          <p className="text-primary-700 mb-4">
            Focus on HIGH priority items first for maximum impact on your AI discoverability
          </p>
        </div>
      </div>
    </div>
  )
}
