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
              <p><strong>Email:</strong> support@itechdevices.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Hours:</strong> Mon-Fri, 9AM-6PM</p>
            </div>
          </div>
          
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Product Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600">Installation Guides</a></li>
              <li><a href="#" className="hover:text-blue-600">Warranty Information</a></li>
              <li><a href="#" className="hover:text-blue-600">Return Policy</a></li>
            </ul>
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
