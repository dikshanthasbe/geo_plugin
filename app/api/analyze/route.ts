import { NextRequest, NextResponse } from 'next/server'
import { extractContent } from '@/lib/content-extractor'
import { analyzeWebsite } from '@/lib/ai-analyzer'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Extract content from the website
    const extractedContent = await extractContent(url)

    // Analyze the content using AI
    const analysisResult = await analyzeWebsite(url, extractedContent)

    return NextResponse.json(analysisResult)
  } catch (error) {
    console.error('Analysis error:', error)
    
    if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes('Failed to extract content')) {
        return NextResponse.json(
          { error: 'Unable to access the website. Please check the URL and try again.' },
          { status: 400 }
        )
      }
      
      if (error.message.includes('AI analysis failed')) {
        return NextResponse.json(
          { error: 'AI analysis failed. Please try again later.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred during analysis' },
      { status: 500 }
    )
  }
}

// Add rate limiting headers
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
