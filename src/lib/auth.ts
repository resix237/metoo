import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'
const BLOG_SECRET_CODE = process.env.BLOG_SECRET_CODE || '12345'

export interface AuthPayload {
  isAdmin: boolean
  iat?: number
  exp?: number
}

export function generateToken(): string {
  const payload: AuthPayload = {
    isAdmin: true
  }
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload
  } catch (error) {
    return null
  }
}

export function verifySecretCode(code: string): boolean {
  return code === BLOG_SECRET_CODE
}

export function getTokenFromRequest(request: NextRequest): string | null {
  // Try to get token from Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  
  // Try to get token from cookies
  const tokenCookie = request.cookies.get('blog-auth-token')
  if (tokenCookie) {
    return tokenCookie.value
  }
  
  return null
}

export function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromRequest(request)
  if (!token) return false
  
  const payload = verifyToken(token)
  return payload !== null && payload.isAdmin === true
}
