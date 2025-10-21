"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { experiences } from '@/lib/data/experience-data'

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

// Données temporaires pour les articles - sera remplacé par les données LinkedIn
const mockArticles = [
  {
    id: 1,
    title: "Les nouvelles tendances du développement web en 2024",
    excerpt: "Découvrez les technologies qui façonnent l'avenir du développement web...",
    date: "2024-01-15",
    readTime: "5 min",
    image: "/img/articles/article1.jpg"
  },
  {
    id: 2,
    title: "Comment optimiser les performances d'une application React",
    excerpt: "Techniques avancées pour améliorer les performances de vos applications...",
    date: "2024-01-10",
    readTime: "8 min",
    image: "/img/articles/article2.jpg"
  },
  {
    id: 3,
    title: "L'importance de l'UX/UI dans le développement moderne",
    excerpt: "Pourquoi l'expérience utilisateur est devenue cruciale...",
    date: "2024-01-05",
    readTime: "6 min",
    image: "/img/articles/article3.jpg"
  },
  {
    id: 4,
    title: "Docker et Kubernetes : Guide pratique",
    excerpt: "Maîtrisez la containerisation et l'orchestration...",
    date: "2023-12-28",
    readTime: "12 min",
    image: "/img/articles/article4.jpg"
  },
  {
    id: 5,
    title: "TypeScript vs JavaScript : Quel choix faire ?",
    excerpt: "Comparaison détaillée entre TypeScript et JavaScript...",
    date: "2023-12-20",
    readTime: "7 min",
    image: "/img/articles/article5.jpg"
  }
]

const ExperienceAndArticles: React.FC = () => {
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
              <span className="font-bold text-2xl text-primary">{`<`}</span> 
              <span className="bg-gradient-to-r from-primary to-text bg-clip-text text-transparent">
                Experience
              </span> 
              <span className="font-bold text-2xl text-primary">{`/>`}</span>
            </span>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-2"></div>
            <p className="text-gray-400 text-sm">Mon parcours professionnel</p>
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
                    <div className="w-10 h-10 rounded-full bg-accent/50 border border-accent flex items-center justify-center overflow-hidden">
                      {experience.logo ? (
                        <Image
                          src={experience.logo}
                          width={24}
                          height={24}
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
          <div className="text-center space-y-3">
            <Link 
              href="/experience"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-accent text-white text-sm font-medium rounded-full hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-105"
            >
              <span>Voir le détail</span>
              <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            {/* Download CV Button */}
            <div className=' flex justify-center'>
              <a
                href="/cv/Marc_Fouda_CV.pdf"
                download="Marc_Fouda_CV.pdf"
                className="uppercase relative px-4 py-2 border border-white text-sm rounded-3xl flex justify-center place-items-center gap-1.5 before:absolute before:left-0 before:top-1/2 hover:before:top-0 before:h-0 before:z-1 before:rounded-sm hover:before:rounded-full before:transition-all before:duration-500 before:origin-left before:w-0 before:bg-accent/60 hover:before:w-full hover:before:h-full hover:before:origin-right text-white hover:text-white transition-colors duration-300"
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

          {/* Articles List */}
          <div className="space-y-4">
            {mockArticles.map((article, index) => (
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
          <div className="text-center">
            <Link 
              href="/articles"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-accent text-white text-sm font-medium rounded-full hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-105"
            >
              <span>Tous les articles</span>
              <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
