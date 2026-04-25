'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface FeatureCard {
  title: string
  subtitle?: string
  image: string
  bgColor?: string
  bg_color?: string
  card_link?: string
  image_style?: 'side' | 'cover'
}

export default function FeatureCards({ cards }: { cards: FeatureCard[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || cards.length <= 2) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(cards.length / 2))
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, cards.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(cards.length / 2))
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(cards.length / 2)) % Math.ceil(cards.length / 2))
    setIsAutoPlaying(false)
  }

  const showControls = cards.length > 2

  if (!cards || cards.length === 0) return null

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Trending Products</h2>
        {showControls && (
          <div className="flex gap-2">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: Math.ceil(cards.length / 2) }).map((_, slideIndex) => (
            <div key={slideIndex} className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
              {cards.slice(slideIndex * 2, slideIndex * 2 + 2).map((card, cardIndex) => {
                const isCoverStyle = card.image_style === 'cover'
                
                return (
                <div 
                  key={slideIndex * 2 + cardIndex} 
                  className="relative rounded-2xl overflow-hidden h-64 group"
                  style={{ 
                    backgroundColor: card.bg_color || card.bgColor || '#f3f4f6',
                    cursor: card.card_link ? 'pointer' : 'default'
                  }}
                  onClick={() => card.card_link && (window.location.href = card.card_link)}
                >
                  {isCoverStyle && card.image && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: `url(${card.image})` }}
                    />
                  )}
                  
                  <div className={`absolute inset-0 ${isCoverStyle ? 'bg-black/40' : ''}`} />
                  
                  <div className="absolute inset-0 flex flex-col items-start justify-between p-8">
                    <div className="z-10 max-w-[60%]">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 break-words drop-shadow-lg">{card.title}</h3>
                      {card.subtitle && (
                        <p className="text-base md:text-lg text-white/90 break-words drop-shadow-lg">{card.subtitle}</p>
                      )}
                    </div>
                    
                    {!isCoverStyle && card.image && (
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="absolute right-8 bottom-8 h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                </div>
              )})}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      {showControls && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(cards.length / 2) }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i)
                setIsAutoPlaying(false)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === i 
                  ? 'bg-red-500 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
