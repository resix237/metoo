import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

// GET /api/articles/[id] - Get single article (public)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Return empty response during build phase
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      )
    }

    const article = await prisma.article.findUnique({
      where: {
        id: params.id
      }
    })

    if (!article) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'article' },
      { status: 500 }
    )
  }
}

// PUT /api/articles/[id] - Update article (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, excerpt, content, readTime, url, image, tags } = body

    const article = await prisma.article.update({
      where: {
        id: params.id
      },
      data: {
        title,
        excerpt,
        content,
        readTime,
        url,
        image,
        tags,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de l\'article' },
      { status: 500 }
    )
  }
}

// DELETE /api/articles/[id] - Delete article (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    await prisma.article.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json(
      { message: 'Article supprimé avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'article' },
      { status: 500 }
    )
  }
}
