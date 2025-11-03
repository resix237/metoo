import { useState, useEffect, useCallback } from 'react'
import { linkedInAuth } from '@/lib/linkedin/auth'

interface LinkedInArticle {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  url: string
  image?: string
  engagement?: {
    likes: number
    comments: number
    shares: number
  }
}

interface UseLinkedInAPIResult {
  articles: LinkedInArticle[]
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  refetch: () => Promise<void>
  source: 'linkedin_api' | 'unauthenticated' | null
  lastUpdated?: string
}

export const useLinkedInAPI = (count: number = 5): UseLinkedInAPIResult => {
  const [articles, setArticles] = useState<LinkedInArticle[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [source, setSource] = useState<'linkedin_api' | 'unauthenticated' | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined)

  // Check authentication status
  useEffect(() => {
    setIsAuthenticated(linkedInAuth.isAuthenticated())
  }, [])

  // Handle OAuth callback
  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('linkedin_code')
      const error = urlParams.get('linkedin_error')

      if (error) {
        setError(`Erreur d'authentification LinkedIn: ${error}`)
        return
      }

      if (code && !linkedInAuth.isAuthenticated()) {
        setLoading(true)
        try {
          const success = await linkedInAuth.exchangeCodeForToken(code)
          if (success) {
            setIsAuthenticated(true)
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname)
            // Fetch articles after successful authentication
            await fetchArticles()
          } else {
            setError('Échec de l\'authentification LinkedIn')
          }
        } catch (err) {
          setError('Erreur lors de l\'authentification LinkedIn')
        } finally {
          setLoading(false)
        }
      }
    }

    handleCallback()
  }, [])

  // Fetch articles from LinkedIn API
  const fetchArticles = useCallback(async () => {
    if (!linkedInAuth.isAuthenticated()) {
      setSource('unauthenticated')
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log(`Fetching ${count} articles from LinkedIn API...`)
      
      const response = await fetch(`/api/linkedin/articles?count=${count}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des articles')
      }

      if (data.success) {
        setArticles(data.articles)
        setSource(data.source)
        setLastUpdated(data.lastUpdated)
        console.log(`Successfully loaded ${data.count} articles from ${data.source}`)
      } else {
        throw new Error(data.message || 'Erreur inconnue')
      }
    } catch (err: any) {
      console.error('Error fetching LinkedIn articles:', err)
      setError(err.message)
      
      // If authentication error, reset auth state
      if (err.message.includes('authenticate') || err.message.includes('expired')) {
        setIsAuthenticated(false)
        linkedInAuth.logout()
        setSource('unauthenticated')
      }
    } finally {
      setLoading(false)
    }
  }, [count])

  // Fetch articles when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles()
    }
  }, [isAuthenticated, fetchArticles])

  // Login function
  const login = useCallback(() => {
    const authUrl = linkedInAuth.getAuthorizationUrl()
    window.location.href = authUrl
  }, [])

  // Logout function
  const logout = useCallback(() => {
    linkedInAuth.logout()
    setIsAuthenticated(false)
    setArticles([])
    setError(null)
    setSource('unauthenticated')
  }, [])

  // Refetch function
  const refetch = useCallback(async () => {
    await fetchArticles()
  }, [fetchArticles])

  return {
    articles,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    refetch,
    source,
    lastUpdated
  }
}
