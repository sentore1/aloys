'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import ImprovedFooter from '../../../components/ImprovedFooter'

export default function SolutionPage() {
  const params = useParams()
  const slug = params.slug as string
  const [solution, setSolution] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSolution()
  }, [slug])

  const fetchSolution = async () => {
    try {
      const { data, error } = await supabase
        .from('solutions')
        .select('*')
        .eq('link', `/solutions/${slug}`)
        .single()

      if (data && !error) {
        setSolution(data)
      }
    } catch (error) {
      console.error('Error fetching solution:', error)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (!solution) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Solution Not Found</h1>
          <p className="text-gray-600 mb-8">The solution you're looking for doesn't exist.</p>
          <a href="/" className="inline-block bg-red-500 text-white px-8 py-3 rounded font-semibold hover:bg-red-600">
            Back to Home
          </a>
        </div>
        <ImprovedFooter settings={{ company_description: '', locations: [], quick_links: [], support_links: [] }} siteName="Itech" />
      </div>
    )
  }

  const features = parseFeatures(solution.features)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <a href="/" className="text-red-500 hover:text-red-600 font-medium">← Back to Home</a>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="inline-block bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-full mb-4">
              SOFTWARE SOLUTION
            </div>
            <h1 className="text-4xl font-bold mb-6">{solution.title}</h1>
            <p className="text-gray-600 text-lg mb-8">{solution.description}</p>
            
            {features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-red-500 text-xl mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4">
              <a href="/contact" className="inline-block bg-red-500 text-white px-8 py-3 rounded font-semibold hover:bg-red-600">
                Get Started
              </a>
              <a href="/contact" className="inline-block border border-gray-300 text-gray-700 px-8 py-3 rounded font-semibold hover:bg-gray-50">
                Contact Sales
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={solution.image} 
                alt={solution.title}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <ImprovedFooter settings={{ company_description: '', locations: [], quick_links: [], support_links: [] }} siteName="Itech" />
    </div>
  )
}
