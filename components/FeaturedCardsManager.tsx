'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function FeaturedCardsManager() {
  const [cards, setCards] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    button_text: 'Contact Now',
    button_link: '/support',
    background_color: '#dc2626',
    text_color: '#ffffff',
    details: '',
    enabled: true,
    position: 0,
    card_link: ''
  })

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    const { data } = await supabase.from('featured_cards').select('*').order('position')
    if (data) setCards(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting form:', form)
    
    try {
      let result
      if (editing) {
        result = await supabase.from('featured_cards').update(form).eq('id', editing.id)
        console.log('Update result:', result)
      } else {
        result = await supabase.from('featured_cards').insert([form])
        console.log('Insert result:', result)
      }
      
      if (result.error) {
        alert(`Error: ${result.error.message}`)
        console.error('Supabase error:', result.error)
        return
      }
      
      alert(editing ? 'Card updated!' : 'Card added!')
      resetForm()
      fetchCards()
    } catch (error) {
      console.error('Exception:', error)
      alert(`Exception: ${error}`)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this featured card?')) {
      await supabase.from('featured_cards').delete().eq('id', id)
      fetchCards()
    }
  }

  const handleEdit = (card: any) => {
    setEditing(card)
    setForm(card)
  }

  const resetForm = () => {
    setEditing(null)
    setForm({
      title: '',
      subtitle: '',
      button_text: 'Contact Now',
      button_link: '/support',
      background_color: '#dc2626',
      text_color: '#ffffff',
      details: '',
      enabled: true,
      position: 0,
      card_link: ''
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-medium mb-4">{editing ? 'Edit' : 'Add'} Featured Card</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-3 border rounded focus:outline-none focus:border-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                type="text"
                placeholder="Subtitle"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className="w-full p-3 border rounded focus:outline-none focus:border-black"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Details (shown on hover)</label>
            <textarea
              placeholder="Details shown on hover"
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              className="w-full p-3 border rounded focus:outline-none focus:border-black h-24"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Button Text</label>
              <input
                type="text"
                placeholder="Button Text"
                value={form.button_text}
                onChange={(e) => setForm({ ...form, button_text: e.target.value })}
                className="w-full p-3 border rounded focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Button Link</label>
              <input
                type="text"
                placeholder="Button Link"
                value={form.button_link}
                onChange={(e) => setForm({ ...form, button_link: e.target.value })}
                className="w-full p-3 border rounded focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Card Click Link (optional)</label>
            <input
              type="text"
              placeholder="e.g., /products or https://example.com (leave empty for no link)"
              value={form.card_link || ''}
              onChange={(e) => setForm({ ...form, card_link: e.target.value })}
              className="w-full p-3 border rounded"
            />
            <p className="text-xs text-gray-500 mt-1">When set, clicking anywhere on the card will navigate to this URL</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Background Color</label>
              <input
                type="color"
                value={form.background_color}
                onChange={(e) => setForm({ ...form, background_color: e.target.value })}
                className="w-full h-12 border rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Text Color</label>
              <input
                type="color"
                value={form.text_color}
                onChange={(e) => setForm({ ...form, text_color: e.target.value })}
                className="w-full h-12 border rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Position</label>
              <input
                type="number"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: parseInt(e.target.value) })}
                className="w-full p-3 border rounded focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Enabled</span>
          </label>

          <div className="flex gap-2">
            <button type="submit" className="bg-black text-white px-6 py-2 rounded flex items-center gap-2">
              <Save className="w-4 h-4" />
              {editing ? 'Update' : 'Add'}
            </button>
            {editing && (
              <button type="button" onClick={resetForm} className="border px-6 py-2 rounded flex items-center gap-2">
                <X className="w-4 h-4" />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-medium mb-4">Featured Cards ({cards.length})</h2>
        <div className="space-y-3">
          {cards.map((card) => (
            <div key={card.id} className="border rounded p-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded"
                    style={{ backgroundColor: card.background_color }}
                  />
                  <div>
                    <h3 className="font-semibold">{card.title}</h3>
                    <p className="text-sm text-gray-500">{card.subtitle}</p>
                    <p className="text-xs text-gray-400 mt-1">Position: {card.position}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs ${card.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {card.enabled ? 'Enabled' : 'Disabled'}
                </span>
                <button onClick={() => handleEdit(card)} className="text-blue-600 p-2">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(card.id)} className="text-red-600 p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
