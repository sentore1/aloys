'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { supabase } from '../lib/supabase'

const iconOptions = ['monitor', 'printer', 'cloud', 'fingerprint', 'card', 'smartphone', 'idcard']

export default function CategoryIconsManager() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchCategories() }, [])

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories_with_icons').select('*').order('position')
    if (data && !error) setCategories(data)
    setLoading(false)
  }

  const addCategory = async () => {
    const { error } = await supabase.from('categories_with_icons').insert([{
      name: 'New Category',
      icon: 'monitor',
      position: categories.length,
      enabled: true
    }])
    if (!error) fetchCategories()
  }

  const updateCategory = async (id: string, updates: any) => {
    const { error } = await supabase.from('categories_with_icons').update(updates).eq('id', id)
    if (!error) fetchCategories()
  }

  const deleteCategory = async (id: string) => {
    if (confirm('Delete this category?')) {
      const { error } = await supabase.from('categories_with_icons').delete().eq('id', id)
      if (!error) fetchCategories()
    }
  }

  const moveCategory = async (id: string, direction: 'up' | 'down') => {
    const index = categories.findIndex(c => c.id === id)
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === categories.length - 1)) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newCategories = [...categories]
    ;[newCategories[index], newCategories[newIndex]] = [newCategories[newIndex], newCategories[index]]
    await Promise.all(newCategories.map((c, i) =>
      supabase.from('categories_with_icons').update({ position: i }).eq('id', c.id)
    ))
    fetchCategories()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Category Icons</h2>
        <button onClick={addCategory} className="bg-black text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((cat, index) => (
          <div key={cat.id} className="border rounded-lg p-4 flex items-center gap-4">
            <div className="flex gap-2">
              <button onClick={() => moveCategory(cat.id, 'up')} disabled={index === 0} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                <ChevronUp className="w-4 h-4" />
              </button>
              <button onClick={() => moveCategory(cat.id, 'down')} disabled={index === categories.length - 1} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              value={cat.name}
              onChange={(e) => updateCategory(cat.id, { name: e.target.value })}
              className="flex-1 p-2 border rounded"
              placeholder="Category name"
            />

            <select
              value={cat.icon}
              onChange={(e) => updateCategory(cat.id, { icon: e.target.value })}
              className="p-2 border rounded"
            >
              {iconOptions.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={cat.enabled}
                onChange={(e) => updateCategory(cat.id, { enabled: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Enabled</span>
            </label>

            <button onClick={() => deleteCategory(cat.id)} className="p-2 hover:bg-red-100 text-red-600 rounded">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
