'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Clock, Loader2, Globe, FileText, Target, TrendingUp, Zap, BarChart3, Lightbulb } from 'lucide-react'

const analysisSteps = [
  {
    id: 'extract',
    title: 'Extracting content from website',
    description: 'Analyzing page structure and content',
    icon: Globe,
    duration: 3000,
  },
  {
    id: 'content',
    title: 'Analyzing content quality',
    description: 'Evaluating semantic richness and EEAT compliance',
    icon: FileText,
    duration: 4000,
  },
  {
    id: 'structure',
    title: 'Evaluating structured signals',
    description: 'Checking schema markup and heading hierarchy',
    icon: Target,
    duration: 3000,
  },
  {
    id: 'authority',
    title: 'Assessing authority signals',
    description: 'Analyzing credibility and trust indicators',
    icon: TrendingUp,
    duration: 3000,
  },
  {
    id: 'crawl',
    title: 'Checking crawlability',
    description: 'Evaluating AI bot accessibility',
    icon: Zap,
    duration: 2500,
  },
  {
    id: 'performance',
    title: 'Measuring performance',
    description: 'Analyzing page speed and Core Web Vitals',
    icon: BarChart3,
    duration: 3000,
  },
  {
    id: 'modular',
    title: 'Analyzing content modularity',
    description: 'Evaluating content structure for AI consumption',
    icon: Lightbulb,
    duration: 2500,
  },
]

export default function AnalysisProgress() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentStep < analysisSteps.length) {
        const step = analysisSteps[currentStep]
        setCompletedSteps(prev => {
          const newSet = new Set(prev)
          newSet.add(step.id)
          return newSet
        })
        setCurrentStep(prev => prev + 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [currentStep])

  const getStepStatus = (stepId: string) => {
    if (completedSteps.has(stepId)) {
      return 'completed'
    }
    if (currentStep === analysisSteps.findIndex(step => step.id === stepId)) {
      return 'current'
    }
    return 'pending'
  }

  const getStepIcon = (step: typeof analysisSteps[0], status: string) => {
    if (status === 'completed') {
      return <CheckCircle className="h-6 w-6 text-success-500" />
    }
    if (status === 'current') {
      return <Loader2 className="h-6 w-6 text-primary-500 animate-spin" />
    }
    return <Clock className="h-6 w-6 text-neutral-400" />
  }

  const getStepClasses = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-success-200 bg-success-50'
      case 'current':
        return 'border-primary-200 bg-primary-50'
      default:
        return 'border-neutral-200 bg-neutral-50'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Analysis in Progress...
          </h2>
          <p className="text-neutral-600">
            Our AI is analyzing your website across all optimization pillars
          </p>
        </div>

        <div className="space-y-4">
          {analysisSteps.map((step, index) => {
            const status = getStepStatus(step.id)
            const Icon = step.icon
            
            return (
              <div
                key={step.id}
                className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all duration-300 ${getStepClasses(status)}`}
              >
                <div className="flex-shrink-0">
                  {getStepIcon(step, status)}
                </div>
                
                <div className="flex-1 text-left">
                  <h3 className={`font-semibold ${
                    status === 'completed' ? 'text-success-800' :
                    status === 'current' ? 'text-primary-800' : 'text-neutral-600'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${
                    status === 'completed' ? 'text-success-700' :
                    status === 'current' ? 'text-primary-700' : 'text-neutral-500'
                  }`}>
                    {step.description}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {status === 'current' && (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center justify-center space-x-2 text-primary-700">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="font-medium">AI is processing your content...</span>
          </div>
          <p className="text-sm text-primary-600 mt-1">
            This comprehensive analysis typically takes 15-30 seconds
          </p>
        </div>
      </div>
    </div>
  )
}
