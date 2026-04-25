'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function DiagnosticPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkFeaturedCards()
  }, [])

  const checkFeaturedCards = async () => {
    try {
      const { data: allData, error: allError } = await supabase.from('featured_cards').select('*')
      const { data: enabledData, error: enabledError } = await supabase.from('featured_cards').select('*').eq('enabled', true).order('position')
      const { data: singleData, error: singleError } = await supabase.from('featured_cards').select('*').eq('enabled', true).order('position').limit(1).single()

      setResult({
        allCards: { data: allData, error: allError },
        enabledCards: { data: enabledData, error: enabledError },
        singleCard: { data: singleData, error: singleError }
      })
    } catch (error) {
      setResult({ exception: error })
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Featured Cards Diagnostic</h1>
      
      <div className="space-y-6">
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">All Cards</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(result?.allCards, null, 2)}
          </pre>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Enabled Cards</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(result?.enabledCards, null, 2)}
          </pre>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Single Card</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(result?.singleCard, null, 2)}
          </pre>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>If you see "relation does not exist" error, run the SQL migration</li>
          <li>If data is null or empty, add a card in admin panel</li>
          <li>Check that at least one card has enabled=true</li>
        </ol>
      </div>
    </div>
  )
}
