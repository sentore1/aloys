'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ShoppingCart, ChevronLeft, ChevronRight, Maximize2, Minimize2, AlertTriangle, Eye, Clock, Lock, Truck, RotateCcw, X } from 'lucide-react'
import { generateProductJsonLd } from '../../../lib/seo'
import { formatPrice, formatPriceShort } from '../../../lib/currency'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  stock: number
  currency?: string
  images?: string[]
  slug?: string
  sizes?: string
  colors?: string
  sale_end_date?: string
  viewers_count?: number
}

interface ProductSpec {
  id: string
  spec_name: string
  spec_value: string
  spec_image?: string
  display_order: number
}

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [zoomType, setZoomType] = useState<'simple' | 'detailed'>('simple')
  const [showZoomModal, setShowZoomModal] = useState(false)
  const [detailedZoom, setDetailedZoom] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [timeLeft, setTimeLeft] = useState('')
  const [currentViewers, setCurrentViewers] = useState(0)
  const [buttonText, setButtonText] = useState('Cart')
  const [buttonLabel, setButtonLabel] = useState('Add to Cart')
  const [specs, setSpecs] = useState<ProductSpec[]>([])
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description')

  useEffect(() => {
    fetchProduct()
    fetchButtonLabel()
  }, [params.id])

  useEffect(() => {
    if (product?.id) {
      fetchSpecs()
    }
  }, [product?.id])

  useEffect(() => {
    if (product?.sale_end_date) {
      const timer = setInterval(() => {
        const now = new Date().getTime()
        const end = new Date(product.sale_end_date!).getTime()
        const distance = end - now
        
        if (distance < 0) {
          setTimeLeft('Sale ended')
          clearInterval(timer)
        } else {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
        }
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [product])

  useEffect(() => {
    if (product?.viewers_count) {
      const baseViewers = product.viewers_count
      const dailyVariation = Math.floor(Math.random() * 200) + 20
      setCurrentViewers(baseViewers + dailyVariation)
      
      const viewerTimer = setInterval(() => {
        const change = Math.floor(Math.random() * 7) - 3
        setCurrentViewers(prev => Math.max(baseViewers, Math.min(baseViewers + 300, prev + change)))
      }, 8000)
      
      return () => clearInterval(viewerTimer)
    }
  }, [product])

  useEffect(() => {
    if (!product) return
    
    const texts = ['Cart', 'Bag']
    if (product.stock > 0 && product.stock <= 20) {
      texts.push(`${product.stock}`)
    }
    
    let index = 0
    const textTimer = setInterval(() => {
      index = (index + 1) % texts.length
      setButtonText(texts[index])
    }, 3000)
    
    return () => clearInterval(textTimer)
  }, [product])

  const fetchProduct = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const products = await response.json()
        const foundProduct = products.find((p: Product) => p.slug === params.id || p.id === params.id)
        if (foundProduct) {
          // Parse images if it's a JSON string
          if (typeof foundProduct.images === 'string') {
            try {
              const parsedImages = JSON.parse(foundProduct.images)
              foundProduct.images = Array.isArray(parsedImages)
                ? parsedImages.filter((img: string) => img && img.trim() !== '')
                : [foundProduct.image]
            } catch {
              foundProduct.images = [foundProduct.image]
            }
          }
          // Ensure images is a valid non-empty array
          if (!Array.isArray(foundProduct.images) || foundProduct.images.length === 0) {
            foundProduct.images = [foundProduct.image]
          }
          // Filter empty URLs and deduplicate
          foundProduct.images = [...new Set(
            foundProduct.images.filter((img: string) => img && img.trim() !== '')
          )]
          if (foundProduct.images.length === 0) {
            foundProduct.images = [foundProduct.image]
          }
        }
        setProduct(foundProduct || null)
      }
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }

  const fetchButtonLabel = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const settings = await response.json()
        setButtonLabel(settings.add_to_cart_button_text || 'Add to Cart')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchSpecs = async () => {
    try {
      const response = await fetch(`/api/product-specs?productId=${product?.id}`)
      if (response.ok) {
        const data = await response.json()
        setSpecs(data)
      }
    } catch (error) {
      console.error('Error fetching specs:', error)
    }
  }

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images!.length)
    }
  }

  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images!.length) % product.images!.length)
    }
  }

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center pt-16"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div></div>

  if (!product) return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <button onClick={() => router.push('/')} className="bg-black text-white px-6 py-2">Back to Home</button>
      </div>
    </div>
  )

  const productJsonLd = generateProductJsonLd(product);

  return (
    <div className="min-h-screen bg-white pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .slide-up-text {
          animation: slideUp 1.2s ease-out;
        }
      `}} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            <div 
              className="relative aspect-square bg-gray-50 rounded-xl group"
              style={{ overflow: zoomType === 'detailed' ? 'visible' : 'hidden' }}
              onMouseEnter={() => setShowZoomModal(true)}
              onMouseLeave={() => {
                setShowZoomModal(false)
                setDetailedZoom(100)
              }}
            >
              {/* Fullscreen Toggle */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm rounded-md shadow-lg p-1.5 z-20 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
              <div 
                className="w-full h-full rounded-xl overflow-hidden relative"
                onWheel={(e) => {
                  if (zoomType === 'detailed') {
                    e.preventDefault()
                    e.stopPropagation()
                    setDetailedZoom(prev => Math.min(4000, Math.max(80, prev + (e.deltaY > 0 ? -50 : 50))))
                  }
                }}
              >
                <img 
                  src={product.images?.[currentImageIndex] || product.image} 
                  alt={product.name} 
                  className={`w-full h-full object-cover transition-all duration-200 ${
                    zoomType === 'simple' ? 'group-hover:scale-105' : ''
                  }`}
                  style={{
                    transform: zoomType === 'detailed' ? `scale(${detailedZoom / 100})` : undefined,
                    transformOrigin: 'center',
                    cursor: zoomType === 'detailed' ? 'zoom-in' : 'default'
                  }}
                />
              </div>
              
              {/* Zoom Modal */}
              {showZoomModal && (
                <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm rounded-md shadow-lg p-2 z-10">
                  <p className="text-[10px] font-medium mb-1 text-gray-700">Zoom</p>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setZoomType('simple')
                      }}
                      className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                        zoomType === 'simple' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Simple
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setZoomType('detailed')
                      }}
                      className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                        zoomType === 'detailed' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Detail
                    </button>
                  </div>
                  {zoomType === 'detailed' && (
                    <p className="text-[9px] text-gray-600 mt-1 text-center">{detailedZoom}%</p>
                  )}
                </div>
              )}
              {product.images && product.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-1.5 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-3 h-3 text-white" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-1.5 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-3 h-3 text-white" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images && Array.isArray(product.images) && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-full aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      currentImageIndex === index ? 'border-black shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} ${index + 1}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-2xl font-semibold">
                {formatPriceShort(product.price, product.currency)}
              </p>
            </div>

            {/* CRO Elements */}
            <div className="flex flex-wrap gap-2 text-xs">
              {product.stock > 0 && product.stock <= 5 && (
                <span className="bg-red-50 text-red-600 px-2 py-1 rounded flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Only {product.stock} left!
                </span>
              )}
              {product.viewers_count && product.viewers_count > 0 && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {currentViewers} viewing now
                </span>
              )}
              {product.sale_end_date && timeLeft && timeLeft !== 'Sale ended' && (
                <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Sale ends in {timeLeft}
                </span>
              )}
            </div>

            {/* Size, Color, Quantity in one line */}
            <div className="flex gap-4 items-start">
              {/* Size Selection */}
              {product.sizes && (
                <div>
                  <h3 className="text-[10px] font-medium mb-1">Size</h3>
                  <div className="flex gap-1">
                    {product.sizes.split(',').map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size.trim())}
                        className={`px-1.5 py-0.5 text-[10px] border rounded transition-colors ${
                          selectedSize === size.trim() ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size.trim()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && (
                <div>
                  <h3 className="text-[10px] font-medium mb-1">Color</h3>
                  <div className="flex gap-1">
                    {product.colors.split(',').map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color.trim())}
                        className={`px-1.5 py-0.5 text-[10px] border rounded transition-colors ${
                          selectedColor === color.trim() ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color.trim()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div>
                <h3 className="text-[10px] font-medium mb-1">Quantity</h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-5 h-5 border border-gray-300 rounded hover:bg-gray-50 text-[10px]"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-[10px]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-5 h-5 border border-gray-300 rounded hover:bg-gray-50 text-[10px]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart and WhatsApp Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <button 
                  className="relative bg-black text-white py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm overflow-hidden group flex-1"
                  disabled={product.stock === 0 || addingToCart}
                  onClick={() => {
                    setAddingToCart(true)
                    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
                    const existingItem = cartItems.find((item: any) => item.id === product.id)
                    
                    if (existingItem) {
                      existingItem.quantity += quantity
                    } else {
                      cartItems.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: quantity,
                        currency: product.currency || 'USD',
                        size: selectedSize,
                        color: selectedColor
                      })
                    }
                    
                    localStorage.setItem('cart', JSON.stringify(cartItems))
                    window.dispatchEvent(new Event('cartUpdated'))
                    
                    setTimeout(() => setAddingToCart(false), 800)
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                  {addingToCart ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      {product.stock > 0 ? (
                        !isNaN(Number(buttonText)) ? (
                          <span className="flex items-center">
                            Only <span className="relative inline-block overflow-hidden ml-1">
                              <span key={buttonText} className="slide-up-text inline-block font-semibold text-orange-600">
                                {buttonText}
                              </span>
                            </span> <span className="ml-1">left!</span>
                          </span>
                        ) : (
                          <span className="flex items-center">
                            {buttonLabel.replace('Cart', '').replace('Bag', '').trim()} <span className="relative inline-block overflow-hidden ml-1">
                              <span key={buttonText} className="slide-up-text inline-block font-semibold">
                                {buttonText}
                              </span>
                            </span>
                          </span>
                        )
                      ) : 'Out of Stock'}
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    const message = `Hi, I'm interested in ordering:\n\n${product.name}\nPrice: ${formatPriceShort(product.price, product.currency)}\nQuantity: ${quantity}${selectedSize ? `\nSize: ${selectedSize}` : ''}${selectedColor ? `\nColor: ${selectedColor}` : ''}`
                    window.open(`https://wa.me/250782878665?text=${encodeURIComponent(message)}`, '_blank')
                  }}
                  className="bg-green-500 text-white py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors text-sm flex-1"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Order on WhatsApp
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex gap-3 text-[10px] text-gray-600 justify-center">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Secure</span>
                <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Free Ship</span>
                <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Returns</span>
              </div>
            </div>

            <div>
              <div className="flex gap-4 border-b mb-4">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-2 px-4 font-medium transition-colors ${
                    activeTab === 'description'
                      ? 'border-b-2 border-black text-black'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 px-4 font-medium transition-colors ${
                    activeTab === 'specs'
                      ? 'border-b-2 border-black text-black'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Specifications {specs.length > 0 && `(${specs.length})`}
                </button>
              </div>

              {activeTab === 'description' ? (
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</div>
              ) : (
                <div className="space-y-3">
                  {specs.length > 0 ? (
                    specs.map((spec) => (
                      <div key={spec.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                        {spec.spec_image && (
                          <img
                            src={spec.spec_image}
                            alt={spec.spec_name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{spec.spec_name}</div>
                          <div className="text-gray-600 text-sm">{spec.spec_value}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No specifications available</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center" onClick={() => setIsFullscreen(false)}>
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2 z-20 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <img 
            src={product?.images?.[currentImageIndex] || product?.image} 
            alt={product?.name} 
            className="max-w-[95vw] max-h-[95vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {product.images && product.images.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-all"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}