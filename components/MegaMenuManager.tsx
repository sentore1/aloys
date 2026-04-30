'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, Edit2, ChevronDown, ChevronRight } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface MenuItem {
  id: string
  label: string
  href: string
  parent_id: string | null
  description?: string
  position: number
  enabled: boolean
  show_mega_menu: boolean
  children?: MenuItem[]
}

export default function MegaMenuManager() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    label: '',
    href: '',
    parent_id: '',
    description: '',
    enabled: true,
    show_mega_menu: true
  })

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('mega_menu')
        .select('*')
        .order('position', { ascending: true })

      if (error) throw error

      // Organize into parent-child structure
      const organized = organizeMenuItems(data || [])
      setMenuItems(organized)
    } catch (error) {
      console.error('Error fetching menu items:', error)
    }
    setLoading(false)
  }

  const organizeMenuItems = (items: MenuItem[]): MenuItem[] => {
    const parentItems = items.filter(item => !item.parent_id)
    return parentItems.map(parent => ({
      ...parent,
      children: items
        .filter(item => item.parent_id === parent.id)
        .sort((a, b) => a.position - b.position)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingItem) {
        // Update existing item
        const { error } = await supabase
          .from('mega_menu')
          .update({
            label: formData.label,
            href: formData.href,
            parent_id: formData.parent_id || null,
            description: formData.description,
            enabled: formData.enabled,
            show_mega_menu: formData.show_mega_menu,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingItem.id)

        if (error) throw error
        alert('Menu item updated successfully!')
      } else {
        // Add new item
        const { data: existingItems } = await supabase
          .from('mega_menu')
          .select('position')
          .eq('parent_id', formData.parent_id || null)
          .order('position', { ascending: false })
          .limit(1)

        const newPosition = existingItems && existingItems.length > 0 
          ? existingItems[0].position + 1 
          : 0

        const { error } = await supabase
          .from('mega_menu')
          .insert([{
            label: formData.label,
            href: formData.href,
            parent_id: formData.parent_id || null,
            description: formData.description,
            position: newPosition,
            enabled: formData.enabled,
            show_mega_menu: formData.show_mega_menu
          }])

        if (error) throw error
        alert('Menu item added successfully!')
      }

      setFormData({ label: '', href: '', parent_id: '', description: '', enabled: true, show_mega_menu: true })
      setShowAddForm(false)
      setEditingItem(null)
      fetchMenuItems()
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this menu item? This will also delete all submenu items.')) return

    try {
      const { error } = await supabase
        .from('mega_menu')
        .delete()
        .eq('id', id)

      if (error) throw error
      alert('Menu item deleted successfully!')
      fetchMenuItems()
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    }
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      label: item.label,
      href: item.href || '',
      parent_id: item.parent_id || '',
      description: item.description || '',
      enabled: item.enabled,
      show_mega_menu: item.show_mega_menu ?? true
    })
    setShowAddForm(true)
  }

  const updatePosition = async (id: string, newPosition: number, parentId: string | null) => {
    try {
      const { error } = await supabase
        .from('mega_menu')
        .update({ position: newPosition, parent_id: parentId })
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error updating position:', error)
    }
  }

  const moveItem = async (item: MenuItem, direction: 'up' | 'down') => {
    const siblings = item.parent_id
      ? menuItems.find(m => m.id === item.parent_id)?.children || []
      : menuItems

    const currentIndex = siblings.findIndex(s => s.id === item.id)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= siblings.length) return

    const swapItem = siblings[newIndex]

    await updatePosition(item.id, swapItem.position, item.parent_id)
    await updatePosition(swapItem.id, item.position, swapItem.parent_id)

    fetchMenuItems()
  }

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const toggleEnabled = async (id: string, currentEnabled: boolean) => {
    try {
      const { error } = await supabase
        .from('mega_menu')
        .update({ enabled: !currentEnabled })
        .eq('id', id)

      if (error) throw error
      fetchMenuItems()
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    }
  }

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)

    return (
      <div key={item.id} className="mb-2">
        <div 
          className={`flex items-center gap-2 p-3 bg-white border rounded-lg hover:shadow-md transition-shadow ${
            !item.enabled ? 'opacity-50' : ''
          }`}
          style={{ marginLeft: `${level * 24}px` }}
        >
          <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
          
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(item.id)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{item.label}</span>
              {item.href && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {item.href}
                </span>
              )}
              {hasChildren && (
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {item.children?.length} items
                </span>
              )}
              {!item.parent_id && !item.show_mega_menu && (
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  No dropdown
                </span>
              )}
            </div>
            {item.description && (
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => moveItem(item, 'up')}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded text-xs"
            >
              ↑
            </button>
            <button
              onClick={() => moveItem(item, 'down')}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded text-xs"
            >
              ↓
            </button>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={item.enabled}
                onChange={() => toggleEnabled(item.id, item.enabled)}
                className="w-4 h-4"
              />
            </label>
            <button
              onClick={() => handleEdit(item)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-2">
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  if (loading) return <div className="text-center py-8">Loading menu items...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Mega Menu Manager</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage your navigation menu items. Use ↑↓ to reorder, drag to move between levels.
          </p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(true)
            setEditingItem(null)
            setFormData({ label: '', href: '', parent_id: '', description: '', enabled: true, show_mega_menu: true })
          }}
          className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800"
        >
          <Plus className="w-4 h-4" />
          Add Menu Item
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        {menuItems.map(item => renderMenuItem(item))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Label *</label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Products"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Link (URL)</label>
                <input
                  type="text"
                  value={formData.href}
                  onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., /products"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty for parent items without links
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Parent Menu</label>
                <select
                  value={formData.parent_id}
                  onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="">None (Top Level)</option>
                  {menuItems.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Browse all items"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Shows under submenu items
                </p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enabled}
                    onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Enabled</span>
                </label>
                {!formData.parent_id && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.show_mega_menu}
                      onChange={(e) => setFormData({ ...formData, show_mega_menu: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Show Mega Menu Dropdown</span>
                  </label>
                )}
                {!formData.parent_id && !formData.show_mega_menu && (
                  <p className="text-xs text-gray-500 ml-6">
                    This item will be a simple link without dropdown
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                  {editingItem ? 'Update' : 'Add'} Menu Item
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingItem(null)
                  }}
                  className="flex-1 border py-2 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
