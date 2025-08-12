# **Product Requirements Document (PRD) - GEO URL Analyzer Dashboard**

## **Product Overview**

A **comprehensive GEO dashboard** that allows users to paste any website URL and receive AI-powered optimization suggestions for better visibility in AI search engines like ChatGPT, Gemini, and Claude. The system analyzes content across 6 critical optimization pillars and provides actionable recommendations for AI-first content optimization.

**MVP Goal**: Deploy a working GEO analyzer on Vercel that covers all optimization aspects for AI discovery.

## **Core User Story**

> "As a website owner, I want to paste my website URL and get comprehensive AI-powered optimization suggestions across all critical pillars (Content Quality, Structured Signals, Authority, Crawlability, Performance, and Modular Content), so I can optimize my site for maximum AI discoverability without technical expertise."

## **Target Users**

- **Small business owners** with websites
- **Content creators** and bloggers
- **Digital marketers** and agencies
- **E-commerce store owners**
- **Anyone** wanting to dominate AI search results

## **Core Features (Phase 1)**

### **1. URL Input & Analysis**
- **Simple URL input field** (paste any website URL)
- **One-click comprehensive analysis** button
- **Loading state** with progress indicator and analysis steps
- **Error handling** for invalid URLs or inaccessible sites

### **2. Six-Pillar AI Analysis Engine**
Based on industry best practices, our system analyzes:

#### **Pillar 1: Content Quality (0-100)**
- **Semantic richness** and contextual clarity
- **Concise QA blocks** for AI consumption
- **EEAT compliance** (Expertise, Authoritativeness, Trustworthiness)
- **Original data** and unique insights
- **Content depth** and comprehensiveness

#### **Pillar 2: Structured Signals (0-100)**
- **Schema.org/JSON-LD** implementation
- **Clear heading hierarchy** (H1, H2, H3)
- **Chunkable content sections** for AI processing
- **FAQ and HowTo markup** opportunities
- **Structured data** completeness

#### **Pillar 3: Entity/Authority Signals (0-100)**
- **Author credentials** and expertise indicators
- **Citations** and reference quality
- **Trusted external links** and backlink profile
- **Domain authority** and trust signals
- **Expert positioning** and thought leadership

#### **Pillar 4: Crawlability & Indexing (0-100)**
- **Robot.txt AI bot allowlists** for AI crawlers
- **XML sitemaps** and site structure
- **Fast, JavaScript-light HTML** for AI processing
- **Meta tags** and indexing directives
- **Content accessibility** for AI engines

#### **Pillar 5: Performance (0-100)**
- **Page load speed** (target: <3 seconds)
- **Core Web Vitals** compliance
- **Mobile and desktop** responsiveness
- **Performance optimization** opportunities
- **User experience** metrics

#### **Pillar 6: Modular "Liftable" Content (0-100)**
- **Lists and grids** for easy AI extraction
- **Answer boxes** for direct LLM reuse
- **Pattern libraries** for content structure
- **Reusable content blocks** for AI consumption
- **Content modularity** and organization

### **3. Comprehensive Results Display**
- **Overall GEO Score** (0-100) with visual indicator and grade
- **Individual pillar scores** with detailed breakdowns
- **Priority-based recommendations** with implementation difficulty
- **Technical implementation** guides and code snippets
- **Estimated impact** scores for each recommendation

## **Technical Requirements**

### **Frontend (Next.js + Vercel)**
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + ShadCN UI components
- **Deployment**: Vercel with automatic deployments
- **Responsive**: Mobile-first, tablet, and desktop optimized
- **Performance**: Lighthouse score 90+ on all devices

### **Backend (Vercel API Routes)**
- **API Routes**: `/api/analyze` for comprehensive content analysis
- **AI Integration**: OpenAI GPT-4-turbo-preview via Vercel AI SDK
- **Content Extraction**: Advanced web scraping with Playwright/Cheerio
- **Rate Limiting**: Intelligent protection against abuse
- **Caching**: Redis-based caching for repeated analyses

### **AI Analysis Engine**
- **Model**: OpenAI GPT-4-turbo-preview with function calling
- **Analysis Prompt**: Structured 6-pillar evaluation system
- **Output Format**: JSON with scores, recommendations, and implementation data
- **Streaming**: Real-time analysis updates for better UX
- **Validation**: AI response validation and fallback handling

## **User Experience Flow**

### **Step 1: Landing on Dashboard**
```
┌─────────────────────────────────────────────────────────────────────────┐
│                        GEO URL Analyzer Dashboard                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  🚀 Optimize Your Website for AI Search Engines                        │
│  Get discovered by ChatGPT, Gemini, Claude & more!                     │
│                                                                         │
│  [Paste your website URL here...] [🔍 Analyze Website]                 │
│                                                                         │
│  Examples: https://example.com, https://mysite.wordpress.com           │
└─────────────────────────────────────────────────────────────────────────┘
```

### **Step 2: User Pastes URL & Clicks Analyze**
- User pastes: `https://myrestaurant.com`
- Clicks "Analyze Website" button
- Button changes to "Analyzing..." with loading spinner

### **Step 3: Real-Time Analysis Progress**
```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Analysis in Progress...                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  🔍 Analyzing: https://myrestaurant.com                                │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    Progress Steps                               │   │
│  │                                                                 │   │
│  │  ✅ Extracting content from website...                          │   │
│  │  🔄 Analyzing content quality...                                │   │
│  │  ⏳ Evaluating structured signals...                            │   │
│  │  ⏳ Assessing authority signals...                              │   │
│  │  ⏳ Checking crawlability...                                    │   │
│  │  ⏳ Measuring performance...                                    │   │
│  │  ⏳ Analyzing content modularity...                             │   │
│  │                                                                 │   │
│  │  AI is processing your content...                               │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### **Step 4: Analysis Complete - Results Display**
```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Analysis Complete!                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  �� Overall GEO Score: [78/100] ⭐⭐⭐⭐ B+                          │
│                                                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                     │
│  │Cont │ │Stru │ │Auth │ │Craw │ │Perf │ │Modu │                     │
│  │Qual │ │Sign │ │Sign │ │Index│ │mnce │ │lar  │                     │
│  │ 85  │ │ 70  │ │ 90  │ │ 65  │ │ 45  │ │ 75  │                     │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘                     │
│                                                                         │
│  📊 Score Breakdown:                                                   │
│  • Content Quality: 85/100 - Great content, well-written              │
│  • Structured Signals: 70/100 - Some schema, needs improvement        │
│  • Authority Signals: 90/100 - Strong brand, good reviews             │
│  • Crawlability: 65/100 - Basic SEO, missing AI bot allowlists       │
│  • Performance: 45/100 - Slow loading, needs optimization             │
│  • Modular Content: 75/100 - Good structure, could be more organized │
└─────────────────────────────────────────────────────────────────────────┘
```

### **Step 5: Priority Recommendations**
```
┌─────────────────────────────────────────────────────────────────────────┐
│                    🎯 Priority Recommendations                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  🔴 HIGH PRIORITY (Immediate Impact)                                   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ �� Optimize Page Load Speed                                       │   │
│  │    Current: 4.2 seconds | Target: <3 seconds                     │   │
│  │    Impact: 15-20 point GEO score improvement                      │   │
│  │    Difficulty: Medium | Estimated Time: 2-3 hours                 │   │
│  │                                                                 │   │
│  │ 💡 Implementation:                                                │   │
│  │    • Compress images (save 1.5s)                                  │   │
│  │    • Enable browser caching (save 0.8s)                           │   │
│  │    • Minify CSS/JS (save 0.4s)                                    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  🟡 MEDIUM PRIORITY (High Impact)                                     │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ 📋 Add FAQ Section with Schema Markup                            │   │
│  │    Impact: 10-15 point GEO score improvement                     │   │
│  │    Difficulty: Easy | Estimated Time: 1-2 hours                  │   │
│  │                                                                 │   │
│  │ 💡 Implementation:                                                │   │
│  │    • Create FAQ about restaurant services                         │   │
│  │    • Add JSON-LD schema markup                                   │   │
│  │    • Place after main content                                     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  �� LOW PRIORITY (Good to Have)                                       │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ 👨‍�� Add Author Bio for Authority Signals                          │   │
│  │    Impact: 5-8 point GEO score improvement                       │   │
│  │    Difficulty: Easy | Estimated Time: 30 minutes                 │   │
│  │                                                                 │   │
│  │ 💡 Implementation:                                                │   │
│  │    • Add chef bio with credentials                                │   │
│  │    • Include awards and recognition                               │   │
│  │    • Place in sidebar or footer                                   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### **Step 6: Action Items & Next Steps**
```
┌─────────────────────────────────────────────────────────────────────────┐
│                        🚀 Take Action                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  📋 Copy Recommendations:                                              │
│  [Copy All Recommendations] [Export as PDF] [Share Results]            │
│                                                                         │
│  🔄 Re-analyze after implementing changes to track improvements       │
│                                                                         │
│  💡 Pro Tip: Focus on HIGH priority items first for maximum impact    │
│                                                                         │
│  [Analyze Another Website] [Save Results] [Get Help]                  │
└─────────────────────────────────────────────────────────────────────────┘
```

## **Technical Architecture**

### **Enhanced 4-Component System**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │    │                 │
│  Next.js       │◄──►│  Vercel API     │◄──►│  OpenAI GPT-4   │    │  Content        │
│  Dashboard     │    │  Routes         │    │  AI Engine      │    │  Extraction     │
│                 │    │                 │    │                 │    │  Engine         │
│  User Interface│    │  Advanced       │    │  6-Pillar       │    │  Playwright/    │
│  & Results     │    │  Processing     │    │  Analysis       │    │  Cheerio        │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Enhanced File Structure**
```
geo-url-analyzer/
├── app/
│   ├── page.tsx                    # Main dashboard
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   └── api/
│       └── analyze/
│           └── route.ts            # Enhanced analysis API
├── components/
│   ├── url-input.tsx               # URL input component
│   ├── analysis-progress.tsx       # Progress indicator
│   ├── geo-score-overview.tsx      # Overall score display
│   ├── pillar-breakdown.tsx        # 6-pillar scores
│   ├── recommendations-list.tsx    # Priority recommendations
│   ├── implementation-guide.tsx    # How-to guides
│   └── export-results.tsx          # Results export
├── lib/
│   ├── ai-analyzer.ts              # Enhanced AI analysis logic
│   ├── content-extractor.ts        # Advanced content extraction
│   ├── pillar-scorer.ts            # Individual pillar scoring
│   ├── recommendation-engine.ts    # Priority-based recommendations
│   └── utils.ts                    # Helper functions
├── types/
│   ├── analysis.ts                 # TypeScript interfaces
│   ├── pillars.ts                  # Pillar definitions
│   └── recommendations.ts          # Recommendation types
├── vercel.json                     # Vercel configuration
└── package.json
```

## **Implementation Plan**

### **Phase 1: Foundation & Core Setup**
- **Project Creation**: Set up Next.js project with TypeScript and deploy to Vercel
- **Basic UI**: Build URL input component and dashboard layout
- **Content Extraction**: Implement advanced web scraping with Playwright/Cheerio
- **Basic Styling**: Apply Tailwind CSS and ShadCN UI for responsive design

### **Phase 2: AI Integration & 6-Pillar Analysis Engine**
- **OpenAI Setup**: Configure API keys and Vercel AI SDK
- **Analysis API**: Build `/api/analyze` endpoint with 6-pillar processing
- **AI Prompting**: Implement comprehensive GEO analysis prompts for all pillars
- **Results Processing**: Parse AI responses and format for structured display
- **Validation**: Add AI response validation and error handling

### **Phase 3: Enhanced Results Display & User Experience**
- **Score Visualization**: Create comprehensive GEO score cards and 6-pillar breakdowns
- **Recommendations Engine**: Build priority-based recommendation system with implementation guides
- **Progress Tracking**: Add detailed analysis progress indicators
- **Mobile Optimization**: Ensure responsive design across all devices and screen sizes
- **Accessibility**: Implement WCAG 2.1 AA compliance

### **Phase 4: Advanced Features & Polish**
- **Export Functionality**: PDF and CSV export of analysis results
- **Performance Optimization**: Optimize loading times and API responses
- **Caching System**: Implement intelligent caching for repeated analyses
- **Production Deployment**: Deploy to Vercel with custom domain and SSL
- **Final Polish**: UI refinements, performance tuning, and user experience improvements

## **Enhanced AI Analysis Prompt Structure**

### **System Prompt**
```
You are a GEO (Generative Engine Optimization) expert specializing in AI-first content optimization. Analyze the provided website content across 6 critical optimization pillars for AI search engine discoverability.

ANALYSIS FRAMEWORK:

1. CONTENT QUALITY (0-100):
   - Semantic richness and contextual clarity
   - Concise QA blocks for AI consumption
   - EEAT compliance (Expertise, Authoritativeness, Trustworthiness)
   - Original data and unique insights
   - Content depth and comprehensiveness

2. STRUCTURED SIGNALS (0-100):
   - Schema.org/JSON-LD implementation
   - Clear heading hierarchy (H1, H2, H3)
   - Chunkable content sections for AI processing
   - FAQ and HowTo markup opportunities
   - Structured data completeness

3. ENTITY/AUTHORITY SIGNALS (0-100):
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

Provide a JSON response with:
- overall_score (0-100)
- pillar_scores (object with each pillar score and breakdown)
- recommendations (array of 5-8 specific, actionable optimization suggestions)
- detected_entities (array of key entities found)
- content_gaps (array of missing elements)
- implementation_priority (high/medium/low for each recommendation)
- estimated_impact (1-10 scale for each recommendation)
- technical_difficulty (easy/medium/hard for each recommendation)
```

### **User Prompt**
```
Analyze this website content for AI-first optimization:

Title: {extracted_title}
Content: {extracted_content}
URL: {website_url}
Meta Description: {meta_description}
Meta Keywords: {meta_keywords}
Heading Structure: {heading_hierarchy}
Schema Markup: {detected_schema}
Performance Metrics: {page_speed_data}
```

## **Enhanced UI/UX Design**

### **Dashboard Layout**
```
┌─────────────────────────────────────────────────────────────────────────┐
│                        GEO URL Analyzer Dashboard                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  🚀 Optimize Your Website for AI Search Engines                        │
│  Get discovered by ChatGPT, Gemini, Claude & more!                     │
│                                                                         │
│  [Paste your website URL here...] [🔍 Analyze Website]                 │
│                                                                         │
│  Examples: https://example.com, https://mysite.wordpress.com           │
└─────────────────────────────────────────────────────────────────────────┘
```

### **Enhanced Color Scheme**
- **Primary**: Blue (#3B82F6) for trust and technology
- **Success**: Green (#10B981) for good scores (80-100)
- **Warning**: Yellow (#F59E0B) for medium scores (60-79)
- **Error**: Red (#EF4444) for low scores (0-59)
- **Neutral**: Gray (#6B7280) for text and borders
- **Accent**: Purple (#8B5CF6) for highlights and CTAs

## **Success Metrics**

### **Technical Metrics**
- **Page Load Time**: < 2 seconds
- **API Response Time**: < 15 seconds for comprehensive analysis
- **Uptime**: 99.9% availability
- **Mobile Performance**: 90+ Lighthouse score
- **Accessibility**: WCAG 2.1 AA compliance

### **User Experience Metrics**
- **Completion Rate**: > 85% of users complete analysis
- **Return Rate**: > 40% of users return for another analysis
- **Share Rate**: > 20% of users share results
- **Satisfaction Score**: > 4.5/5 average rating

## **Deployment & Launch**

### **Vercel Deployment**
1. **Connect GitHub repository** to Vercel
2. **Automatic deployments** on every push with preview environments
3. **Production deployment** with custom domain and SSL
4. **Edge functions** for global performance optimization

### **Launch Strategy**
1. **Soft Launch**: Deploy and test with small group of power users
2. **Public Launch**: Share on social media, communities, and SEO forums
3. **Iteration**: Collect feedback and continuously improve
4. **Scale**: Add more features based on usage patterns and user feedback

## **Future Enhancements (Post-MVP)**

### **Phase 5: Advanced Analytics & History**
- **User accounts** and analysis history
- **Competitor analysis** and benchmarking
- **Trend tracking** and performance monitoring
- **Custom reporting** and white-label options

### **Phase 6: Integration & Automation**
- **WordPress plugin** integration
- **API access** for developers and agencies
- **Webhook notifications** for monitoring
- **Automated re-analysis** scheduling

### **Phase 7: Enterprise Features**
- **Multi-site management** for agencies
- **Advanced AI models** and custom analysis
- **White-label solutions** for resellers
- **Enterprise pricing** and support tiers

## **Risk Mitigation**

### **Technical Risks**
- **AI API costs**: Implement intelligent rate limiting and usage caps
- **Content extraction failures**: Multiple fallback methods and error handling
- **Performance issues**: Vercel edge functions, caching, and optimization
- **Scalability**: Monitor usage patterns and implement auto-scaling

### **Business Risks**
- **Competition**: Focus on comprehensive analysis and user experience
- **User adoption**: Start with free tier and viral features
- **AI accuracy**: Continuous prompt engineering and validation
- **Market changes**: Stay updated with AI search engine developments

## **Success Criteria**

### **Phase 4 Success (MVP Complete)**
- ✅ Dashboard deployed on Vercel with custom domain
- ✅ 6-pillar analysis working end-to-end
- ✅ AI-generated recommendations accurate and actionable
- ✅ Comprehensive user interface functional and responsive
- ✅ Mobile-optimized design with 90+ Lighthouse scores
- ✅ WCAG 2.1 AA accessibility compliance

### **Launch Success (1 month)**
- ✅ 500+ unique users
- ✅ 2,000+ website analyses
- ✅ Positive user feedback and testimonials
- ✅ Technical performance stable and fast
- ✅ Ready for feature expansion and scaling

---

**This comprehensive PRD provides a complete roadmap for building your GEO URL Analyzer Dashboard. The document covers all technical requirements, user experience flows, AI integration details, and implementation phases needed to create a market-leading AI-first content optimization tool.**

**Key Highlights:**
- **6-Pillar Analysis System** covering all aspects of AI optimization
- **Detailed User Experience Flow** showing exactly what users will see
- **Comprehensive Technical Architecture** optimized for Vercel deployment
- **Phase-based Implementation Plan** for systematic development
- **Enhanced AI Prompts** for accurate and actionable analysis
- **Success Metrics & Risk Mitigation** for project success

