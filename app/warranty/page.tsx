import ImprovedFooter from '../../components/ImprovedFooter'

export default function WarrantyPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Warranty Information</h1>
        <p className="text-lg text-gray-600 mb-8">
          We stand behind the quality of our products with comprehensive warranty coverage.
        </p>
        
        <div className="space-y-8">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Standard Warranty</h2>
            <p className="text-gray-600 mb-4">
              All products come with a manufacturer's warranty that covers defects in materials and workmanship.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Servers: 3-year limited warranty</li>
              <li>ID Card Printers: 2-year limited warranty</li>
              <li>Access Control Systems: 2-year limited warranty</li>
              <li>Biometric Devices: 1-year limited warranty</li>
            </ul>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Extended Warranty</h2>
            <p className="text-gray-600 mb-4">
              Extend your coverage with our optional extended warranty plans:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Additional 1-3 years of coverage available</li>
              <li>Priority technical support</li>
              <li>Advanced replacement service</li>
              <li>On-site repair options for eligible products</li>
            </ul>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">What's Covered</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Manufacturing defects</li>
              <li>Hardware failures under normal use</li>
              <li>Parts and labor for repairs</li>
              <li>Replacement units when repair is not possible</li>
            </ul>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">What's Not Covered</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Damage from misuse, abuse, or accidents</li>
              <li>Unauthorized modifications or repairs</li>
              <li>Normal wear and tear</li>
              <li>Consumable items (ribbons, cards, etc.)</li>
              <li>Software issues not related to hardware</li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 bg-white-50">
            <h2 className="text-2xl font-semibold mb-4">How to Make a Claim</h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              <li>Contact our support team with your product serial number</li>
              <li>Describe the issue you're experiencing</li>
              <li>Provide proof of purchase</li>
              <li>Follow the instructions provided by our support team</li>
            </ol>
            <div className="mt-4 pt-4 border-t">
              <p className="font-semibold mb-2">Contact Support:</p>
              <p className="text-gray-600">Email: info@itechdevices.com</p>
              <p className="text-gray-600">Phone: +250 782 878 665</p>
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
