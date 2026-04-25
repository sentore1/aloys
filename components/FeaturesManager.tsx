'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { supabase } from '../lib/supabase'

const iconOptions = ['headphones', 'check', 'tag']

export default function FeaturesManager() {
  const [features, setFeatures] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchFeatures() }, [])

  const fetchFeatures = async () => {
    const { data, error } = await supabase.from('features').select('*').order('position')
    if (data && !error) setFeatures(data)
    setLoading(false)
  }

  const addFeature = async () => {
    const { error } = await supabase.from('features').insert([{
      icon: 'check',
      title: 'New Feature',
      description: 'Feature description...',
      position: features.length,
      enabled: true
    }])
    if (!error) fetchFeatures()
  }

  const updateFeature = async (id: string, updates: any) => {
    const { error } = await supabase.from('features').update(updates).eq('id', id)
    if (!error) fetchFeatures()
  }

  const deleteFeature = async (id: string) => {
    if (confirm('Delete this feature?')) {
      const { error } = await supabase.from('features').delete().eq('id', id)
      if (!error) fetchFeatures()
    }
  }

  const moveFeature = async (id: string, direction: 'up' | 'down') => {
    const index = features.findIndex(f => f.id === id)
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === features.length - 1)) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newFeatures = [...features]
    ;[newFeatures[index], newFeatures[newIndex]] = [newFeatures[newIndex], newFeatures[index]]
    await Promise.all(newFeatures.map((f, i) =>
      supabase.from('features').update({ position: i }).eq('id', f.id)
    ))
    fetchFeatures()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Features Section</h2>
        <button onClick={addFeature} className="bg-black text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Feature
        </button>
      </div>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={feature.id} className="border rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-2">
                <button onClick={() => moveFeature(feature.id, 'up')} disabled={index === 0} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button onClick={() => moveFeature(feature.id, 'down')} disabled={index === features.length - 1} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={feature.enabled}
                  onChange={(e) => updateFeature(feature.id, { enabled: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Enabled</span>
              </label>

              <button onClick={() => deleteFeature(feature.id)} className="ml-auto p-2 hover:bg-red-100 text-red-600 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Icon</label>
                <select
                  value={feature.icon}
                  onChange={(e) => updateFeature(feature.id, { icon: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => updateFeature(feature.id, { title: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={feature.description}
                  onChange={(e) => updateFeature(feature.id, { description: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
