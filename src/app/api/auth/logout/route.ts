import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Déconnexion réussie' },
    { status: 200 }
  )

  // Clear the auth cookie
  response.cookies.set('blog-auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0 // Expire immediately
  })

  return response
}
