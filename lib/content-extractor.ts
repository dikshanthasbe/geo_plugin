import { JSDOM } from 'jsdom'

export interface ExtractedContent {
  title: string
  metaDescription: string
  metaKeywords: string
  headings: string[]
  content: string
  schemaMarkup: string[]
  links: string[]
  images: string[]
  textContent: string
  html: string
}

async function tryFetch(url: string, options: RequestInit): Promise<Response> {
  try {
    return await fetch(url, options)
  } catch (error) {
    // If HTTPS fails with SSL error, try HTTP as fallback
    if (url.startsWith('https://') && error instanceof Error && 
        (error.message.includes('self-signed certificate') || 
         error.message.includes('SELF_SIGNED_CERT_IN_CHAIN'))) {
      console.log(`HTTPS failed for ${url}, trying HTTP fallback...`)
      const httpUrl = url.replace('https://', 'http://')
      return await fetch(httpUrl, options)
    }
    throw error
  }
}

export async function extractContent(url: string): Promise<ExtractedContent> {
  try {
    // Use native fetch with better error handling and SSL options
    const response = await tryFetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GEOAnalyzer/1.0; +https://geo-analyzer.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      // Add signal for timeout
      signal: AbortSignal.timeout(30000), // 30 second timeout
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const dom = new JSDOM(html)
    const document = dom.window.document

    // Extract basic metadata
    const title = document.querySelector('title')?.textContent?.trim() || 
                  document.querySelector('h1')?.textContent?.trim() || 
                  'No title found'
    
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || 
                           document.querySelector('meta[property="og:description"]')?.getAttribute('content') || ''
    
    const metaKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || ''

    // Extract headings
    const headings: string[] = []
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((element: Element) => {
      const text = element.textContent?.trim()
      if (text) headings.push(text)
    })

    // Extract schema markup
    const schemaMarkup: string[] = []
    document.querySelectorAll('script[type="application/ld+json"]').forEach((element: Element) => {
      try {
        const content = element.textContent
        if (content) {
          const parsed = JSON.parse(content)
          schemaMarkup.push(JSON.stringify(parsed, null, 2))
        }
      } catch (e) {
        // Invalid JSON, skip
      }
    })

    // Extract links
    const links: string[] = []
    document.querySelectorAll('a[href]').forEach((element: Element) => {
      const href = element.getAttribute('href')
      if (href && href.startsWith('http')) {
        links.push(href)
      }
    })

    // Extract images
    const images: string[] = []
    document.querySelectorAll('img[src]').forEach((element: Element) => {
      const src = element.getAttribute('src')
      if (src) images.push(src)
    })

    // Extract main content (focus on article, main, or content areas)
    let content = ''
    const contentSelectors = [
      'article',
      'main',
      '[role="main"]',
      '.content',
      '.post-content',
      '.entry-content',
      '#content',
      '#main'
    ]

    for (const selector of contentSelectors) {
      const element = document.querySelector(selector)
      if (element) {
        content = element.textContent?.trim() || ''
        break
      }
    }

    // Fallback to body if no content area found
    if (!content) {
      content = document.body?.textContent?.trim() || ''
    }

    // Clean and extract text content
    const textContent = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim()
      .substring(0, 10000) // Limit to first 10k characters

    return {
      title,
      metaDescription,
      metaKeywords,
      headings,
      content,
      schemaMarkup,
      links,
      images,
      textContent,
      html: html.substring(0, 50000), // Limit HTML to 50k characters
    }
  } catch (error) {
    console.error('Error extracting content:', error)
    
    // Provide more helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('self-signed certificate') || error.message.includes('SELF_SIGNED_CERT_IN_CHAIN')) {
        throw new Error(`SSL certificate error: The website ${url} has an invalid SSL certificate. This is a security issue on their end.`)
      }
      if (error.message.includes('fetch failed')) {
        throw new Error(`Connection failed: Unable to reach ${url}. The site may be down, blocked, or have network issues.`)
      }
      if (error.message.includes('timeout')) {
        throw new Error(`Request timeout: ${url} took too long to respond. The site may be slow or overloaded.`)
      }
    }
    
    throw new Error(`Failed to extract content from ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export function analyzeContentStructure(content: ExtractedContent) {
  const analysis = {
    hasTitle: !!content.title,
    hasMetaDescription: !!content.metaDescription,
    hasMetaKeywords: !!content.metaKeywords,
    headingCount: content.headings.length,
    headingHierarchy: analyzeHeadingHierarchy(content.headings),
    hasSchemaMarkup: content.schemaMarkup.length > 0,
    linkCount: content.links.length,
    imageCount: content.images.length,
    contentLength: content.textContent.length,
    hasStructuredContent: content.schemaMarkup.length > 0 || content.headings.length > 3,
  }

  return analysis
}

function analyzeHeadingHierarchy(headings: string[]): { [key: string]: number } {
  const hierarchy: { [key: string]: number } = {}
  
  headings.forEach(heading => {
    // Simple heuristic to determine heading level
    if (heading.length < 50) hierarchy.short = (hierarchy.short || 0) + 1
    if (heading.length >= 50 && heading.length < 100) hierarchy.medium = (hierarchy.medium || 0) + 1
    if (heading.length >= 100) hierarchy.long = (hierarchy.long || 0) + 1
  })
  
  return hierarchy
}

export function extractKeyEntities(content: ExtractedContent): string[] {
  const entities: string[] = []
  
  // Extract potential entities from headings
  content.headings.forEach(heading => {
    const words = heading.split(' ').filter(word => word.length > 3)
    entities.push(...words.slice(0, 3)) // Take first 3 significant words
  })
  
  // Extract from title
  if (content.title) {
    const titleWords = content.title.split(' ').filter(word => word.length > 3)
    entities.push(...titleWords.slice(0, 2))
  }
  
  // Remove duplicates and limit
  return [...new Set(entities)].slice(0, 10)
}
