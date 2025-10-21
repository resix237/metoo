"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { experiences, type Experience, type Project } from '@/lib/data/experience-data'

const colorVariants = {
  violet: {
    border: 'border-accent',
    dot: 'bg-primary',
    text: 'text-primary',
    gradient: 'from-primary/20 to-accent/20',
    glow: 'shadow-primary/20'
  },
  blue: {
    border: 'border-accent/80',
    dot: 'bg-primary/90',
    text: 'text-primary/90',
    gradient: 'from-primary/15 to-accent/15',
    glow: 'shadow-primary/15'
  },
  green: {
    border: 'border-accent/60',
    dot: 'bg-primary/80',
    text: 'text-primary/80',
    gradient: 'from-primary/10 to-accent/10',
    glow: 'shadow-primary/10'
  },
  gray: {
    border: 'border-accent/40',
    dot: 'bg-primary/70',
    text: 'text-primary/70',
    gradient: 'from-primary/5 to-accent/5',
    glow: 'shadow-primary/5'
  }
}

interface ProjectCardProps {
  project: Project
  color: keyof typeof colorVariants
  isExpanded: boolean
  onToggle: () => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, color, isExpanded, onToggle }) => {
  const colors = colorVariants[color]
  
  return (
    <div className={`group relative overflow-hidden rounded-xl border border-accent/50 bg-gradient-to-br ${colors.gradient} backdrop-blur-sm transition-all duration-500 hover:border-accent hover:shadow-lg ${colors.glow}`}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <h4 className={`font-bold text-lg ${colors.text} group-hover:text-white transition-colors duration-300`}>
            {project.name}
          </h4>
          <button
            onClick={onToggle}
            className={`ml-4 p-2 rounded-full ${colors.text} hover:bg-primary/10 transition-all duration-300 transform hover:scale-110`}
          >
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <p className="text-text/80 text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, isExpanded ? project.technologies.length : 4).map((tech, index) => (
            <span 
              key={index} 
              className={`px-3 py-1 ${tech.color} text-xs font-medium rounded-full border border-primary/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary/20`}
            >
              {tech.name}
            </span>
          ))}
          {!isExpanded && project.technologies.length > 4 && (
            <span className="px-3 py-1 bg-accent/20 text-text/60 text-xs rounded-full border border-accent/30">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
        
        {/* Expanded content */}
        <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          {project.missions && (
            <div className="mb-4 p-4 bg-secondary/20 rounded-lg border border-accent/5">
              <h5 className={`${colors.text} text-sm font-semibold mb-2 flex items-center`}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Missions
              </h5>
              <p className="text-text/80 text-sm leading-relaxed">
                {project.missions}
              </p>
            </div>
          )}
        </div>
        
        {/* Link */}
        {project.link && (
          <Link 
            href={project.link} 
            target="_blank"
            className={`inline-flex items-center ${colors.text} hover:text-white text-sm font-medium transition-all duration-300 group/link`}
          >
            <span>Voir la solution</span>
            <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}

interface ExperienceCardProps {
  experience: Experience
  index: number
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set())
  const colors = colorVariants[experience.color as keyof typeof colorVariants]
  
  const toggleProject = (projectIndex: number) => {
    const newExpanded = new Set(expandedProjects)
    if (newExpanded.has(projectIndex)) {
      newExpanded.delete(projectIndex)
    } else {
      newExpanded.add(projectIndex)
    }
    setExpandedProjects(newExpanded)
  }
  
  return (
    <div className={`relative pl-8 pb-12 border-l-2 ${colors.border} last:pb-0`}>
      {/* Timeline dot */}
      <div className={`absolute w-4 h-4 ${colors.dot} rounded-full -left-2 top-0 shadow-lg ${colors.glow} animate-pulse`}></div>
      
      {/* Company header */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
          <div>
            <h3 className={`text-2xl font-bold ${colors.text} mb-1 tracking-tight`}>
              {experience.position}
            </h3>
            <p className="text-gray-300 font-semibold text-lg">
              {experience.company}
            </p>
          </div>
          <div className="flex items-center mt-2 lg:mt-0">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-400 font-medium">
              {experience.period}
            </span>
          </div>
        </div>
      </div>
      
      {/* Projects */}
      <div className="space-y-6">
        {experience.projects.map((project, projectIndex) => (
          <ProjectCard
            key={projectIndex}
            project={project}
            color={experience.color as keyof typeof colorVariants}
            isExpanded={expandedProjects.has(projectIndex)}
            onToggle={() => toggleProject(projectIndex)}
          />
        ))}
      </div>
    </div>
  )
}

const Experience: React.FC = () => {
  return (
    <div className="relative xl:px-64 px-5 lg:px-32 py-20 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <Image
        src={'/img/grid2.svg'}
        width={200}
        height={200}
        className="absolute -z-10 top-10 right-10 opacity-30"
        alt="decoration"
        priority={true}
      />
      <Image
        src={'/img/grid.svg'}
        width={150}
        height={150}
        className="absolute -z-10 bottom-20 left-10 opacity-20"
        alt="decoration"
        priority={true}
      />
      
      {/* Header */}
      <div className="relative z-10 mb-16 mt-20">
        <span className="text-2xl font-light tracking-wider mb-4 block">
          <span className="font-bold text-3xl text-white">{`<`}</span> 
          <span className="text-white">
            Professional_Experience
          </span> 
          <span className="font-bold text-3xl text-white">{`/>`}</span>
        </span>
        <div className="w-24 h-1 bg-white rounded-full"></div>
      </div>

      {/* Timeline */}
      <div className="relative z-10 space-y-16">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            index={index}
          />
        ))}
      </div>

      {/* Download CV Section */}
      <div className="relative z-10 mt-20 text-center">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-accent/30 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Télécharger mon CV complet
          </h3>
          <p className="text-text/70 text-sm mb-6 max-w-md mx-auto">
            Retrouvez l'ensemble de mon parcours professionnel, mes compétences et mes réalisations dans un document PDF détaillé.
          </p>
         <div className="flex justify-center">
         <a
            href="/cv/Marc_Fouda_CV.pdf"
            download="Marc_Fouda_CV.pdf"
            className="uppercase relative px-6 py-2 border border-white rounded-3xl flex justify-center place-items-center gap-1.5 before:absolute before:left-0 before:top-1/2 hover:before:top-0 before:h-0 before:z-1 before:rounded-sm hover:before:rounded-full before:transition-all before:duration-500 before:origin-left before:w-0 before:bg-accent/60 hover:before:w-full hover:before:h-full hover:before:origin-right text-white hover:text-white transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="relative z-10">Télécharger le CV</span>
          </a>
         </div>
          
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/50 to-transparent pointer-events-none"></div>
    </div>
  )
}

export default Experience
