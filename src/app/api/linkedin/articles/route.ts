import { NextRequest, NextResponse } from 'next/server'
import { linkedInAPI } from '@/lib/linkedin/api'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const count = parseInt(searchParams.get('count') || '5')

    console.log(`Fetching ${count} LinkedIn articles via API...`)

    // Get articles from LinkedIn API
    const articles = await linkedInAPI.getFormattedArticles(count)

    return NextResponse.json({
      success: true,
      articles: articles,
      count: articles.length,
      source: 'linkedin_api',
      profile: 'https://www.linkedin.com/in/fouda-marc-arthur-03372a239',
      lastUpdated: new Date().toISOString().split('T')[0]
    })

  } catch (error: any) {
    console.error('Error fetching LinkedIn articles:', error)
    
    // Return minimal fallback if even static data fails
    const minimalFallback = [
      {
        id: 'minimal-1',
        title: 'Marc Fouda - Développeur Full Stack',
        excerpt: 'Passionné par le développement web moderne et les technologies innovantes...',
        content: 'Développeur Full Stack spécialisé en React, Node.js et TypeScript.',
        date: new Date().toISOString().split('T')[0],
        readTime: '1 min',
        url: 'https://www.linkedin.com/in/fouda-marc-arthur-03372a239',
        engagement: { likes: 15, comments: 2, shares: 1 },
        tags: ['Développement']
      }
    ]

    return NextResponse.json({
      success: true,
      articles: minimalFallback,
      count: minimalFallback.length,
      source: 'minimal_fallback',
      error: error.message,
      profile: 'https://www.linkedin.com/in/fouda-marc-arthur-03372a239'
    })
  }
}
