'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown, Save } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function ContentCardsManager() {
  const [cards, setCards] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<any>({})
  const [uploading, setUploading] = useState(false)

  useEffect(() => { fetchCards() }, [])

  const fetchCards = async () => {
    const { data, error } = await supabase.from('content_cards').select('*').order('position')
    if (data && !error) setCards(data)
    setLoading(false)
  }

  const addCard = async () => {
    const { error } = await supabase.from('content_cards').insert([{
      title: 'New Card',
      description: 'Card description...',
      image: '',
      background_color: '#ef4444',
      text_color: '#ffffff',
      link: '#',
      button_text: '',
      card_size: 'medium',
      position: cards.length,
      enabled: true
    }])
    if (error) {
      alert(`Error: ${error.message}`)
    } else {
      alert('Card added!')
      fetchCards()
    }
  }

  const startEdit = (card: any) => {
    setEditingId(card.id)
    setEditForm({ ...card })
  }

  const handleImageUpload = async (file: File, cardId: string) => {
    try {
      setUploading(true)
      
      // Convert to base64 as fallback if storage is not configured
      const reader = new FileReader()
      reader.onload = (e) => {
        const url = e.target?.result as string
        if (editingId === cardId) {
          setEditForm({...editForm, image: url})
        }
        setUploading(false)
      }
      reader.onerror = () => {
        alert('Failed to read file')
        setUploading(false)
      }
      reader.readAsDataURL(file)
      
    } catch (error: any) {
      alert(`Upload error: ${error.message}`)
      setUploading(false)
      return null
    }
  }

  const saveEdit = async (id: string) => {
    const { error } = await supabase.from('content_cards').update({
      title: editForm.title,
      description: editForm.description,
      image: editForm.image,
      background_color: editForm.background_color,
      text_color: editForm.text_color,
      link: editForm.link,
      button_text: editForm.button_text,
      card_size: editForm.card_size
    }).eq('id', id)
    
    if (error) {
      alert(`Error: ${error.message}`)
    } else {
      alert('Saved!')
      setEditingId(null)
      fetchCards()
    }
  }

  const toggleEnabled = async (id: string, enabled: boolean) => {
    const { error } = await supabase.from('content_cards').update({ enabled }).eq('id', id)
    if (!error) fetchCards()
  }

  const deleteCard = async (id: string) => {
    if (confirm('Delete this card?')) {
      const { error } = await supabase.from('content_cards').delete().eq('id', id)
      if (error) {
        alert(`Error: ${error.message}`)
      } else {
        alert('Deleted!')
        fetchCards()
      }
    }
  }

  const moveCard = async (id: string, direction: 'up' | 'down') => {
    const index = cards.findIndex(c => c.id === id)
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === cards.length - 1)) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newCards = [...cards]
    ;[newCards[index], newCards[newIndex]] = [newCards[newIndex], newCards[index]]
    await Promise.all(newCards.map((c, i) =>
      supabase.from('content_cards').update({ position: i }).eq('id', c.id)
    ))
    fetchCards()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Content Cards</h2>
        <button onClick={addCard} className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800">
          <Plus className="w-4 h-4" /> Add Card
        </button>
      </div>

      <div className="space-y-6">
        {cards.map((card, index) => {
          const isEditing = editingId === card.id
          
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
                    onChange={(e) => toggleEnabled(card.id, e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Enabled</span>
                </label>

                <div className="ml-auto flex gap-2">
                  {isEditing ? (
                    <>
                      <button onClick={() => saveEdit(card.id)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1">
                        <Save className="w-4 h-4" /> Save
                      </button>
                      <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => startEdit(card)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Edit
                    </button>
                  )}
                  <button onClick={() => deleteCard(card.id)} className="p-2 hover:bg-red-100 text-red-600 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">{card.title}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    {isEditing ? (
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        className="w-full p-2 border rounded"
                        rows={3}
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded text-sm">{card.description}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Button Text (optional)</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.button_text || ''}
                        onChange={(e) => setEditForm({...editForm, button_text: e.target.value})}
                        className="w-full p-2 border rounded"
                        placeholder="e.g., Contact Now"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded text-sm">{card.button_text || 'No button'}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Link</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.link}
                        onChange={(e) => setEditForm({...editForm, link: e.target.value})}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded text-sm">{card.link}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Card Size</label>
                    {isEditing ? (
                      <select
                        value={editForm.card_size || 'medium'}
                        onChange={(e) => setEditForm({...editForm, card_size: e.target.value})}
                        className="w-full p-2 border rounded"
                      >
                        <option value="hero">Hero (Full Width)</option>
                        <option value="large">Large (2 Columns)</option>
                        <option value="medium">Medium (1 Column)</option>
                        <option value="small">Small (1 Column)</option>
                      </select>
                    ) : (
                      <div className="p-2 bg-gray-50 rounded text-sm capitalize">{card.card_size || 'medium'}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Background Color</label>
                      {isEditing ? (
                        <input
                          type="color"
                          value={editForm.background_color}
                          onChange={(e) => setEditForm({...editForm, background_color: e.target.value})}
                          className="w-full h-10 border rounded"
                        />
                      ) : (
                        <div className="p-2 border rounded" style={{ backgroundColor: card.background_color }}></div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Text Color</label>
                      {isEditing ? (
                        <input
                          type="color"
                          value={editForm.text_color}
                          onChange={(e) => setEditForm({...editForm, text_color: e.target.value})}
                          className="w-full h-10 border rounded"
                        />
                      ) : (
                        <div className="p-2 border rounded" style={{ backgroundColor: card.text_color }}></div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Background Image</label>
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="url"
                          value={editForm.image}
                          onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                          className="w-full p-2 border rounded"
                          placeholder="https://example.com/image.jpg"
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">or</span>
                          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm border">
                            {uploading ? 'Uploading...' : 'Upload Image'}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const url = await handleImageUpload(file, card.id)
                                  if (url) setEditForm({...editForm, image: url})
                                }
                              }}
                              className="hidden"
                              disabled={uploading}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2 bg-gray-50 rounded text-sm">
                        {card.image ? (
                          card.image.startsWith('data:') ? (
                            <span className="text-gray-500 italic">Image uploaded (base64)</span>
                          ) : (
                            <span className="truncate block">{card.image}</span>
                          )
                        ) : (
                          'No image'
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Preview</label>
                    <div 
                      className="rounded-lg overflow-hidden relative"
                      style={{ 
                        minHeight: '250px'
                      }}
                    >
                      {(isEditing ? editForm.image : card.image) && (
                        <div className="absolute inset-0">
                          <img 
                            src={isEditing ? editForm.image : card.image} 
                            alt="preview"
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent"></div>
                        </div>
                      )}
                      <div 
                        className="relative p-6 h-full flex flex-col justify-between"
                        style={{ 
                          backgroundColor: (isEditing ? editForm.image : card.image) ? 'transparent' : (isEditing ? editForm.background_color : card.background_color),
                          color: isEditing ? editForm.text_color : card.text_color,
                          minHeight: '250px'
                        }}
                      >
                        <div>
                          <h3 className="text-xl font-bold mb-2">{isEditing ? editForm.title : card.title}</h3>
                          <p className="text-sm opacity-90">{isEditing ? editForm.description : card.description}</p>
                        </div>
                        {(isEditing ? editForm.button_text : card.button_text) && (
                          <div className="mt-4">
                            <span className="inline-block bg-white text-black px-4 py-2 rounded text-sm font-semibold">
                              {isEditing ? editForm.button_text : card.button_text}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
