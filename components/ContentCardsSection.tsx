'use client'

interface ContentCard {
  title: string
  description: string
  image: string
  background_color: string
  text_color: string
  link: string
  button_text: string
  card_size: 'small' | 'medium' | 'large' | 'hero'
  enabled: boolean
}

export default function ContentCardsSection({ cards }: { cards: ContentCard[] }) {
  const enabledCards = cards.filter(c => c.enabled)
  
  if (enabledCards.length === 0) return null

  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {enabledCards.map((card, i) => {
          const sizeClasses = {
            'hero': 'md:col-span-2 lg:col-span-4',
            'large': 'md:col-span-2 lg:col-span-2',
            'medium': 'md:col-span-1 lg:col-span-2',
            'small': 'md:col-span-1 lg:col-span-1'
          }
          
          const heightClasses = {
            'hero': 'min-h-[400px]',
            'large': 'min-h-[320px]',
            'medium': 'min-h-[280px]',
            'small': 'min-h-[240px]'
          }
          
          return (
            <a 
              key={i}
              href={card.link || '#'}
              className={`group relative overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300 ${sizeClasses[card.card_size || 'medium']} ${heightClasses[card.card_size || 'medium']}`}
              style={{ 
                backgroundColor: card.background_color
              }}
            >
              {card.image && (
                <div className="absolute inset-0">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              )}
              
              <div 
                className="relative p-6 h-full flex flex-col justify-between"
                style={{ color: card.text_color }}
              >
                <div>
                  <h3 className={`font-bold leading-tight mb-2 ${
                    card.card_size === 'hero' ? 'text-3xl md:text-4xl' : 
                    card.card_size === 'large' ? 'text-xl md:text-2xl' : 
                    'text-lg md:text-xl'
                  }`}>
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className={`${
                      card.card_size === 'hero' ? 'text-sm md:text-base' : 'text-xs md:text-sm'
                    }`}>
                      {card.description}
                    </p>
                  )}
                </div>
                
                {card.button_text && (
                  <div className="mt-4">
                    <span className="inline-block bg-white text-black px-4 py-1.5 rounded text-xs font-semibold hover:bg-gray-100 transition-colors">
                      {card.button_text}
                    </span>
                  </div>
                )}
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
