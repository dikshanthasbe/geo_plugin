import OpenAI from 'openai'
import { ExtractedContent } from './content-extractor'
import { AnalysisResult, PillarScores, Recommendation, DetectedEntity, ContentGap } from '@/types/analysis'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function analyzeWebsite(url: string, content: ExtractedContent): Promise<AnalysisResult> {
  const startTime = Date.now()

  try {
    // Prepare the analysis prompt
    const systemPrompt = `You are an expert AI-first SEO analyst specializing in Generative Engine Optimization (GEO). Analyze websites for AI search engine optimization across 6 key pillars.

CRITICAL: You MUST provide scores for ALL 6 pillars. Do not skip any.

1. CONTENT QUALITY (0-100):
   - Semantic richness and contextual clarity
   - EEAT compliance (Experience, Expertise, Authority, Trust)
   - Content depth and comprehensiveness
   - Original data and unique insights
   - Content freshness and relevance

2. STRUCTURED SIGNALS (0-100):
   - Schema.org markup implementation
   - Heading hierarchy (H1, H2, H3 structure)
   - JSON-LD structured data
   - FAQ and HowTo markup
   - Structured data completeness

3. AUTHORITY SIGNALS (0-100):
   - Author credentials and expertise indicators
   - Citations and reference quality
   - Trusted external links and backlink profile
   - Domain authority and trust signals
   - Expert positioning and thought leadership

4. CRAWLABILITY & INDEXING (0-100):
   - Robot.txt AI bot allowlists for AI crawlers
   - XML sitemaps and site structure
   - Fast, JavaScript-light HTML for AI processing
   - Meta tags and indexing directives
   - Content accessibility for AI engines

5. PERFORMANCE (0-100):
   - Page load speed (target: <3 seconds)
   - Core Web Vitals compliance
   - Mobile and desktop responsiveness
   - Performance optimization opportunities
   - User experience metrics

6. MODULAR "LIFTABLE" CONTENT (0-100):
   - Lists and grids for easy AI extraction
   - Answer boxes for direct LLM reuse
   - Pattern libraries for content structure
   - Reusable content blocks for AI consumption
   - Content modularity and organization

REQUIRED OUTPUT FORMAT - You MUST include ALL 6 pillars:
{
  "overall_score": 0-100,
  "pillar_scores": {
    "content_quality": {"score": 0-100, "breakdown": "detailed analysis", "grade": "A/B/C/D/F", "status": "excellent/good/poor"},
    "structured_signals": {"score": 0-100, "breakdown": "detailed analysis", "grade": "A/B/C/D/F", "status": "excellent/good/poor"},
    "authority_signals": {"score": 0-100, "breakdown": "detailed analysis", "grade": "A/B/C/D/F", "status": "excellent/good/poor"},
    "crawlability": {"score": 0-100, "breakdown": "detailed analysis", "grade": "A/B/C/D/F", "status": "excellent/good/poor"},
    "performance": {"score": 0-100, "breakdown": "detailed analysis", "grade": "A/B/C/D/F", "status": "excellent/good/poor"},
    "modular_content": {"score": 0-100, "breakdown": "detailed analysis", "grade": "A/B/C/D/F", "status": "excellent/good/poor"}
  },
  "recommendations": [array of 5-8 specific, actionable optimization suggestions],
  "detected_entities": [array of key entities found],
  "content_gaps": [array of missing elements]
}`

    const userPrompt = `Analyze this website content for AI-first optimization:

Title: ${content.title}
Content: ${content.textContent.substring(0, 8000)}
URL: ${url}
Meta Description: ${content.metaDescription}
Meta Keywords: ${content.metaKeywords}
Heading Structure: ${content.headings.join(' | ')}
Schema Markup: ${content.schemaMarkup.length > 0 ? 'Present' : 'None detected'}
Content Length: ${content.textContent.length} characters
Links: ${content.links.length} external links
Images: ${content.images.length} images

Please provide a comprehensive analysis following the framework above.`

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    })

    const responseText = completion.choices[0]?.message?.content
    if (!responseText) {
      throw new Error('No response from OpenAI API')
    }

    // Parse the AI response
    const analysis = parseAIResponse(responseText)
    
    // Calculate overall score
    const overallScore = Math.round(
      Object.values(analysis.pillarScores).reduce((sum, pillar) => sum + pillar.score, 0) / 6
    )

    // Determine overall grade
    const overallGrade = getGrade(overallScore) as 'A' | 'B' | 'C' | 'D' | 'F'

    // Calculate analysis time
    const analysisTime = Math.round((Date.now() - startTime) / 1000)

    return {
      url,
      timestamp: new Date().toISOString(),
      overallScore,
      overallGrade,
      pillarScores: analysis.pillarScores,
      recommendations: analysis.recommendations,
      detectedEntities: analysis.detectedEntities,
      contentGaps: analysis.contentGaps,
      analysisTime,
      contentExtracted: {
        title: content.title,
        metaDescription: content.metaDescription,
        metaKeywords: content.metaKeywords,
        headings: content.headings,
        schemaMarkup: content.schemaMarkup,
        performanceMetrics: {
          loadTime: 0, // Would need actual performance testing
          coreWebVitals: {},
        },
      },
    }
  } catch (error) {
    console.error('AI analysis error:', error)
    throw new Error(`AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

function parseAIResponse(responseText: string): {
  pillarScores: PillarScores
  recommendations: Recommendation[]
  detectedEntities: DetectedEntity[]
  contentGaps: ContentGap[]
} {
  try {
    console.log('Parsing AI response:', responseText.substring(0, 500) + '...')
    
    // Try to extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    console.log('Parsed JSON structure:', Object.keys(parsed))
    
    // Check if we have the expected structure
    if (!parsed.pillar_scores && !parsed.pillarScores) {
      console.warn('No pillar_scores found in AI response, using fallback')
      return createFallbackAnalysis()
    }
    
    // Validate that we have ALL 6 pillars
    const requiredPillars = ['content_quality', 'structured_signals', 'authority_signals', 'crawlability', 'performance', 'modular_content']
    const missingPillars = requiredPillars.filter(pillar => 
      !parsed.pillar_scores?.[pillar] && !parsed.pillar_scores?.[pillar.replace(/_/g, '')]
    )
    
    if (missingPillars.length > 0) {
      console.warn(`Missing pillar scores for: ${missingPillars.join(', ')}. AI response incomplete.`)
      console.log('Available pillars:', Object.keys(parsed.pillar_scores || {}))
    }
    
    // Validate and transform pillar scores
    const pillarScores: PillarScores = {
      contentQuality: createPillarScore(parsed.pillar_scores?.content_quality || parsed.pillar_scores?.contentQuality || parsed.pillar_scores?.['Content Quality'] || parsed.pillarScores?.contentQuality || 0),
      structuredSignals: createPillarScore(parsed.pillar_scores?.structured_signals || parsed.pillar_scores?.structuredSignals || parsed.pillar_scores?.['Structured Signals'] || parsed.pillarScores?.structuredSignals || 0),
      authoritySignals: createPillarScore(parsed.pillar_scores?.authority_signals || parsed.pillar_scores?.authoritySignals || parsed.pillar_scores?.['Authority Signals'] || parsed.pillarScores?.authoritySignals || 0),
      crawlability: createPillarScore(parsed.pillar_scores?.crawlability || parsed.pillar_scores?.crawlability || parsed.pillar_scores?.['Crawlability'] || parsed.pillarScores?.crawlability || 0),
      performance: createPillarScore(parsed.pillar_scores?.performance || parsed.pillar_scores?.performance || parsed.pillar_scores?.['Performance'] || parsed.pillarScores?.performance || 0),
      modularContent: createPillarScore(parsed.pillar_scores?.modular_content || parsed.pillar_scores?.modularContent || parsed.pillar_scores?.['Modular Content'] || parsed.pillarScores?.modularContent || 0),
    }

    // Transform recommendations
    const recommendations: Recommendation[] = (parsed.recommendations || []).map((rec: any, index: number) => ({
      id: `rec-${index}`,
      title: rec.title || rec.name || `Recommendation ${index + 1}`,
      description: rec.description || rec.desc || 'No description provided',
      pillar: mapPillarName(rec.pillar || rec.pillar_name || 'contentQuality'),
      priority: rec.implementation_priority || rec.priority || 'medium',
      impact: rec.estimated_impact || rec.impact || 5,
      difficulty: rec.technical_difficulty || rec.difficulty || 'medium',
      estimatedTime: rec.estimated_time || rec.time || '1-2 hours',
      implementation: rec.implementation || rec.steps || ['Implement the suggested changes'],
      codeSnippets: rec.code_snippets || rec.code || [],
    }))

    // Transform detected entities
    const detectedEntities: DetectedEntity[] = (parsed.detected_entities || []).map((entity: any, index: number) => ({
      name: entity.name || `Entity ${index + 1}`,
      type: entity.type || 'concept',
      confidence: entity.confidence || 0.8,
      context: entity.context || 'No context provided',
    }))

    // Transform content gaps
    const contentGaps: ContentGap[] = (parsed.content_gaps || []).map((gap: any, index: number) => ({
      element: gap.element || `Element ${index + 1}`,
      description: gap.description || gap.desc || 'No description provided',
      impact: gap.impact || 'Medium impact',
      priority: gap.priority || 'medium',
    }))

    console.log('Successfully parsed AI response with scores:', Object.values(pillarScores).map(p => p.score))
    return {
      pillarScores,
      recommendations,
      detectedEntities,
      contentGaps,
    }
  } catch (error) {
    console.error('Error parsing AI response:', error)
    console.log('Raw response:', responseText)
    
    // Return fallback analysis
    return createFallbackAnalysis()
  }
}

function createPillarScore(score: number | any): any {
  if (typeof score === 'number') {
    return {
      score,
      breakdown: 'AI analysis completed',
      grade: getGrade(score),
      status: getStatus(score),
    }
  }
  
  if (typeof score === 'object' && score.score) {
    return {
      score: score.score,
      breakdown: score.breakdown || 'AI analysis completed',
      grade: score.grade || getGrade(score.score),
      status: score.status || getStatus(score.score),
    }
  }
  
  // Fallback case - this should not happen with proper AI response
  console.warn('Fallback pillar score created - AI response parsing may have failed')
  return {
    score: 50,
    breakdown: 'Analysis incomplete - using fallback score',
    grade: 'C',
    status: 'good',
  }
}

function getGrade(score: number): string {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

function getStatus(score: number): string {
  if (score >= 80) return 'excellent'
  if (score >= 60) return 'good'
  return 'poor'
}

function mapPillarName(pillarName: string): string {
  const pillarMap: { [key: string]: string } = {
    'Content Quality': 'contentQuality',
    'content_quality': 'contentQuality',
    'Structured Signals': 'structuredSignals',
    'structured_signals': 'structuredSignals',
    'Authority Signals': 'authoritySignals',
    'authority_signals': 'authoritySignals',
    'Crawlability': 'crawlability',
    'crawlability': 'crawlability',
    'Performance': 'performance',
    'performance': 'performance',
    'Modular Content': 'modularContent',
    'modular_content': 'modularContent',
  }
  
  return pillarMap[pillarName] || 'contentQuality'
}

function createFallbackAnalysis() {
  return {
    pillarScores: {
      contentQuality: { score: 50, breakdown: 'Fallback analysis', grade: 'C' as const, status: 'good' as const },
      structuredSignals: { score: 50, breakdown: 'Fallback analysis', grade: 'C' as const, status: 'good' as const },
      authoritySignals: { score: 50, breakdown: 'Fallback analysis', grade: 'C' as const, status: 'good' as const },
      crawlability: { score: 50, breakdown: 'Fallback analysis', grade: 'C' as const, status: 'good' as const },
      performance: { score: 50, breakdown: 'Fallback analysis', grade: 'C' as const, status: 'good' as const },
      modularContent: { score: 50, breakdown: 'Fallback analysis', grade: 'C' as const, status: 'good' as const },
    },
    recommendations: [
      {
        id: 'fallback-1',
        title: 'Improve Content Quality',
        description: 'Focus on creating comprehensive, well-structured content',
        pillar: 'contentQuality' as const,
        priority: 'medium' as const,
        impact: 7,
        difficulty: 'medium' as const,
        estimatedTime: '2-3 hours',
        implementation: ['Review and expand content sections', 'Add more detailed explanations'],
      },
    ],
    detectedEntities: [],
    contentGaps: [],
  }
}
