'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Tag, Heart, MessageCircle, Share2 } from 'lucide-react'

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

interface BlogResponse {
  articles: Article[]
  total: number
  hasMore: boolean
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    fetchArticles()
  }, [selectedTag])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const url = selectedTag 
        ? `/api/articles?tag=${encodeURIComponent(selectedTag)}`
        : '/api/articles'
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des articles')
      }
      
      const data: BlogResponse = await response.json()
      setArticles(data.articles)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getAllTags = () => {
    const tags = new Set<string>()
    articles.forEach(article => {
      article.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20 ">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Erreur</h1>
            <p className="text-gray-300">{error}</p>
            <button 
              onClick={fetchArticles}
              className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-card text-white pt-20">
      <div className=" mx-auto py-8 xl:px-64 px-5 lg:px-32">
        {/* Header */}
        <div className="text-center md:text-start  mb-12">
          <h1 className="text-4xl md:text-5xl font-light uppercase animate-text font-Montserrat text-white ">
            Blog
          </h1>
          <p className=" md:text-xl text-sm   font-light py-2 animate-text font-Montserrat text-gray-300 max-w-2xl ">
            Découvrez mes réflexions sur le développement web, les technologies modernes et mon parcours professionnel.
          </p>
        </div>


        {/* Tags Filter */}
        {articles.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg mb-4 font-Montserrat text-white">Filtrer par tag :</h3>
            <div className="relative">
              <div className="flex gap-2 text-sm uppercase overflow-x-auto scrollbar-hide pb-2 scroll-smooth">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-xs transition-colors uppercase ${
                    selectedTag === null
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Tous
                </button>
                {getAllTags().map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`flex-shrink-0 px-3 py-1 rounded-full text-xs transition-colors uppercase whitespace-nowrap ${
                      selectedTag === tag
                        ? 'bg-violet-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              
              {/* Gradient fade effect on the right */}
              <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none"></div>
            </div>
          </div>
        )}

        {/* Articles */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Aucun article trouvé</h2>
            <p className="text-gray-400">
              {selectedTag 
                ? `Aucun article avec le tag "${selectedTag}"`
                : "Aucun article n'a été publié pour le moment."
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article 
                key={article.id} 
                className="group bg-gray-800 rounded-xl border border-gray-700 hover:border-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 cursor-pointer overflow-hidden"
                onClick={() => window.location.href = `/articles/${article.id}`}
              >
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                  {article.image ? (
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-violet-600/20 to-blue-600/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 bg-violet-600/30 rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-400">Article</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Meta overlay */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-3 text-xs text-gray-300">
                      <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                        {formatDate(article.date)}
                      </span>
                      <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-xl font-bold mb-3 text-white group-hover:text-violet-400 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  {article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-violet-600/20 text-violet-300 rounded text-xs border border-violet-600/30"
                        >
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 3 && (
                        <span className="inline-block px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">
                          +{article.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Engagement */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{article.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{article.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" />
                        <span>{article.shares}</span>
                      </div>
                    </div>
                    
                    {article.url && (
                      <span className="text-violet-400 text-xs">LinkedIn</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}