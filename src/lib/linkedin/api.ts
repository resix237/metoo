import { LINKEDIN_CONFIG, LinkedInProfile, LinkedInPost, ArticleData } from './config'
import { linkedInAuth } from './auth'

export class LinkedInAPI {
  private static instance: LinkedInAPI

  private constructor() { }

  /**
   * Share an article to LinkedIn
   */
  public async shareArticle(article: {
    title: string
    excerpt: string
    url: string
  }): Promise<string> {
    const profile = await this.getProfile()
    const authorUrn = `urn:li:person:${profile.id}`

    const body = {
      author: authorUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: `${article.excerpt}\n\nRead more: ${article.url}`
          },
          shareMediaCategory: 'ARTICLE',
          media: [
            {
              status: 'READY',
              description: {
                text: article.excerpt.substring(0, 200)
              },
              originalUrl: article.url,
              title: {
                text: article.title
              }
            }
          ]
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    }

    const response = await this.makeRequest('/ugcPosts', {
      method: 'POST',
      body: JSON.stringify(body)
    })

    return `https://www.linkedin.com/feed/update/${response.id}`
  }

  public static getInstance(): LinkedInAPI {
    if (!LinkedInAPI.instance) {
      LinkedInAPI.instance = new LinkedInAPI()
    }
    return LinkedInAPI.instance
  }

  /**
   * Make authenticated request to LinkedIn API
   */
  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = linkedInAuth.getAccessToken()

    if (!token) {
      throw new Error('No access token available')
    }

    const url = `${LINKEDIN_CONFIG.API_BASE_URL}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        ...options.headers
      }
    })

    if (response.status === 401) {
      // Token expired, try to refresh
      const refreshed = await linkedInAuth.refreshAccessToken()
      if (refreshed) {
        // Retry the request with new token
        return this.makeRequest(endpoint, options)
      } else {
        throw new Error('Authentication failed')
      }
    }

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get user profile information
   */
  public async getProfile(): Promise<LinkedInProfile> {
    return this.makeRequest('/people/~:(id,firstName,lastName,profilePicture(displayImage~:playableStreams))')
  }

  /**
   * Get user's posts/articles
   */
  public async getPosts(count: number = 10): Promise<LinkedInPost[]> {
    const profile = await this.getProfile()
    const authorUrn = `urn:li:person:${profile.id}`

    const endpoint = `/ugcPosts?q=authors&authors=${encodeURIComponent(authorUrn)}&count=${count}&sortBy=CREATED`

    const response = await this.makeRequest(endpoint)
    return response.elements || []
  }

  /**
   * Get user's articles (published articles, not posts)
   */
  public async getArticles(count: number = 10): Promise<any[]> {
    try {
      // LinkedIn's article API endpoint
      const endpoint = `/articles?q=author&count=${count}&sortBy=CREATED`
      const response = await this.makeRequest(endpoint)
      return response.elements || []
    } catch (error) {
      console.warn('Articles endpoint not available, falling back to posts')
      return []
    }
  }

  /**
   * Transform LinkedIn posts to ArticleData format
   */
  public transformPostsToArticles(posts: LinkedInPost[]): ArticleData[] {
    return posts.map((post, index) => {
      const shareContent = post.specificContent?.['com.linkedin.ugc.ShareContent']
      const commentary = shareContent?.shareCommentary?.text || ''
      const media = shareContent?.media?.[0]

      // Extract title from first line or first sentence
      const title = this.extractTitle(commentary)
      const excerpt = this.extractExcerpt(commentary, title)
      const readTime = this.calculateReadTime(commentary)

      return {
        id: post.id,
        title: title || `Article LinkedIn #${index + 1}`,
        excerpt: excerpt,
        content: commentary,
        date: new Date(post.created.time).toISOString().split('T')[0],
        readTime: readTime,
        url: `https://www.linkedin.com/feed/update/${post.id}`,
        image: media?.media || undefined,
        engagement: {
          likes: 0, // LinkedIn API v2 doesn't provide engagement metrics easily
          comments: 0,
          shares: 0
        }
      }
    }).filter(article => article.title && article.excerpt) // Filter out empty posts
  }

  /**
   * Extract title from post content
   */
  private extractTitle(content: string): string {
    if (!content) return ''

    // Try to find a title-like pattern (first line, or text before first period/newline)
    const lines = content.split('\n')
    const firstLine = lines[0]?.trim()

    if (firstLine && firstLine.length > 10 && firstLine.length < 100) {
      return firstLine
    }

    // Try first sentence
    const firstSentence = content.split(/[.!?]/)[0]?.trim()
    if (firstSentence && firstSentence.length > 10 && firstSentence.length < 100) {
      return firstSentence
    }

    // Fallback to first 60 characters
    return content.substring(0, 60).trim() + (content.length > 60 ? '...' : '')
  }

  /**
   * Extract excerpt from post content
   */
  private extractExcerpt(content: string, title: string): string {
    if (!content) return ''

    // Remove title from content if it's at the beginning
    let excerptContent = content
    if (title && content.startsWith(title)) {
      excerptContent = content.substring(title.length).trim()
    }

    // Get first few sentences or first 150 characters
    const sentences = excerptContent.split(/[.!?]/)
    let excerpt = ''

    for (const sentence of sentences) {
      if ((excerpt + sentence).length < 150) {
        excerpt += sentence + '. '
      } else {
        break
      }
    }

    if (!excerpt.trim()) {
      excerpt = excerptContent.substring(0, 150).trim() + (excerptContent.length > 150 ? '...' : '')
    }

    return excerpt.trim()
  }

  /**
   * Calculate estimated read time
   */
  private calculateReadTime(content: string): string {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min`
  }

  /**
   * Get formatted articles ready for display
   */
  public async getFormattedArticles(count: number = 10): Promise<ArticleData[]> {
    try {
      // Try to get articles first
      let articles = await this.getArticles(count)

      if (articles.length === 0) {
        // Fallback to posts
        const posts = await this.getPosts(count)
        articles = this.transformPostsToArticles(posts)
      }

      return articles.slice(0, count)
    } catch (error) {
      console.error('Error fetching LinkedIn articles:', error)
      throw error
    }
  }
}

export const linkedInAPI = LinkedInAPI.getInstance()
