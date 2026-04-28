'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Navbar from '../../components/Navbar'
import ImprovedFooter from '../../components/ImprovedFooter'

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSolutions()
  }, [])

  const fetchSolutions = async () => {
    try {
      const { data, error } = await supabase
        .from('solutions')
        .select('*')
        .eq('enabled', true)
        .order('position')

      if (data && !error) {
        setSolutions(data)
      }
    } catch (error) {
      console.error('Error fetching solutions:', error)
    } finally {
      setLoading(false)
    }
  }

  const parseFeatures = (features: string[] | string): string[] => {
    if (Array.isArray(features)) return features
    try {
      return JSON.parse(features || '[]')
    } catch {
      return []
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar searchTerm="" onSearchChange={() => {}} selectedCategory="All" onCategoryChange={() => {}} categories={[]} siteLogo="" siteName="Itech" headerStyle="minimal" logoSize={60} />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-block bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-full mb-4">
            SOFTWARE SOLUTIONS
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Our <span className="text-red-500">Software</span> Solutions
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Powerful software designed to streamline your operations and elevate your business efficiency.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, i) => {
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
                        {features.slice(0, 3).map((feature: string, idx: number) => (
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
              )
            })}
          </div>
        )}
      </div>

      <ImprovedFooter settings={{ company_description: '', locations: [], quick_links: [], support_links: [] }} siteName="Itech" />
    </div>
  )
}
