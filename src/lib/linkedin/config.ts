export const LINKEDIN_CONFIG = {
  CLIENT_ID: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || '',
  CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET || '',
  REDIRECT_URI: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI || 'http://localhost:3000/api/auth/linkedin/callback',
  SCOPE: 'r_liteprofile r_emailaddress w_member_social',
  API_BASE_URL: 'https://api.linkedin.com/v2',
  AUTH_URL: 'https://www.linkedin.com/oauth/v2/authorization',
  TOKEN_URL: 'https://www.linkedin.com/oauth/v2/accessToken'
}

export interface LinkedInProfile {
  id: string
  firstName: {
    localized: {
      [key: string]: string
    }
  }
  lastName: {
    localized: {
      [key: string]: string
    }
  }
  profilePicture?: {
    displayImage: string
  }
}

export interface LinkedInPost {
  id: string
  author: string
  created: {
    time: number
  }
  lastModified: {
    time: number
  }
  specificContent: {
    'com.linkedin.ugc.ShareContent': {
      shareCommentary: {
        text: string
      }
      shareMediaCategory: string
      media?: Array<{
        status: string
        description: {
          text: string
        }
        media: string
        title: {
          text: string
        }
      }>
    }
  }
  visibility: {
    'com.linkedin.ugc.MemberNetworkVisibility': string
  }
}

export interface ArticleData {
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
