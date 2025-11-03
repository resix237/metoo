import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  if (error) {
    console.error('LinkedIn OAuth error:', error)
    return NextResponse.redirect(new URL('/?linkedin_error=' + error, request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?linkedin_error=no_code', request.url))
  }

  // Redirect to frontend with the code
  return NextResponse.redirect(new URL(`/?linkedin_code=${code}&state=${state}`, request.url))
}
