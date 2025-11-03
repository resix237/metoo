import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mongoService } from '@/lib/mongodb-service'
import { isAuthenticated } from '@/lib/auth'

// GET /api/articles - Get all articles (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const tag = searchParams.get('tag')

    const where = tag ? {
      tags: {
        has: tag
      }
    } : {}

    const articles = await prisma.article.findMany({
      where,
      orderBy: {
        date: 'desc'
      },
      skip: offset,
      take: limit
    })

    const total = await prisma.article.count({ where })

    return NextResponse.json({
      articles,
      total,
      hasMore: offset + limit < total
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des articles' },
      { status: 500 }
    )
  }
}

// POST /api/articles - Create new article (admin only)
export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, excerpt, content, readTime, url, image, tags } = body

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Titre, extrait et contenu sont requis' },
        { status: 400 }
      )
    }

    // Use native MongoDB service to avoid replica set requirement
    const article = await mongoService.createArticle({
      title,
      excerpt,
      content,
      readTime: readTime || '5 min',
      url: url || '',
      image,
      tags: tags || []
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'article' },
      { status: 500 }
    )
  }
}
