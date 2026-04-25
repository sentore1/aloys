'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown, Save } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function SolutionsManager() {
  const [solutions, setSolutions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<any>({})

  useEffect(() => { fetchSolutions() }, [])

  const fetchSolutions = async () => {
    const { data, error } = await supabase.from('solutions').select('*').order('position')
    if (data && !error) setSolutions(data)
    setLoading(false)
  }

  const addSolution = async () => {
    const { error } = await supabase.from('solutions').insert([{
      title: 'New Solution',
      description: 'Solution description...',
      image: '',
      features: JSON.stringify([]),
      link: '',
      position: solutions.length,
      enabled: true
    }])
    if (error) {
      alert(`Error adding: ${error.message}`)
    } else {
      alert('Solution added successfully!')
      fetchSolutions()
    }
  }

  const startEdit = (solution: any) => {
    setEditingId(solution.id)
    setEditForm({
      title: solution.title,
      description: solution.description,
      image: solution.image,
      link: solution.link || '',
      features: parseFeatures(solution.features).join('\n')
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const saveEdit = async (id: string) => {
    try {
      console.log('Saving solution:', id)
      console.log('Edit form data:', editForm)
      
      // Validate required fields
      if (!editForm.title || !editForm.description) {
        alert('Title and Description are required')
        return
      }
      
      const updates = {
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        image: editForm.image?.trim() || '',
        link: editForm.link?.trim() || '',
        features: JSON.stringify(
          (editForm.features || '')
            .split('\n')
            .map((f: string) => f.trim())
            .filter((f: string) => f.length > 0)
        )
      }
      
      console.log('Updates to send:', updates)
      
      const { data, error } = await supabase
        .from('solutions')
        .update(updates)
        .eq('id', id)
        .select()
      
      console.log('Update response:', { data, error })
      
      if (error) {
        console.error('Error updating solution:', error)
        alert(`Error updating: ${error.message}`)
      } else {
        alert('Solution saved successfully!')
        setEditingId(null)
        setEditForm({})
        await fetchSolutions()
      }
    } catch (err) {
      console.error('Exception in saveEdit:', err)
      alert(`Exception: ${err}`)
    }
  }

  const toggleEnabled = async (id: string, enabled: boolean) => {
    const { error } = await supabase.from('solutions').update({ enabled }).eq('id', id)
    if (error) {
      alert(`Error: ${error.message}`)
    } else {
      fetchSolutions()
    }
  }

  const deleteSolution = async (id: string) => {
    if (confirm('Are you sure you want to delete this solution?')) {
      console.log('Attempting to delete solution:', id)
      const { data, error } = await supabase.from('solutions').delete().eq('id', id)
      
      if (error) {
        console.error('Error deleting solution:', error)
        console.error('Error details:', JSON.stringify(error, null, 2))
        alert(`Error deleting: ${error.message}\n\nPlease check:\n1. You are logged in as admin\n2. Database permissions are set\n3. Run fix-solutions-rls-policies.sql`)
      } else {
        console.log('Delete successful:', data)
        alert('Solution deleted successfully!')
        fetchSolutions()
      }
    }
  }

  const moveSolution = async (id: string, direction: 'up' | 'down') => {
    const index = solutions.findIndex(s => s.id === id)
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === solutions.length - 1)) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newSolutions = [...solutions]
    ;[newSolutions[index], newSolutions[newIndex]] = [newSolutions[newIndex], newSolutions[index]]
    await Promise.all(newSolutions.map((s, i) =>
      supabase.from('solutions').update({ position: i }).eq('id', s.id)
    ))
    fetchSolutions()
  }

  const parseFeatures = (features: any): string[] => {
    if (Array.isArray(features)) return features
    try { return JSON.parse(features || '[]') } catch { return [] }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Software Solutions</h2>
        <button onClick={addSolution} className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800">
          <Plus className="w-4 h-4" /> Add Solution
        </button>
      </div>

      <div className="space-y-6">
        {solutions.map((solution, index) => {
          const isEditing = editingId === solution.id
          const features = parseFeatures(solution.features)
          
          return (
            <div key={solution.id} className="border rounded-lg p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-2">
                  <button onClick={() => moveSolution(solution.id, 'up')} disabled={index === 0} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => moveSolution(solution.id, 'down')} disabled={index === solutions.length - 1} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={solution.enabled}
                    onChange={(e) => toggleEnabled(solution.id, e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Enabled</span>
                </label>

                <div className="ml-auto flex gap-2">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={() => saveEdit(solution.id)} 
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
                      >
                        <Save className="w-4 h-4" /> Save
                      </button>
                      <button 
                        onClick={cancelEdit} 
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => startEdit(solution)} 
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}
                  <button onClick={() => deleteSolution(solution.id)} className="p-2 hover:bg-red-100 text-red-600 rounded">
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
                      <div className="p-2 bg-gray-50 rounded">{solution.title}</div>
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
                      <div className="p-2 bg-gray-50 rounded text-sm">{solution.description}</div>
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
                        placeholder="/solutions/product-name"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded text-sm">{solution.link || 'No link'}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Features (one per line)</label>
                    {isEditing ? (
                      <textarea
                        value={editForm.features}
                        onChange={(e) => setEditForm({...editForm, features: e.target.value})}
                        className="w-full p-2 border rounded"
                        rows={4}
                        placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded text-sm">
                        {features.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {features.map((f, i) => <li key={i}>{f}</li>)}
                          </ul>
                        ) : (
                          <span className="text-gray-400">No features</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editForm.image}
                        onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded text-sm break-all">{solution.image || 'No image'}</div>
                    )}
                  </div>

                  {(isEditing ? editForm.image : solution.image) && (
                    <div className="border rounded overflow-hidden">
                      <img 
                        src={isEditing ? editForm.image : solution.image} 
                        alt={isEditing ? editForm.title : solution.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
