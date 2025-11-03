import { NextRequest, NextResponse } from 'next/server'
import { LINKEDIN_CONFIG } from '@/lib/linkedin/config'

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      )
    }

    // Exchange code for access token
    const tokenResponse = await fetch(LINKEDIN_CONFIG.TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: LINKEDIN_CONFIG.CLIENT_ID,
        client_secret: LINKEDIN_CONFIG.CLIENT_SECRET,
        redirect_uri: LINKEDIN_CONFIG.REDIRECT_URI,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error('LinkedIn token exchange failed:', errorData)
      return NextResponse.json(
        { error: 'Failed to exchange code for token' },
        { status: 400 }
      )
    }

    const tokenData = await tokenResponse.json()

    return NextResponse.json({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_in: tokenData.expires_in,
      scope: tokenData.scope,
    })

  } catch (error) {
    console.error('Error in LinkedIn token exchange:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
