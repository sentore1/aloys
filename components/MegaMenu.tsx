'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SubMenuItem {
  label: string
  href: string
  description?: string
}

interface MegaMenuItem {
  label: string
  href?: string
  subItems?: SubMenuItem[]
}

interface MegaMenuProps {
  items: MegaMenuItem[]
  textClasses?: string
  hoverClasses?: string
}

export default function MegaMenu({ items, textClasses = 'text-gray-700', hoverClasses = 'hover:text-black' }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (label: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setActiveMenu(label)
  }

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveMenu(null)
    }, 150)
    setTimeoutId(id)
  }

  return (
    <div className="flex items-center space-x-8">
      {items.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => item.subItems && handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          {item.href && !item.subItems ? (
            <Link
              href={item.href}
              className={`text-sm font-medium transition-colors ${textClasses} ${hoverClasses}`}
            >
              {item.label}
            </Link>
          ) : (
            <button
              className={`text-sm font-medium transition-colors flex items-center gap-1 ${textClasses} ${hoverClasses}`}
            >
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                item.label
              )}
              {item.subItems && <ChevronDown className="w-4 h-4" />}
            </button>
          )}

          {item.subItems && activeMenu === item.label && (
            <div 
              className="absolute top-full left-0 mt-0 bg-white shadow-lg rounded-lg border border-gray-100 min-w-[250px] z-50"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="py-2">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="block px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-sm text-gray-900">{subItem.label}</div>
                    {subItem.description && (
                      <div className="text-xs text-gray-500 mt-0.5">{subItem.description}</div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
