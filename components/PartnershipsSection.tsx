'use client'

interface Partnership {
  title: string
  subtitle: string
  description: string
  certificate_image: string
  enabled: boolean
}

export default function PartnershipsSection({ 
  partnerships, 
  sectionTitle = "Our Trusted Global Brand Partnership",
  sectionDescription = "At I Tech Devices, we are proud to collaborate with industry-leading brands and hold certified status across major IT & security platforms."
}: { 
  partnerships: Partnership[], 
  sectionTitle?: string,
  sectionDescription?: string 
}) {
  const enabledPartnerships = partnerships.filter(p => p.enabled)
  
  if (enabledPartnerships.length === 0) return null

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{sectionTitle}</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">{sectionDescription}</p>
      </div>

      <div className="space-y-16">
        {enabledPartnerships.map((partnership, i) => (
          <div 
            key={i} 
            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
          >
            {/* Certificate Image */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-2xl p-4 shadow-2xl">
                <img 
                  src={partnership.certificate_image} 
                  alt={partnership.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold">{partnership.title}</h3>
              {partnership.subtitle && (
                <p className="text-lg text-gray-700">{partnership.subtitle}</p>
              )}
              <p className="text-gray-600 leading-relaxed">{partnership.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
