import { NextRequest, NextResponse } from 'next/server'
import { verifySecretCode, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { secretCode } = await request.json()

    if (!secretCode) {
      return NextResponse.json(
        { error: 'Code secret requis' },
        { status: 400 }
      )
    }

    if (!verifySecretCode(secretCode)) {
      return NextResponse.json(
        { error: 'Code secret invalide' },
        { status: 401 }
      )
    }

    const token = generateToken()

    const response = NextResponse.json(
      { success: true, message: 'Connexion réussie' },
      { status: 200 }
    )

    // Set HTTP-only cookie for security
    response.cookies.set('blog-auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
