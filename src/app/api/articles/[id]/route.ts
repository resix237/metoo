import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mongoService } from '@/lib/mongodb-service'
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
    const { title, excerpt, content, readTime, url, image, tags, published, linkedinPostUrl, shareToLinkedin } = body

    // Handle LinkedIn sharing if requested and not yet shared
    let finalLinkedinPostUrl = linkedinPostUrl
    if (published && shareToLinkedin && url && !linkedinPostUrl) {
      try {
        const { linkedInAPI } = await import('@/lib/linkedin/api')
        finalLinkedinPostUrl = await linkedInAPI.shareArticle({
          title,
          excerpt,
          url
        })
      } catch (error) {
        console.error('Error sharing to LinkedIn:', error)
      }
    }

    const success = await mongoService.updateArticle(params.id, {
      title,
      excerpt,
      content,
      readTime,
      url,
      image,
      tags,
      published,
      linkedinPostUrl: finalLinkedinPostUrl,
      updatedAt: new Date()
    })

    if (!success) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: params.id,
      title,
      excerpt,
      linkedinPostUrl: finalLinkedinPostUrl,
      published
    })
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

    const success = await mongoService.deleteArticle(params.id)

    if (!success) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      )
    }

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
