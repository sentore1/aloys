'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function FooterLocationsManager() {
  const [locations, setLocations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchLocations() }, [])

  const fetchLocations = async () => {
    const { data, error } = await supabase.from('footer_locations').select('*').order('position')
    if (data && !error) setLocations(data)
    setLoading(false)
  }

  const addLocation = async () => {
    const { error } = await supabase.from('footer_locations').insert([{
      title: 'New Office',
      address: 'Office address...',
      phone: '+000 00 000 0000',
      map_embed: '',
      position: locations.length,
      enabled: true
    }])
    if (!error) fetchLocations()
  }

  const updateLocation = async (id: string, updates: any) => {
    const { error } = await supabase.from('footer_locations').update(updates).eq('id', id)
    if (!error) fetchLocations()
  }

  const deleteLocation = async (id: string) => {
    if (confirm('Delete this location?')) {
      const { error } = await supabase.from('footer_locations').delete().eq('id', id)
      if (error) {
        console.error('Delete error:', error)
        alert(`Failed to delete location: ${error.message}`)
      } else {
        fetchLocations()
      }
    }
  }

  const moveLocation = async (id: string, direction: 'up' | 'down') => {
    const index = locations.findIndex(l => l.id === id)
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === locations.length - 1)) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newLocations = [...locations]
    ;[newLocations[index], newLocations[newIndex]] = [newLocations[newIndex], newLocations[index]]
    await Promise.all(newLocations.map((l, i) =>
      supabase.from('footer_locations').update({ position: i }).eq('id', l.id)
    ))
    fetchLocations()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Footer Locations</h2>
        <button onClick={addLocation} className="bg-black text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Location
        </button>
      </div>

      <div className="space-y-6">
        {locations.map((location, index) => (
          <div key={location.id} className="border rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-2">
                <button onClick={() => moveLocation(location.id, 'up')} disabled={index === 0} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button onClick={() => moveLocation(location.id, 'down')} disabled={index === locations.length - 1} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={location.enabled}
                  onChange={(e) => updateLocation(location.id, { enabled: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Enabled</span>
              </label>

              <button onClick={() => deleteLocation(location.id)} className="ml-auto p-2 hover:bg-red-100 text-red-600 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Office Title</label>
                <input
                  type="text"
                  value={location.title}
                  onChange={(e) => updateLocation(location.id, { title: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Head Office"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={location.phone}
                  onChange={(e) => updateLocation(location.id, { phone: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="+971 4 234 5678"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea
                  value={location.address}
                  onChange={(e) => updateLocation(location.id, { address: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={2}
                  placeholder="Full office address..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Google Maps Embed URL</label>
                <input
                  type="url"
                  value={location.map_embed || ''}
                  onChange={(e) => updateLocation(location.id, { map_embed: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Get embed URL: Google Maps → Share → Embed a map → Copy HTML
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
