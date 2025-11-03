'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Calendar, Clock, Heart, MessageCircle, Share2, ArrowLeft, Tag } from 'lucide-react'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  url?: string
  image?: string
  tags: string[]
  likes: number
  comments: number
  shares: number
  createdAt: string
  updatedAt: string
}

export default function ArticleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/articles/${params.id}`)
        if (!response.ok) {
          throw new Error('Article non trouvé')
        }
        const data = await response.json()
        setArticle(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchArticle()
    }
  }, [params.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-card text-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/4 mb-6"></div>
            <div className="h-12 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-800 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6"></div>
              <div className="h-4 bg-gray-800 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-card text-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <Link 
            href="/articles" 
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-semibold mb-4">Article non trouvé</h1>
            <p className="text-gray-400 mb-8">{error}</p>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
            >
              Retour au blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-card text-white pt-20">
      <div className="mx-auto py-8 xl:px-64 px-5 lg:px-32">
        {/* Navigation */}
        <Link 
          href="/articles" 
          className="inline-flex items-center gap-2 font-Montserrat underline underline-offset-4 text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            {article.excerpt}
          </p>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-violet-600/20 text-violet-300 rounded-full text-sm border border-violet-600/30"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Image */}
        {article.image && (
          <div className="mb-8">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl border border-gray-700"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-12">
          <div className="text-gray-300 leading-relaxed space-y-6">
            {article.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        </article>

        {/* Engagement */}
        <div className="flex items-center justify-between py-6 border-t border-gray-700">
          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>{article.likes}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span>{article.comments}</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              <span>{article.shares}</span>
            </div>
          </div>

          {/* External Link */}
          {article.url && (
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors text-sm font-medium"
            >
              Voir sur LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
