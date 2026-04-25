'use client'

import { Headphones, CheckCircle, Tag } from 'lucide-react'

interface Feature {
  icon: string
  title: string
  description: string
  enabled: boolean
}

const iconMap: Record<string, any> = {
  headphones: Headphones,
  check: CheckCircle,
  tag: Tag
}

export default function FeaturesSection({ features }: { features: Feature[] }) {
  const enabledFeatures = features.filter(f => f.enabled)
  
  if (enabledFeatures.length === 0) return null

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
        {enabledFeatures.map((feature, i) => {
          const Icon = iconMap[feature.icon] || CheckCircle
          return (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
