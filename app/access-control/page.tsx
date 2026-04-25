import ImprovedFooter from '../../components/ImprovedFooter'

export default function AccessControlPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Access Control Systems</h1>
        <p className="text-lg text-gray-600 mb-8">
          Advanced security solutions to control and monitor access to your facilities.
        </p>
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3">Card-Based Access</h2>
            <p className="text-gray-600">RFID and smart card readers for secure entry management.</p>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3">Keypad Systems</h2>
            <p className="text-gray-600">PIN-based access control for enhanced security.</p>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3">Integrated Solutions</h2>
            <p className="text-gray-600">Complete access control systems with monitoring and reporting.</p>
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
