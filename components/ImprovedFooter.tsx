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

interface ImprovedFooterProps {
  settings: FooterSettings
  siteName: string
  siteLogo?: string
  logoSize?: number
}

export default function ImprovedFooter({ settings, siteName, siteLogo, logoSize = 40 }: ImprovedFooterProps) {
  // Ensure settings has default values
  const safeSettings = {
    company_description: settings?.company_description || 'Leading provider of IT, Security and Identification solutions.',
    locations: settings?.locations || [],
    social_facebook: settings?.social_facebook,
    social_twitter: settings?.social_twitter,
    social_instagram: settings?.social_instagram,
    social_linkedin: settings?.social_linkedin,
    social_youtube: settings?.social_youtube,
    quick_links: settings?.quick_links || [],
    support_links: settings?.support_links || []
  }
  
  const enabledLocations = safeSettings.locations.filter(l => l.enabled) || []
  const [footerColors, setFooterColors] = useState({
    bgStart: '#dc2626',
    bgEnd: '#b91c1c',
    brandingBg: '#ffffff',
    textColor: '#ffffff',
    brandingTextColor: '#000000'
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchFooterColors()
  }, [])

  const fetchFooterColors = async () => {
    try {
      const { data } = await supabase
        .from('site_settings')
        .select('footer_bg_color_start, footer_bg_color_end, footer_branding_bg_color, footer_text_color, footer_branding_text_color')
        .single()
      
      if (data) {
        setFooterColors({
          bgStart: data.footer_bg_color_start || '#dc2626',
          bgEnd: data.footer_bg_color_end || '#b91c1c',
          brandingBg: data.footer_branding_bg_color || '#ffffff',
          textColor: data.footer_text_color || '#ffffff',
          brandingTextColor: data.footer_branding_text_color || '#000000'
        })
      }
    } catch (error) {
      console.log('Using default footer colors')
    }
  }

  return (
    <>
    <footer style={{ background: `linear-gradient(to bottom right, ${footerColors.bgStart}, ${footerColors.bgEnd})`, color: footerColors.textColor }} className="text-white">
      {/* Locations Section */}
      {enabledLocations.length > 0 && (
        <div className="border-b border-gray-300">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className={`grid gap-8 ${
              enabledLocations.length === 1 ? 'grid-cols-1' :
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
                    <div className="bg-white rounded overflow-hidden h-48">
                      <iframe 
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location.address)}`}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  )}
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-white text-red-600 px-4 py-2 rounded font-semibold text-sm hover:bg-gray-100 transition-colors"
                  >
                    Get Directions
                  </a>
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
            <div className="mb-4">
              {siteLogo ? (
                <img src={siteLogo} alt={siteName} style={{ height: `${logoSize}px` }} className="w-auto" />
              ) : (
                <span className="text-2xl font-bold tracking-wider">{siteName}</span>
              )}
            </div>
            <p className="text-sm mb-4" style={{ opacity: 0.9 }}>
              {safeSettings.company_description}
            </p>
            <div className="flex gap-3">
              {safeSettings.social_facebook && (
                <a href={safeSettings.social_facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {safeSettings.social_twitter && (
                <a href={safeSettings.social_twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {safeSettings.social_instagram && (
                <a href={safeSettings.social_instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {safeSettings.social_linkedin && (
                <a href={safeSettings.social_linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {safeSettings.social_youtube && (
                <a href={safeSettings.social_youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Our Products */}
          <div>
            <h4 className="font-bold mb-4">Our Products</h4>
            <ul className="space-y-2 text-sm" style={{ opacity: 0.9 }}>
              <li><a href="/servers" className="hover:opacity-100 transition-colors">Servers</a></li>
              <li><a href="/id-card-printers" className="hover:opacity-100 transition-colors">ID Card Printers</a></li>
              <li><a href="/access-control" className="hover:opacity-100 transition-colors">Access Control</a></li>
              <li><a href="/biometric-devices" className="hover:opacity-100 transition-colors">Biometric Devices</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm" style={{ opacity: 0.9 }}>
              {(safeSettings.quick_links && safeSettings.quick_links.length > 0) ? (
                safeSettings.quick_links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="hover:opacity-100 transition-colors">{link.label}</a>
                  </li>
                ))
              ) : (
                <>
                  <li><a href="/products" className="hover:opacity-100 transition-colors">All Products</a></li>
                  <li><a href="/cart" className="hover:opacity-100 transition-colors">Shopping Cart</a></li>
                  <li><a href="/account" className="hover:opacity-100 transition-colors">My Account</a></li>
                  <li><a href="/login" className="hover:opacity-100 transition-colors">Login</a></li>
                </>
              )}
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="font-bold mb-4">Help & Support</h4>
            <ul className="space-y-2 text-sm" style={{ opacity: 0.9 }}>
              {(safeSettings.support_links && safeSettings.support_links.length > 0) ? (
                safeSettings.support_links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="hover:opacity-100 transition-colors">{link.label}</a>
                  </li>
                ))
              ) : (
                <>
                  <li><a href="/support" className="hover:opacity-100 transition-colors">Support Center</a></li>
                  <li><a href="/support" className="hover:opacity-100 transition-colors">FAQ</a></li>
                  <li><a href="/warranty" className="hover:opacity-100 transition-colors">Warranty Info</a></li>
                  <li><a href="/contact" className="hover:opacity-100 transition-colors">Contact Us</a></li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-6">
        </div>
      </div>
    </footer>
    
    {/* Large Branding Section */}
    <div style={{ backgroundColor: footerColors.brandingBg, color: footerColors.brandingTextColor }} className="py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        {siteLogo ? (
          <img src={siteLogo} alt={siteName} style={{ height: `${logoSize * 2}px` }} className="w-auto mb-4" />
        ) : (
          <h2 className="text-5xl md:text-7xl font-bold text-black mb-4">
            {siteName}<sup style={{ fontSize: '0.5em' }}>™</sup>
          </h2>
        )}
        <p className="text-sm mb-2" style={{ opacity: 0.8 }}>
          {safeSettings.company_description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm" style={{ opacity: 0.8 }}>
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
