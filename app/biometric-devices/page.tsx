import ImprovedFooter from '../../components/ImprovedFooter'

export default function BiometricDevicesPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Biometric Devices</h1>
        <p className="text-lg text-gray-600 mb-8">
          Cutting-edge biometric authentication for maximum security.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Fingerprint Scanners</h2>
            <p className="text-gray-600 mb-4">High-accuracy fingerprint recognition systems for secure authentication.</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Optical scanners</li>
              <li>Capacitive sensors</li>
              <li>Ultrasonic technology</li>
            </ul>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Facial Recognition</h2>
            <p className="text-gray-600 mb-4">Advanced AI-powered facial recognition systems.</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>3D face mapping</li>
              <li>Liveness detection</li>
              <li>Multi-face recognition</li>
            </ul>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Iris Scanners</h2>
            <p className="text-gray-600">Highly secure iris recognition technology for critical applications.</p>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Time & Attendance</h2>
            <p className="text-gray-600">Biometric time tracking systems for workforce management.</p>
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
