import { NextRequest, NextResponse } from 'next/server'
import { LINKEDIN_CONFIG } from '@/lib/linkedin/config'

export async function POST(request: NextRequest) {
  try {
    const { refresh_token } = await request.json()

    if (!refresh_token) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      )
    }

    // Refresh access token
    const tokenResponse = await fetch(LINKEDIN_CONFIG.TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: LINKEDIN_CONFIG.CLIENT_ID,
        client_secret: LINKEDIN_CONFIG.CLIENT_SECRET,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error('LinkedIn token refresh failed:', errorData)
      return NextResponse.json(
        { error: 'Failed to refresh token' },
        { status: 400 }
      )
    }

    const tokenData = await tokenResponse.json()

    return NextResponse.json({
      access_token: tokenData.access_token,
      expires_in: tokenData.expires_in,
      scope: tokenData.scope,
    })

  } catch (error) {
    console.error('Error in LinkedIn token refresh:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
