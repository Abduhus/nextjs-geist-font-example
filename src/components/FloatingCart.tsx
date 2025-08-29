'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

interface FloatingCartProps {
  onClick: () => void
}

const CartIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="w-8 h-8 stroke-black stroke-2"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
)

export default function FloatingCart({ onClick }: FloatingCartProps) {
  const { getTotalItems } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  
  const totalItems = getTotalItems()

  return (
    <div 
      className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#F9E79F] rounded-full flex items-center justify-center cursor-pointer z-40 shadow-[0_5px_20px_rgba(212,175,55,0.4)] transition-transform duration-300 hover:scale-110"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CartIcon />
      
      {/* Tooltip */}
      <span 
        className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-[#111] text-[#D4AF37] px-3 py-1 rounded text-sm font-semibold whitespace-nowrap border border-[#D4AF37]/50 transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        Cart
      </span>
      
      {/* Item Count Badge */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-[#D4AF37] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold border-2 border-[#D4AF37]">
          {totalItems}
        </span>
      )}
    </div>
  )
}
