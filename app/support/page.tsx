import ImprovedFooter from '../../components/ImprovedFooter'

export default function SupportPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Help & Support</h1>
        <p className="text-lg text-gray-600 mb-8">
          We're here to help. Find answers and get support for all your needs.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
            <div className="space-y-3 text-gray-600">
              <p><strong>WhatsApp:</strong> <a href="https://wa.me/250782878665?text=Hi,%20I%20need%20support" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">+250 782 878 665</a></p>
              <p><strong>Phone:</strong> +250 782 878 665</p>
              <p><strong>Address:</strong> Tropical Plaza, KN 82 St, Kigali</p>
              <p><strong>Hours:</strong> Mon-Fri, 9AM-6PM</p>
            </div>
          </div>
          
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Support Resources</h2>
            <div className="space-y-3 text-gray-600">
              <p>Access our comprehensive product documentation to learn about features and specifications.</p>
              <p>Follow our step-by-step installation guides for easy setup and configuration.</p>
              <p>All products include manufacturer warranty coverage with options for extended protection.</p>
              <p>Review our flexible return policy for hassle-free returns within the specified period.</p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">How do I track my order?</h3>
              <p className="text-gray-600">You can track your order by logging into your account and viewing your order history.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is your warranty policy?</h3>
              <p className="text-gray-600">All products come with a manufacturer's warranty. Extended warranties are available for purchase.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer installation services?</h3>
              <p className="text-gray-600">Yes, we provide professional installation services for all our products. Contact us for details.</p>
            </div>
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
