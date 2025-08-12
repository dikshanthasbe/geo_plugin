'use client'

import { useState } from 'react'
import { Search, Globe, AlertCircle } from 'lucide-react'

interface UrlInputProps {
  onAnalyze: (url: string) => void
}

export default function UrlInput({ onAnalyze }: UrlInputProps) {
  const [url, setUrl] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const validateUrl = (input: string) => {
    try {
      const urlObj = new URL(input)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!url.trim()) {
      setIsValid(false)
      return
    }

    if (!validateUrl(url)) {
      setIsValid(false)
      return
    }

    setIsValid(true)
    setIsLoading(true)
    
    try {
      await onAnalyze(url)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUrl(value)
    
    if (value.trim()) {
      setIsValid(true)
    }
  }

  const handleExampleClick = (exampleUrl: string) => {
    setUrl(exampleUrl)
    setIsValid(true)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="Paste your website URL here..."
            className={`input-field pl-10 pr-4 ${
              !isValid ? 'border-error-300 focus:ring-error-500 focus:border-error-300' : ''
            }`}
            disabled={isLoading}
          />
          {!isValid && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <AlertCircle className="h-5 w-5 text-error-400" />
            </div>
          )}
        </div>

        {!isValid && (
          <div className="text-error-600 text-sm flex items-center space-x-2">
            <AlertCircle className="h-4 w-4" />
            <span>Please enter a valid URL (e.g., https://example.com)</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!url.trim() || !isValid || isLoading}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              <span>Analyze Website</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-neutral-600 mb-3">Popular website types to analyze:</p>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          {[
            'https://example.com',
            'https://httpbin.org',
            'https://jsonplaceholder.typicode.com',
            'https://httpstat.us'
          ].map((exampleUrl) => (
            <button
              key={exampleUrl}
              onClick={() => handleExampleClick(exampleUrl)}
              className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-700 text-sm transition-colors hover:shadow-sm"
            >
              {exampleUrl.replace('https://', '')}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
