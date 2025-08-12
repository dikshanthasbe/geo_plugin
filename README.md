# GEO Scout

**AI-First SEO Analysis for the Generative Engine Era**

GEO Scout is a comprehensive tool that analyzes websites for AI search engine optimization, providing detailed insights across 6 key optimization pillars.

## 📖 Description

GEO Scout is a powerful web application that analyzes websites for AI-first optimization. It provides comprehensive scoring across 6 critical pillars that determine how well your content performs in AI search engines like ChatGPT, Gemini, and Claude.

The tool offers real-time analysis, actionable recommendations, and detailed insights to help content creators, marketers, and developers optimize their websites for the emerging AI-first search landscape.

## 🚀 Features

- **6-Pillar Analysis System**: Comprehensive evaluation across all optimization aspects
- **AI-Powered Insights**: GPT-4 powered analysis with actionable recommendations
- **Real-time Results**: Get comprehensive analysis in under 30 seconds
- **Priority Recommendations**: Actionable suggestions ranked by impact and difficulty
- **Beautiful UI**: Modern, responsive design with Tailwind CSS and ShadCN components
- **Vercel Deployment**: Optimized for serverless deployment

## 🏗️ Architecture

The system analyzes websites across 6 critical optimization pillars:

1. **Content Quality** - Semantic richness, EEAT compliance, content depth
2. **Structured Signals** - Schema markup, heading hierarchy, structured data
3. **Authority Signals** - Expertise indicators, citations, trust signals
4. **Crawlability** - AI bot accessibility, indexing optimization
5. **Performance** - Page speed, Core Web Vitals, user experience
6. **Modular Content** - Content structure for AI consumption

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **AI Integration**: OpenAI GPT-4-turbo-preview
- **Content Extraction**: Cheerio for web scraping
- **Deployment**: Vercel with serverless functions
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd geo-url-analyzer
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Copy the example environment file and configure your OpenAI API key:

```bash
cp env.example .env.local
```

Edit `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=your_actual_openai_api_key_here
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variable:
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
5. Deploy!

### 3. Custom Domain (Optional)

1. In your Vercel project, go to Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | No |
| `NEXT_PUBLIC_APP_URL` | Application URL | No |

### OpenAI API Setup

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an account or sign in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key and add it to your environment variables

## 📱 Usage

### Basic Analysis

1. Open the dashboard
2. Paste a website URL in the input field
3. Click "Analyze Website"
4. Wait for the AI analysis to complete
5. Review your scores and recommendations

### Understanding Results

- **Overall Score**: 0-100 scale with letter grade (A-F)
- **Pillar Scores**: Individual scores for each optimization area
- **Recommendations**: Priority-ranked suggestions with implementation steps
- **Impact Scores**: 1-10 scale showing potential improvement

### Priority Levels

- **🔴 HIGH PRIORITY**: Immediate impact, focus first
- **🟡 MEDIUM PRIORITY**: High impact, implement next
- **🟢 LOW PRIORITY**: Good to have, implement when possible

## 🎨 Customization

### Colors and Theme

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    500: '#your-primary-color',
    // ... other shades
  },
  // ... other color families
}
```

### Components

All components are located in the `components/` directory and can be customized:

- `url-input.tsx` - URL input and validation
- `analysis-progress.tsx` - Progress indicator
- `geo-score-overview.tsx` - Overall score display
- `pillar-breakdown.tsx` - Individual pillar scores
- `recommendations-list.tsx` - Priority recommendations

## 🔍 API Endpoints

### POST /api/analyze

Analyzes a website URL and returns comprehensive optimization insights.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "overallScore": 78,
  "overallGrade": "B+",
  "pillarScores": { ... },
  "recommendations": [ ... ],
  "detectedEntities": [ ... ],
  "contentGaps": [ ... ],
  "analysisTime": 15
}
```

## 🧪 Testing

### Run Tests

```bash
npm run test
# or
yarn test
```

### Test Analysis

Use the example URLs provided in the dashboard:
- `https://example.com`
- `https://mysite.wordpress.com`
- `https://myrestaurant.com`

## 📊 Performance

- **Page Load**: < 2 seconds
- **API Response**: < 15 seconds for comprehensive analysis
- **Mobile Performance**: 90+ Lighthouse score
- **Accessibility**: WCAG 2.1 AA compliance

## 🔒 Security

- Rate limiting on API endpoints
- Input validation and sanitization
- Secure environment variable handling
- CORS configuration for API routes

## 🚧 Troubleshooting

### Common Issues

1. **OpenAI API Error**
   - Check your API key in environment variables
   - Verify API key has sufficient credits
   - Check OpenAI service status

2. **Content Extraction Failed**
   - Verify the URL is accessible
   - Check if the site blocks bots
   - Ensure the site returns HTML content

3. **Build Errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `npm install`
   - Check Node.js version compatibility

### Debug Mode

Enable debug logging by setting:

```env
DEBUG=true
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API access
- Vercel for hosting and deployment
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/geo-url-analyzer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/geo-url-analyzer/discussions)
- **Email**: support@yourdomain.com

---

**Built with ❤️ for the AI-first future of search optimization**
