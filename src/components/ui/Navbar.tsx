"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
interface NavItem {
  name: string
  href: string
}

const navItems: NavItem[] = [
  { name: 'About', href: '/about' },
  { name: 'Articles', href: '/articles' },
  { name: 'Projects', href: '/projects' },
  { name: 'Speaking', href: '/speaking' }
]

function Navbar() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div  className="xl:px-64 px-5 lg:px-32 lg:flex hidden absolute  top-8 z-50 justify-between items-center w-full">
      {/* Image de profil à gauche */}
      <div className="h-9 w-9 rounded-full overflow-hidden flex justify-center items-center my-1.5">
        <Link href="/">
        <Image
          src="/img/profile.jpg"
          width={50}
          height={50}
          alt="logo"
          className=" object-cover ring-2 ring-white/20"
          quality={100}
          priority={true}
          unoptimized={false}
          style={{
            imageRendering: 'crisp-edges',
            filter: 'contrast(1.15) saturate(1.2) brightness(1.05) unsharp-mask(1px, 1px, 0.7)',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        />
        </Link>
      </div>
      <nav className=" lg:block hidden fixed top-8 left-1/2 transform -translate-x-1/2 z-50   ">
    
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-6 py-3">
          <ul className="flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const isHovered = hoveredItem === item.name

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                    relative px-4 py-2 text-sm font-medium transition-all duration-300 ease-out
                    font-Montserrat tracking-wide
                    ${isActive
                        ? 'text-violet-500'
                        : isHovered
                          ? 'text-white'
                          : 'text-gray-300 hover:text-white'
                      }
                  `}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.name}

                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-violet-600 rounded-full"></span>
                    )}

                    {/* Hover effect */}
                    <span
                      className={`
                      absolute inset-0 rounded-full bg-white/5 transition-all duration-300 ease-out
                      ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                    `}
                    ></span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
      {/* Bouton de thème à droite */}
      <div className="h-9 w-9 rounded-full flex justify-center items-center my-1.5">
        <button
          className="h-9 w-9 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 group"
          onClick={() => {
            // Toggle theme logic here
            document.documentElement.classList.toggle('dark')
          }}
        >
          <svg 
            className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Navbar
