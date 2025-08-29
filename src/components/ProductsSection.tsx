'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'

interface Product {
  name: string
  category: 'women' | 'men' | 'unisex'
  rating: number
  volume: string
  description: string
  price: number
  moodImage: string
  tags: string[]
}

const products: Product[] = [
  {
    name: 'Amber & Spice',
    category: 'unisex',
    rating: 4,
    volume: '100ml Eau de Parfum',
    description: 'A warm, inviting blend of rich amber and exotic spices, perfect for a cozy evening.',
    price: 52,
    moodImage: 'https://images.unsplash.com/photo-1617103996386-c42684d7c7c3?q=80&w=1887&auto=format&fit=crop',
    tags: ['unisex', 'spicy', 'night']
  },
  {
    name: 'Desert Rose Oud',
    category: 'unisex',
    rating: 5,
    volume: '75ml Eau de Parfum',
    description: 'An elegant fusion of delicate desert rose and deep, smoky oud wood.',
    price: 65,
    moodImage: 'https://images.unsplash.com/photo-1554386698-294b5d33b2a2?q=80&w=1887&auto=format&fit=crop',
    tags: ['unisex', 'woody', 'night']
  },
  {
    name: 'Citrus Grove',
    category: 'women',
    rating: 4,
    volume: '50ml Eau de Toilette',
    description: 'A bright, refreshing burst of sun-ripened citrus, capturing the essence of a vibrant morning.',
    price: 48,
    moodImage: 'https://images.unsplash.com/photo-1596417929339-0158a74421b3?q=80&w=1887&auto=format&fit=crop',
    tags: ['women', 'fresh', 'day']
  },
  {
    name: 'Midnight Musk',
    category: 'women',
    rating: 5,
    volume: '90ml Eau de Parfum',
    description: 'A mysterious and sensual scent with notes of dark musk, vanilla, and a hint of patchouli.',
    price: 58,
    moodImage: 'https://images.unsplash.com/photo-1594035934090-41a4818f041b?q=80&w=1887&auto=format&fit=crop',
    tags: ['women', 'floral', 'night']
  },
  {
    name: 'Sandalwood Veil',
    category: 'unisex',
    rating: 4,
    volume: '100ml Eau de Parfum',
    description: 'A comforting embrace of creamy sandalwood and soft vanilla, suitable for any occasion.',
    price: 62,
    moodImage: 'https://images.unsplash.com/photo-1622620789729-1959c82c21a3?q=80&w=1887&auto=format&fit=crop',
    tags: ['unisex', 'woody', 'day']
  }
]

const PerfumeBottleIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    stroke="#D4AF37" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="w-full h-full"
  >
    <path d="M18.5 11.5H5.5C4.94772 11.5 4.5 11.9477 4.5 12.5V19C4.5 20.3807 5.61929 21.5 7 21.5H17C18.3807 21.5 19.5 20.3807 19.5 19V12.5C19.5 11.9477 19.0523 11.5 18.5 11.5Z"/>
    <path d="M14.5 11.5V9C14.5 8.44772 14.0523 8 13.5 8H10.5C9.94772 8 9.5 8.44772 9.5 9V11.5"/>
    <path d="M13.5 8C13.5 6.89543 12.6046 6 11.5 6C10.3954 6 9.5 6.89543 9.5 8"/>
    <path d="M13 6.5C15 5 16.5 4.5 18 3"/>
    <path d="M13.5 7.5C15.5 6.5 17 6 18.5 5"/>
  </svg>
)

interface ProductCardProps {
  product: Product
  isVisible: boolean
}

function ProductCard({ product, isVisible }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-[#D4AF37]' : 'text-[#555]'}>
        ★
      </span>
    ))
  }

  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      price: product.price,
      image: product.moodImage
    })
  }

  return (
    <div 
      className={`bg-[#111] border border-[#333] rounded-lg p-5 text-center overflow-hidden transition-all duration-400 flex flex-col relative ${
        isVisible ? 'opacity-100 transform-none' : 'opacity-0 scale-75 w-0 p-0 m-0 border-0'
      } ${isHovered ? 'border-[#D4AF37] -translate-y-1 shadow-[0_8px_25px_rgba(0,0,0,0.5)]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-[300px] rounded overflow-hidden mb-4">
        <img 
          src={product.moodImage} 
          alt={`${product.name} Mood Image`}
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-400 z-10"
          style={{ opacity: isHovered ? 0.3 : 1 }}
        />
        <div 
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-5 box-border z-20 transition-opacity duration-400"
          style={{ opacity: isHovered ? 1 : 0.8 }}
        >
          <PerfumeBottleIcon />
        </div>
      </div>

      <h3 className="text-white/90 font-cormorant-garamond text-2xl my-2">
        {product.name}
      </h3>
      
      <div className="text-[#D4AF37] mb-2">
        {renderStars(product.rating)}
      </div>
      
      <p className="text-sm text-white/70 mb-2">
        {product.volume}
      </p>
      
      <p className="text-white/70 text-lg min-h-[40px] my-2 flex-grow leading-relaxed"
         style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.15)' }}>
        {product.description}
      </p>
      
      <div className="text-[#D4AF37] font-semibold my-2 text-xl">
        ${product.price}
      </div>

      {isHovered && (
        <button className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-[#D4AF37]/90 text-black px-4 py-2 rounded text-sm font-bold opacity-100 visible transition-all duration-300 z-30 border-none cursor-pointer">
          Quick View
        </button>
      )}
      
      <button 
        onClick={handleAddToCart}
        className="bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] text-black px-6 py-3 rounded-md font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)] font-eb-garamond text-base border-none cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  )
}

type FilterType = 'all' | 'women' | 'men' | 'unisex'
type SortType = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

export default function ProductsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [sortBy, setSortBy] = useState<SortType>('default')
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    let filtered = [...products]

    // Apply filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'men') {
        filtered = filtered.filter(p => p.category === 'men' || p.category === 'unisex')
      } else if (activeFilter === 'women') {
        filtered = filtered.filter(p => p.category === 'women' || p.category === 'unisex')
      } else {
        filtered = filtered.filter(p => p.category === activeFilter)
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        // Keep original order
        break
    }

    setFilteredProducts(filtered)
  }, [activeFilter, sortBy])

  // Add global event listener for filter buttons from header dropdown
  useEffect(() => {
    const handleFilterClick = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.hasAttribute('data-filter')) {
        const filter = target.getAttribute('data-filter') as FilterType
        setActiveFilter(filter)
      }
    }

    document.addEventListener('click', handleFilterClick)
    return () => document.removeEventListener('click', handleFilterClick)
  }, [])

  return (
    <section id="bestsellers" className="fade-in px-10 py-20 max-w-6xl mx-auto my-10 bg-transparent">
      <h2 className="font-cormorant-garamond text-5xl text-center bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] bg-clip-text text-transparent mb-10">
        Bestsellers
      </h2>
      
      <div className="text-center mb-10 flex justify-center items-center flex-wrap gap-2">
        {(['all', 'women', 'men', 'unisex'] as FilterType[]).map((filter) => (
          <button
            key={filter}
            data-filter={filter}
            onClick={() => setActiveFilter(filter)}
            className={`text-[#D4AF37] px-4 py-2 border border-[#D4AF37] rounded-full transition-all duration-300 font-semibold ${
              activeFilter === filter 
                ? 'bg-[#D4AF37] text-black' 
                : 'hover:bg-[#D4AF37]/20'
            }`}
          >
            {filter === 'all' ? 'All' : 
             filter === 'women' ? 'For Her' : 
             filter === 'men' ? 'For Him' : 'Unisex'}
          </button>
        ))}
        
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortType)}
          className="bg-black/50 border border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded-full font-eb-garamond text-base cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23D4AF37\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[right_10px_center] pr-8"
        >
          <option value="default">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product.name}
            product={product} 
            isVisible={filteredProducts.includes(product)}
          />
        ))}
      </div>
    </section>
  )
}
