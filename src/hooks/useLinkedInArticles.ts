import { useState, useEffect, useCallback } from 'react'
import { linkedInAuth } from '@/lib/linkedin/auth'
import { ArticleData } from '@/lib/linkedin/config'

interface UseLinkedInArticlesResult {
  articles: ArticleData[]
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  refetch: () => Promise<void>
}

export const useLinkedInArticles = (count: number = 10): UseLinkedInArticlesResult => {
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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

  // Fetch articles from API
  const fetchArticles = useCallback(async () => {
    if (!linkedInAuth.isAuthenticated()) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/linkedin/articles?count=${count}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des articles')
      }

      if (data.success) {
        setArticles(data.articles)
      } else {
        throw new Error(data.message || 'Erreur inconnue')
      }
    } catch (err: any) {
      console.error('Error fetching articles:', err)
      setError(err.message)
      
      // If authentication error, reset auth state
      if (err.message.includes('authenticate') || err.message.includes('expired')) {
        setIsAuthenticated(false)
        linkedInAuth.logout()
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
    refetch
  }
}
