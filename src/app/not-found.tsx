"use client"
import Image from "next/image"
import Link from "next/link"
import Button from "@/components/ui/Button"

export default function NotFound() {
  return (
    <div className="xl:px-64 px-5 lg:px-32 transition-all ease-in-out duration-100 relative min-h-screen flex flex-col justify-center items-center">
      
      {/* Decorative grid elements */}
      <Image
        src={'/img/grid2.svg'}
        width={200}
        height={200}
        className="absolute -z-10 top-20 left-10 opacity-50"
        alt="decorative grid"
        priority={true}
      />
      
      <Image
        src={'/img/grid.svg'}
        width={170}
        height={170}
        className="absolute -z-10 bottom-20 right-20 opacity-50"
        alt="decorative grid"
        priority={true}
      />

      {/* Main content */}
      <div className="text-center text-white space-y-8">
        
        {/* 404 Title */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-Montserrat font-bold text-transparent bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text">
            404
          </h1>
          
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-Montserrat font-light">
              <span className="font-bold text-xl md:text-3xl">{`<`}</span> 
              Page_not_found 
              <span className="font-bold text-xl md:text-3xl">{`/>`}</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 font-light max-w-md mx-auto">
              Oops! La page que vous recherchez semble avoir disparu dans le cyberespace.
            </p>
          </div>
        </div>

        {/* Error message with code styling */}
        <div className="bg-gray-900/50 border border-violet-500/30 rounded-lg p-6 max-w-lg mx-auto">
          <div className="text-left space-y-2">
            <div className="text-red-400 font-mono text-sm">
              <span className="text-gray-500">1 |</span> Error: Route not found
            </div>
            <div className="text-yellow-400 font-mono text-sm">
              <span className="text-gray-500">2 |</span> Status: 404 - Not Found
            </div>
            <div className="text-blue-400 font-mono text-sm">
              <span className="text-gray-500">3 |</span> Suggestion: Navigate to home
            </div>
          </div>
        </div>

        {/* Navigation options */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              tittle="Retour à l'accueil"
              url="/"
            />
         
          </div>

          {/* Quick navigation links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link 
              href="/works" 
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Mes projets
            </Link>
            <Link 
              href="/articles" 
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Articles
            </Link>
            <Link 
              href="/contacts" 
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Social links at bottom */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-6">
          <Link href="https://www.linkedin.com/in/fouda-marc-arthur-03372a239/">
            <Image
              src={'/img/linkedin.svg'}
              width={20}
              height={20}
              alt="linkedin"
              className="opacity-60 hover:opacity-100 transition-opacity duration-300"
              priority={true}
            />
          </Link>
          <Link href="https://twitter.com/Resix237pro">
            <Image
              src={'/img/twitter.svg'}
              width={20}
              height={20}
              alt="twitter"
              className="opacity-60 hover:opacity-100 transition-opacity duration-300"
              priority={true}
            />
          </Link>
          <Link href="https://github.com/resix237">
            <Image
              src={'/img/github.svg'}
              width={20}
              height={20}
              alt="github"
              className="opacity-60 hover:opacity-100 transition-opacity duration-300"
              priority={true}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
