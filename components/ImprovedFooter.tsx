'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface FooterLocation {
  title: string
  address: string
  phone: string
  map_embed?: string
  enabled: boolean
}

interface FooterSettings {
  company_description: string
  locations: FooterLocation[]
  social_facebook?: string
  social_twitter?: string
  social_instagram?: string
  social_linkedin?: string
  social_youtube?: string
  quick_links: { label: string, url: string }[]
  support_links: { label: string, url: string }[]
}

export default function ImprovedFooter({ settings, siteName }: { settings: FooterSettings, siteName: string }) {
  const enabledLocations = settings.locations?.filter(l => l.enabled) || []
  const [footerColors, setFooterColors] = useState({
    bgStart: '#dc2626',
    bgEnd: '#b91c1c',
    brandingBg: '#ffffff'
  })

  useEffect(() => {
    fetchFooterColors()
  }, [])

  const fetchFooterColors = async () => {
    try {
      const { data } = await supabase
        .from('site_settings')
        .select('footer_bg_color_start, footer_bg_color_end, footer_branding_bg_color')
        .single()
      
      if (data) {
        setFooterColors({
          bgStart: data.footer_bg_color_start || '#dc2626',
          bgEnd: data.footer_bg_color_end || '#b91c1c',
          brandingBg: data.footer_branding_bg_color || '#ffffff'
        })
      }
    } catch (error) {
      console.log('Using default footer colors')
    }
  }

  return (
    <>
    <footer style={{ background: `linear-gradient(to bottom right, ${footerColors.bgStart}, ${footerColors.bgEnd})` }} className="text-white">
      {/* Locations Section */}
      {enabledLocations.length > 0 && (
        <div className="border-b border-red-500">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className={`grid gap-8 ${
              enabledLocations.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
              enabledLocations.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {enabledLocations.map((location, i) => (
                <div key={i}>
                  <h3 className="text-xl font-bold mb-4">{location.title}</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                      <p className="text-sm">{location.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 flex-shrink-0" />
                      <a href={`tel:${location.phone}`} className="text-sm hover:underline">
                        {location.phone}
                      </a>
                    </div>
                  </div>
                  {location.map_embed && (
                    <div className="bg-white rounded overflow-hidden h-32">
                      <iframe 
                        src={location.map_embed}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <button className="mt-4 bg-white text-red-600 px-4 py-2 rounded font-semibold text-sm hover:bg-gray-100 transition-colors">
                    Get Directions
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{siteName}</h3>
            <p className="text-sm text-red-100 mb-4">
              {settings.company_description || 'Leading provider of IT, Security and Identification solutions.'}
            </p>
            <div className="flex gap-3">
              {settings.social_facebook && (
                <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.social_twitter && (
                <a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {settings.social_instagram && (
                <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.social_linkedin && (
                <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings.social_youtube && (
                <a href={settings.social_youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Our Products */}
          <div>
            <h4 className="font-bold mb-4">Our Products</h4>
            <ul className="space-y-2 text-sm text-red-100">
              <li><a href="/products?category=servers" className="hover:text-white">Servers</a></li>
              <li><a href="/products?category=printers" className="hover:text-white">ID Card Printers</a></li>
              <li><a href="/products?category=access" className="hover:text-white">Access Control</a></li>
              <li><a href="/products?category=biometric" className="hover:text-white">Biometric Devices</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-red-100">
              {settings.quick_links?.map((link, i) => (
                <li key={i}>
                  <a href={link.url} className="hover:text-white">{link.label}</a>
                </li>
              )) || (
                <>
                  <li><a href="/about" className="hover:text-white">About Us</a></li>
                  <li><a href="/products" className="hover:text-white">Products</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                  <li><a href="/blog" className="hover:text-white">Blog</a></li>
                </>
              )}
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="font-bold mb-4">Help & Support</h4>
            <ul className="space-y-2 text-sm text-red-100">
              {settings.support_links?.map((link, i) => (
                <li key={i}>
                  <a href={link.url} className="hover:text-white">{link.label}</a>
                </li>
              )) || (
                <>
                  <li><a href="/support" className="hover:text-white">Support Center</a></li>
                  <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                  <li><a href="/warranty" className="hover:text-white">Warranty</a></li>
                  <li><a href="/returns" className="hover:text-white">Returns</a></li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-500 pt-6 pb-6">
        </div>
      </div>
    </footer>
    
    {/* Large Branding Section */}
    <div style={{ backgroundColor: footerColors.brandingBg }} className="py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-6xl md:text-8xl font-bold text-black mb-6">
          {siteName}<sup style={{ fontSize: '0.5em' }}>™</sup>
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} {siteName}<sup style={{ fontSize: '0.5em' }}>™</sup>. All rights reserved.
          </p>
          <span className="hidden sm:inline">•</span>
          <p>
            By{' '}
            <a 
              href="https://instagram.com/iTechDevices" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium hover:opacity-80 transition-opacity"
              style={{ 
                background: 'linear-gradient(90deg, #3b82f6, #10b981, #3b82f6)', 
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text',
                animation: 'gradient 3s ease infinite'
              }}
            >
              @Alloys
            </a>
          </p>
        </div>
        <style jsx>{`
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
      </div>
    </div>
    </>
  )
}
