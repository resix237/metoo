import { LINKEDIN_CONFIG } from './config'

export class LinkedInAuth {
  private static instance: LinkedInAuth
  private accessToken: string | null = null
  private refreshToken: string | null = null
  private tokenExpiry: number | null = null

  private constructor() {
    // Load tokens from localStorage if available
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('linkedin_access_token')
      this.refreshToken = localStorage.getItem('linkedin_refresh_token')
      const expiry = localStorage.getItem('linkedin_token_expiry')
      this.tokenExpiry = expiry ? parseInt(expiry) : null
    }
  }

  public static getInstance(): LinkedInAuth {
    if (!LinkedInAuth.instance) {
      LinkedInAuth.instance = new LinkedInAuth()
    }
    return LinkedInAuth.instance
  }

  /**
   * Generate LinkedIn OAuth authorization URL
   */
  public getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: LINKEDIN_CONFIG.CLIENT_ID,
      redirect_uri: LINKEDIN_CONFIG.REDIRECT_URI,
      scope: LINKEDIN_CONFIG.SCOPE,
      state: this.generateState()
    })

    return `${LINKEDIN_CONFIG.AUTH_URL}?${params.toString()}`
  }

  /**
   * Exchange authorization code for access token
   */
  public async exchangeCodeForToken(code: string): Promise<boolean> {
    try {
      const response = await fetch('/api/auth/linkedin/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      })

      if (!response.ok) {
        throw new Error('Failed to exchange code for token')
      }

      const data = await response.json()
      
      this.accessToken = data.access_token
      this.refreshToken = data.refresh_token
      this.tokenExpiry = Date.now() + (data.expires_in * 1000)

      // Store in localStorage
      if (typeof window !== 'undefined') {
        if (this.accessToken) {
          localStorage.setItem('linkedin_access_token', this.accessToken)
        }
        if (this.refreshToken) {
          localStorage.setItem('linkedin_refresh_token', this.refreshToken)
        }
        if (this.tokenExpiry !== null) {
          localStorage.setItem('linkedin_token_expiry', this.tokenExpiry.toString())
        }
      }

      return true
    } catch (error) {
      console.error('Error exchanging code for token:', error)
      return false
    }
  }

  /**
   * Check if user is authenticated
   */
  public isAuthenticated(): boolean {
    return !!(this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry)
  }

  /**
   * Get current access token
   */
  public getAccessToken(): string | null {
    if (this.isAuthenticated()) {
      return this.accessToken
    }
    return null
  }

  /**
   * Refresh access token if needed
   */
  public async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) {
      return false
    }

    try {
      const response = await fetch('/api/auth/linkedin/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: this.refreshToken })
      })

      if (!response.ok) {
        throw new Error('Failed to refresh token')
      }

      const data = await response.json()
      
      this.accessToken = data.access_token
      this.tokenExpiry = Date.now() + (data.expires_in * 1000)

      // Update localStorage
      if (typeof window !== 'undefined') {
        if (this.accessToken) {
          localStorage.setItem('linkedin_access_token', this.accessToken)
        }
        if (this.tokenExpiry !== null) {
          localStorage.setItem('linkedin_token_expiry', this.tokenExpiry.toString())
        }
      }

      return true
    } catch (error) {
      console.error('Error refreshing token:', error)
      return false
    }
  }

  /**
   * Logout and clear tokens
   */
  public logout(): void {
    this.accessToken = null
    this.refreshToken = null
    this.tokenExpiry = null

    if (typeof window !== 'undefined') {
      localStorage.removeItem('linkedin_access_token')
      localStorage.removeItem('linkedin_refresh_token')
      localStorage.removeItem('linkedin_token_expiry')
    }
  }

  /**
   * Generate random state for OAuth security
   */
  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15)
  }
}

export const linkedInAuth = LinkedInAuth.getInstance()
