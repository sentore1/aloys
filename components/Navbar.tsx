'use client'

import Link from 'next/link'
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import MegaMenu from './MegaMenu'
import { supabase } from '../lib/supabase'

interface NavbarProps {
  searchTerm?: string
  onSearchChange?: (term: string) => void
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
  categories?: string[]
  siteLogo?: string
  siteName?: string
  headerStyle?: 'minimal' | 'classic' | 'modern' | 'fashion'
  logoSize?: number
}

export default function Navbar({ 
  searchTerm = '', 
  onSearchChange, 
  selectedCategory = 'All', 
  onCategoryChange,
  categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Accessories'],
  siteLogo,
  siteName = 'ITechDevices',
  headerStyle = 'minimal',
  logoSize = 40
}: NavbarProps) {
  const [cartCount, setCartCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [menuItems, setMenuItems] = useState<any[]>([])

  useEffect(() => {
    updateCartCount()
    fetchMenuItems()
    
    // Listen for cart updates
    const handleCartUpdate = () => updateCartCount()
    window.addEventListener('cartUpdated', handleCartUpdate)
    
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [])

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('mega_menu')
        .select('*')
        .eq('enabled', true)
        .order('position', { ascending: true })

      if (error) {
        setMenuItems(getDefaultMenu())
        return
      }

      // Organize into parent-child structure
      const parentItems = (data || []).filter((item: any) => !item.parent_id)
      const organized = parentItems.map((parent: any) => ({
        label: parent.label,
        href: parent.href || undefined,
        subItems: (data || [])
          .filter((item: any) => item.parent_id === parent.id)
          .sort((a: any, b: any) => a.position - b.position)
          .map((child: any) => ({
            label: child.label,
            href: child.href,
            description: child.description || undefined
          }))
      }))

      setMenuItems(organized)
    } catch (error) {
      setMenuItems(getDefaultMenu())
    }
  }

  const getDefaultMenu = () => [
    { label: 'Home', href: '/' },
    {
      label: 'Products',
      href: '/products',
      subItems: [
        { label: 'All Products', href: '/products', description: 'Browse all items' },
        { label: 'Laptop', href: '/products?category=laptop', description: 'High-performance laptops' },
        { label: 'Servers', href: '/servers', description: 'Enterprise servers' },
        { label: 'Biometric Devices', href: '/biometric-devices', description: 'Security solutions' },
        { label: 'ID Card Printers', href: '/id-card-printers', description: 'Professional printers' },
      ]
    },
    {
      label: 'Solutions',
      href: '/solutions',
      subItems: [
        { label: 'All Solutions', href: '/solutions', description: 'View all solutions' },
      ]
    },
    { label: 'Support', href: '/support' },
    { label: 'Contact', href: '/contact' },
  ]

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
    const count = cartItems.reduce((total: number, item: any) => total + item.quantity, 0)
    setCartCount(count)
  }

  const getHeaderClasses = () => {
    switch(headerStyle) {
      case 'fashion':
        return 'bg-black text-white border-b-0'
      case 'classic':
        return 'bg-white border-b-2 border-gray-900'
      case 'modern':
        return 'bg-gradient-to-r from-gray-50 to-white border-b border-gray-200'
      default:
        return 'bg-white border-b border-gray-100'
    }
  }

  const getTextClasses = () => {
    return headerStyle === 'fashion' ? 'text-white' : 'text-gray-700'
  }

  const getHoverClasses = () => {
    return headerStyle === 'fashion' ? 'hover:text-gray-300' : 'hover:text-black'
  }

  const getActiveClasses = () => {
    if (headerStyle === 'fashion') return 'text-white border-b-2 border-white pb-1'
    if (headerStyle === 'classic') return 'text-black border-b-2 border-black pb-1 font-bold'
    return 'text-black border-b-2 border-black pb-1'
  }

  return (
    <nav className={`sticky top-0 z-50 ${getHeaderClasses()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center" style={{ minHeight: `${Math.max(64, logoSize + 16)}px` }}>
          <Link href="/" className="flex items-center space-x-3">
            {siteLogo ? (
              <img src={siteLogo} alt={siteName} style={{ height: `${logoSize}px` }} className="w-auto" />
            ) : (
              <span className={`text-2xl font-bold tracking-wider ${headerStyle === 'fashion' ? 'text-white' : 'text-black'}`}>
                {siteName}
              </span>
            )}
          </Link>
          
          {/* Show mega menu on all pages including homepage */}
          <div className="hidden md:flex">
            <MegaMenu
              items={menuItems.length > 0 ? menuItems : getDefaultMenu()}
              textClasses={getTextClasses()}
              hoverClasses={getHoverClasses()}
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Search - show on all pages */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            
            <Link href="/login" className={`p-2 rounded-full transition-colors ${headerStyle === 'fashion' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
              <User className={`w-5 h-5 ${getTextClasses()}`} />
            </Link>
            <Link href="/cart" className={`p-2 rounded-full transition-colors relative ${headerStyle === 'fashion' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
              <ShoppingBag className={`w-5 h-5 ${getTextClasses()}`} />
              {cartCount > 0 && (
                <span className={`absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                  headerStyle === 'fashion' ? 'bg-white text-black' : 'bg-black text-white'
                }`}>
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button 
              className={`md:hidden p-2 rounded-full ${headerStyle === 'fashion' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className={`w-5 h-5 ${getTextClasses()}`} /> : <Menu className={`w-5 h-5 ${getTextClasses()}`} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium ${getTextClasses()} ${getHoverClasses()}`}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium ${getTextClasses()} ${getHoverClasses()}`}
                >
                  Products
                </Link>
                <Link
                  href="/solutions"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium ${getTextClasses()} ${getHoverClasses()}`}
                >
                  Solutions
                </Link>
                <Link
                  href="/support"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium ${getTextClasses()} ${getHoverClasses()}`}
                >
                  Support
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium ${getTextClasses()} ${getHoverClasses()}`}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}