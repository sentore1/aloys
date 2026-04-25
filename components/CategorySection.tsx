'use client'

import { Monitor, Printer, Cloud, Fingerprint, CreditCard, Smartphone, IdCard } from 'lucide-react'

interface Category {
  name: string
  icon: string
}

const iconMap: Record<string, any> = {
  monitor: Monitor,
  printer: Printer,
  cloud: Cloud,
  fingerprint: Fingerprint,
  card: CreditCard,
  smartphone: Smartphone,
  idcard: IdCard
}

export default function CategorySection({ categories }: { categories: Category[] }) {
  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <a href="/products" className="text-sm text-gray-600 hover:text-black">Show all</a>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((cat, i) => {
          const Icon = iconMap[cat.icon] || Monitor
          return (
            <div key={i} className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
              <Icon className="w-10 h-10 text-red-500 mb-3" strokeWidth={1.5} />
              <span className="text-sm font-medium text-center">{cat.name}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
