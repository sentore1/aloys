'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Upload, Image as ImageIcon, GripVertical } from 'lucide-react'

interface ProductSpec {
  id: string
  product_id: string
  spec_name: string
  spec_value: string
  spec_image?: string
  display_order: number
}

interface ProductSpecsManagerProps {
  productId: string
}

export default function ProductSpecsManager({ productId }: ProductSpecsManagerProps) {
  const [specs, setSpecs] = useState<ProductSpec[]>([])
  const [loading, setLoading] = useState(true)
  const [newSpec, setNewSpec] = useState({ spec_name: '', spec_value: '', spec_image: '' })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchSpecs()
  }, [productId])

  const fetchSpecs = async () => {
    try {
      const response = await fetch(`/api/product-specs?productId=${productId}`)
      if (response.ok) {
        const data = await response.json()
        setSpecs(data)
      }
    } catch (error) {
      console.error('Error fetching specs:', error)
    }
    setLoading(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, specId?: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      // Upload to your storage (adjust endpoint as needed)
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (uploadResponse.ok) {
        const { url } = await uploadResponse.json()
        
        if (specId) {
          // Update existing spec
          const spec = specs.find(s => s.id === specId)
          if (spec) {
            await updateSpec(specId, { ...spec, spec_image: url })
          }
        } else {
          // Set for new spec
          setNewSpec(prev => ({ ...prev, spec_image: url }))
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    }
    setUploading(false)
  }

  const addSpec = async () => {
    if (!newSpec.spec_name || !newSpec.spec_value) {
      alert('Please fill in spec name and value')
      return
    }

    try {
      const response = await fetch('/api/product-specs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: productId,
          ...newSpec,
          display_order: specs.length,
        }),
      })

      if (response.ok) {
        setNewSpec({ spec_name: '', spec_value: '', spec_image: '' })
        fetchSpecs()
      }
    } catch (error) {
      console.error('Error adding spec:', error)
      alert('Failed to add specification')
    }
  }

  const updateSpec = async (id: string, updates: Partial<ProductSpec>) => {
    try {
      const response = await fetch('/api/product-specs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      })

      if (response.ok) {
        fetchSpecs()
      }
    } catch (error) {
      console.error('Error updating spec:', error)
      alert('Failed to update specification')
    }
  }

  const deleteSpec = async (id: string) => {
    if (!confirm('Delete this specification?')) return

    try {
      const response = await fetch(`/api/product-specs?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchSpecs()
      }
    } catch (error) {
      console.error('Error deleting spec:', error)
      alert('Failed to delete specification')
    }
  }

  if (loading) return <div className="text-center py-4">Loading specifications...</div>

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Product Specifications</h3>

      {/* Existing Specs */}
      <div className="space-y-2">
        {specs.map((spec) => (
          <div key={spec.id} className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg">
            <GripVertical className="w-5 h-5 text-gray-400 mt-1 cursor-move" />
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={spec.spec_name}
                  onChange={(e) => updateSpec(spec.id, { ...spec, spec_name: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                  placeholder="Spec name (e.g., Processor)"
                />
                <input
                  type="text"
                  value={spec.spec_value}
                  onChange={(e) => updateSpec(spec.id, { ...spec, spec_value: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                  placeholder="Spec value (e.g., Intel i7)"
                />
              </div>
              
              {spec.spec_image && (
                <div className="relative w-32 h-32">
                  <img src={spec.spec_image} alt={spec.spec_name} className="w-full h-full object-cover rounded" />
                </div>
              )}
              
              <div className="flex gap-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, spec.id)}
                    className="hidden"
                  />
                  <div className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                    <ImageIcon className="w-4 h-4" />
                    {spec.spec_image ? 'Change Image' : 'Add Image'}
                  </div>
                </label>
              </div>
            </div>
            <button
              onClick={() => deleteSpec(spec.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Spec */}
      <div className="p-4 bg-blue-50 rounded-lg space-y-3">
        <h4 className="font-medium">Add New Specification</h4>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={newSpec.spec_name}
            onChange={(e) => setNewSpec({ ...newSpec, spec_name: e.target.value })}
            className="px-3 py-2 border rounded-lg"
            placeholder="Spec name (e.g., RAM)"
          />
          <input
            type="text"
            value={newSpec.spec_value}
            onChange={(e) => setNewSpec({ ...newSpec, spec_value: e.target.value })}
            className="px-3 py-2 border rounded-lg"
            placeholder="Spec value (e.g., 16GB DDR4)"
          />
        </div>

        {newSpec.spec_image && (
          <div className="relative w-32 h-32">
            <img src={newSpec.spec_image} alt="Preview" className="w-full h-full object-cover rounded" />
          </div>
        )}

        <div className="flex gap-2">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
              className="hidden"
              disabled={uploading}
            />
            <div className="flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              <Upload className="w-4 h-4" />
              {uploading ? 'Uploading...' : 'Upload Image (Optional)'}
            </div>
          </label>
          
          <button
            onClick={addSpec}
            className="flex items-center gap-1 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            <Plus className="w-4 h-4" />
            Add Specification
          </button>
        </div>
      </div>
    </div>
  )
}
