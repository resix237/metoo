"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { experiences } from '@/lib/data/experience-data'
import { useLinkedInAPI } from '@/hooks/useLinkedInScraper'

const colorVariants = {
  violet: {
    border: 'border-accent/50',
    dot: 'bg-primary',
    text: 'text-primary',
    glow: 'shadow-primary/20'
  },
  blue: {
    border: 'border-accent/40',
    dot: 'bg-primary/80',
    text: 'text-primary/90',
    glow: 'shadow-primary/15'
  },
  green: {
    border: 'border-accent/30',
    dot: 'bg-primary/70',
    text: 'text-primary/80',
    glow: 'shadow-primary/10'
  },
  gray: {
    border: 'border-accent/20',
    dot: 'bg-primary/60',
    text: 'text-primary/70',
    glow: 'shadow-primary/5'
  }
}

// Fallback articles si LinkedIn n'est pas disponible
const fallbackArticles = [
  {
    id: "fallback-1",
    title: "Connectez-vous à LinkedIn",
    excerpt: "Authentifiez-vous avec LinkedIn pour voir vos vrais articles...",
    date: new Date().toISOString().split('T')[0],
    readTime: "1 min",
    url: "#",
    content: ""
  }
]

const ExperienceAndArticles: React.FC = () => {
  const { articles: linkedInArticles, loading: linkedInLoading, error, isAuthenticated, login, logout, refetch, source, lastUpdated } = useLinkedInAPI(5)
  const [blogArticles, setBlogArticles] = React.useState<any[]>([])
  const [blogLoading, setBlogLoading] = React.useState(true)

  // Fetch articles from the blog API
  React.useEffect(() => {
    const fetchBlogArticles = async () => {
      try {
        setBlogLoading(true)
        const response = await fetch('/api/articles?limit=5')
        if (response.ok) {
          const data = await response.json()
          setBlogArticles(data.articles || [])
        }
      } catch (error) {
        console.error('Error fetching blog articles:', error)
      } finally {
        setBlogLoading(false)
      }
    }

    fetchBlogArticles()
  }, [])

  // Use blog articles if available, otherwise LinkedIn articles, otherwise fallback
  const displayArticles = blogArticles.length > 0 
    ? blogArticles.map(article => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        date: article.date,
        readTime: article.readTime,
        url: `/articles/${article.id}`,
        content: article.content
      }))
    : linkedInArticles.length > 0 
    ? linkedInArticles 
    : fallbackArticles

  const loading = blogLoading || linkedInLoading
  
  return (
    <div className="relative xl:px-64 px-5 lg:px-32 py-16 text-white">
      {/* Background decorations */}
      <Image
        src={'/img/grid2.svg'}
        width={150}
        height={150}
        className="absolute -z-10 top-10 right-10 opacity-20"
        alt="decoration"
        priority={true}
      />
      
      {/* Main Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left Column - Experience */}
        <div className="space-y-8">
          {/* Experience Header */}
          <div>
            <span className="text-xl font-light tracking-wider mb-4 block">
              <span className="font-bold text-2xl text-white">{`<`}</span> 
              <span className="">
                Experience
              </span> 
              <span className="font-bold text-2xl text-white">{`/>`}</span>
            </span>
            <div className="w-16 h-1 bg-white rounded-full mb-2"></div>
            <p className="text-white text-sm">Mon parcours professionnel</p>
          </div>

          {/* Experience Timeline - Compact Version */}
          <div className="space-y-4">
            {experiences.map((experience, index) => {
              const colors = colorVariants[experience.color as keyof typeof colorVariants]
              
              return (
                <div 
                  key={experience.id} 
                  className={`group relative flex items-center p-4 rounded-lg border ${colors.border} bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 transition-all duration-300`}
                >
                  {/* Timeline dot */}
                  <div className={`w-3 h-3 ${colors.dot} rounded-full mr-4 flex-shrink-0`}></div>
                  
                  {/* Company Logo - Smaller */}
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-accent flex items-center justify-center overflow-hidden">
                      {experience.logo ? (
                        <Image
                          src={experience.logo}
                          width={40}
                          height={40}
                          alt={`${experience.company} logo`}
                          className="object-contain"
                        />
                      ) : (
                        <div className={`w-4 h-4 rounded-full ${colors.dot}`}></div>
                      )}
                    </div>
                  </div>

                  {/* Experience Info - Compact */}
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-col">
                      <h3 className={`text-sm font-semibold ${colors.text} truncate`}>
                        {experience.company}
                      </h3>
                      <p className="text-text/80 text-xs truncate">
                        {experience.position}
                      </p>
                      <div className="flex items-center text-xs text-text/60 mt-1">
                        <span>{experience.startDate} - {experience.endDate}</span>
                        <span className="mx-2">•</span>
                        <span>{experience.projects.length} projet{experience.projects.length > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Experience CTA */}
          <div className="text-center  flex items-center place-items-center gap-5  ">
       
           <Link 
              href="/experience"
              className="uppercase relative px-4 py-2 border-[1px] w-full  max-w-52 border-white text-sm rounded-3xl flex justify-center place-items-center gap-1.5 before:absolute before:left-0 before:top-1/2 hover:before:top-0 before:h-0 before:z-1 before:rounded-sm hover:before:rounded-full before:transition-all before:duration-500 before:origin-left before:w-0 before:bg-accent/60 hover:before:w-full hover:before:h-full hover:before:origin-right text-white hover:text-white transition-colors duration-300"
              >
              <span>Voir le détail</span>
              <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
    
            
            {/* Download CV Button */}
            <div className='w-full  max-w-52'>
              <a
                href="/cv/Marc_Fouda_CV.pdf"
                download="Marc_Fouda_CV.pdf"
                className="uppercase relative px-4 py-2  border-[1px] border-white text-sm rounded-3xl flex justify-center place-items-center gap-1.5 before:absolute before:left-0 before:top-1/2 hover:before:top-0 before:h-0 before:z-1 before:rounded-sm hover:before:rounded-full before:transition-all before:duration-500 before:origin-left before:w-0 before:bg-accent/60 hover:before:w-full hover:before:h-full hover:before:origin-right text-white hover:text-white transition-colors duration-300"
              >
                <svg className="w-3 h-3 mr-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="relative z-10">Télécharger CV</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Articles */}
        <div className="space-y-8">
          {/* Articles Header */}
          <div>
            <span className="text-xl font-light tracking-wider mb-4 block">
              <span className="font-bold text-2xl text-primary">{`<`}</span> 
              <span className="bg-gradient-to-r from-primary to-text bg-clip-text text-transparent">
                Recent_Articles
              </span> 
              <span className="font-bold text-2xl text-primary">{`/>`}</span>
            </span>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-2"></div>
            <p className="text-text/70 text-sm">Mes dernières publications LinkedIn</p>
          </div>

          {/* LinkedIn Authentication Status */}
          {/* {!isAuthenticated && (
            <div className="mb-6 p-4 rounded-lg border border-primary/30 bg-primary/10">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-1">🔐 Authentification LinkedIn requise</h4>
                  <p className="text-xs text-text/70">Connectez-vous à LinkedIn pour afficher vos vrais articles</p>
                </div>
                <button
                  onClick={login}
                  className="px-4 py-2 bg-[#0077B5] text-white text-xs rounded-lg hover:bg-[#005885] transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Se connecter
                </button>
              </div>
            </div>
          )} */}

          {/* LinkedIn API Status */}
          {isAuthenticated && source && (
            <div className={`mb-6 p-4 rounded-lg border ${
              source === 'linkedin_api' 
                ? 'border-green-500/30 bg-green-500/10' 
                : 'border-red-500/30 bg-red-500/10'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`text-sm font-semibold mb-1 ${
                    source === 'linkedin_api' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {source === 'linkedin_api' ? '✅ API LinkedIn connectée' : '❌ Erreur API LinkedIn'}
                  </h4>
                  <p className="text-xs text-text/70">
                    {source === 'linkedin_api' 
                      ? `Articles récupérés via l'API LinkedIn officielle${lastUpdated ? ` • ${lastUpdated}` : ''}`
                      : 'Impossible de récupérer les articles via l\'API LinkedIn'}
                  </p>
                </div>
                <div className="flex gap-2">
                  {source === 'linkedin_api' && (
                    <button
                      onClick={logout}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors duration-300"
                    >
                      Se déconnecter
                    </button>
                  )}
                  <a
                    href="https://www.linkedin.com/in/fouda-marc-arthur-03372a239"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:text-primary/80 transition-colors duration-300 flex items-center gap-1"
                  >
                    Voir le profil
                    {/* <ExternalLink className="w-3 h-3" /> */}
                  </a>
                </div>
              </div>
            </div>
          )}
          
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-text/70">Récupération des articles LinkedIn...</span>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-1">Erreur</h4>
                  <p className="text-xs text-red-300">{error}</p>
                </div>
                <button
                  onClick={refetch}
                  className="px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded hover:bg-red-500/30 transition-colors duration-300"
                >
                  Réessayer
                </button>
              </div>
            </div>
          )}
          
          {/* Articles List */}
          <div className="space-y-4">
            {displayArticles.map((article, index) => (
              <div 
                key={article.id}
                className="group relative p-4 rounded-lg border border-accent/50 bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 transition-all duration-300 hover:border-accent"
              >
                <div className="flex items-start space-x-4">
                  {/* Article Image */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center border border-accent">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Article Content */}
                  <div className="flex-grow min-w-0">
                    <h3 className="text-sm font-semibold text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-text/70 mt-1 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-text/60 mt-2">
                      <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                      {article.url !== "#" && (
                        <>
                          <span className="mx-2">•</span>
                          <a 
                            href={article.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-accent transition-colors"
                          >
                            LinkedIn
                          </a>
                        </>
                      )}
                 
                    </div>
                  </div>
                  
                  {/* Read more indicator */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-text/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Articles CTA */}
          <div className="text-center space-y-3  flex justify-center">
            {/* <div className="flex items-center justify-center gap-4">
              <button
                onClick={refetch}
                disabled={loading}
                className="inline-flex items-center px-3 py-2 bg-primary/20 text-primary text-xs font-medium rounded-full hover:bg-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className={`w-3 h-3 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {loading ? 'Actualisation...' : 'Actualiser'}
              </button>
            </div> */}
            <Link 
              href="/articles"
              className="uppercase relative px-4 py-2 border-[1px] w-full  max-w-52 border-white text-sm rounded-3xl flex justify-center place-items-center gap-1.5 before:absolute before:left-0 before:top-1/2 hover:before:top-0 before:h-0 before:z-1 before:rounded-sm hover:before:rounded-full before:transition-all before:duration-500 before:origin-left before:w-0 before:bg-accent/60 hover:before:w-full hover:before:h-full hover:before:origin-right text-white hover:text-white transition-colors duration-300"
              >
              <span>Voir le détail</span>
              <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <Image
        src={'/img/grid.svg'}
        width={120}
        height={120}
        className="absolute -z-10 bottom-10 left-10 opacity-15"
        alt="decoration"
        priority={true}
      />
    </div>
  )
}

export default ExperienceAndArticles
