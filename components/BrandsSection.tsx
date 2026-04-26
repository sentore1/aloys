'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Brand {
  name: string
  logo: string
  enabled: boolean
}

export default function BrandsSection({ brands, title = "Top Brands" }: { brands: Brand[], title?: string }) {
  const enabledBrands = brands.filter(b => b.enabled)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const itemsPerPage = 6
  
  if (enabledBrands.length === 0) return null

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || enabledBrands.length <= itemsPerPage) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev + itemsPerPage >= enabledBrands.length ? 0 : prev + itemsPerPage
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, enabledBrands.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerPage >= enabledBrands.length ? 0 : prev + itemsPerPage
    )
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - itemsPerPage < 0 
        ? Math.max(0, Math.floor((enabledBrands.length - 1) / itemsPerPage) * itemsPerPage)
        : prev - itemsPerPage
    )
    setIsAutoPlaying(false)
  }

  const visibleBrands = enabledBrands.slice(currentIndex, currentIndex + itemsPerPage)
  const showControls = enabledBrands.length > itemsPerPage
  const totalPages = Math.ceil(enabledBrands.length / itemsPerPage)

  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Our Trusted Global Brand Partnership</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          At I Tech Devices, we are proud to collaborate with industry-leading brands and hold certified status across major IT & security platforms.
        </p>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        {showControls && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110"
              aria-label="Previous brands"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110"
              aria-label="Next brands"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}

        {/* Brands Grid */}
        <div className="overflow-hidden px-2">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 animate-fadeIn">
            {visibleBrands.map((brand, i) => (
              <div 
                key={currentIndex + i} 
                className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="max-w-full max-h-16 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        {showControls && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i * itemsPerPage)
                  setIsAutoPlaying(false)
                }}
                className={`h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / itemsPerPage) === i 
                    ? 'bg-red-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  )
}
