import ImprovedFooter from '../../components/ImprovedFooter'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          Get in touch with our team. We're here to help with any questions or concerns.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">info@itechdevices.com</p>
                    <p className="text-gray-600">support@itechdevices.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-600">123 Tech Street</p>
                    <p className="text-gray-600">Business District</p>
                    <p className="text-gray-600">City, State 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-600">
                  <option>General Inquiry</option>
                  <option>Product Information</option>
                  <option>Technical Support</option>
                  <option>Sales</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                  rows={5}
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2">Sales Inquiries</h3>
            <p className="text-sm text-gray-600 mb-2">For product quotes and bulk orders</p>
            <a href="mailto:sales@itechdevices.com" className="text-red-600 hover:text-red-700">
              sales@itechdevices.com
            </a>
          </div>

          <div className="border rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2">Technical Support</h3>
            <p className="text-sm text-gray-600 mb-2">For product assistance and troubleshooting</p>
            <a href="mailto:support@itechdevices.com" className="text-red-600 hover:text-red-700">
              support@itechdevices.com
            </a>
          </div>

          <div className="border rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2">Partnerships</h3>
            <p className="text-sm text-gray-600 mb-2">For business partnerships and collaborations</p>
            <a href="mailto:partners@itechdevices.com" className="text-red-600 hover:text-red-700">
              partners@itechdevices.com
            </a>
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
