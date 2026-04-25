'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function PartnershipsManager() {
  const [partnerships, setPartnerships] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchPartnerships() }, [])

  const fetchPartnerships = async () => {
    const { data, error } = await supabase.from('partnerships').select('*').order('position')
    if (data && !error) setPartnerships(data)
    setLoading(false)
  }

  const handleFileUpload = async (file: File, callback: (url: string) => void) => {
    try {
      console.log('Starting upload for file:', file.name, 'Size:', file.size)
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `partnerships/${fileName}`

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

  const addPartnership = async () => {
    const { error } = await supabase.from('partnerships').insert([{
      title: 'New Partnership',
      subtitle: 'Authorized Partner',
      description: 'Description of the partnership...',
      certificate_image: '',
      position: partnerships.length,
      enabled: true
    }])
    if (!error) fetchPartnerships()
  }

  const updatePartnership = async (id: string, updates: any) => {
    const { error } = await supabase.from('partnerships').update(updates).eq('id', id)
    if (!error) fetchPartnerships()
  }

  const deletePartnership = async (id: string) => {
    if (confirm('Delete this partnership?')) {
      const { error } = await supabase.from('partnerships').delete().eq('id', id)
      if (!error) fetchPartnerships()
    }
  }

  const movePartnership = async (id: string, direction: 'up' | 'down') => {
    const index = partnerships.findIndex(p => p.id === id)
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === partnerships.length - 1)) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newPartnerships = [...partnerships]
    ;[newPartnerships[index], newPartnerships[newIndex]] = [newPartnerships[newIndex], newPartnerships[index]]
    await Promise.all(newPartnerships.map((p, i) =>
      supabase.from('partnerships').update({ position: i }).eq('id', p.id)
    ))
    fetchPartnerships()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Partnerships & Certificates</h2>
        <button onClick={addPartnership} className="bg-black text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Partnership
        </button>
      </div>

      <div className="space-y-6">
        {partnerships.map((partnership, index) => (
          <div key={partnership.id} className="border rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-2">
                <button onClick={() => movePartnership(partnership.id, 'up')} disabled={index === 0} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button onClick={() => movePartnership(partnership.id, 'down')} disabled={index === partnerships.length - 1} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={partnership.enabled}
                  onChange={(e) => updatePartnership(partnership.id, { enabled: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Enabled</span>
              </label>

              <button onClick={() => deletePartnership(partnership.id)} className="ml-auto p-2 hover:bg-red-100 text-red-600 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={partnership.title}
                    onChange={(e) => updatePartnership(partnership.id, { title: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., Heidi ID Card Printers"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={partnership.subtitle || ''}
                    onChange={(e) => updatePartnership(partnership.id, { subtitle: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., Authorized Distributor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={partnership.description}
                    onChange={(e) => updatePartnership(partnership.id, { description: e.target.value })}
                    className="w-full p-2 border rounded"
                    rows={4}
                    placeholder="Describe the partnership..."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Certificate/Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={partnership.certificate_image}
                      onChange={(e) => updatePartnership(partnership.id, { certificate_image: e.target.value })}
                      className="flex-1 p-2 border rounded"
                      placeholder="https://example.com/certificate.jpg"
                    />
                    <label className="p-2 border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer flex items-center">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleFileUpload(file, (url) => updatePartnership(partnership.id, { certificate_image: url }))
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {partnership.certificate_image && (
                  <div className="border-4 border-blue-200 rounded-lg p-2 bg-white">
                    <img 
                      src={partnership.certificate_image} 
                      alt={partnership.title}
                      className="w-full h-auto object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
