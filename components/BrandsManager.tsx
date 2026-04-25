'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function BrandsManager() {
  const [brands, setBrands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchBrands() }, [])

  const fetchBrands = async () => {
    const { data, error } = await supabase.from('brands').select('*').order('position')
    if (data && !error) setBrands(data)
    setLoading(false)
  }

  const addBrand = async () => {
    const { error } = await supabase.from('brands').insert([{
      name: 'New Brand',
      logo: '',
      position: brands.length,
      enabled: true
    }])
    if (!error) fetchBrands()
  }

  const updateBrand = async (id: string, updates: any) => {
    const { error } = await supabase.from('brands').update(updates).eq('id', id)
    if (!error) fetchBrands()
  }

  const deleteBrand = async (id: string) => {
    if (confirm('Delete this brand?')) {
      const { error } = await supabase.from('brands').delete().eq('id', id)
      if (!error) fetchBrands()
    }
  }

  const moveBrand = async (id: string, direction: 'up' | 'down') => {
    const index = brands.findIndex(b => b.id === id)
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === brands.length - 1)) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newBrands = [...brands]
    ;[newBrands[index], newBrands[newIndex]] = [newBrands[newIndex], newBrands[index]]
    await Promise.all(newBrands.map((b, i) =>
      supabase.from('brands').update({ position: i }).eq('id', b.id)
    ))
    fetchBrands()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Brand Logos</h2>
        <button onClick={addBrand} className="bg-black text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Brand
        </button>
      </div>

      <div className="space-y-4">
        {brands.map((brand, index) => (
          <div key={brand.id} className="border rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-2">
                <button onClick={() => moveBrand(brand.id, 'up')} disabled={index === 0} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button onClick={() => moveBrand(brand.id, 'down')} disabled={index === brands.length - 1} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={brand.enabled}
                  onChange={(e) => updateBrand(brand.id, { enabled: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Enabled</span>
              </label>

              <button onClick={() => deleteBrand(brand.id)} className="ml-auto p-2 hover:bg-red-100 text-red-600 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Brand Name</label>
                <input
                  type="text"
                  value={brand.name}
                  onChange={(e) => updateBrand(brand.id, { name: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Hewlett Packard Enterprise"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Logo URL</label>
                <input
                  type="url"
                  value={brand.logo}
                  onChange={(e) => updateBrand(brand.id, { logo: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              {brand.logo && (
                <div className="flex justify-center p-4 bg-gray-50 rounded">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-h-16 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
