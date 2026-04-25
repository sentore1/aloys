import ImprovedFooter from '../../components/ImprovedFooter'

export default function IDCardPrintersPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">ID Card Printers</h1>
        <p className="text-lg text-gray-600 mb-8">
          Professional ID card printing solutions for secure identification.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Single-Sided Printers</h3>
            <p className="text-gray-600">Cost-effective solutions for basic ID card printing.</p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Dual-Sided Printers</h3>
            <p className="text-gray-600">Print on both sides for comprehensive ID cards.</p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Retransfer Printers</h3>
            <p className="text-gray-600">High-quality edge-to-edge printing technology.</p>
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
