'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, LogOut, Eye, Save, X } from 'lucide-react'

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
  published: boolean
  linkedinPostUrl?: string
  createdAt: string
  updatedAt: string
}

interface ArticleForm {
  title: string
  excerpt: string
  content: string
  readTime: string
  url: string
  image: string
  tags: string[]
  published: boolean
  shareToLinkedin: boolean
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [secretCode, setSecretCode] = useState('')
  const [loginError, setLoginError] = useState('')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [formData, setFormData] = useState<ArticleForm>({
    title: '',
    excerpt: '',
    content: '',
    readTime: '5 min',
    url: '',
    image: '',
    tags: [],
    published: false,
    shareToLinkedin: false
  })
  const [tagInput, setTagInput] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    // Check if already authenticated
    checkAuthStatus()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles()
    }
  }, [isAuthenticated])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      // Not authenticated
      setIsAuthenticated(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secretCode })
      })

      if (response.ok) {
        setIsAuthenticated(true)
        setSecretCode('')
      } else {
        const data = await response.json()
        setLoginError(data.error || 'Code secret invalide')
      }
    } catch (error) {
      setLoginError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      setArticles([])
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(data.articles)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingArticle ? `/api/articles/${editingArticle.id}` : '/api/articles'
      const method = editingArticle ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        await fetchArticles()
        resetForm()
      } else {
        const data = await response.json()
        alert(data.error || 'Erreur lors de la sauvegarde')
      }
    } catch (error) {
      alert('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchArticles()
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      alert('Erreur de connexion')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      readTime: '5 min',
      url: '',
      image: '',
      tags: [],
      published: false,
      shareToLinkedin: false
    })
    setTagInput('')
    setEditingArticle(null)
    setShowForm(false)
    setShowPreview(false)
  }

  const startEdit = (article: Article) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      readTime: article.readTime,
      url: article.url || '',
      image: article.image || '',
      tags: article.tags,
      published: article.published || false,
      shareToLinkedin: false
    })
    setEditingArticle(article)
    setShowForm(true)
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Administration du Blog</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="secretCode" className="block text-sm font-medium mb-2">
                Code secret (5 chiffres)
              </label>
              <input
                type="password"
                id="secretCode"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                maxLength={5}
                pattern="[0-9]{5}"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="12345"
                required
              />
            </div>

            {loginError && (
              <div className="text-red-400 text-sm">{loginError}</div>
            )}

            <button
              type="submit"
              disabled={loading || secretCode.length !== 5}
              className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Administration du Blog</h1>
          <div className="flex gap-4">
            <a
              href="/blog"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              Voir le blog
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Add Article Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nouvel article
          </button>
        </div>

        {/* Article Form */}
        {showForm && (
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {editingArticle ? 'Modifier l\'article' : 'Nouvel article'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titre</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Extrait</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Contenu</label>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-sm text-violet-400 hover:text-violet-300"
                  >
                    {showPreview ? 'Éditer' : 'Prévisualiser'}
                  </button>
                </div>

                {showPreview ? (
                  <div className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg min-h-[250px] prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap">{formData.content}</div>
                  </div>
                ) : (
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={10}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 font-mono"
                    required
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Temps de lecture</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500"
                    placeholder="5 min"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">URL (optionnel)</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL (optionnel)</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500"
                    placeholder="Ajouter un tag"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-violet-600/20 text-violet-300 rounded-full text-sm border border-violet-600/30"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-6 p-4 bg-gray-700/30 rounded-lg border border-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-violet-600 focus:ring-violet-500"
                  />
                  <span>Publier l'article</span>
                </label>

                {formData.published && !editingArticle && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.shareToLinkedin}
                      onChange={(e) => setFormData(prev => ({ ...prev, shareToLinkedin: e.target.checked }))}
                      className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Publier sur LinkedIn (si nouveau)</span>
                  </label>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Articles List */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Articles ({articles.length})</h2>
          </div>

          {loading && !showForm ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto"></div>
            </div>
          ) : articles.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              Aucun article trouvé
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {articles.map((article) => (
                <div key={article.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{formatDate(article.createdAt)}</span>
                        <span>{article.readTime}</span>
                        <span>{article.tags.length} tags</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${article.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {article.published ? 'Publié' : 'Brouillon'}
                        </span>
                        {article.linkedinPostUrl && (
                          <a href={article.linkedinPostUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            Voir sur LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => startEdit(article)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
