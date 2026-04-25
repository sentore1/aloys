import ImprovedFooter from '../../components/ImprovedFooter'

export default function ServersPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Servers</h1>
        <p className="text-lg text-gray-600 mb-8">
          Enterprise-grade server solutions for your business needs.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Rack Servers</h2>
            <p className="text-gray-600">High-performance rack-mounted servers for data centers and enterprise environments.</p>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Tower Servers</h2>
            <p className="text-gray-600">Versatile tower servers ideal for small to medium businesses.</p>
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
