'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function FeatureCardsManager() {
  const [cards, setCards] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<any>({})

  useEffect(() => { fetchCards() }, [])

  const fetchCards = async () => {
    const { data, error } = await supabase.from('feature_cards').select('*').order('position')
    if (data && !error) setCards(data)
    setLoading(false)
  }

  const handleFileUpload = async (file: File, callback: (url: string) => void) => {
    try {
      console.log('Starting upload for file:', file.name, 'Size:', file.size)
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `feature-cards/${fileName}`

      console.log('Uploading to path:', filePath)

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      console.log('Upload response:', { data, error })

      if (error) {
        console.error('Upload error:', error)
        alert(`Failed to upload image: ${error.message}`)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      console.log('Public URL:', publicUrl)
      callback(publicUrl)
      alert('Image uploaded successfully!')
    } catch (err: any) {
      console.error('Upload exception:', err)
      alert(`Failed to upload image: ${err?.message || err}`)
    }
  }

  const addCard = async () => {
    const { error } = await supabase.from('feature_cards').insert([{
      title: 'New Product',
      subtitle: '',
      image: '',
      bg_color: '#f3f4f6',
      position: cards.length,
      enabled: true,
      card_link: '',
      image_style: 'side'
    }])
    if (!error) fetchCards()
  }

  const updateCard = async (id: string, updates: any) => {
    console.log('Updating card:', id, updates)
    try {
      const { data, error } = await supabase.from('feature_cards').update(updates).eq('id', id)
      console.log('Update result:', { data, error })
      
      if (error) {
        alert(`Error updating card: ${error.message}`)
        console.error('Update error:', error)
      } else {
        alert('Card updated successfully!')
        setEditingId(null)
        setEditForm({})
        fetchCards()
      }
    } catch (err) {
      console.error('Exception:', err)
      alert(`Exception: ${err}`)
    }
  }

  const startEdit = (card: any) => {
    setEditingId(card.id)
    setEditForm({ ...card })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const saveEdit = () => {
    if (editingId) {
      console.log('Saving edit for card:', editingId, editForm)
      const { id, created_at, ...updates } = editForm
      updateCard(editingId, updates)
    }
  }

  const deleteCard = async (id: string) => {
    if (confirm('Delete this card?')) {
      const { error } = await supabase.from('feature_cards').delete().eq('id', id)
      if (!error) fetchCards()
    }
  }

  const moveCard = async (id: string, direction: 'up' | 'down') => {
    const index = cards.findIndex(c => c.id === id)
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === cards.length - 1)) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newCards = [...cards]
    ;[newCards[index], newCards[newIndex]] = [newCards[newIndex], newCards[index]]
    await Promise.all(newCards.map((c, i) =>
      supabase.from('feature_cards').update({ position: i }).eq('id', c.id)
    ))
    fetchCards()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Feature Cards</h2>
        <button onClick={addCard} className="bg-black text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Card
        </button>
      </div>

      <div className="space-y-4">
        {cards.map((card, index) => {
          const isEditing = editingId === card.id
          const displayCard = isEditing ? editForm : card
          
          return (
          <div key={card.id} className="border rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-2">
                <button onClick={() => moveCard(card.id, 'up')} disabled={index === 0} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button onClick={() => moveCard(card.id, 'down')} disabled={index === cards.length - 1} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={card.enabled}
                  onChange={(e) => updateCard(card.id, { enabled: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Enabled</span>
              </label>

              <div className="ml-auto flex gap-2">
                {isEditing ? (
                  <>
                    <button onClick={saveEdit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                      Save
                    </button>
                    <button onClick={cancelEdit} className="px-4 py-2 border rounded hover:bg-gray-100">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(card)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Edit
                    </button>
                    <button onClick={() => deleteCard(card.id)} className="p-2 hover:bg-red-100 text-red-600 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={displayCard.title}
                  onChange={(e) => isEditing && setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:border-black"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <input
                  type="text"
                  value={displayCard.subtitle || ''}
                  onChange={(e) => isEditing && setEditForm({ ...editForm, subtitle: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:border-black"
                  placeholder="Optional subtitle"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Background Color</label>
                <input
                  type="color"
                  value={displayCard.bg_color}
                  onChange={(e) => isEditing && setEditForm({ ...editForm, bg_color: e.target.value })}
                  className="w-full p-2 border rounded h-10"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image Style</label>
                <select
                  value={displayCard.image_style || 'side'}
                  onChange={(e) => isEditing && setEditForm({ ...editForm, image_style: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-none focus:border-black"
                  disabled={!isEditing}
                >
                  <option value="side">Side (Image on right)</option>
                  <option value="cover">Cover (Full background)</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Card Link (optional)</label>
              <input
                type="text"
                value={displayCard.card_link || ''}
                onChange={(e) => isEditing && setEditForm({ ...editForm, card_link: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:border-black"
                placeholder="/products or https://..."
                disabled={!isEditing}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={displayCard.image}
                  onChange={(e) => isEditing && setEditForm({ ...editForm, image: e.target.value })}
                  className="flex-1 p-2 border rounded focus:outline-none focus:border-black"
                  placeholder="Product image URL"
                  disabled={!isEditing}
                />
                {isEditing && (
                  <label className="p-2 border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer flex items-center">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleFileUpload(file, (url) => setEditForm({ ...editForm, image: url }))
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {displayCard.image && (
              <div className="mt-4">
                <img src={displayCard.image} alt={displayCard.title} className="h-32 object-contain rounded" />
              </div>
            )}
          </div>
        )})}
      </div>
    </div>
  )
}
