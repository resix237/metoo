"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { experiences } from '@/lib/data/experience-data'

const colorVariants = {
  violet: {
    border: 'border-violet-500/30',
    dot: 'bg-violet-500',
    text: 'text-violet-400',
    glow: 'shadow-violet-500/20'
  },
  blue: {
    border: 'border-blue-500/30',
    dot: 'bg-blue-500',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/20'
  },
  green: {
    border: 'border-green-500/30',
    dot: 'bg-green-500',
    text: 'text-green-400',
    glow: 'shadow-green-500/20'
  },
  gray: {
    border: 'border-gray-500/30',
    dot: 'bg-gray-500',
    text: 'text-gray-400',
    glow: 'shadow-gray-500/20'
  }
}

const ExperienceMinimal: React.FC = () => {
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
      
      {/* Header */}
      <div className="mb-12">
        <span className="text-xl font-light tracking-wider mb-4 block">
          <span className="font-bold text-2xl text-violet-400">{`<`}</span> 
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Experience sdsdcds
          </span> 
          <span className="font-bold text-2xl text-blue-400">{`/>`}</span>
        </span>
        <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full mb-2"></div>
        <p className="text-gray-400 text-sm">Mon parcours professionnel en quelques étapes clés</p>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {experiences.map((experience, index) => {
          const colors = colorVariants[experience.color as keyof typeof colorVariants]
          
          return (
            <div 
              key={experience.id} 
              className={`group relative flex items-center p-6 rounded-xl border ${colors.border} bg-gray-900/30 backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300 hover:shadow-lg ${colors.glow}`}
            >
              {/* Company Logo */}
              <div className="flex-shrink-0 mr-6">
                <div className="w-16 h-16 rounded-full bg-white border border-gray-700 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
        
                 
                </div>
              </div>

              {/* Experience Info */}
              <div className="flex-grow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-2 lg:mb-0">
                    <h3 className={`text-lg font-semibold ${colors.text} group-hover:text-white transition-colors duration-300`}>
                      {experience.position}
                    </h3>
                    <p className="text-gray-300 font-medium">
                      {experience.company}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-400">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">
                      {experience.period}
                    </span>
                  </div>
                </div>
                
                {/* Projects count */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>{experience.projects.length} projet{experience.projects.length > 1 ? 's' : ''}</span>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Call to action */}
      <div className="mt-12 text-center">
        <Link 
          href="/experience"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium rounded-full hover:from-violet-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
        >
          <span>Voir le détail complet</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
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

export default ExperienceMinimal
