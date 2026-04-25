'use client'

interface Solution {
  title: string
  description: string
  image: string
  features: string[] | string
  link: string
  enabled: boolean
}

export default function SolutionsSection({ 
  solutions, 
  sectionTitle = "Our Software Solutions",
  sectionDescription = "Powerful software designed to streamline your operations and elevate your business efficiency."
}: { 
  solutions: Solution[], 
  sectionTitle?: string,
  sectionDescription?: string 
}) {
  const enabledSolutions = solutions.filter(s => s.enabled)
  
  if (enabledSolutions.length === 0) return null

  const parseFeatures = (features: string[] | string): string[] => {
    if (Array.isArray(features)) return features
    try {
      return JSON.parse(features || '[]')
    } catch {
      return []
    }
  }

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <div className="inline-block bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-full mb-4">
          SOFTWARE SOLUTIONS
        </div>
        <h2 className="text-3xl font-bold mb-4">
          {sectionTitle.split(' ').map((word, i) => 
            word === 'Software' ? <span key={i} className="text-red-500">{word} </span> : word + ' '
          )}
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">{sectionDescription}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enabledSolutions.map((solution, i) => {
          const features = parseFeatures(solution.features)
          
          return (
          <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-48 bg-gradient-to-br from-gray-900 to-red-900">
              <img 
                src={solution.image} 
                alt={solution.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">
                  SOFTWARE
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{solution.description}</p>
              
              {features.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-red-500 mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              
              <a 
                href={solution.link || '#'} 
                className="inline-block text-red-500 font-semibold text-sm hover:text-red-600"
              >
                Learn more →
              </a>
            </div>
          </div>
        )})}
      </div>

      <div className="text-center mt-8">
        <a href="/products" className="inline-block bg-black text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition-colors">
          View All Solutions
        </a>
      </div>
    </section>
  )
}
