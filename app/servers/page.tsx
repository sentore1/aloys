'use client'
import ImprovedFooter from '../../components/ImprovedFooter'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'

export default function ServersPage() {
  const handleWhatsApp = (serverType: string) => {
    const whatsappNumber = '250782878665'
    const text = `Hi, I'm interested in ${serverType}. Can you provide more information?`
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Servers</h1>
        <p className="text-lg text-gray-600 mb-8">
          Enterprise-grade server solutions for your business needs.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6">
            <div className="relative w-full h-64 mb-4 bg-gray-100 rounded">
              <Image 
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop" 
                alt="Rack Server"
                fill
                className="object-cover rounded"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Rack Servers</h2>
            <p className="text-gray-600 mb-4">High-performance rack-mounted servers for data centers and enterprise environments.</p>
            <button
              onClick={() => handleWhatsApp('Rack Servers')}
              className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Inquire via WhatsApp
            </button>
          </div>
          <div className="border rounded-lg p-6">
            <div className="relative w-full h-64 mb-4 bg-gray-100 rounded">
              <Image 
                src="https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&h=400&fit=crop" 
                alt="Tower Server"
                fill
                className="object-cover rounded"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Tower Servers</h2>
            <p className="text-gray-600 mb-4">Versatile tower servers ideal for small to medium businesses.</p>
            <button
              onClick={() => handleWhatsApp('Tower Servers')}
              className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Inquire via WhatsApp
            </button>
          </div>
        </div>
      </div>
      <ImprovedFooter 
        settings={{
          company_description: 'Leading provider of IT, Security and Identification solutions.',
          locations: [],
          quick_links: [],
          support_links: []
        }} 
        siteName="I tech Devices" 
      />
    </>
  )
}
