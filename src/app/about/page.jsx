"use client"
import React from 'react';
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar, ExternalLink, Heart } from 'lucide-react';

function Page() {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Resix237',
      description: 'Follow on GitHub'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/fouda-marc-arthur',
      description: 'Follow on LinkedIn'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:foudamarcarthur@gmail.com',
      description: 'Contact me'
    }
  ];

  const experiences = [
    {
      company: "Kayeros Analytics",
      role: "Développeur Full Stack",
      period: "2024 - Présent",
      description: "Développement d'applications web performantes avec Node.js et React. Création d'interfaces dynamiques et d'API RESTful robustes.",
      technologies: ["Node.js", "React", "Express.js", "MongoDB", "Docker", "Jira"]
    },
    {
      company: "Freelance",
      role: "Développeur Full Stack",
      period: "2019 - 2024",
      description: "5 ans d'expérience en développement full-stack, spécialisé dans Node.js. Intégration de services tiers et gestion de bases de données NoSQL.",
      technologies: ["Node.js", "React", "MongoDB", "Express.js", "API RESTful", "Docker"]
    }
  ];

  return (
    <div className="min-h-screen bg-card text-white pt-20">
      <div className="mx-auto py-8 xl:px-64 px-5 lg:px-32">
        
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-lg md:text-xl uppercase lg:text-4xl font-light  animate-text font-Montserrat text-white leading-tight">
                Je suis Marc Arthur
                <span className="text-accent bg-white w-fit text-lg px-5 block">Sculteur de pixels</span>
              </h1>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-lg md:text-xl font-light font-Montserrat">
                Développeur full-stack expérimenté avec plusieurs annees expériences, 
                spécialisé dans Node.js. Expert pour le developpement d&apos;applications 
                performantes et dynamiques.
              </p>

              <p className="text-base md:text-lg font-light font-Montserrat">
                Polyvalent, j&apos;utilise <span className="font-medium">Express.js</span> pour des applications robustes 
                et <span className="font-medium">MongoDB</span> pour des bases de données NoSQL. 
                J&apos;ai une solide expérience des API RESTful et de l&apos;intégration de services tiers.
              </p>

              <p className="text-base md:text-lg font-light font-Montserrat">
                Familier avec <span className="font-medium">Docker</span> pour la gestion des conteneurs 
                et <span className="font-medium">Jira</span> pour la coordination des projets. 
                Je partage mon travail sur LinkedIn et GitHub, toujours ouvert aux collaborations !
              </p>

              <p className="text-base md:text-lg font-light font-Montserrat">
                Passionné par l&apos;innovation, je suis toujours à l&apos;affût des dernières solutions de pointe 
                qui allient excellence et innovation. Membre actif du 
                <span className="text-violet-400 font-medium"> Yaounndé-Biyem-Assi Chess Club</span>.
              </p>
            </div>

            {/* Contact Info */}
            <div className="pt-6 space-y-3">
              <a 
                href="mailto:foudamarcarthur@gmail.com" 
                className="inline-flex items-center gap-3 text-violet-400 hover:text-violet-300 transition-colors text-lg font-medium"
              >
                <Mail className="w-5 h-5" />
                foudamarcarthur@gmail.com
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>Yaoundé, Cameroun • Département Mfoundi</span>
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="relative">
            <div className="relative mx-auto lg:mx-0 w-80 h-96 lg:w-96 lg:h-[500px]">
              {/* Placeholder for profile image */}
              <div className="w-full h-full bg-gradient-to-br from-violet-600/20 to-blue-600/20 rounded-2xl border border-gray-700 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-violet-600/30 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-400">Photo de profil</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-violet-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-8 font-Montserrat">Suivez-moi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center group-hover:bg-violet-600/30 transition-colors">
                  <social.icon className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white group-hover:text-violet-400 transition-colors">
                    {social.name}
                  </h3>
                  <p className="text-sm text-gray-400">{social.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>

    
      

      </div>
    </div>
  )
}

export default Page;