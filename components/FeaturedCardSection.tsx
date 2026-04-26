'use client'

interface FeaturedCard {
  id: string
  title: string
  subtitle: string
  button_text: string
  button_link: string
  background_color: string
  text_color: string
  details: string
  enabled: boolean
  position: number
  card_link?: string
}

export default function FeaturedCardSection({ card }: { card: FeaturedCard }) {
  console.log('FeaturedCardSection rendering with card:', card)
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking the button
    if ((e.target as HTMLElement).closest('a')) return
    
    if (card.card_link) {
      window.location.href = card.card_link
    }
  }
  
  return (
    <div className="mb-8">
      <div 
        className="relative rounded-2xl p-8 md:p-12 overflow-hidden group transition-all duration-500"
        style={{ 
          backgroundColor: card.background_color, 
          color: card.text_color,
          cursor: card.card_link ? 'pointer' : 'default'
        }}
        onClick={handleCardClick}
      >
        <div className="relative z-10 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{card.title}</h2>
          <p className="text-lg mb-6 opacity-90">{card.subtitle}</p>
          <a 
            href={card.button_link} 
            className="inline-block px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: card.text_color, 
              color: card.background_color 
            }}
          >
            {card.button_text}
          </a>
        </div>
        
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"
          style={{ backgroundColor: card.background_color }}
        >
          <div className="text-center">
            <p className="text-white text-base md:text-lg max-w-2xl leading-relaxed mb-6">{card.details}</p>
            <a 
              href={card.button_link} 
              className="inline-block px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: card.text_color, 
                color: card.background_color 
              }}
            >
              {card.button_text}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
