'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()
  const [siteLogo, setSiteLogo] = useState('')
  const [siteName, setSiteName] = useState('ITechDevices')
  const [headerStyle, setHeaderStyle] = useState<'minimal' | 'classic' | 'modern' | 'fashion'>('minimal')
  
  useEffect(() => {
    fetchSiteSettings()
  }, [])

  const fetchSiteSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const settings = await response.json()
        if (settings.site_logo) {
          let logo = settings.site_logo
          if (logo.startsWith('{')) {
            try {
              const parsed = JSON.parse(logo)
              logo = parsed.logo || ''
            } catch {}
          }
          setSiteLogo(logo)
        }
        if (settings.site_name) {
          setSiteName(settings.site_name)
        }
        if (settings.header_style) {
          setHeaderStyle(settings.header_style)
        }
      }
    } catch (error) {
      console.log('Using default settings')
    }
  }
  
  // Only render navbar functionality for home page
  if (pathname === '/') {
    return null // Home page will handle its own navbar
  }
  
  return <Navbar siteLogo={siteLogo} siteName={siteName} headerStyle={headerStyle} />
}