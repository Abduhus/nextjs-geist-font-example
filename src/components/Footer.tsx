'use client'

import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Mock newsletter subscription
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/60 text-gray-300/85 text-center px-5 py-10 border-t border-[#222]"
            style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.1)' }}>
      
      <div className="mb-5">
        <a href="#" className="text-gray-300/85 no-underline mx-2 transition-colors duration-300 hover:text-[#D4AF37]">Shop</a>
        <span className="mx-1">|</span>
        <a href="#" className="text-gray-300/85 no-underline mx-2 transition-colors duration-300 hover:text-[#D4AF37]">Collections</a>
        <span className="mx-1">|</span>
        <a href="#" className="text-gray-300/85 no-underline mx-2 transition-colors duration-300 hover:text-[#D4AF37]">Contact</a>
        <span className="mx-1">|</span>
        <a href="#" className="text-gray-300/85 no-underline mx-2 transition-colors duration-300 hover:text-[#D4AF37]">Privacy Policy</a>
      </div>
      
      <div className="mb-5">
        <a href="#" aria-label="Facebook" className="text-[#D4AF37] mx-2 text-2xl transition-transform duration-300 hover:-translate-y-1">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" aria-label="Instagram" className="text-[#D4AF37] mx-2 text-2xl transition-transform duration-300 hover:-translate-y-1">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" aria-label="Twitter" className="text-[#D4AF37] mx-2 text-2xl transition-transform duration-300 hover:-translate-y-1">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" aria-label="TikTok" className="text-[#D4AF37] mx-2 text-2xl transition-transform duration-300 hover:-translate-y-1">
          <i className="fab fa-tiktok"></i>
        </a>
      </div>
      
      <form onSubmit={handleNewsletterSubmit} className="mt-5 flex justify-center gap-2 flex-wrap">
        <input 
          type="email" 
          placeholder="Enter your email for updates"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded border border-[#D4AF37] bg-black/50 text-white font-eb-garamond w-64 max-w-full"
          required
        />
        <button 
          type="submit"
          className="px-5 py-2 rounded border-none bg-gradient-to-r from-[#D4AF37] to-[#F9E79F] text-black font-bold cursor-pointer transition-opacity duration-300 hover:opacity-90"
        >
          {isSubscribed ? 'Subscribed!' : 'Subscribe'}
        </button>
      </form>
      
      <p className="mt-5 mb-0">
        © {currentYear} Valley Breezes Perfumes
      </p>
    </footer>
  )
}
